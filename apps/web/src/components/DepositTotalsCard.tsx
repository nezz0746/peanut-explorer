"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@peanut/ui/components/ui/card";
import { DepositTotals_CollectionQuery } from "@peanut/webkit";
import { formatUnits } from "viem";
import { formatAmount } from "../helpers";

export default function DepositTotalsCard(
  props: DepositTotals_CollectionQuery["depositTotals_collection"][0],
) {
  const readableTotalDeposited = Number(
    formatUnits(BigInt(props.totalDeposited), props.decimals ?? 18),
  ).toFixed(2);

  return (
    <Card className="">
      <CardHeader className="p-4">
        <CardDescription className="font-bold">
          {props.name} ({props.symbol})
        </CardDescription>
        <CardTitle className="text-2xl flex flex-row items-center gap-2">
          {formatAmount(readableTotalDeposited)}
        </CardTitle>
        <CardDescription>{props.totalDeposists} Deposits</CardDescription>
      </CardHeader>
    </Card>
  );
}
