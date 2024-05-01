import { TokenChooser } from "./TokenChooser"
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import { useTokensStore } from "../stores/tokensStore"
import { useTokenBalance } from "../hooks/useTokenBalance"
import { Typography } from "@mui/material"

export const TokenSwapper = () => {
	const {
		tokenIn,
		setTokenIn,
		tokenOut,
		setTokenOut,
		flipTokens,
	} = useTokensStore(state => state);

	const { data, isLoading } = useTokenBalance(tokenIn)

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
							<Typography
								variant="caption"
								sx={{ position: "absolute", bottom: 0, right: "0.5rem" }}
							>{!tokenIn
								? "Choose a token"
								: isLoading
									? "Loading"
									: `Balance: ${data}`}
							</Typography>
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
