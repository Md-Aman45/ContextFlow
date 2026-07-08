import { describe, expect, it } from "vitest";

import { SequenceBuffer } from "@/core/protocol/sequence";

type TestEvent = {
  seq: number;
  value: string;
};

const event = (seq: number): TestEvent => ({
  seq,
  value: `event-${seq}`,
});

describe("SequenceBuffer", () => {
  it("processes events in order", () => {
    const buffer = new SequenceBuffer<TestEvent>();

    expect(buffer.add(event(1)).map((e) => e.seq)).toEqual([1]);
    expect(buffer.add(event(2)).map((e) => e.seq)).toEqual([2]);
    expect(buffer.add(event(3)).map((e) => e.seq)).toEqual([3]);

    expect(buffer.getLastProcessedSeq()).toBe(3);
    expect(buffer.isEmpty()).toBe(true);
  });

  it("buffers out-of-order events", () => {
    const buffer = new SequenceBuffer<TestEvent>();

    expect(buffer.add(event(1)).map((e) => e.seq)).toEqual([1]);

    expect(buffer.add(event(3))).toEqual([]);

    expect(buffer.size()).toBe(1);

    expect(buffer.add(event(2)).map((e) => e.seq)).toEqual([2, 3]);

    expect(buffer.isEmpty()).toBe(true);
  });

  it("ignores duplicate events", () => {
    const buffer = new SequenceBuffer<TestEvent>();

    expect(buffer.add(event(1)).map((e) => e.seq)).toEqual([1]);

    expect(buffer.add(event(1))).toEqual([]);

    expect(buffer.add(event(2)).map((e) => e.seq)).toEqual([2]);
  });

  it("handles fully reversed input", () => {
    const buffer = new SequenceBuffer<TestEvent>();

    expect(buffer.add(event(5))).toEqual([]);
    expect(buffer.add(event(4))).toEqual([]);
    expect(buffer.add(event(3))).toEqual([]);
    expect(buffer.add(event(2))).toEqual([]);

    expect(buffer.add(event(1)).map((e) => e.seq)).toEqual([
      1,
      2,
      3,
      4,
      5,
    ]);

    expect(buffer.isEmpty()).toBe(true);
  });

  it("resets internal state", () => {
    const buffer = new SequenceBuffer<TestEvent>();

    buffer.add(event(1));
    buffer.add(event(2));

    buffer.reset();

    expect(buffer.getLastProcessedSeq()).toBe(0);
    expect(buffer.isEmpty()).toBe(true);

    expect(buffer.add(event(1)).map((e) => e.seq)).toEqual([1]);
  });

  it("keeps waiting when a gap exists", () => {
    const buffer = new SequenceBuffer<TestEvent>();

    expect(buffer.add(event(1)).map((e) => e.seq)).toEqual([1]);

    expect(buffer.add(event(5))).toEqual([]);

    expect(buffer.size()).toBe(1);

    expect(buffer.getLastProcessedSeq()).toBe(1);
  });
});