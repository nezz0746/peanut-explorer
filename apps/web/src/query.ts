import {
  QueryClient,
  defaultShouldDehydrateQuery,
  isServer,
} from "@tanstack/react-query";
import { PeanutAPI } from "./services/peanut-api";
import {
  _SubgraphErrorPolicy_,
  Deposit_OrderBy,
  DepositTotals_OrderBy,
  OrderDirection,
} from "@peanut/webkit";
import { SupportedChainsIds } from "@peanut/common";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
        refetchInterval: 5 * 60 * 1000,
        refetchIntervalInBackground: true,
      },
      dehydrate: {
        // include pending queries in dehydration
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export const getTopDepositsQueryOptions = (chainId: SupportedChainsIds) => ({
  queryKey: ["depositTotals", chainId],
  queryFn: async () => {
    return new PeanutAPI(chainId).getTotals({
      where: {},
      first: 5,
      orderBy: DepositTotals_OrderBy.TotalDeposists,
      orderDirection: OrderDirection.Desc,
      subgraphError: _SubgraphErrorPolicy_.Allow,
    });
  },
});

export const getDepositsQueryOptions = ({
  chainId,
  searchString,
  sort = {
    by: Deposit_OrderBy.Timestamp,
    direction: OrderDirection.Desc,
  },
}: {
  chainId: SupportedChainsIds;
  searchString: string | null;
  sort?: {
    by: Deposit_OrderBy;
    direction: OrderDirection;
  };
}) => ({
  queryKey: ["depositTable", searchString, chainId],
  queryFn: async () => {
    return new PeanutAPI(chainId).getDeposits({
      where: !searchString
        ? {}
        : {
            or: [
              {
                tokenAddress: searchString,
              },
              { senderAddress: searchString },
            ],
          },
      orderBy: sort.by,
      orderDirection: sort.direction,
      subgraphError: _SubgraphErrorPolicy_.Allow,
    });
  },
});