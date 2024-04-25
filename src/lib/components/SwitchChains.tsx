import { ConnectionType, switchNetwork } from "../connections"
import { CHAIN_INFO } from "../constants"

type Props = {
	connectionType: ConnectionType | null
}

export const SwitchChains = ({ connectionType }: Props) => {
	return (
		<div>
<<<<<<< HEAD
			{Object.keys(CHAIN_INFO).map((chainId) => (
=======
			{Object.entries(CHAIN_INFO).map(([chainId, chainInfo]) => (
>>>>>>> 7018c96 (feat: separate switching chains in component)
				<button
					onClick={() => switchNetwork(parseInt(chainId), connectionType)}
					key={chainId}
				>
<<<<<<< HEAD
					{`Switch to ${CHAIN_INFO[chainId]?.label}`}
=======
					Switch to ${chainInfo.label}
>>>>>>> 7018c96 (feat: separate switching chains in component)
				</button>
			))}
		</div>
	)
}
