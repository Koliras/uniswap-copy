import {
  ConnectionType,
  getConnection,
  tryActivateConnector,
} from "../connections";

export const Option = ({
  activeConnectionType,
  connectionType,
  onActivate,
}: {
  activeConnectionType: ConnectionType | null;
  connectionType: ConnectionType;
  onActivate: (connectionType: ConnectionType) => void;
}) => {
  const onClick = async () => {
    const activation = await tryActivateConnector(
      getConnection(connectionType).connector,
    );
    if (!activation) {
      return;
    }
    onActivate(activation);
    return;
  };

  return (
    <div>
      <button onClick={onClick} disabled={activeConnectionType !== null}>
        Connect {connectionType}
      </button>
    </div>
  );
};
