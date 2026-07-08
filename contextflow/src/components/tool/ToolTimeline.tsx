"use client";

import { useState } from "react";

import { useAppStore } from "@/store";
import { ToolCard } from "./ToolCard";

export function ToolTimeline() {
  const tools = useAppStore((state) => state.tools);

  const [open, setOpen] = useState(false);

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4">

      {/* Header */}

      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-xl px-2 py-2 transition hover:bg-zinc-900"
      >
        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900">
            🛠
          </div>

          <div className="text-left">
            <h2 className="font-semibold text-white">
              Tool Timeline
            </h2>

            <p className="text-xs text-zinc-500">
              Live tool execution history
            </p>
          </div>

        </div>

        <div className="flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-sm text-zinc-300">

          <span>{tools.length}</span>

          <span>{open ? "▼" : "▶"}</span>

        </div>
      </button>

      {open && (
        <div className="mt-5 space-y-4">

          {tools.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/50 px-6 py-10 text-center">

              <div className="mb-3 text-5xl">
                🛠
              </div>

              <h3 className="text-lg font-semibold text-white">
                No Tool Executions
              </h3>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                Tool calls performed by the assistant
                will appear here during the conversation.
              </p>

            </div>
          ) : (
            tools.map((tool) => (
              <ToolCard
                key={tool.callId}
                toolName={tool.toolName}
                status={tool.status}
                args={tool.args}
                result={tool.result}
              />
            ))
          )}

        </div>
      )}
    </section>
  );
}