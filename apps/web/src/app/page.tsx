import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import DepositTable from "../components/DepositsTable";
import TopDeposists from "../components/TopDeposists";
import {
  getDepositsQueryOptions,
  getQueryClient,
  getTopDepositsQueryOptions,
} from "../query";
import { constants, SupportedChainsIds } from "@peanut/common";
import {
  _SubgraphErrorPolicy_,
  Deposit_OrderBy,
  OrderDirection,
} from "@peanut/webkit";
import { defaultChain } from "../env";

export default function Home() {
  const queryClient = getQueryClient();

  Object.keys(constants.subgraphURLs).map((c) => {
    const chainId = parseInt(c) as SupportedChainsIds;

    void queryClient.prefetchQuery(getTopDepositsQueryOptions(chainId));
    void queryClient.prefetchQuery(
      getDepositsQueryOptions({
        chainId: defaultChain.id,
        filters: {
          where: {},
          orderBy: Deposit_OrderBy.Timestamp,
          orderDirection: OrderDirection.Desc,
          subgraphError: _SubgraphErrorPolicy_.Allow,
        },
      }),
    );
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col w-full justify-center p-4 gap-4">
        <div className="flex flex-col gap-2 ">
          <TopDeposists />
        </div>
        <div className="flex flex-col gap-2 flex-grow">
          <DepositTable />
        </div>
      </div>
    </HydrationBoundary>
  );
}
