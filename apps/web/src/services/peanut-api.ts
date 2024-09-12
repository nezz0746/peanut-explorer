import {
  DepositTotals_CollectionQueryVariables,
  DepositsQueryVariables,
  Sdk,
  getSdk as getAPI,
} from "@repo/webkit";
import { constants, SupportedChainsIds } from "@repo/common";
import { GraphQLClient } from "graphql-request";

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
}
