import { base } from "viem/chains";
import { Constants } from "./types";

export type AppChainId = (typeof base)["id"];

export const constants: Constants = {
  chain: base,
  subgraphURL:
    "https://api.studio.thegraph.com/query/958/peanut-base/version/latest",
};
