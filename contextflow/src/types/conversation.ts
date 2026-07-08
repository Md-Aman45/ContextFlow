import type { ChatMessage } from "@/store/slices/messageSlice";
import type { ToolExecution } from "@/store/slices/toolSlice";
import type { ContextSnapshot } from "@/store/slices/contextSlice";

export interface ConversationTurn {
  id: string;

  user: ChatMessage;

  assistant?: ChatMessage;

  tools: ToolExecution[];

  contexts: ContextSnapshot[];
}