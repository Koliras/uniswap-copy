import './App.css'
import { ConnectionType, switchNetwork } from './lib/connections'
import { CHAIN_INFO } from './lib/constants'
import { ConnectionOptions } from './lib/components/ConnectionOptions'
import { useState } from 'react'
import { useWeb3React } from '@web3-react/core'

function App() {
  const { chainId, account, isActive } = useWeb3React()
  const [connectionType, setConnectionType] = useState<ConnectionType | null>(null)
  return (
    <div>
      <ConnectionOptions
        activeConnectionType={connectionType}
        isConnectionActive={isActive}
        onActivate={setConnectionType}
        onDeactivate={setConnectionType}
      />
      <h2>Chaind ID is {chainId}</h2>
      <h2>Account is {account}</h2>
      <h2>Connection type is {connectionType}</h2>
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

export default App
