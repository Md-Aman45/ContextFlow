"use client";

import { useEffect, useRef } from "react";

import { useAppStore } from "@/store";
import { MessageCard } from "./MessageCard";

export function ChatWindow() {
  const messages = useAppStore(
    (state) => state.messages
  );

  const bottomRef =
    useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex min-h-full items-center justify-center py-8">
        <div className="w-full max-w-4xl">

          {/* Hero */}
          <div className="mb-10 text-center">

            <div className="mb-4 text-5xl">
              ⚡
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
              ContextFlow
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-zinc-400 md:text-lg">
              A protocol-driven AI client demonstrating
              real-time streaming, tool execution,
              context synchronization, and resilient
              WebSocket communication.
            </p>

          </div>

          {/* Feature Cards */}

          <div className="mb-10 grid gap-4 sm:grid-cols-2">

            <FeatureCard
              icon="💬"
              title="Streaming Responses"
              description="Real-time token streaming from the assistant."
            />

            <FeatureCard
              icon="🛠"
              title="Tool Execution"
              description="Live tool calls with execution timeline."
            />

            <FeatureCard
              icon="🧠"
              title="Context Sync"
              description="Protocol context snapshots synchronized automatically."
            />

            <FeatureCard
              icon="🔄"
              title="Auto Reconnect"
              description="Resilient WebSocket recovery with exponential backoff."
            />

          </div>

          {/* Example Prompts */}

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

            <h2 className="mb-5 text-lg font-semibold text-white">
              Try asking
            </h2>

            <div className="grid gap-3 sm:grid-cols-2">

              <PromptCard text="📄 Summarize the Q3 financial report" />

              <PromptCard text="🔍 Search deployment SLA requirements" />

              <PromptCard text="📊 Show revenue metrics" />

              <PromptCard text="⚙️ Explain operating margin improvements" />

            </div>

          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-4">
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

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-zinc-700">

      <div className="mb-3 text-2xl">
        {icon}
      </div>

      <h3 className="mb-2 text-lg font-semibold text-white">
        {title}
      </h3>

      <p className="text-sm leading-6 text-zinc-400">
        {description}
      </p>

    </div>
  );
}

interface PromptCardProps {
  text: string;
}

function PromptCard({
  text,
}: PromptCardProps) {
  return (
    <div className="cursor-default rounded-xl border border-zinc-800 bg-black px-4 py-3 text-sm text-zinc-300 transition hover:border-zinc-700 hover:bg-zinc-950">
      {text}
    </div>
  );
}