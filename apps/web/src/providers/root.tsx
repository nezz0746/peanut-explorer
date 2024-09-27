"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "../wagmi";
import { ChainProvider } from "../context/ChainContext";
import { getQueryClient } from "../query";
import { PrivyProvider } from "@privy-io/react-auth";
import { privyConfig } from "../privy";

const RootProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient();

  return (
    <PrivyProvider {...privyConfig}>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          <ChainProvider>{children}</ChainProvider>
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
};

export default RootProvider;
