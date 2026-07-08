"use client";

import { useState } from "react";

import { useAppStore } from "@/store";
import { ToolCard } from "./ToolCard";

export function ToolTimeline() {
  const tools = useAppStore(
    (state) => state.tools
  );

  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-lg p-2 transition hover:bg-zinc-800"
      >
        <span className="text-xl font-bold">
          🛠 Tool Timeline
        </span>

        <span className="text-sm text-zinc-400">
          {open ? "▼" : "▶"} ({tools.length})
        </span>
      </button>

      {open && (
        <>
          {tools.length === 0 ? (
            <div className="rounded-lg border border-red-500 p-4 text-red-400">
              No tools yet.
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
        </>
      )}
    </div>
  );
}