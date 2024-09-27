export type SupportedChainConfig<T> = {
  chain: T;
  sugraphURL: string;
};

export type Constants<
  SupportedChains extends { id: string | number | symbol },
> = {
  supportedChains: SupportedChainConfig<SupportedChains>[];
  subgraphURLs: Record<SupportedChains["id"], string>;
};
