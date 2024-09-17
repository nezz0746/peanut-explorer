import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import DepositTable from "../components/DepositsTable";
import TopDeposists from "../components/TopDeposists";
import {
  getDepositsQueryOptions,
  getQueryClient,
  getTopDepositsQueryOptions,
} from "../query";
import { constants, SupportedChainsIds } from "@peanut/common";

export default function Home() {
  const queryClient = getQueryClient();

  Object.keys(constants.subgraphURLs).map((c) => {
    const chainId = parseInt(c) as SupportedChainsIds;

    void queryClient.prefetchQuery(getTopDepositsQueryOptions(chainId));
    void queryClient.prefetchQuery(
      getDepositsQueryOptions({
        chainId: chainId,
        searchString: null,
      }),
    );
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col md:flex-row w-full justify-center p-4 gap-4">
        <div className="flex flex-col gap-2 md:w-[400px]">
          <TopDeposists />
        </div>
        <div className="flex flex-col gap-2 flex-grow">
          <DepositTable />
        </div>
      </div>
    </HydrationBoundary>
  );
}
