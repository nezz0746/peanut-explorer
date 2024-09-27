import { interfaces } from "@squirrel-labs/peanut-sdk";

export type LocalLink = {
  sender: string;
  linkDetails: interfaces.IPeanutLinkDetails;
  txHash: string;
  link: string;
};
