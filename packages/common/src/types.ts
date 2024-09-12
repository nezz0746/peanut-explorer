import { Chain } from "viem";

export type Constants<SupportedChainsIds extends number> = {
  chain: Chain;
  subgraphURLs: Record<SupportedChainsIds, string>;
};
