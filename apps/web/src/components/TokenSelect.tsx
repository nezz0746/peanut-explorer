import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@peanut/ui/components/ui/select";
import Image from "next/image";

export type Token = {
  name: string;
  symbol: string;
  address: `0x${string}`;
  chainId: string;
  decimals: number;
  isNative?: boolean;
  image: string;
};

type TokenSelectProps = {
  tokens: Token[];
  defaultToken?: Token;
  onChange: (token: Token) => void;
};

const TokenSelect = ({ tokens, onChange, defaultToken }: TokenSelectProps) => {
  return (
    <Select
      onValueChange={(address) => {
        const token = tokens.find((token) => token.address === address);

        if (token) onChange(token);
      }}
    >
      <SelectTrigger>
        <SelectValue
          defaultValue={defaultToken?.address}
          placeholder="Select a token"
        />
      </SelectTrigger>
      <SelectContent>
        {tokens.map((token) => {
          return (
            <SelectItem value={token.address} className="">
              <div className="flex flex-row items-center justify-start gap-2">
                <Image
                  src={token.image}
                  height={60}
                  width={60}
                  alt=""
                  className="w-4 h-4"
                />
                {token.name}
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default TokenSelect;
