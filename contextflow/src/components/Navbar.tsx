"use client";

import { useAppStore, ConnectionStatus } from "@/store";

export function Navbar() {
  const connectionStatus = useAppStore(
    (state) => state.connectionStatus
  );

  const messages = useAppStore(
    (state) => state.messages
  );

  const tools = useAppStore(
    (state) => state.tools
  );

  const contexts = useAppStore(
    (state) => state.contexts
  );

  const getBadge = () => {
    switch (connectionStatus) {
      case ConnectionStatus.CONNECTED:
        return {
          color: "bg-green-500",
          text: "Connected",
        };

      case ConnectionStatus.CONNECTING:
        return {
          color: "bg-yellow-500",
          text: "Connecting",
        };

      case ConnectionStatus.RECONNECTING:
        return {
          color: "bg-orange-500",
          text: "Reconnecting",
        };

      default:
        return {
          color: "bg-red-500",
          text: "Disconnected",
        };
    }
  };

  const badge = getBadge();

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">

        {/* Left */}

        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">
            ⚡ ContextFlow
          </h1>

          <p className="text-sm text-zinc-500">
            Protocol-Driven AI Client
          </p>
        </div>

        {/* Right */}

        <div className="flex items-center gap-4">

          <div className="flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2">
            <span
              className={`h-2.5 w-2.5 rounded-full ${badge.color} animate-pulse`}
            />

            <span className="text-sm font-medium">
              {badge.text}
            </span>
          </div>

          <div className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm">
            💬 <span className="font-semibold">{messages.length}</span>
          </div>

          <div className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm">
            🛠 <span className="font-semibold">{tools.length}</span>
          </div>

          <div className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm">
            🧠 <span className="font-semibold">{contexts.length}</span>
          </div>

        </div>

      </div>
    </header>
  );
}