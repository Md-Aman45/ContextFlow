"use client";

import { ChatMessage } from "./ChatMessage";
import { ToolTimeline } from "../tool/ToolTimeline";
import { ContextPanel } from "../context/ContextPanel";

import {
  ContextSnapshot,
  ToolExecution,
} from "@/store/slices/conversationSlice";

interface ConversationTurnProps {
  userMessage?: {
    content: string;
  };

  assistantMessage?: {
    content: string;
    completed: boolean;
    loading?: boolean;
  };

  contexts: ContextSnapshot[];

  tools: ToolExecution[];
}

export function ConversationTurn({
  userMessage,
  assistantMessage,
  contexts,
  tools,
}: ConversationTurnProps) {
  return (
    <div className="mb-10 space-y-5">
      {/* User */}
      {userMessage && (
        <ChatMessage
          role="user"
          content={userMessage.content}
          completed={true}
        />
      )}

      {/* Assistant */}
      {assistantMessage && (
        <ChatMessage
          role="assistant"
          content={assistantMessage.content}
          completed={assistantMessage.completed}
          loading={assistantMessage.loading}
        />
      )}

      {/* Context */}
      <ContextPanel
        contexts={contexts}
      />

      {/* Tool Timeline */}
      <ToolTimeline
        tools={tools}
      />
    </div>
  );
}