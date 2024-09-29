"use client";

import TokenSelect from "../TokenSelect";
import { useState } from "react";
import TokenInput from "../TokenInput";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@peanut/ui/components/ui/card";
import { Button } from "@peanut/ui/components/ui/button";
import { useTokenBalance } from "~/src/hooks/useTokenBalance";
import { Alert } from "@peanut/ui/components/ui/alert";
import {
  _getSupportedChain,
  _getSupportedChainIds,
  formatAmount,
} from "~/src/helpers";
import SupportedChainsSelect from "../SupportedChainSelect";
import { SupportedChainsIds, Token } from "@peanut/common";
import CopiableInput from "../CopiableInput";
import LinkButton from "../LinkButtons";
import useCreateLink from "~/src/hooks/useCreateLink";
import { useAccountEffect, useChainId } from "wagmi";
import { tokens } from "~/src/services/tokens";

const CreateLink = () => {
  const wagmiChainId = useChainId();
  /**
   * Form specific chain id handling
   */
  const [chainId, setChainId] = useState<SupportedChainsIds>(
    _getSupportedChain(wagmiChainId),
  );
  const [token, setToken] = useState<Token>(tokens[chainId].tokens[0]);
  const [amount, setAmount] = useState<string>("");

  /**
   * Optimistically update chainId
   */
  useAccountEffect({
    onConnect: (data) => {
      const c = data.chainId as SupportedChainsIds;
      if (_getSupportedChainIds().includes(c)) {
        setChainId(c);
        setToken(tokens[c].tokens[0]);
      }
    },
  });

  /**
   * Handling link creation
   */
  const [link, setLink] = useState<string | null>(null);
  const { createLink, loading } = useCreateLink({ chainId, token });
  const { formatedBalance, symbol } = useTokenBalance(token);

  const create = async () => {
    const link = await createLink({ amount, token });
    if (link) setLink(link);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Send</CardTitle>
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
            defaultToken={token}
            tokens={tokens[chainId].tokens ?? []}
            onChange={(token) => {
              setToken(token);
            }}
          />
          <SupportedChainsSelect
            value={chainId}
            onChange={(c) => {
              setChainId(c);
              setToken(tokens[c].tokens[0]);
            }}
          />
          <TokenInput
            placeholder="0"
            disabled={loading}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
          <Button onClick={create} loading={loading}>
            Confirm
          </Button>
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
  );
};

export default CreateLink;
