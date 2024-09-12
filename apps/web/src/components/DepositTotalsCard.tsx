"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { DepositTotals_CollectionQuery } from "@repo/webkit";
import { formatUnits } from "viem";
import Image from "next/image";
import { base } from "viem/chains";
import { useState } from "react";
import { formatAmount } from "../helpers";

export default function DepositTotalsCard(
  props: DepositTotals_CollectionQuery["depositTotals_collection"][0],
) {
  const readableTotalDeposited = Number(
    formatUnits(BigInt(props.totalDeposited), props.decimals ?? 18),
  ).toFixed(2);
  const [error, setError] = useState<string | null>(null);

  return (
    <Card className="">
      <CardHeader className="p-4">
        <CardDescription>
          {props.name} ({props.symbol})
        </CardDescription>
        <CardTitle className="text-2xl flex flex-row items-center gap-2">
          {formatAmount(readableTotalDeposited)}
          <div className="h-6 w-6">
            {error ? (
              <div className="bg-gray-500 rounded-full w-full h-full flex flex-row justify-center items-center text-white">
                <p className="text-base">{props.name?.[0]}</p>
              </div>
            ) : (
              <Image
                src={`https://assets.smold.app/api/token/${base.id}/${props.tokenAddress}/logo-128.png`}
                height={100}
                width={100}
                onError={() => setError("Failed to load image")}
                alt=""
              />
            )}
          </div>
          {/* <span className="text-sm ml-2">Deposits</span> */}
        </CardTitle>
        <CardDescription>{props.totalDeposists} Deposits</CardDescription>
      </CardHeader>
    </Card>
  );
}
