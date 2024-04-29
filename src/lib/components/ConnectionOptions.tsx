import { ConnectionType, getConnection, getHasMetaMaskExtensionInstalled, tryDeactivateConnector } from '../connections'
import { METAMASK_URL } from '../constants'
import { Option } from './Option'

type ConnectOptionsParams = {
	activeConnectionType: ConnectionType | null
	isConnectionActive: boolean
	onActivate: (connectionType: ConnectionType) => void
	onDeactivate: (connectionType: null) => void
}

export const ConnectionOptions = ({
	activeConnectionType,
	isConnectionActive,
	onActivate,
	onDeactivate,
}: ConnectOptionsParams) => {
	const hasMetaMaskExtension = getHasMetaMaskExtensionInstalled()

	const isNoOptionActive = !isConnectionActive || (isConnectionActive && activeConnectionType === null)

	const metaMaskOption = hasMetaMaskExtension ? (
		<Option
			activeConnectionType={activeConnectionType}
			connectionType={ConnectionType.INJECTED}
			onActivate={onActivate}
		/>
	) : (
		<a href={METAMASK_URL}>
			<button>Install Metamask</button>
		</a>
	)

	const walletConnectOption = (
		<Option
			activeConnectionType={activeConnectionType}
			connectionType={ConnectionType.WALLET_CONNECT}
			onActivate={onActivate}
		/>
	)

	const handleDeactivate = async () => {
		if (activeConnectionType !== null) {
			const deactivation = await tryDeactivateConnector(getConnection(activeConnectionType).connector)
			if (deactivation === undefined) {
				return
			}
			onDeactivate(deactivation)
			return
		}

	}

	const disconnectButton = (
		<div>
			<button onClick={handleDeactivate} disabled={isNoOptionActive}>
				Disconnect
			</button>
		</div>
	)

	return (
		<div>
			{metaMaskOption}
			{walletConnectOption}
			{disconnectButton}
		</div>
	)
}

