import { TokenChooser } from "./TokenChooser"
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import { useTokensStore } from "../stores/tokensStore"

export const TokenSwapper = () => {
	const {
		tokenIn,
		setTokenIn,
		tokenOut,
		setTokenOut,
		flipTokens,
	} = useTokensStore(state => state);

	return (
		<div>
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
