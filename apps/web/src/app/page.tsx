"use client";

import { usePrivy } from "@privy-io/react-auth";
import { Button } from "@repo/ui/components/ui/button";
import { useAccount } from "wagmi";

export default function Home() {
  const { login, user, logout, ready, authenticated } = usePrivy();
  const { address, isConnected } = useAccount();

  const onClick = async () => {
    if (!ready) return;

    if (!authenticated) {
      login();
    } else {
      logout();
    }
  };

  const buttonText = authenticated ? "Logout" : "Login";
  const buttonDisabled = !ready;

  return (
    <div className="flex flex-col w-full justify-center p-4">
      <Button disabled={buttonDisabled} onClick={onClick}>
        {buttonText}
      </Button>
      <p>Connected Address (wagmi): {address}</p>
      <p>Connected: {isConnected ? "true" : "false"}</p>
    </div>
  );
}
