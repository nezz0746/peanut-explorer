import { PrivyClientConfig } from "@privy-io/react-auth";

export const privyConfig: PrivyClientConfig = {
  appearance: {
    theme: "light",
    accentColor: "#676FFF",
  },
  loginMethods: ["wallet"],
  embeddedWallets: {
    createOnLogin: "users-without-wallets",
  },
};
