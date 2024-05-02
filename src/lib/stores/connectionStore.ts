import { create } from "zustand";
import { ConnectionType } from "../connections";

interface ConnectionState {
  connectionType: ConnectionType | null;
  setConnectionType: (newType: ConnectionType | null) => void;
}

export const useConnectionStore = create<ConnectionState>()((set) => ({
  connectionType: null,
  setConnectionType: (newConnectionType: ConnectionType | null) =>
    set({ connectionType: newConnectionType }),
}));
