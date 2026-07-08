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
   * Handles exponential reconnect delays.
   */
  private readonly reconnectStrategy =
    new ReconnectStrategy();

  /**
   * Active reconnect timer.
   */
  private reconnectTimer: ReturnType<
    typeof setTimeout
  > | null = null;

  /**
   * Handles protocol heartbeat logic.
   */
  private readonly heartbeat = new Heartbeat();

  /**
   * Parses incoming protocol messages.
   */
  private readonly parser = new MessageParser();

  constructor(
    private readonly url: string,
    private readonly onEvent: ProtocolEventHandler,
    private readonly onLifecycle?: ConnectionLifecycleHandler
  ) {}

  /**
   * Notify UI about lifecycle changes.
   */
  private notifyLifecycle(): void {
    this.onLifecycle?.({
      state: this.state,
      timestamp: Date.now(),
    });
  }

  /**
   * Open websocket connection.
   */
  connect(): void {
    if (
      this.state === ConnectionState.CONNECTED ||
      this.state === ConnectionState.CONNECTING
    ) {
      return;
    }

    if (this.state !== ConnectionState.RECONNECTING) {
      this.state = ConnectionState.CONNECTING;
      this.notifyLifecycle();
    }

    this.socket = new WebSocket(this.url);

    this.registerEventHandlers();
  }

  /**
   * Close websocket connection.
   */
  disconnect(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }

    this.socket?.close();
    this.socket = null;

    this.state = ConnectionState.CLOSED;

    this.notifyLifecycle();
  }

  /**
   * Send protocol message.
   */
  send(message: ClientMessage): void {
    if (
      !this.socket ||
      this.state !== ConnectionState.CONNECTED
    ) {
      return;
    }

    this.socket.send(JSON.stringify(message));
  }

  /**
   * Current connection state.
   */
  getState(): ConnectionState {
    return this.state;
  }

  /**
   * Register websocket callbacks.
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
    console.log("🟢 SOCKET OPEN");
    this.state = ConnectionState.CONNECTED;

    this.notifyLifecycle();

    this.reconnectStrategy.reset();

    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }

    // We'll start heartbeat here later.
    // this.heartbeat.start(...);
  };

  /**
   * Incoming websocket message.
   */
  private handleMessage = (
    event: MessageEvent
  ): void => {
    try {
      const protocolEvent =
        this.parser.parse(event.data);

      this.onEvent(protocolEvent);
    } catch (error) {
      console.error(
        "Protocol parsing failed:",
        error
      );
    }
  };

  /**
   * WebSocket error.
   */
  private handleError = (): void => {
    if (
      this.state !== ConnectionState.CONNECTING
    ) {
      console.error("WebSocket error");
    }
  };

  /**
   * Connection closed.
   */
  private handleClose = (): void => {
    console.log("🔴 SOCKET CLOSED");
    this.socket = null;

    if (this.state === ConnectionState.CLOSED) {
      return;
    }

    if (!this.reconnectStrategy.canReconnect()) {
      this.state = ConnectionState.DISCONNECTED;
      this.notifyLifecycle();
      return;
    }

    this.state = ConnectionState.RECONNECTING;
    this.notifyLifecycle();

    const delay = this.reconnectStrategy.nextDelay();

    this.reconnectTimer = setTimeout(() => {
      this.connect();
    }, delay);
  };
}