import { constants } from "@peanut/common";
import { Address, Chain } from "viem";

export const formatAmount = (
  amount: string,
  options: {
    decimalsUnderOne?: number;
  } = {
    decimalsUnderOne: 8,
  },
) => {
  const num = parseFloat(amount);
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2).replace(/\.00$/, "") + "m";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(2).replace(/\.00$/, "") + "k";
  }
  if (num < 1) {
    return num.toFixed(options.decimalsUnderOne).replace(/0+$/, "");
  }
  return num.toFixed(2).replace(/\.00$/, "");
};

export const truncateAddress = (address?: string | null, length?: number) => {
  if (!address) return "";
  return `${address.slice(0, length || 6)}...${address.slice(-4)}`;
};

export const getExplorerLink = (
  data: Address | string | undefined | null,
  path: "tx" | "address",
  chain?: Chain,
) => {
  if (!data) return "";
  return `${chain?.blockExplorers?.default?.url}/${path}/${data}`;
};

export const getTokenImageURL = (tokenAddress: string, chainId: string) => {
  return `https://assets.smold.app/api/tokens/${chainId}/${tokenAddress}/logo.svg`;
};
export const getChainImageURL = (chainId: string) => {
  return `https://assets.smold.app/api/chain/${chainId}/logo-128.png`;
};

export const getChainName = (chainId: string) => {
  return constants.supportedChains.find(
    (chain) => chain.chain.id.toString() === chainId,
  )?.chain.name;
};
