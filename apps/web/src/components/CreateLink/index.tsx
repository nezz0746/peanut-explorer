import TokenSelect, { Token } from "../TokenSelect";
import { useState } from "react";
import TokenInput from "../TokenInput";
import peanut from "@squirrel-labs/peanut-sdk";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@peanut/ui/components/ui/card";
import { Button } from "@peanut/ui/components/ui/button";
import { sepoliaTokenList } from "~/src/constants";
import { useEthersSigner } from "~/src/wagmi";
import { useExplorerChain } from "~/src/context/ChainContext";
import { useTokenBalance } from "~/src/hooks/useTokenBalance";

const CreateLink = () => {
  const { chainId } = useExplorerChain();
  const signer = useEthersSigner({ chainId });
  const [token, setToken] = useState<Token>(sepoliaTokenList[0]);
  const [amount, setAmount] = useState<string>("");
  const { formatedBalance } = useTokenBalance(token);

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

    const { link, txHash } = await peanut.createLink({
      structSigner: {
        signer: signer,
      },
      linkDetails,
    });
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
            {formatedBalance}{" "}
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
      </Card>
    </div>
  );
};

export default CreateLink;
