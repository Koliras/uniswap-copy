import { useQuery } from "@tanstack/react-query"
import { useWeb3React } from "@web3-react/core"
import Abi from '../erc20Abi.json'
import { ethers } from "ethers"
import { CHAIN_INFO, ChainId, Token } from "../constants"

export function useTokenBalance(token: Token | null) {

	const { account, provider, chainId } = useWeb3React()

	const { data, isLoading } = useQuery({
		queryKey: [token?.address], queryFn: async () => {
			if (token?.symbol === CHAIN_INFO[chainId as ChainId].nativeCurrency.symbol) {
				console.log(token.symbol)
				return provider?.getBalance(account || '')
			} else {
				const contract = new ethers.Contract(
					token?.address.toLowerCase() || '',
					Abi,
					provider
				)

				return contract.balanceOf(account)
			}
		}
	})
	return { data, isLoading }
}
