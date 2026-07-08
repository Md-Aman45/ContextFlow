"use client";

import { useState } from "react";
import { ContextCard } from "./ContextCard";

import { ContextSnapshot } from "@/store/slices/conversationSlice";

interface ContextPanelProps {
  contexts: ContextSnapshot[];
}

export function ContextPanel({
  contexts,
}: ContextPanelProps) {
  
  const [open, setOpen] = useState(false);
  if (contexts.length === 0) return null;

  const latest = contexts[contexts.length - 1];

  return (
    <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-5">
      <button
        onClick={() => setOpen(!open)}
        className="mb-4 flex w-full items-center justify-between rounded-lg p-2 transition hover:bg-zinc-800"
      >
        <div className="flex items-center gap-2 text-lg font-semibold">
          🧠 Context
        </div>

        <div className="text-sm text-zinc-400">
          {open ? "▼" : "▶"} ({Object.keys(latest.data).length})
        </div>
      </button>

      {open && (
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(latest.data).map(([key, value]) => (
            <ContextCard
              key={key}
              title={key}
              value={
                typeof value === "object"
                  ? JSON.stringify(value)
                  : String(value)
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}