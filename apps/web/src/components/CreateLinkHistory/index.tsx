"use client";

import { constants } from "@peanut/common";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@peanut/ui/components/ui/card";
import { _SubgraphErrorPolicy_, Deposit } from "@peanut/webkit";
import { useQueries } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { getDepositsQueryOptions } from "~/src/query";
import LinksTable from "../LinksTable";

const CreateLinkHistory = () => {
  /**
   * TODO:
   * - Include locally stored links
   */
  const { address } = useAccount();
  const { data, loading } = useQueries({
    queries: constants.supportedChains.map(({ chain }) => {
      return getDepositsQueryOptions({
        enabled: !!address,
        chainId: chain.id,
        filters: {
          where: { senderAddress: address?.toLowerCase() },
          subgraphError: _SubgraphErrorPolicy_.Allow,
        },
      });
    }),
    combine: (results) => {
      const filteredData = results
        .flatMap((result) => result.data ?? [])
        .filter((item): item is Deposit => item !== undefined)
        .sort((a, b) => b.timestamp - a.timestamp);

      return {
        data: filteredData,
        loading: results.some((result) => result.isLoading),
      };
    },
  });

  return (
    <Card className=" flex-grow">
      <CardHeader>
        <CardTitle>Feed</CardTitle>
      </CardHeader>
      <CardContent>
        <LinksTable deposits={data} />
      </CardContent>
    </Card>
  );
};

export default CreateLinkHistory;
