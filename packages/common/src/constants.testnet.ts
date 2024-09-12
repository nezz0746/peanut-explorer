import { sepolia } from "viem/chains";
import { Constants } from "./types";

export type AppChainId = (typeof sepolia)["id"];

export type SupportedChainsIds = (typeof sepolia)["id"];

export const constants: Constants<SupportedChainsIds> = {
  chain: sepolia,
  subgraphURLs: {
    [sepolia.id]:
      "https://api.studio.thegraph.com/query/958/sepolia/version/latest",
  },
};
