"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  _SubgraphErrorPolicy_,
  Deposit_OrderBy,
  DepositsQueryVariables,
  OrderDirection,
} from "@peanut/webkit";
import { useQuery } from "@tanstack/react-query";
import { useExplorerChain } from "./ChainContext";
import { PeanutAPI } from "../services/peanut-api";
import { MultiSelectProps } from "@peanut/ui/components/ui/multi-select";

export const defaultDepositsTableFilters: DepositsQueryVariables = {
  where: {},
  orderBy: Deposit_OrderBy.Timestamp,
  orderDirection: OrderDirection.Desc,
  subgraphError: _SubgraphErrorPolicy_.Allow,
};

const DepositsTableFilterContext = createContext<{
  filters: DepositsQueryVariables;
  search: (searchString: string) => void;
  tokenOptions: MultiSelectProps["options"];
  setTokens: (tokens: string[]) => void;
}>({
  filters: defaultDepositsTableFilters,
  search: () => {},
  tokenOptions: [],
  setTokens: () => {},
});

export const DepositsTableFiltersProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { chainId } = useExplorerChain();
  const [filters, setFilters] = useState<DepositsQueryVariables>(
    defaultDepositsTableFilters,
  );

  const { data: tokens } = useQuery({
    queryKey: ["tokens", chainId],
    queryFn: async () => {
      return new PeanutAPI(chainId).getTokenOptions();
    },
  });

  /**
   * NOTE: Unoptimal, improve by debouncing & immer or similar
   * @param searchString
   */
  const search = (searchString: string) => {
    setFilters({
      ...filters,
      where: {
        ...filters.where,
        senderAddress: searchString === "" ? undefined : searchString,
      },
    });
  };

  const setTokens = (tokens: string[]) => {
    console.log(tokens);
    setFilters({
      ...filters,
      where: {
        ...filters.where,
        or: tokens.length
          ? tokens?.map((tokenAddress) => ({
              tokenAddress,
            }))
          : undefined,
      },
    });
  };

  return (
    <DepositsTableFilterContext.Provider
      value={{
        filters,
        search,
        tokenOptions: tokens ?? [],
        setTokens,
      }}
    >
      {children}
    </DepositsTableFilterContext.Provider>
  );
};

export const useDepositsTableFilters = () => {
  const { filters, ...rest } = useContext(DepositsTableFilterContext);

  if (typeof filters === "undefined") {
    throw new Error(
      "useDepositsTableFilters must be used within a DepositsTableFiltersProvider",
    );
  }

  return { filters, ...rest };
};
