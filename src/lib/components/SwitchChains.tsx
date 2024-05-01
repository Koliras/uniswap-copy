import { ConnectionType, switchNetwork } from "../connections"
import { CHAIN_INFO } from "../constants"
import { useTokensStore } from "../stores/tokensStore"

type Props = {
	connectionType: ConnectionType | null
}

export const SwitchChains = ({ connectionType }: Props) => {
	const { setTokenIn, setTokenOut } = useTokensStore(state => state)

	const handleClick = (chId: number) => {
		switchNetwork(chId, connectionType)
		setTokenIn(null)
		setTokenOut(null)
	}

	return (
		<div>
			{Object.entries(CHAIN_INFO).map(([chainId, chainInfo]) => (
				<button
					onClick={() => handleClick(parseInt(chainId))}
					key={chainId}
				>
					Switch to {chainInfo.label}
				</button>
			))}
		</div>
	)
}
