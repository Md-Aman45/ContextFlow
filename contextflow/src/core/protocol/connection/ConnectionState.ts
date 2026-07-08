/**
 * Represents every possible lifecycle state
 * of the WebSocket connection.
 */
export enum ConnectionState {
  /**
   * No active connection.
   */
  DISCONNECTED = "DISCONNECTED",

  /**
   * Opening a new WebSocket connection.
   */
  CONNECTING = "CONNECTING",

  /**
   * Connected and ready to exchange messages.
   */
  CONNECTED = "CONNECTED",

  /**
   * Re-establishing a lost connection.
   */
  RECONNECTING = "RECONNECTING",

  /**
   * Connected again and sending RESUME.
   */
  RESUMING = "RESUMING",

  /**
   * Intentionally closed.
   */
  CLOSED = "CLOSED",
}