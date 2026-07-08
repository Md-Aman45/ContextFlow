import type { ServerEvent } from "./events";
import { SequenceBuffer } from "./sequence";

/**
 * Orders protocol events before forwarding them.
 */
export class ProtocolEngine {
  private readonly sequenceBuffer = new SequenceBuffer<ServerEvent>();

  constructor(
    private readonly onOrderedEvent: (event: ServerEvent) => void
  ) {}

  handle(event: ServerEvent): void {
    const ready = this.sequenceBuffer.add(event);

    for (const orderedEvent of ready) {
      this.onOrderedEvent(orderedEvent);
    }
  }

  reset(): void {
    this.sequenceBuffer.reset();
  }

  getLastProcessedSeq(): number {
    return this.sequenceBuffer.getLastProcessedSeq();
  }
}