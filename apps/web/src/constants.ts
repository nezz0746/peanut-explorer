import { mainnet, sepolia } from "viem/chains";
import { Token } from "./components/TokenSelect";
import { getTokenImageURL } from "./helpers";

export const sepoliaTokenList: [Token, Token] = [
  {
    name: "ETH",
    symbol: "ETH",
    address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    decimals: 18,
    chainId: sepolia.id.toString(),
    isNative: true,
    image: getTokenImageURL(
      "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      mainnet.id.toString(),
    ),
  },
  {
    name: "USDC",
    symbol: "USDC",
    address: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
    decimals: 6,
    chainId: sepolia.id.toString(),
    image: getTokenImageURL(
      "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      mainnet.id.toString(),
    ),
  },
];
