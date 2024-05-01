import { TokenChooser } from "./TokenChooser"
import Quoter from '@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import { useTokensStore } from "../stores/tokensStore"
import { useEffect, useState } from "react"
import { ethers } from 'ethers'
import { CHAIN_INFO, ChainId } from "../constants"
import { useWeb3React } from "@web3-react/core"

export const TokenSwapper = () => {
	const {
		tokenIn,
		setTokenIn,
		tokenOut,
		setTokenOut,
		flipTokens,
	} = useTokensStore(state => state);

	const [balance, setBalance] = useState<ethers.BigNumber | null>(null)
	const { account, chainId } = useWeb3React()
	const provider = new ethers.providers.JsonRpcProvider(CHAIN_INFO[chainId as ChainId]?.rpcUrl || '')

	const contract = new ethers.Contract(
		'0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6',
		Quoter.abi,
		provider
	)

	useEffect(() => {

		async function getBalance() {
			const newBalance = await contract.provider.getBalance(account || '')
			setBalance(newBalance)
		}
		if (account) getBalance()
	}, [chainId, account])

	return (
		<div>
			<h2>{balance?.toString() || "Didn't get"}</h2>
			<Button
				onClick={flipTokens}
			>
				Flip Tokens
			</Button>
			<br />
			<TextField
				type="text"
				inputMode="numeric"
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<TokenChooser chosenToken={tokenIn} onTokenSelect={setTokenIn} />
						</InputAdornment>
					)
				}}
			/>
			<br />
			<TextField
				type="text"
				inputMode="numeric"
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							< TokenChooser chosenToken={tokenOut} onTokenSelect={setTokenOut} />
						</InputAdornment>
					)
				}}
			/>
		</div >
	)
}
