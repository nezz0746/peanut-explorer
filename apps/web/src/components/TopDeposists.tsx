"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@peanut/ui/components/ui/card";
import DepositTotalsCard from "./DepositTotalsCard";
import { useExplorerChain } from "../context/ChainContext";
import { useSuspenseQuery } from "@tanstack/react-query";
import { _SubgraphErrorPolicy_ } from "@peanut/webkit";
import { getTopDepositsQueryOptions } from "../query";

const TopDeposists = () => {
  const { chainId } = useExplorerChain();
  const { data } = useSuspenseQuery(getTopDepositsQueryOptions(chainId));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stats</CardTitle>
        <CardDescription>
          Overview of the top 5 deposits by currency
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="gap-2 grid grid-cols-2 md:grid-cols-6">
          {data?.depositTotals_collection.map((deposit) => {
            return <DepositTotalsCard {...deposit} />;
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopDeposists;
