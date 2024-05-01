import { useQuery } from "@tanstack/react-query"
import { useWeb3React } from "@web3-react/core"
import Abi from '../erc20Abi.json'
import { ethers } from "ethers"
import { Token } from "../constants"

export function useTokenAllowance(token: Token | null) {

	const { account, provider } = useWeb3React()

	const { data, isLoading } = useQuery({
		queryKey: [token?.address], queryFn: async () => {
			const contract = new ethers.Contract(
				token?.address.toLowerCase() || '',
				Abi,
				provider
			)

			return contract.allowance(account)
		}
	})
	return { data, isLoading }
}
