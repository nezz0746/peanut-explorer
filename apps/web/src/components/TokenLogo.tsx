import { useState } from "react";
import { getTokenImageURL } from "../helpers";
import Image from "next/image";
import { useExplorerChain } from "../context/ChainContext";

type TokenLogoProps = {
  tokenAddress: string;
  name: string | null | undefined;
};

const TokenLogo = ({ tokenAddress, name }: TokenLogoProps) => {
  const [error, setError] = useState<string | null>(null);
  const { chainId } = useExplorerChain();

  return (
    <div className="h-6 w-6">
      {error ? (
        <div className="bg-gray-500 rounded-full w-full h-full flex flex-row justify-center items-center text-white">
          <p className="text-base">{name?.[0]}</p>
        </div>
      ) : (
        <Image
          src={getTokenImageURL(tokenAddress, chainId.toString())}
          height={100}
          width={100}
          onError={() => setError("Failed to load image")}
          alt=""
        />
      )}
    </div>
  );
};

export default TokenLogo;
