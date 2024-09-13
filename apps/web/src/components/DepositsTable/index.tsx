"use client";

import { useQuery } from "@tanstack/react-query";
import { PeanutAPI } from "../../services/peanut-api";
import {
  _SubgraphErrorPolicy_,
  Deposit_OrderBy,
  OrderDirection,
} from "@peanut/webkit";
import { DataTable } from "../DataTable";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";
import SearchBar from "../SearchBar";
import { useExplorerChain } from "../../context/ChainContext";
import { columns, TableDeposit } from "./columns";
dayjs.extend(relativeTime);

const DepositTable = () => {
  const [searchString, setSearchString] = useState<string | null>(null);
  const { chainId } = useExplorerChain();

  const { data } = useQuery({
    queryKey: ["depositTable", searchString, chainId],
    queryFn: async () => {
      return new PeanutAPI(chainId).getDeposits({
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
