import { Web3ReactProvider } from '@web3-react/core'
import { ReactNode } from 'react'

import { PRIORITIZED_CONNECTORS } from '../connections'

// async function connect(connector: Connector) {
// 	try {
// 		await connector.activate()
// 	} catch (error) {
// 		console.debug(`web3-react eager connection error: ${error}`)
// 	}
// }

export const Web3ContextProvider = ({ children }: { children: ReactNode }) => {
	return (
		<Web3ReactProvider
			connectors={Object.values(PRIORITIZED_CONNECTORS).map((connector) => [connector.connector, connector.hooks])}
		>
			{children}
		</Web3ReactProvider>
	)
}
