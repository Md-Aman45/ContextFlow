"use client";

import { useState } from "react";
import { useAppStore } from "@/store";
import { ContextCard } from "./ContextCard";

export function ContextPanel() {
  const contexts = useAppStore(
    (state) => state.contexts
  );

  const [open, setOpen] = useState(false);

  const latest =
    contexts.length > 0
      ? contexts[contexts.length - 1]
      : null;

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4">

      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-xl px-2 py-2 transition hover:bg-zinc-900"
      >

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900">
            🧠
          </div>

          <div className="text-left">
            <h2 className="font-semibold text-white">
              Context Snapshot
            </h2>

            <p className="text-xs text-zinc-500">
              Latest synchronized context
            </p>
          </div>

        </div>

        <div className="flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-sm text-zinc-300">

          <span>{contexts.length}</span>

          <span>{open ? "▼" : "▶"}</span>

        </div>

      </button>

      {open && (
        <div className="mt-5">

          {!latest ? (
            <div className="rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/50 px-6 py-10 text-center">

              <div className="mb-3 text-5xl">
                🧠
              </div>

              <h3 className="text-lg font-semibold text-white">
                No Context Available
              </h3>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                Context snapshots received from the
                server will appear here.
              </p>

            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {Object.entries(latest.data).map(
                ([key, value]) => (
                  <ContextCard
                    key={key}
                    title={key}
                    value={
                      typeof value === "object"
                        ? JSON.stringify(value)
                        : String(value)
                    }
                  />
                )
              )}
            </div>
          )}

        </div>
      )}
    </section>
  );
}