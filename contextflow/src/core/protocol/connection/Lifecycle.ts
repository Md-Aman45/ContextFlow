import { ConnectionState } from "./ConnectionState";

export interface ConnectionLifecycleEvent {
  state: ConnectionState;
  timestamp: number;
}

export type ConnectionLifecycleHandler = (
  event: ConnectionLifecycleEvent
) => void;