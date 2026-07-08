import { ConnectionManager } from "../protocol/connection";
import { ProtocolEngine } from "../protocol";
import type { ClientMessage } from "../protocol/messages";
import type { ServerEvent } from "../protocol/events";
import type { ConnectionLifecycleHandler } from "../protocol/connection/Lifecycle";

export class ProtocolRuntime {
  private readonly protocolEngine: ProtocolEngine;

  private readonly connectionManager: ConnectionManager;

  private handleProtocolEvent(event: ServerEvent): void {
    switch (event.type) {
      case "PING":

        this.connectionManager.send({
          type: "PONG",
          echo: event.challenge,
        });

        break;

      default:
        break;
    }
  }



  constructor(
    serverUrl: string,
    onEvent: (event: ServerEvent) => void,
    onLifecycle?: ConnectionLifecycleHandler
  ) {
    this.protocolEngine = new ProtocolEngine((event) => {
      this.handleProtocolEvent(event);

      onEvent(event);
    });

    this.connectionManager = new ConnectionManager(
      serverUrl,

      (event) => {
        this.protocolEngine.handle(event);
      },
      onLifecycle
    );
  }

  connect(): void {
    this.connectionManager.connect();
  }

  disconnect(): void {
    this.connectionManager.disconnect();
  }

  send(message: ClientMessage): void {
    this.connectionManager.send(message);
  }

  reset(): void {
    this.protocolEngine.reset();
  }

  getLastProcessedSeq(): number {
    return this.protocolEngine.getLastProcessedSeq();
  }
  
}