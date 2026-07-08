import { StateCreator } from "zustand";

export type MessageRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  completed: boolean;
  streamId?: string;
  loading?: boolean;
  
  contextIds?: string[];

  toolCallIds?: string[];
}

export interface MessageSlice {
  messages: ChatMessage[];

  addUserMessage: (content: string) => void;

  showThinking: () => void;

  appendAssistantToken: (
    streamId: string,
    token: string
  ) => void;

  finishAssistantMessage: (
    streamId: string
  ) => void;
}

export const createMessageSlice: StateCreator<
  MessageSlice,
  [],
  [],
  MessageSlice
> = (set) => ({
  messages: [],

  showThinking: () =>
    set((state) => ({
      messages: [
        ...state.messages.filter((m) => !m.loading),
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "",
          completed: false,
          loading: true,
        },
      ],
    })),

  addUserMessage: (content) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: crypto.randomUUID(),
          role: "user",
          content,
          completed: true,
        },
      ],
    })),
    

  appendAssistantToken: (streamId, token) =>
    set((state) => {
      const thinkingIndex = state.messages.findIndex(
        (message) =>
          message.role === "assistant" &&
          message.loading
      );

      // Replace Thinking bubble
      if (thinkingIndex !== -1) {
        const messages = [...state.messages];

        messages[thinkingIndex] = {
          ...messages[thinkingIndex],
          loading: false,
          completed: false,
          streamId,
          content: token,
        };

        return { messages };
      }

      // Continue streaming
      const existingIndex = state.messages.findIndex(
        (message) =>
          message.role === "assistant" &&
          message.streamId === streamId
      );

      if (existingIndex !== -1) {
        const messages = [...state.messages];

        messages[existingIndex] = {
          ...messages[existingIndex],
          content:
            messages[existingIndex].content + token,
        };

        return { messages };
      }

      // Fallback
      return {
        messages: [
          ...state.messages,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: token,
            completed: false,
            streamId,
          },
        ],
      };
    }),

  finishAssistantMessage: (streamId) =>
    set((state) => ({
      messages: state.messages.map((message) => {
        if (
          message.role === "assistant" &&
          message.streamId === streamId
        ) {
          return {
            ...message,
            completed: true,
          };
        }

        return message;
      }),
    })),
});