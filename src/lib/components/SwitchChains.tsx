import { ConnectionType, switchNetwork } from "../connections"
import { CHAIN_INFO } from "../constants"

type Props = {
	connectionType: ConnectionType | null
}

export const SwitchChains = ({ connectionType }: Props) => {
	return (
		<div>
			{Object.entries(CHAIN_INFO).map(([chainId, chainInfo]) => (
				<button
					onClick={() => switchNetwork(parseInt(chainId), connectionType)}
					key={chainId}
				>
					Switch to {chainInfo.label}
				</button>
			))}
		</div>
	)
}
