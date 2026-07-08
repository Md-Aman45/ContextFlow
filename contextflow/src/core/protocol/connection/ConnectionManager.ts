import { Heartbeat } from "./Heartbeat";
import { ConnectionState } from "./ConnectionState";
import { ReconnectStrategy } from "./ReconnectStrategy";
import type { ProtocolEventHandler } from "./types";
import type { ConnectionLifecycleHandler } from "./Lifecycle";

import { MessageParser } from "../parser";
import type { ClientMessage } from "../messages";

export class ConnectionManager {
  /**
   * Active WebSocket connection.
   */
  private socket: WebSocket | null = null;

  /**
   * Current lifecycle state.
   */
  private state = ConnectionState.DISCONNECTED;

  /**
   * Handles exponential reconnection delays.
   */
  private readonly reconnectStrategy = new ReconnectStrategy();

  /**
   * Handles protocol heartbeat logic.
   */
  private readonly heartbeat = new Heartbeat();

  /**
   * Parses raw websocket payloads into protocol events.
   */
  private readonly parser = new MessageParser();

  private notifyLifecycle(): void {
    this.onLifecycle?.({
      state: this.state,
      timestamp: Date.now(),
    });
  }

  constructor(
    private readonly url: string,
    private readonly onEvent: ProtocolEventHandler,
    private readonly onLifecycle?: ConnectionLifecycleHandler
  ) {}

  /**
   * Opens a websocket connection.
   */
  connect(): void {
    if (
      this.state === ConnectionState.CONNECTED ||
      this.state === ConnectionState.CONNECTING
    ) {
      return;
    }

    this.state = ConnectionState.CONNECTING;

    this.notifyLifecycle();

    this.socket = new WebSocket(this.url);

    this.registerEventHandlers();
  }

  /**
   * Closes the websocket connection.
   */
  disconnect(): void {
    this.socket?.close();

    this.socket = null;

    this.state = ConnectionState.CLOSED;

    this.notifyLifecycle();
  }

  /**
   * Sends a protocol message to the server.
   */

  send(message: ClientMessage): void {
  console.log(
    "📤 SEND CALLED",
    message,
    "STATE:",
    this.state
  );

  if (
    !this.socket ||
    this.state !== ConnectionState.CONNECTED
  ) {
    console.warn("❌ SEND BLOCKED");
    return;
  }

  this.socket.send(JSON.stringify(message));

  console.log("✅ SENT");
}
  
  // send(message: ClientMessage): void {
  //   if (
  //     !this.socket ||
  //     this.state !== ConnectionState.CONNECTED
  //   ) {
  //     return;
  //   }

  //   // this.socket.send(JSON.stringify(message));
  //   const payload = JSON.stringify(message);

  //   this.socket.send(payload);
  // }

  /**
   * Returns the current connection state.
   */
  getState(): ConnectionState {
    return this.state;
  }

  /**
   * Registers websocket event listeners.
   */
  private registerEventHandlers(): void {
    if (!this.socket) return;

    this.socket.onopen = this.handleOpen;

    this.socket.onmessage = this.handleMessage;

    this.socket.onerror = this.handleError;

    this.socket.onclose = this.handleClose;
  }

  /**
   * Connection established.
   */
  private handleOpen = (): void => {
    this.state = ConnectionState.CONNECTED;

    this.notifyLifecycle();

    this.reconnectStrategy.reset();
  };

  /**
   * Incoming websocket message.
   */
  private handleMessage = (event: MessageEvent): void => {
    console.log("RAW WS:", event.data);
    try {
      const protocolEvent = this.parser.parse(event.data);

      this.onEvent(protocolEvent);
    } catch (error) {
      console.error("Protocol parsing failed:", error);
    }
  };

  /**
   * WebSocket error.
   */
  private handleError = (event: Event): void => {
    console.error("WebSocket error:", event);
  };

  /**
   * WebSocket closed.
   */
  private handleClose = (): void => {
    this.state = ConnectionState.DISCONNECTED;

    this.notifyLifecycle();
  };
}