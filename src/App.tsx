import './App.css'
import { Connector } from '@web3-react/types'
import { ConnectionType, getConnection } from './lib/connections'

async function connect(connector: Connector) {
  try {
    await connector.activate()
  } catch (error) {
    console.debug(`web3-react eager connection error: ${error}`)
  }
}

function App() {
  return (
    <div>
      text
      <button
        onClick={() => connect(getConnection(ConnectionType.INJECTED).connector)}
      >
        Connect Metamask
      </button>
      <button
        onClick={() => connect(getConnection(ConnectionType.WALLET_CONNECT).connector)}
      >
        Connect WalletConnect
      </button>
    </div>
  )
}

export default App
