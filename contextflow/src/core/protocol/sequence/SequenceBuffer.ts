/**
 * ============================================================================
 * Sequence Buffer
 * ----------------------------------------------------------------------------
 * Responsible for:
 *  - Buffering out-of-order events
 *  - Ignoring duplicate events
 *  - Releasing events in the correct sequence
 *
 * This class is protocol-agnostic and can work with any object
 * that contains a numeric `seq` property.
 * ============================================================================
 */

export class SequenceBuffer<T extends { seq: number }> {
  /**
   * Highest sequence number successfully processed.
   */
  private lastProcessedSeq = 0;

  /**
   * Stores events waiting for missing sequence numbers.
   */
  private readonly buffer = new Map<number, T>();

  /**
   * Adds an event into the buffer.
   *
   * Returns all events that are now ready to be processed
   * in the correct order.
   */
  add(event: T): T[] {
    // Ignore events that have already been processed.
    if (event.seq <= this.lastProcessedSeq) {
      return [];
    }

    // Ignore duplicate events waiting inside the buffer.
    if (this.buffer.has(event.seq)) {
      return [];
    }

    this.buffer.set(event.seq, event);

    return this.drain();
  }

  /**
   * Removes all buffered state.
   */
  reset(): void {
    this.lastProcessedSeq = 0;
    this.buffer.clear();
  }

  /**
   * Returns the latest processed sequence number.
   */
  getLastProcessedSeq(): number {
    return this.lastProcessedSeq;
  }

  /**
   * Returns the number of buffered events.
   */
  size(): number {
    return this.buffer.size;
  }

  /**
   * Returns true if the buffer is empty.
   */
  isEmpty(): boolean {
    return this.buffer.size === 0;
  }

  /**
   * Releases every consecutive event that is ready.
   */
  private drain(): T[] {
    const ready: T[] = [];

    let nextSeq = this.lastProcessedSeq + 1;

    while (this.buffer.has(nextSeq)) {
      const event = this.buffer.get(nextSeq)!;

      ready.push(event);

      this.buffer.delete(nextSeq);

      this.lastProcessedSeq = nextSeq;

      nextSeq++;
    }

    return ready;
  }
}