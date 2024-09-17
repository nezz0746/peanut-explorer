import { SupportedChainsIds } from "../../../../packages/peanute-common/dist";
import { createContext, useContext, useState } from "react";
import { defaultChain } from "../env";

const ChainContext = createContext<{
  chainId: SupportedChainsIds;
  setChainId: (chain: SupportedChainsIds) => void;
}>({
  chainId: defaultChain.id,
  setChainId: () => {},
});

export const ChainProvider = ({ children }: { children: React.ReactNode }) => {
  const [chainId, setChainId] = useState<SupportedChainsIds>(defaultChain.id);

  return (
    <ChainContext.Provider value={{ chainId, setChainId }}>
      {children}
    </ChainContext.Provider>
  );
};

export const useExplorerChain = () => {
  const { chainId, setChainId } = useContext(ChainContext);

  return { chainId, setChainId };
};
