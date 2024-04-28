import { useQuery } from '@tanstack/react-query';
import { CHAIN_IDS } from '../constants'
type TokensMap = Record<CHAIN_IDS, Token[]>;
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
				[CHAIN_IDS.mainnet]: [],
				[CHAIN_IDS.polygon]: [],
				[CHAIN_IDS.optimism]: [],
			}
			for (const token of data.tokens) {
				switch (token.chainId) {
					case CHAIN_IDS.mainnet: {
						tokens[CHAIN_IDS.mainnet].push(token)
						break
					}
					case CHAIN_IDS.optimism: {
						tokens[CHAIN_IDS.optimism].push(token)
						break
					}
					case CHAIN_IDS.polygon: {
						tokens[CHAIN_IDS.polygon].push(token)
						break
					}
				}
			}
			return tokens
		}
	})


	return tokensFromApi
}
