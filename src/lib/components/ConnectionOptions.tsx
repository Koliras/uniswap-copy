import { ConnectionType, getHasMetaMaskExtensionInstalled } from '../connections'
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
			isEnabled={isNoOptionActive || activeConnectionType === ConnectionType.INJECTED}
			isConnected={activeConnectionType === ConnectionType.INJECTED}
			connectionType={ConnectionType.INJECTED}
			onActivate={onActivate}
			onDeactivate={onDeactivate}
		/>
	) : (
		<a href={METAMASK_URL}>
			<button>Install Metamask</button>
		</a>
	)

	const walletConnectOption = (
		<Option
			isEnabled={isNoOptionActive || activeConnectionType === ConnectionType.WALLET_CONNECT}
			isConnected={activeConnectionType === ConnectionType.WALLET_CONNECT}
			connectionType={ConnectionType.WALLET_CONNECT}
			onActivate={onActivate}
			onDeactivate={onDeactivate}
		/>
	)

	return (
		<div>
			{metaMaskOption}
			{walletConnectOption}
		</div>
	)
}

