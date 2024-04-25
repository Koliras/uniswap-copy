import './App.css'
import { ConnectionType } from './lib/connections'
import { ConnectionOptions } from './lib/components/ConnectionOptions'
import { useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { SwitchChains } from './lib/components/SwitchChains'

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
      <SwitchChains connectionType={connectionType} />
    </div>
  )
}

export default App
