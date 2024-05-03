import { useQuery } from '@tanstack/react-query'
import { useWeb3React } from '@web3-react/core'
import Abi from '../erc20Abi.json'
import { ethers } from 'ethers'
import { Token } from '../constants'

export function useTokenAllowance(token: Token | null) {
    const { account, provider } = useWeb3React()

    const { data, isLoading } = useQuery({
        queryKey: [token?.address],
        queryFn: async () => {
            if (!token) {
                throw new Error("No token provided in useTokenBalance")
            }

            const contract = new ethers.Contract(
                token.address.toLowerCase(),
                Abi,
                provider
            )

            return contract.allowance(account)
        },
        enabled: !!token && !!provider && !!account,
        gcTime: 1000 * 60 * 5,
        staleTime: 1000 * 60 * 5,
    })
    return { data, isLoading }
}
