import { TokenChooser } from './TokenChooser'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import { useTokenBalance } from '../hooks/useTokenBalance'
import { Typography } from '@mui/material'
import { useTokenAllowance } from '../hooks/useTokenAllowance'
import { useTokensStore } from '../stores/tokensStore'
import { useTokenOutAmount } from '../hooks/useTokenOutAmount'

const removeArrowsStyle = {
    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
        display: 'none',
    },
    '& input[type=number]': {
        MozAppearance: 'textfield',
    },
}

export const TokenSwapper = () => {
    const {
        tokenIn,
        setTokenIn,
        tokenOut,
        setTokenOut,
        flipTokens,
        setTokenInAmount,
        tokenInAmount,
    } = useTokensStore((state) => state)

    const handleTokenInAmountChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setTokenInAmount(parseFloat(e.target.value))
    }

    const {
        data,
        isLoading: isAmountLoading,
        isError,
        error,
    } = useTokenOutAmount()

    const { data: balance, isLoading } = useTokenBalance(tokenIn)
    const { data: allowance, isLoading: isAllowanceLoading } =
        useTokenAllowance(tokenIn)

    return (
        <div>
            <p>
                {!tokenIn
                    ? 'No token chosen'
                    : isAllowanceLoading
                      ? 'Loading allowance'
                      : `Allowance is: ${allowance}`}
            </p>
            <Button onClick={flipTokens}>Flip Tokens</Button>
            <br />
            <TextField
                type="number"
                sx={removeArrowsStyle}
                value={tokenInAmount}
                onChange={handleTokenInAmountChange}
                inputMode="numeric"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <TokenChooser
                                chosenToken={tokenIn}
                                onTokenSelect={setTokenIn}
                            />
                            <Typography
                                variant="caption"
                                sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    right: '0.5rem',
                                }}
                            >
                                {!tokenIn
                                    ? 'Choose a token'
                                    : isLoading
                                      ? 'Loading'
                                      : `Balance: ${balance}`}
                            </Typography>
                        </InputAdornment>
                    ),
                }}
            />
            <br />
            <h3>{isAmountLoading ? 'Loading' : data}</h3>
            <h3>{isError && error?.message}</h3>
            <TextField
                type="number"
                sx={removeArrowsStyle}
                inputMode="numeric"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <TokenChooser
                                chosenToken={tokenOut}
                                onTokenSelect={setTokenOut}
                            />
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    )
}
