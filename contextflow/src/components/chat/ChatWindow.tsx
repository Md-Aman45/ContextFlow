"use client";

import { useEffect, useRef } from "react";

import { useAppStore } from "@/store";
import { MessageCard } from "./MessageCard";

export function ChatWindow() {
  const messages = useAppStore(
    (state) => state.messages
  );

  // ✅ Hooks first
  const bottomRef =
    useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "auto",
      block: "end",
    });
  }, [messages]);

  // ✅ THEN conditional return
  if (messages.length === 0) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="max-w-xl text-center">
          <div className="mb-6 text-6xl">
            🤖
          </div>

          <h1 className="mb-3 text-4xl font-bold">
            ContextFlow
          </h1>

          <p className="mb-8 text-zinc-400">
            A protocol-driven AI client demonstrating
            streaming responses, tool execution, and
            context synchronization.
          </p>

          <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-6 text-left">
            <h2 className="mb-4 font-semibold">
              Try asking:
            </h2>

            <div className="space-y-3 text-sm text-zinc-300">
              <div>📄 Summarize the Q3 financial report</div>
              <div>🔍 Search deployment SLA requirements</div>
              <div>📊 Show revenue metrics</div>
              <div>⚙️ Explain operating margin improvements</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {messages.map((message) => (
        <MessageCard
          key={message.id}
          role={message.role}
          content={message.content}
          completed={message.completed}
          loading={message.loading}
        />
      ))}

      <div ref={bottomRef} />
    </div>
  );
}