import React from "react"
import { useWeb3React } from "@web3-react/core"
import { useTokens } from "../hooks/useTokens"

export const Tokens = () => {
	const { chainId } = useWeb3React()
	const { data, isLoading } = useTokens()

	if (isLoading) return <div>Loading</div>

	return (
		<div>
			Some data
			{chainId && data[chainId]?.map(token => (
				<div key={token.address}>
					<h2>
						<img src={token.logoURI} />{token.name}: {token.chainId}
					</h2>
				</div>
			))}
		</div>
	)
}
