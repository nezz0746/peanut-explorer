import { createConfig } from "@privy-io/wagmi";
import { base, mainnet } from "viem/chains";
import { http } from "wagmi";
import { alchemyKey } from "./env";

export const wagmiConfig = createConfig({
  chains: [mainnet, base],
  transports: {
    [mainnet.id]: http(`https://eth-mainnet.g.alchemy.com/v2/${alchemyKey}`),
    [base.id]: http(`https://base-mainnet.g.alchemy.com/v2/${alchemyKey}`),
  },
});
