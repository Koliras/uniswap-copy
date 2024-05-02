import { Web3ReactProvider } from '@web3-react/core'
import { ReactNode } from 'react'

import { CONNECTORS } from '../connections'

export const Web3ContextProvider = ({ children }: { children: ReactNode }) => {
    return (
        <Web3ReactProvider
            connectors={Object.values(CONNECTORS).map((connector) => [
                connector.connector,
                connector.hooks,
            ])}
        >
            {children}
        </Web3ReactProvider>
    )
}
