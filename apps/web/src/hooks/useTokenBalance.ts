import { useAccount, useBalance, useReadContract } from "wagmi";
import { erc20Abi, formatEther, formatUnits } from "viem";
import { Token } from "@peanut/common";

export const useTokenBalance = ({
  chainId,
  isNative,
  decimals,
  symbol,
}: Token) => {
  const { address } = useAccount();
  const { data: nativeBalanceData } = useBalance({
    address,
    chainId,
  });
  const { data: tokenBalanceData } = useReadContract({
    address: address,
    chainId,
    args: address && [address],
    abi: erc20Abi,
    functionName: "balanceOf",
  });

  return {
    formatedBalance: isNative
      ? formatEther(nativeBalanceData?.value ?? BigInt(0))
      : formatUnits(tokenBalanceData ?? BigInt(0), decimals),
    symbol,
  };
};
