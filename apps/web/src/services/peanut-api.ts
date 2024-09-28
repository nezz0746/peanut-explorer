import {
  DepositTotals_CollectionQueryVariables,
  DepositsQueryVariables,
  Sdk,
  _SubgraphErrorPolicy_,
  getSdk as getAPI,
} from "@peanut/webkit";
import { GraphQLClient } from "graphql-request";
import { MultiSelectProps } from "@peanut/ui/components/ui/multi-select";
import { constants, SupportedChainsIds } from "@peanut/common";

export class PeanutAPI {
  sdk: Sdk;

  constructor(chainId: SupportedChainsIds) {
    const url = constants.subgraphURLs[chainId];

    if (!url) {
      console.error(`Chain ${chainId} is not supported`);
      throw new Error(`Chain ${chainId} is not supported`);
    }
    this.sdk = getAPI(new GraphQLClient(url));
  }

  async getTotals(props: DepositTotals_CollectionQueryVariables) {
    return this.sdk.depositTotals_collection(props);
  }

  async getDeposits(props: DepositsQueryVariables) {
    return this.sdk.deposits(props);
  }

  async getTokenOptions(): Promise<MultiSelectProps["options"]> {
    return this.sdk
      .depositTotals_collection({
        first: 50,
        subgraphError: _SubgraphErrorPolicy_.Allow,
      })
      .then((res) => {
        return res.depositTotals_collection.map(({ tokenAddress, symbol }) => ({
          value: tokenAddress,
          label: symbol ?? "Unknown",
        }));
      });
  }
}
