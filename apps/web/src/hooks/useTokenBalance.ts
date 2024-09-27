import { useAccount, useBalance, useReadContract } from "wagmi";
import { Token } from "../components/TokenSelect";
import { erc20Abi, formatEther, formatUnits } from "viem";

export const useTokenBalance = ({ chainId, isNative, decimals }: Token) => {
  const { address } = useAccount();
  const { data: nativeBalanceData } = useBalance({
    address,
    chainId: parseInt(chainId),
  });
  const { data: tokenBalanceData } = useReadContract({
    address: address,
    chainId: parseInt(chainId),
    args: address && [address],
    abi: erc20Abi,
    functionName: "balanceOf",
  });

  return {
    formatedBalance: isNative
      ? formatEther(nativeBalanceData?.value ?? BigInt(0))
      : formatUnits(tokenBalanceData ?? BigInt(0), decimals),
  };
};
