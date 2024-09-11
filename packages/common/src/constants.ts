import { sepolia } from "viem/chains";
import { Constants } from "./types";

export type AppChainId = (typeof sepolia)["id"];

export const constants: Constants = {
  chain: sepolia,
  subgraphURL:
    "https://api.studio.thegraph.com/query/958/starter-counter-sepolia/version/latest",
};
