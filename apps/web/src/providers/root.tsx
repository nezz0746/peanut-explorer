"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "../wagmi";
import { ChainProvider } from "../context/ChainContext";

export const queryClient = new QueryClient();

const RootProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ChainProvider>{children}</ChainProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default RootProvider;
