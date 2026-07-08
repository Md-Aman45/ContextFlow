/**
 * Exponential backoff strategy.
 *
 * 500ms
 * 1s
 * 2s
 * 4s
 * 8s
 * 10s (maximum)
 */
export class ReconnectStrategy {
  private readonly initialDelay = 500;

  private readonly maxDelay = 10_000;

  private attempt = 0;

  nextDelay(): number {
    const delay = this.initialDelay * Math.pow(2, this.attempt);

    this.attempt++;

    return Math.min(delay, this.maxDelay);
  }

  reset(): void {
    this.attempt = 0;
  }

  getAttempt(): number {
    return this.attempt;
  }
}