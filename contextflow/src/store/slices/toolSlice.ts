import { StateCreator } from "zustand";

export type ToolStatus =
  | "running"
  | "completed";

export interface ToolExecution {
  callId: string;

  toolName: string;

  args: Record<string, unknown>;

  status: ToolStatus;

  result?: Record<string, unknown>;
}

export interface ToolSlice {
  tools: ToolExecution[];

  startTool: (
    callId: string,
    toolName: string,
    args: Record<string, unknown>
  ) => void;

  finishTool: (
    callId: string,
    result: Record<string, unknown>
  ) => void;
}

export const createToolSlice: StateCreator<
  ToolSlice,
  [],
  [],
  ToolSlice
> = (set) => ({
  tools: [],

  startTool: (
    callId,
    toolName,
    args
  ) =>
    set((state) => ({
      tools: [
        ...state.tools,
        {
          callId,
          toolName,
          args,
          status: "running",
        },
      ],
    })),

  finishTool: (
    callId,
    result
  ) =>
    set((state) => ({
      tools: state.tools.map((tool) => {
        if (tool.callId !== callId) {
          return tool;
        }

        return {
          ...tool,
          status: "completed",
          result,
        };
      }),
    })),
});