import { base } from "viem/chains";
import { Constants } from "./types";

export type AppChainId = (typeof base)["id"];

export const constants: Constants = {
  chain: base,
  subgraphURL: "",
};
