import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import DepositTable from "../components/DepositsTable";
import TopDeposists from "../components/TopDeposists";
import {
  getDepositsQueryOptions,
  getQueryClient,
  getTopDepositsQueryOptions,
} from "../query";
import { constants } from "@peanut/common";
import { defaultChain, defaultDepositsTableFilters } from "../env";
import { DepositsTableFiltersProvider } from "../context/TableFiltersContext";

export default function Home() {
  const queryClient = getQueryClient();

  constants.supportedChains.map(({ chain }) => {
    void queryClient.prefetchQuery(getTopDepositsQueryOptions(chain.id));
    void queryClient.prefetchQuery(
      getDepositsQueryOptions({
        chainId: defaultChain.id,
        filters: defaultDepositsTableFilters,
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
          <DepositsTableFiltersProvider>
            <DepositTable />
          </DepositsTableFiltersProvider>
        </div>
      </div>
    </HydrationBoundary>
  );
}
