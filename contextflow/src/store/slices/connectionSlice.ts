import { StateCreator } from "zustand";

export enum ConnectionStatus {
  DISCONNECTED = "DISCONNECTED",
  CONNECTING = "CONNECTING",
  CONNECTED = "CONNECTED",
  RECONNECTING = "RECONNECTING",
}

export interface ConnectionSlice {
  connectionStatus: ConnectionStatus;

  setConnectionStatus: (
    status: ConnectionStatus
  ) => void;
}

export const createConnectionSlice: StateCreator<
  ConnectionSlice,
  [],
  [],
  ConnectionSlice
> = (set) => ({
  connectionStatus: ConnectionStatus.DISCONNECTED,

  setConnectionStatus: (status) => {
    console.log("🗄️ Store ->", status);
    set({
      connectionStatus: status,
    });
  },
});