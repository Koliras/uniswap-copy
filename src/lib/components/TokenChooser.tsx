import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import { Tokens } from './Tokens'
import { Token } from '../constants'
import { useWeb3React } from '@web3-react/core'

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflow: 'auto',
}

type Props = {
    chosenToken: Token | null
    onTokenSelect: (t: Token | null) => void
}

export const TokenChooser = ({ chosenToken, onTokenSelect }: Props) => {
    const { chainId } = useWeb3React()
    const [open, setOpen] = useState(false)
    const [tokenQuery, setTokenQuery] = useState('')
    const handleOpen = () => setOpen(true)
    const handleClose = () => {
        setOpen(false)
        setTokenQuery('')
    }

    const handleTokenQueryChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setTokenQuery(event.target.value)
    }

    useEffect(() => {
        if (!chainId) {
            onTokenSelect(null)
        }
    }, [chainId, onTokenSelect])

    return (
        <div>
            <Button onClick={handleOpen} disabled={!chainId}>
                {chosenToken ? chosenToken.symbol : 'Choose Token'}
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <TextField
                        label="Token"
                        variant="outlined"
                        fullWidth
                        value={tokenQuery}
                        onChange={handleTokenQueryChange}
                    />
                    <Tokens
                        queryFilter={tokenQuery}
                        onTokenSelect={(token) => {
                            onTokenSelect(token)
                            handleClose()
                        }}
                    />
                </Box>
            </Modal>
        </div>
    )
}
