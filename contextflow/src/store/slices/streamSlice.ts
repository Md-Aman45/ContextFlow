import { StateCreator } from "zustand";

export interface Stream {
  streamId: string;
  content: string;
  completed: boolean;
}

export interface StreamSlice {
  streams: Record<string, Stream>;

  appendToken: (
    streamId: string,
    token: string
  ) => void;

  finishStream: (
    streamId: string
  ) => void;

  resetStreams: () => void;
}

export const createStreamSlice: StateCreator<
  StreamSlice,
  [],
  [],
  StreamSlice
> = (set) => ({
  streams: {},

  appendToken: (streamId, token) =>
    set((state) => ({
      streams: {
        ...state.streams,
        [streamId]: {
          streamId,
          content:
            (state.streams[streamId]?.content ?? "") + token,
          completed: false,
        },
      },
    })),

  finishStream: (streamId) =>
    set((state) => ({
      streams: {
        ...state.streams,
        [streamId]: {
          ...state.streams[streamId],
          completed: true,
        },
      },
    })),

  resetStreams: () =>
    set({
      streams: {},
    }),
});