"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { _SubgraphErrorPolicy_ } from "@peanut/webkit";
import { DataTable } from "../DataTable";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";
import SearchBar from "../SearchBar";
import { useExplorerChain } from "../../context/ChainContext";
import { columns, TableDeposit } from "./columns";
import { getDepositsQueryOptions } from "~/src/query";
dayjs.extend(relativeTime);

const DepositTable = () => {
  const [searchString, setSearchString] = useState<string | null>(null);
  const { chainId } = useExplorerChain();

  const { data } = useSuspenseQuery(
    getDepositsQueryOptions({ chainId, searchString }),
  );

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
