"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { DepositTotals_CollectionQuery } from "@repo/webkit";
import { formatUnits } from "viem";

export default function DepositTotalsCard(
  props: DepositTotals_CollectionQuery["depositTotals_collection"][0],
) {
  const readableTotalDeposited = Number(
    formatUnits(BigInt(props.totalDeposited), props.decimals ?? 18),
  ).toFixed(2);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>
          {props.name} ({props.symbol})
        </CardDescription>
        <CardTitle className="text-4xl">{props.totalDeposists}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">
          {readableTotalDeposited} {props.symbol}
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
