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
  selectedTokens: MultiSelectProps["value"];
  setSelectedTokens: (tokens: MultiSelectProps["value"]) => void;
}>({
  filters: defaultDepositsTableFilters,
  search: () => {},
  tokenOptions: [],
  selectedTokens: [],
  setSelectedTokens: () => {},
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
  const [selectedTokens, setSelectedTokens] = useState<
    MultiSelectProps["value"]
  >([]);

  const { data: tokens } = useQuery({
    queryKey: ["tokens", chainId],
    queryFn: async () => {
      return new PeanutAPI(chainId).getTokenOptions();
    },
  });

  useEffect(() => {
    console.log("Chain changed");
    // Clear selected tokens when chain changes
    setSelectedTokens([]);
  }, [chainId]);

  /**
   * NOTE: Unoptimal, improve by debouncing & immer or similar
   * @param searchString
   */
  const search = (searchString: string) => {
    if (searchString === "") {
      setFilters({
        ...filters,
        where: {
          ...filters.where,
          or: undefined,
        },
      });
    } else {
      setFilters({
        ...filters,
        where: {
          ...filters.where,
          or: [
            {
              senderAddress: searchString,
            },
            {
              tokenAddress: searchString,
            },
          ],
        },
      });
    }
  };

  return (
    <DepositsTableFilterContext.Provider
      value={{
        filters,
        search,
        tokenOptions: tokens ?? [],
        selectedTokens,
        setSelectedTokens,
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
