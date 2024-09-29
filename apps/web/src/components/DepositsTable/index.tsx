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
import {
  MultiSelect,
  MultiSelectRef,
} from "@peanut/ui/components/ui/multi-select";
import { useEffect, useRef } from "react";
import SupportedChainsSelect from "../SupportedChainSelect";
dayjs.extend(relativeTime);

const DepositTable = () => {
  const { search, filters, tokenOptions, setTokens } =
    useDepositsTableFilters();
  const { chainId, setChainId } = useExplorerChain();

  const { data: deposits } = useSuspenseQuery(
    getDepositsQueryOptions({
      chainId,
      filters,
    }),
  );
  const ref = useRef<MultiSelectRef>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.clear(() => {
        setTokens([]);
      });
    }
  }, [chainId]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-2">
        <SearchBar
          onChange={(searchString) => {
            search(searchString);
          }}
        />
        <MultiSelect
          ref={ref}
          className="flex bg-white bg-opacity-85 hover:bg-white"
          options={tokenOptions}
          onValueChange={(value) => {
            setTokens(value);
          }}
          placeholder="Select Tokens"
          variant="peanut"
          animation={2}
          maxCount={3}
        />
        <div className="flex flex-row items-center gap-2">
          <SupportedChainsSelect
            buttonProps={{
              className: "w-full md:w-[210px]",
            }}
            value={chainId}
            onChange={setChainId}
          />
        </div>
      </div>
      <DataTable<TableDeposit, keyof TableDeposit>
        columns={columns}
        data={deposits || []}
      />
    </div>
  );
};

export default DepositTable;
