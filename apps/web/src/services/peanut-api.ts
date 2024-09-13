import {
  DepositTotals_CollectionQueryVariables,
  DepositsQueryVariables,
  Sdk,
  getSdk as getAPI,
} from "@peanut/webkit";
import {
  constants,
  SupportedChainsIds,
} from "../../../../packages/peanute-common/dist";
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
