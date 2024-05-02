import { useWeb3React } from "@web3-react/core";
import { useTokens } from "../hooks/useTokens";
import { ChainId, Token } from "../constants";

type Props = {
  queryFilter: string;
  onTokenSelect: (t: Token | null) => void;
};

export const Tokens = ({ queryFilter, onTokenSelect }: Props) => {
  const { chainId } = useWeb3React();
  const { data, isLoading } = useTokens();

  if (isLoading || !data) return <div>Loading...</div>;

  return (
    <div>
      {chainId &&
        data[chainId as ChainId]
          ?.filter((token) =>
            token.name.toLowerCase().includes(queryFilter.toLowerCase()),
          )
          .map((token) => (
            <button key={token.address} onClick={() => onTokenSelect(token)}>
              <h2>
                <img src={token.logoURI} />
                {token.name}
              </h2>
            </button>
          ))}
    </div>
  );
};
