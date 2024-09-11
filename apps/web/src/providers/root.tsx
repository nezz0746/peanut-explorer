"use client";

import { privyAppId } from "../env";
//
import { PrivyProvider } from "@privy-io/react-auth";
import { WagmiProvider } from "@privy-io/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { wagmiConfig } from "../wagmi";
import { privyConfig } from "../privy";

const queryClient = new QueryClient();

const RootProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <PrivyProvider appId={privyAppId} config={privyConfig}>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
};

export default RootProvider;
