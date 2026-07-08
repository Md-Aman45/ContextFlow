"use client";

import { ChatMessage } from "./ChatMessage";
import { ContextPanel } from "../context/ContextPanel";
import { ToolTimeline } from "../tool/ToolTimeline";

interface MessageCardProps {
  role: "user" | "assistant";
  content: string;
  completed: boolean;
  loading?: boolean;
}

export function MessageCard({
  role,
  content,
  completed,
  loading,
}: MessageCardProps) {
  const isAssistant = role === "assistant";

  return (
    <div className="space-y-4">
      <ChatMessage
        role={role}
        content={content}
        completed={completed}
        loading={loading}
      />

      {isAssistant && (
        <div className="ml-8 space-y-4 border-l border-zinc-800 pl-4">
          <ContextPanel />

          <ToolTimeline />
        </div>
      )}
    </div>
  );
}