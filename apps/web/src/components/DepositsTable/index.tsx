"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "../DataTable";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import SearchBar from "../SearchBar";
import { useExplorerChain } from "../../context/ChainContext";
import { columns, TableDeposit } from "./columns";
import { getDepositsQueryOptions } from "~/src/query";
import { useDepositsTableFilters } from "~/src/context/TableFiltersContext";
import { MultiSelect, MultiSelectRef } from "@peanut/ui/components/ui/multi-select";
import { useEffect, useRef } from "react";
dayjs.extend(relativeTime);

const DepositTable = () => {
  const { search, filters, tokenOptions, selectedTokens, setSelectedTokens } =
    useDepositsTableFilters();
  const { chainId } = useExplorerChain();

  const { data } = useSuspenseQuery(
    getDepositsQueryOptions({
      chainId,
      filters,
    }),
  );
  const ref = useRef<MultiSelectRef>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.clear();
    }
  }, [chainId]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-2">
        <SearchBar
          onChange={(searchString) => {
            search(searchString);
          }}
        />
        <MultiSelect
          ref={ref}
          className="flex"
          options={tokenOptions}
          onValueChange={(value) => {
            setSelectedTokens(value);
          }}
          placeholder="Select Tokens"
          value={selectedTokens}
          variant="secondary"
          animation={2}
          maxCount={3}
        />
      </div>
      <DataTable<TableDeposit, keyof TableDeposit>
        columns={columns}
        data={data?.deposits || []}
      />
    </div>
  );
};

export default DepositTable;
