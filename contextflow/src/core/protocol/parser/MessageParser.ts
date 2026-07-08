import type { ServerEvent } from "../events";

/**
 * Converts raw WebSocket messages into
 * strongly typed protocol events.
 */
export class MessageParser {
  parse(raw: string): ServerEvent {
    const message = JSON.parse(raw);

    if (!message.type) {
      throw new Error("Protocol message missing type.");
    }

    if (typeof message.seq !== "number") {
      throw new Error("Protocol message missing sequence number.");
    }

    return message as ServerEvent;
  }
}