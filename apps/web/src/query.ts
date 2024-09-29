import {
  QueryClient,
  UseQueryOptions,
  defaultShouldDehydrateQuery,
  isServer,
} from "@tanstack/react-query";
import { PeanutAPI } from "./services/peanut-api";
import {
  _SubgraphErrorPolicy_,
  DepositsQueryVariables,
  DepositTotals_OrderBy,
  OrderDirection,
  DepositsQuery,
  Deposit,
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

type GetDepositsQueryOptions<TData = Deposit[]> = {
  chainId: SupportedChainsIds;
  filters: DepositsQueryVariables;
  select?: (data: DepositsQuery) => TData;
  enabled?: boolean;
};

export const getDepositsQueryOptions = <TData = Deposit[]>({
  chainId,
  filters,
  select,
  enabled,
}: GetDepositsQueryOptions<TData>): UseQueryOptions<
  DepositsQuery,
  Error,
  TData,
  [string, SupportedChainsIds, DepositsQueryVariables]
> => ({
  queryKey: ["depositTable", chainId, filters],
  queryFn: async () => {
    return new PeanutAPI(chainId).getDeposits(filters);
  },
  enabled: enabled ?? !!chainId,
  select: select ?? ((data: DepositsQuery) => data.deposits as TData),
});
