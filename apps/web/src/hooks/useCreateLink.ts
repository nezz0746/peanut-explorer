"use client";

import peanut, { interfaces } from "@squirrel-labs/peanut-sdk";
import { useMutation } from "@tanstack/react-query";
import { useEthersSigner } from "../wagmi";
import { SupportedChainsIds, Token } from "@peanut/common";
import { useAccount, useSwitchChain } from "wagmi";
import { toast } from "@peanut/ui/components/ui/use-toast";
import { useLocalLinkStorage } from "./useLocalLinkStorage";

type UseCreateLinkParams = {
  chainId?: SupportedChainsIds;
  token: Token;
};

const useCreateLink = ({ chainId, token }: UseCreateLinkParams) => {
  const signer = useEthersSigner({ chainId });
  const { chain } = useAccount();
  const { switchChainAsync } = useSwitchChain();
  const [, { add }] = useLocalLinkStorage();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async ({ amount, token }: { amount: string; token: Token }) => {
      if (!chainId) return;
      if (chainId !== chain?.id)
        await switchChainAsync({
          chainId,
        });
      if (!signer) {
        toast({ title: "Please login" });
        return;
      }
      let tokenType: interfaces.EPeanutLinkType =
        interfaces.EPeanutLinkType.erc20;

      if (token.isNative) {
        tokenType = interfaces.EPeanutLinkType.native;
      }

      let linkDetails: interfaces.IPeanutLinkDetails = {
        chainId: chainId.toString(),
        tokenAmount: amount,
        tokenType,
        tokenDecimals: token.decimals,
      };

      if (tokenType === interfaces.EPeanutLinkType.erc20) {
        linkDetails.tokenAddress = token.address;
      }

      const createParams: interfaces.ICreateLinkParams = {
        structSigner: {
          signer: signer,
        },
        linkDetails,
      };
      let link = "";
      let txHash = "";
      try {
        const res = await peanut.createLink(createParams);
        link = res.link;
        txHash = res.txHash;

        add({
          sender: signer._address,
          link,
          txHash,
          linkDetails: createParams.linkDetails,
        });

        return link;
      } catch (error) {
        console.error(error);
        toast({
          title: "An error occurred",
        });
      }
    },
  });

  return {
    createLink: mutateAsync,
    loading: isPending,
  };
};

export default useCreateLink;
