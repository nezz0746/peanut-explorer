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
import { useExplorerChain } from "~/src/context/ChainContext";
import { useTokenBalance } from "~/src/hooks/useTokenBalance";
import { toast } from "@peanut/ui/components/ui/use-toast";
import { Alert } from "@peanut/ui/components/ui/alert";
import { formatAmount } from "~/src/helpers";

const CreateLink = () => {
  const { chainId } = useExplorerChain();
  const signer = useEthersSigner({ chainId });
  const [token, setToken] = useState<Token>(sepoliaTokenList[0]);
  const [amount, setAmount] = useState<string>("");
  const { formatedBalance, symbol } = useTokenBalance(token);
  const [link, setLink] = useState<string | null>(null);

  const createLink = async () => {
    if (!signer) {
      return alert("Please connect your wallet");
    }

    const linkDetails = {
      chainId: chainId.toString(),
      tokenAmount: amount,
      tokenType: 0,
      tokenDecimals: token.decimals,
    };

    console.log("linkDetails", linkDetails);

    try {
      const { link, txHash } = await peanut.createLink({
        structSigner: {
          signer: signer,
        },
        linkDetails,
      });

      setLink(link);
    } catch (error) {
      toast({
        title: "An error occurred",
      });
    }
  };

  return (
    <div className="flex flex-col gap-2">
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
            <Alert variant="default">
              Share this link for the recipient to claim the tokens: {link}
            </Alert>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default CreateLink;
