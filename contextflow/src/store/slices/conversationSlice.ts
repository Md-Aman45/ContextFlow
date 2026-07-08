import { StateCreator } from "zustand";

export interface ToolExecution {
  callId: string;
  toolName: string;
  args: Record<string, unknown>;
  status: "running" | "completed";
  result?: Record<string, unknown>;
}

export interface ContextSnapshot {
  contextId: string;
  data: Record<string, unknown>;
}

export interface ConversationTurn {
  id: string;

  streamId?: string;

  user: {
    id: string;
    content: string;
  };

  assistant: {
    id: string;
    content: string;
    loading: boolean;
    completed: boolean;
  };

  tools: ToolExecution[];

  contexts: ContextSnapshot[];
}

export interface ConversationSlice {
  turns: ConversationTurn[];

  createTurn: (userMessage: string) => void;
}


export const createConversationSlice: StateCreator<
  ConversationSlice,
  [],
  [],
  ConversationSlice
> = (set) => ({
  turns: [],

  createTurn: (userMessage) =>
    set((state) => ({
      turns: [
        ...state.turns,
        {
          id: crypto.randomUUID(),

          user: {
            id: crypto.randomUUID(),
            content: userMessage,
          },

          assistant: {
            id: crypto.randomUUID(),
            content: "",
            loading: true,
            completed: false,
          },

          tools: [],

          contexts: [],
        },
      ],
    })),
});