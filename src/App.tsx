import "./App.css";
import { ConnectionOptions } from "./lib/components/ConnectionOptions";
import { useWeb3React } from "@web3-react/core";
import { useConnectionStore } from "./lib/stores/connectionStore";
import { SwitchChains } from "./lib/components/SwitchChains";
import { TokenSwapper } from "./lib/components/TokenSwapper";

function App() {
  const { chainId, account } = useWeb3React();
  const { setConnectionType, connectionType } = useConnectionStore(
    (state) => state,
  );
  return (
    <div>
      <ConnectionOptions
        activeConnectionType={connectionType}
        onActivate={setConnectionType}
        onDeactivate={setConnectionType}
      />
      <h2>Chaind ID is {chainId}</h2>
      <h2>Account is {account}</h2>
      <h2>Connection type is {connectionType}</h2>
      <SwitchChains connectionType={connectionType} />
      <TokenSwapper />
    </div>
  );
}

export default App;
