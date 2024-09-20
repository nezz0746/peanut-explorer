import { ColumnDef } from "@tanstack/react-table";
import SenderCell from "../SenderCell";
import { Deposit, DepositsQuery } from "@peanut/webkit";
import { Badge } from "@peanut/ui/components/ui/badge";
import { formatAmount, getChainImageURL } from "~/src/helpers";
import { formatUnits } from "viem";
import Image from "next/image";
import { CheckIcon, LoaderIcon } from "lucide-react";
import dayjs from "dayjs";

export type TableDeposit = DepositsQuery["deposits"][0];

export const columns: ColumnDef<TableDeposit, keyof TableDeposit>[] = [
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
    accessorKey: "chainId",
    header: "Network",
    cell({ row }) {
      const chainId = row.getValue<Deposit["chainId"]>("chainId");
      return (
        <Image
          src={getChainImageURL(chainId.toString())}
          height={100}
          width={100}
          className="w-6 h-6"
          alt=""
        />
      );
    },
  },
  {
    accessorKey: "contractType",
    header: "Type",
    cell({ row }) {
      const type = row.getValue<Deposit["contractType"]>("contractType");
      if (type === 0) {
        return <Badge className="bg-purple-600">NATIVE</Badge>;
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
    cell({ row }) {
      const claimed = row.getValue<Deposit["claimed"]>("claimed");
      return (
        <>
          {claimed ? (
            <CheckIcon className="stroke-green-500" />
          ) : (
            <LoaderIcon />
          )}
        </>
      );
    },
  },

  {
    accessorKey: "claimedAt",
    header: "Claimed At",
    cell: ({ row }) => {
      const claimedAt = row.getValue("claimedAt") as string | undefined;
      if (!claimedAt) return "-";
      return <>{dayjs(parseInt(claimedAt) * 1000).fromNow()}</>;
    },
  },
  {
    accessorKey: "timestamp",
    header: "Created At",
    cell: ({ row }) => {
      const timestamp = row.getValue("timestamp") as string | undefined;
      if (!timestamp) return null;
      return <>{dayjs(parseInt(timestamp) * 1000).fromNow()}</>;
    },
  },
];
