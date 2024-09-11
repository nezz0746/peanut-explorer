import {
  DepositTotals_CollectionQueryVariables,
  Sdk,
  getSdk as getAPI,
} from "@repo/webkit";
import { constants } from "@repo/common";
import { GraphQLClient } from "graphql-request";

export class PeanutAPI {
  sdk: Sdk;

  constructor() {
    this.sdk = getAPI(new GraphQLClient(constants.subgraphURL));
  }

  async getTotals(props: DepositTotals_CollectionQueryVariables) {
    return this.sdk.depositTotals_collection(props);
  }
}
