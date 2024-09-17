import { base } from "viem/chains";

export const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID as string;
export const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string;
export const defaultChain = base;
