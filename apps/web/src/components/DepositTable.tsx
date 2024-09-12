"use client";

import { useQuery } from "@tanstack/react-query";
import { PeanutAPI } from "../services/peanut-api";
import {
  _SubgraphErrorPolicy_,
  Deposit,
  Deposit_OrderBy,
  DepositsQuery,
  DepositTotals,
  OrderDirection,
} from "@repo/webkit";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./DataTable";
import { getExplorerLink, truncateAddress } from "../helpers";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { formatUnits } from "viem";
import { Badge } from "@repo/ui/components/ui/badge";
dayjs.extend(relativeTime);

type TableDeposit = DepositsQuery["deposits"][0];

const columns: ColumnDef<TableDeposit>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "senderAddress",
    header: "Sender",
    cell({ row }) {
      const sender = row.getValue<Deposit["senderAddress"]>("senderAddress");
      return (
        <Link
          href={getExplorerLink(sender, "address")}
          className="underline hover:text-blue-400"
        >
          {truncateAddress(sender)}
        </Link>
      );
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

      return <p>{token.name}</p>;
    },
  },

  {
    accessorKey: "amount",
    header: "Amount",
    cell({ row }) {
      const decimals = row.getValue<Deposit["tokenTotals"]>("tokenTotals")
        ?.decimals as number;
      return <>{formatUnits(row.getValue("amount"), decimals)}</>;
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
  const { data, isLoading, error } = useQuery({
    queryKey: ["depositTable"],
    queryFn: async () => {
      return new PeanutAPI().getDeposits({
        where: {},
        orderBy: Deposit_OrderBy.Timestamp,
        orderDirection: OrderDirection.Desc,
        subgraphError: _SubgraphErrorPolicy_.Allow,
      });
    },
  });

  console.log(data);
  return <DataTable columns={columns} data={data?.deposits || []} />;
};

export default DepositTable;
