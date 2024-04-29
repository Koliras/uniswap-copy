import React, { useState } from "react"
import { TokenChooser } from "./TokenChooser"
import { Token } from "../../config"
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'

export const TokenSwaper = () => {
	const [tokenIn, setTokenIn] = useState<Token | null>(null)
	const [tokenOut, setTokenOut] = useState<Token | null>(null)

	const handleTokensFlip = () => {
		const tIn = tokenIn
		const tOut = tokenOut
		setTokenOut(tIn)
		setTokenIn(tOut)
	}
	return (
		<div>
			<Button
				onClick={handleTokensFlip}
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
