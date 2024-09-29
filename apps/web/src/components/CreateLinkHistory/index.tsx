"use client";

import { constants } from "@peanut/common";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@peanut/ui/components/ui/card";
import {
  _SubgraphErrorPolicy_,
  Deposit_OrderBy,
  OrderDirection,
} from "@peanut/webkit";
import { useQueries } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { getDepositsQueryOptions } from "~/src/query";
import LinksTable from "../LinksTable";
import { _getLocalLink } from "~/src/helpers";
import { combine } from "./utils";

const CreateLinkHistory = () => {
  const { address } = useAccount();
  const { data } = useQueries({
    queries: constants.supportedChains.map(({ chain }) => {
      return getDepositsQueryOptions({
        enabled: !!address,
        chainId: chain.id,
        filters: {
          where: { senderAddress: address?.toLowerCase() },
          orderBy: Deposit_OrderBy.Timestamp,
          orderDirection: OrderDirection.Desc,
          subgraphError: _SubgraphErrorPolicy_.Allow,
        },
      });
    }),
    combine,
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Feed</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-scroll">
        <LinksTable deposits={data} />
      </CardContent>
    </Card>
  );
};

export default CreateLinkHistory;
