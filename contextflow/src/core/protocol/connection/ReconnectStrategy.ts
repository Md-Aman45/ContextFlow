/**
 * Exponential backoff reconnect strategy.
 *
 * Delays:
 * 500ms
 * 1s
 * 2s
 * 4s
 * 8s
 * 10s
 * 10s
 * ...
 */
export class ReconnectStrategy {
  private readonly initialDelay = 500;

  private readonly maxDelay = 10_000;

  /**
   * Maximum reconnect attempts before giving up.
   */
  private readonly maxAttempts = 8;

  /**
   * Current reconnect attempt.
   */
  private attempt = 0;

  /**
   * Returns the delay before the next reconnect attempt.
   */
  nextDelay(): number {
    const delay =
      this.initialDelay * Math.pow(2, this.attempt);

    this.attempt++;

    return Math.min(delay, this.maxDelay);
  }

  /**
   * Returns true if another reconnect attempt
   * is allowed.
   */
  canReconnect(): boolean {
    return this.attempt < this.maxAttempts;
  }

  /**
   * Current reconnect attempt number.
   */
  getAttempt(): number {
    return this.attempt;
  }

  /**
   * Maximum reconnect attempts.
   */
  getMaxAttempts(): number {
    return this.maxAttempts;
  }

  /**
   * Reset strategy after a successful connection.
   */
  reset(): void {
    this.attempt = 0;
  }
}