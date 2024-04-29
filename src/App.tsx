import './App.css'
import { ConnectionOptions } from './lib/components/ConnectionOptions'
import { useWeb3React } from '@web3-react/core'
import { useConnectionStore } from './lib/stores/connectionStore'
import { SwitchChains } from './lib/components/SwitchChains'
import { TokenSwaper } from './lib/components/TokenSwaper'

function App() {
  const { chainId, account, isActive } = useWeb3React()
  const { setConnectionType, connectionType } = useConnectionStore(state => state)
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
      <TokenSwaper />
    </div>
  )
}

export default App
