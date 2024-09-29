import { ColumnDef } from "@tanstack/react-table";
import { Deposit, DepositsQuery } from "@peanut/webkit";
import { formatAmount, getChainImageURL, getChainName } from "~/src/helpers";
import { formatUnits } from "viem";
import Image from "next/image";
import { CheckIcon, LoaderIcon } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { LocalLink } from "~/src/types";
import LinkButton from "../LinkButtons";
dayjs.extend(relativeTime);

export type TableDeposit = DepositsQuery["deposits"][0] & {
  localLink: LocalLink | undefined;
};

export const columns: ColumnDef<TableDeposit, keyof TableDeposit>[] = [
  {
    accessorKey: "amount",
    header: "Sent",
    cell({ row: { original } }) {
      const { tokenTotals: token, amount } = original;

      const decimals = token.decimals;
      const chainId = token.chainId;
      const chainName = getChainName(chainId.toString());
      const formattedAmount = formatAmount(
        formatUnits(BigInt(amount), decimals ?? 18),
      );

      return (
        <div className="flex items-center gap-2">
          <span className="font-bold">
            {formattedAmount} {token.symbol}
          </span>
          <span>on</span>
          <div className="border rounded-md p-1 flex flex-row items-center gap-1">
            <Image
              src={getChainImageURL(chainId.toString())}
              height={24}
              width={24}
              className="w-4 h-4"
              alt=""
            />
            <span>{chainName}</span>
          </div>
        </div>
      );
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
    header: "Sent At",
    cell: ({ row }) => {
      const timestamp = row.getValue("timestamp") as string | undefined;
      if (!timestamp) return null;
      return <>{dayjs(parseInt(timestamp) * 1000).fromNow()}</>;
    },
  },
  {
    accessorKey: "localLink",
    header: "Share",
    cell: ({ row: { original } }) => {
      const localLink = original.localLink;
      if (!localLink) return null;
      const link = localLink.link;
      return (
        <>
          <LinkButton link={link} type="telegram" />
          <LinkButton link={link} type="whatsapp" />
          <LinkButton link={link} type="message" />
        </>
      );
    },
  },
];
