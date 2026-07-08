import type { PingEvent, PongMessage } from "../index";

/**
 * Handles protocol heartbeat messages.
 */
export class Heartbeat {
  /**
   * Creates a PONG response for a received PING.
   */
  createPong(event: PingEvent): PongMessage {
    return {
      type: "PONG",
      echo: event.challenge,
    };
  }

  /**
   * Validates the heartbeat challenge.
   */
  isValid(event: PingEvent): boolean {
    return event.challenge.trim().length > 0;
  }
}