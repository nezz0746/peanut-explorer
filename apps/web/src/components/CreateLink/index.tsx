import TokenSelect, { Token } from "../TokenSelect";
import { useState } from "react";
import TokenInput from "../TokenInput";
import peanut from "@squirrel-labs/peanut-sdk";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@peanut/ui/components/ui/card";
import { Button } from "@peanut/ui/components/ui/button";
import { sepoliaTokenList } from "~/src/constants";
import { useEthersSigner } from "~/src/wagmi";
import { useTokenBalance } from "~/src/hooks/useTokenBalance";
import { toast } from "@peanut/ui/components/ui/use-toast";
import { Alert } from "@peanut/ui/components/ui/alert";
import { formatAmount } from "~/src/helpers";
import SupportedChainsSelect from "../SupportedChainSelect";
import { constants, SupportedChainsIds } from "@peanut/common";
import { useAccount, useSwitchChain } from "wagmi";
import CopiableInput from "../CopiableInput";
import { LocalLinkStorage } from "~/src/services/local-links";
import LinkButton from "../LinkButtons";

const CreateLink = () => {
  const { switchChainAsync } = useSwitchChain();
  const { chain } = useAccount();
  const [chainId, setChainId] = useState<SupportedChainsIds>(
    constants.supportedChains[0]?.chain.id as SupportedChainsIds,
  );
  const signer = useEthersSigner({ chainId });
  const [token, setToken] = useState<Token>(sepoliaTokenList[0]);
  const [amount, setAmount] = useState<string>("");
  const { formatedBalance, symbol } = useTokenBalance(token);
  const [link, setLink] = useState<string | null>(null);

  const createLink = async () => {
    if (chainId !== chain?.id) {
      await switchChainAsync({
        chainId,
      });
    }
    if (!signer) {
      return alert("Please connect your wallet");
    }

    const linkDetails = {
      chainId: chainId.toString(),
      tokenAmount: amount,
      tokenType: 0,
      tokenDecimals: token.decimals,
    };

    try {
      const { link, txHash } = await peanut.createLink({
        structSigner: {
          signer: signer,
        },
        linkDetails,
      });

      setLink(link);
      new LocalLinkStorage().add({
        sender: signer._address,
        link,
        txHash,
        linkDetails: linkDetails,
      });
    } catch (error) {
      toast({
        title: "An error occurred",
      });
    }
  };

  return (
    <div className="flex flex-col gap-2 max-w-[50%]">
      <Card>
        <CardHeader>
          <CardTitle>Send Tokens</CardTitle>
          <CardDescription>
            Send tokens to a recipient by creating a claimable link.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-between items-end">
              <p className="tracking-tight text-gray-600">Balance</p>
              <div className="flex flex-row gap-2 text-lg">
                {formatAmount(formatedBalance, { decimalsUnderOne: 5 })}{" "}
                <span className="font-bold">{symbol}</span>
              </div>
            </div>
            <TokenSelect
              defaultToken={sepoliaTokenList[0]}
              tokens={sepoliaTokenList}
              onChange={(token) => {
                setToken(token);
              }}
            />
            <SupportedChainsSelect value={chainId} onChange={setChainId} />
            <TokenInput
              placeholder="0"
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
            <Button onClick={createLink}>Confirm</Button>
          </div>
        </CardContent>
        {link && (
          <CardFooter>
            <Alert
              className="bg-gray-100 flex flex-col gap-2 border"
              variant="default"
            >
              <h2 className="font-peanut text-2xl">Congratulations !</h2>
              <CopiableInput text={link} />
              <div className="flex flex-row items-center gap-2">
                Share:
                <LinkButton link={link} type="telegram" />
                <LinkButton link={link} type="whatsapp" />
                <LinkButton link={link} type="message" />
              </div>
            </Alert>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default CreateLink;
