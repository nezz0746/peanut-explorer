import {
  DepositTotals_CollectionQueryVariables,
  DepositsQueryVariables,
  Sdk,
  _SubgraphErrorPolicy_,
  getSdk as getAPI,
} from "@peanut/webkit";
import {
  constants,
  SupportedChainsIds,
} from "../../../../packages/peanute-common/dist";
import { GraphQLClient } from "graphql-request";
import { MultiSelectProps } from "@peanut/ui/components/ui/multi-select";

export class PeanutAPI {
  sdk: Sdk;

  constructor(chainId: SupportedChainsIds) {
    this.sdk = getAPI(new GraphQLClient(constants.subgraphURLs[chainId]));
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
        first: 20,
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
