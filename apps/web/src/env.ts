import {
  _SubgraphErrorPolicy_,
  Deposit_OrderBy,
  DepositsQueryVariables,
  OrderDirection,
} from "@peanut/webkit";
import { base } from "viem/chains";

export const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID as string;
export const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string;
export const defaultChain = base;
export const defaultDepositsTableFilters: DepositsQueryVariables = {
  where: {},
  orderBy: Deposit_OrderBy.Timestamp,
  orderDirection: OrderDirection.Desc,
  subgraphError: _SubgraphErrorPolicy_.Allow,
};
