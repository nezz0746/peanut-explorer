import { arbitrum, base, optimism, polygon, zksync } from "viem/chains";
import { Constants } from "./types";

export type AppChainId = (typeof base)["id"];

export type SupportedChainsIds =
  | (typeof base)["id"]
  | (typeof polygon)["id"]
  | (typeof optimism)["id"]
  | (typeof arbitrum)["id"]
  | (typeof zksync)["id"];

export const constants: Constants<SupportedChainsIds> = {
  chain: base,
  subgraphURLs: {
    [base.id]:
      "https://api.studio.thegraph.com/query/958/peanut-base/version/latest",
    [optimism.id]:
      "https://api.studio.thegraph.com/query/958/peanut-opt/version/latest",
    [arbitrum.id]:
      "https://api.studio.thegraph.com/query/958/peanut-arb/version/latest",
    [polygon.id]:
      "https://api.studio.thegraph.com/query/958/peanut-polygon/version/latest",
    [zksync.id]:
      "https://api.studio.thegraph.com/query/958/peanut-zksync-era/version/latest",
  },
};
