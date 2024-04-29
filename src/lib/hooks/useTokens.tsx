import { useQuery } from '@tanstack/react-query';
import { ChainId } from '../constants'
type TokensMap = Record<ChainId, Token[]>;
type Token = {
	"address": string,
	"name": string,
	"symbol": string,
	"decimals": number,
	"logoURI": string,
}
export function useTokens() {
	const tokensFromApi = useQuery({
		queryKey: ["tokens"], queryFn: async () => {
			const data = await fetch("https://ipfs.io/ipns/tokens.uniswap.org").then(res => res.json())
			const tokens: TokensMap = {
				[ChainId.mainnet]: [],
				[ChainId.polygon]: [],
				[ChainId.optimism]: [],
			}
			for (const token of data.tokens) {
				switch (token.chainId) {
					case ChainId.mainnet: {
						tokens[ChainId.mainnet].push(token)
						break
					}
					case ChainId.optimism: {
						tokens[ChainId.optimism].push(token)
						break
					}
					case ChainId.polygon: {
						tokens[ChainId.polygon].push(token)
						break
					}
				}
			}
			return tokens
		}
	})


	return tokensFromApi
}
