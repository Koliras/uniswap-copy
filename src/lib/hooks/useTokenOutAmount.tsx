import { ethers } from 'ethers'
import { FeeAmount, computePoolAddress } from '@uniswap/v3-sdk'
import Quoter from '@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json'
import IUniswapV3PoolABI from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json'
import { fromReadableAmount, toReadableAmount } from '../conversion'
import { useWeb3React } from '@web3-react/core'
import {
    POOL_FACTORY_CONTRACT_ADDRESS,
    QUOTER_CONTRACT_ADDRESS,
    Token,
} from '../constants'
import { useTokensStore } from '../stores/tokensStore'
import { Token as UniswapToken } from '@uniswap/sdk-core'
import { useQuery } from '@tanstack/react-query'

export function useTokenOutAmount() {
    const { tokenIn, tokenOut, tokenInAmount } = useTokensStore(
        (state) => state
    )
    const { provider } = useWeb3React()

    const quoterContract = new ethers.Contract(
        QUOTER_CONTRACT_ADDRESS,
        Quoter.abi,
        provider
    )

    const { data, isLoading, isError, error } = useQuery({
        queryKey: [tokenIn, tokenOut, tokenInAmount],
        queryFn: async () => {
            if (!tokenIn || !tokenOut || !provider) {
                throw new Error('No tokens or provider')
            }

            const poolConstants = await getPoolConstants(
                tokenIn,
                tokenOut,
                provider
            )

            const quotedAmountOut =
                await quoterContract.callStatic?.quoteExactInputSingle?.(
                    poolConstants.token0,
                    poolConstants.token1,
                    poolConstants.fee,
                    fromReadableAmount(
                        tokenInAmount,
                        tokenIn?.decimals
                    ).toString(),
                    0
                )

            return toReadableAmount(quotedAmountOut, tokenOut?.decimals)
        },
        enabled: !!tokenIn && !!tokenOut && !!tokenInAmount,
    })

    return { data, isLoading, isError, error }
}

async function getPoolConstants(
    tIn: Token,
    tOut: Token,
    provider: ethers.providers.Web3Provider
): Promise<{
    token0: string
    token1: string
    fee: number
}> {
    const tokenIn = new UniswapToken(
        tIn.chainId,
        tIn.address,
        tIn.decimals,
        tIn.symbol,
        tIn.name
    )

    const tokenOut = new UniswapToken(
        tOut.chainId,
        tOut.address,
        tOut.decimals,
        tOut.symbol,
        tOut.name
    )

    const currentPoolAddress = computePoolAddress({
        factoryAddress: POOL_FACTORY_CONTRACT_ADDRESS,
        tokenA: tokenIn,
        tokenB: tokenOut,
        fee: FeeAmount.MEDIUM,
    })

    const poolContract = new ethers.Contract(
        currentPoolAddress,
        IUniswapV3PoolABI.abi,
        provider
    )
    const [token0, token1, fee] = await Promise.all([
        poolContract.token0(),
        poolContract.token1(),
        poolContract.fee(),
    ])

    return {
        token0,
        token1,
        fee,
    }
}
