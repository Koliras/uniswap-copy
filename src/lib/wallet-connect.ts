import { initializeConnector } from '@web3-react/core'
import { WalletConnect } from '@web3-react/walletconnect-v2'

import { Connection, ConnectionType } from './connections'
import { ChainId } from './constants'

export function buildWalletConnectConnector() {
    const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID
    if (!projectId?.length) {
        throw new Error('No wallet connect project id. Please, fix the .env')
    }

    const [walletConnect, walletHooks] = initializeConnector<WalletConnect>(
        (actions) =>
            new WalletConnect({
                actions,
                options: {
                    projectId: projectId,
                    chains: [ChainId.mainnet],
                    optionalChains: [ChainId.polygon, ChainId.optimism],
                    showQrModal: true,
                    qrModalOptions: {
                        themeVariables: {
                            '--wcm-z-index': '1301',
                            '--wcm-accent-color': '#38D9C0',
                            '--wcm-background-color': '#38D9C0',
                        },
                    },
                },
            })
    )
    const walletConnectConnection: Connection = {
        connector: walletConnect,
        hooks: walletHooks,
        type: ConnectionType.WALLET_CONNECT,
    }
    return walletConnectConnection
}
