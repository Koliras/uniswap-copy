import { ConnectionType, switchNetwork } from "../connections"
import { CHAIN_INFO } from "../constants"

type Props = {
	connectionType: ConnectionType | null
}

export const SwitchChains = ({ connectionType }: Props) => {
	return (
		<div>
			{Object.keys(CHAIN_INFO).map((chainId) => (
				<button
					onClick={() => switchNetwork(parseInt(chainId), connectionType)}
					key={chainId}
				>
					{`Switch to ${CHAIN_INFO[chainId]?.label}`}
				</button>
			))}
		</div>
	)
}
