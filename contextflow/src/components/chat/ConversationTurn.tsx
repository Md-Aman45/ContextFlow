"use client";

import { ChatMessage } from "./ChatMessage";

interface ConversationTurnProps {
  userMessage?: {
    content: string;
  };

  assistantMessage?: {
    content: string;
    completed: boolean;
    loading?: boolean;
  };
}

export function ConversationTurn({
  userMessage,
  assistantMessage,
}: ConversationTurnProps) {
  return (
    <div className="mb-10 space-y-5">
      {userMessage && (
        <ChatMessage
          role="user"
          content={userMessage.content}
          completed
        />
      )}

      {assistantMessage && (
        <ChatMessage
          role="assistant"
          content={assistantMessage.content}
          completed={assistantMessage.completed}
          loading={assistantMessage.loading}
        />
      )}
    </div>
  );
}