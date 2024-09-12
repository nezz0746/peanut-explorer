"use client";

import { useQuery } from "@tanstack/react-query";
import { PeanutAPI } from "../services/peanut-api";
import {
  _SubgraphErrorPolicy_,
  Deposit,
  Deposit_OrderBy,
  DepositsQuery,
  OrderDirection,
} from "@repo/webkit";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./DataTable";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { formatUnits } from "viem";
import { Badge } from "@repo/ui/components/ui/badge";
import { useState } from "react";
import SearchBar from "./SearchBar";
import TokenLogo from "./TokenLogo";
import SenderCell from "./SenderCell";
import { formatAmount } from "../helpers";
dayjs.extend(relativeTime);

type TableDeposit = DepositsQuery["deposits"][0];

const columns: ColumnDef<TableDeposit, keyof TableDeposit>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "senderAddress",
    header: "Sender",
    cell({ row }) {
      const sender = row.getValue<Deposit["senderAddress"]>("senderAddress");
      return <SenderCell sender={sender} />;
    },
  },
  {
    accessorKey: "contractType",
    header: "Type",
    cell({ row }) {
      const type = row.getValue<Deposit["contractType"]>("contractType");
      if (type === 0) {
        return <Badge className="bg-purple-600">ETH</Badge>;
      } else if (type === 1) {
        return <Badge className="bg-blue-600">ERC20</Badge>;
      }
    },
  },
  {
    accessorKey: "tokenTotals",
    header: "Token",
    cell({ row }) {
      const token = row.getValue<Deposit["tokenTotals"]>("tokenTotals");

      return (
        <div className="flex flex-row gap-2 items-center">
          <p>{token.symbol}</p>
          <TokenLogo tokenAddress={token.tokenAddress} name={token.name} />
        </div>
      );
    },
  },

  {
    accessorKey: "amount",
    header: "Amount",
    cell({ row }) {
      const decimals = row.getValue<Deposit["tokenTotals"]>("tokenTotals")
        ?.decimals as number;
      return <>{formatAmount(formatUnits(row.getValue("amount"), decimals))}</>;
    },
  },
  {
    accessorKey: "claimed",
    header: "Claimed",
  },
  {
    accessorKey: "timestamp",
    header: "Time",
    cell: ({ row }) => {
      const timestamp = row.getValue("timestamp") as string | undefined;
      if (!timestamp) return null;
      return <>{dayjs(parseInt(timestamp) * 1000).fromNow()}</>;
    },
  },
];

const DepositTable = () => {
  const [searchString, setSearchString] = useState<string | null>(null);

  const { data } = useQuery({
    queryKey: ["depositTable", searchString],
    queryFn: async () => {
      return new PeanutAPI().getDeposits({
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
        orderBy: Deposit_OrderBy.Timestamp,
        orderDirection: OrderDirection.Desc,
        subgraphError: _SubgraphErrorPolicy_.Allow,
      });
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <SearchBar
        onChange={(string) => {
          console.log({ string });
          setSearchString(string);
        }}
      />
      <DataTable<TableDeposit, keyof TableDeposit>
        columns={columns}
        data={data?.deposits || []}
      />
    </div>
  );
};

export default DepositTable;
