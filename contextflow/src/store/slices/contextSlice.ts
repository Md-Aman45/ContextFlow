import { StateCreator } from "zustand";

export interface ContextSnapshot {
  contextId: string;
  data: Record<string, unknown>;
}

export interface ContextSlice {
  contexts: ContextSnapshot[];

  addContext: (
    contextId: string,
    data: Record<string, unknown>
  ) => void;
}

export const createContextSlice: StateCreator<
  ContextSlice,
  [],
  [],
  ContextSlice
> = (set) => ({
  contexts: [],

  addContext: (contextId, data) =>
    set((state) => ({
      contexts: [
        ...state.contexts,
        {
          contextId,
          data,
        },
      ],
    })),
});