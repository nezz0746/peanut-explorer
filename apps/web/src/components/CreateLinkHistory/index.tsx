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
import { useLocalLinkStorage } from "~/src/hooks/useLocalLinkStorage";
import { _getLocalLink } from "~/src/helpers";

const CreateLinkHistory = () => {
  const [links] = useLocalLinkStorage();
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
        .sort((a, b) => b.timestamp - a.timestamp)
        .map((item) => {
          const localLink = links.find((link) => {
            try {
              const url = new URL(link.link);
              const linkId = url.searchParams.get("i");
              return linkId === item.id;
            } catch (error) {
              console.error("Invalid URL:", link.link);
              return false;
            }
          });

          if (localLink) {
            localLink.link = _getLocalLink(localLink?.link);
          }

          return {
            ...item,
            localLink,
          };
        });

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
