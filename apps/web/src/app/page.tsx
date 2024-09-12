"use client";

import {
  _SubgraphErrorPolicy_,
  DepositTotals_OrderBy,
  OrderDirection,
} from "@repo/webkit";
import DepositTotalsCard from "../components/DepositTotalsCard";
import { PeanutAPI } from "../services/peanut-api";
import DepositTable from "../components/DepositTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { useExplorerChain } from "../context/ChainContext";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { chainId } = useExplorerChain();
  const { data } = useQuery({
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

  return (
    <div className="flex flex-col md:flex-row w-full justify-center p-4 gap-4">
      <div className="flex flex-col gap-2 md:w-[400px]">
        <Card>
          <CardHeader>
            <CardTitle>Stats</CardTitle>
            <CardDescription>
              Overview of the top deposits by currency
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="gap-2 grid grid-cols-2">
              {data?.depositTotals_collection.map((deposit) => {
                return <DepositTotalsCard {...deposit} />;
              })}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col gap-2 flex-grow">
        <DepositTable />
      </div>
    </div>
  );
}
