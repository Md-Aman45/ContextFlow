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

      default:
        return {
          color: "bg-red-500",
          text: "Disconnected",
        };
    }
  };

  const badge = getBadge();

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-4">

        {/* Left */}

        <div>
          <h1 className="text-2xl font-bold">
            ⚡ ContextFlow
          </h1>

          <p className="text-sm text-zinc-500">
            AI Protocol Playground
          </p>
        </div>

        {/* Right */}

        <div className="flex items-center gap-6">

          <div className="flex items-center gap-2">
            <span
              className={`h-3 w-3 rounded-full ${badge.color} animate-pulse`}
            />

            <span className="font-medium">
              {badge.text}
            </span>
          </div>

          <div className="text-sm text-zinc-400">
            Messages:
            <span className="ml-1 font-semibold text-white">
              {messages.length}
            </span>
          </div>

          <div className="text-sm text-zinc-400">
            Tools:
            <span className="ml-1 font-semibold text-white">
              {tools.length}
            </span>
          </div>

          <div className="text-sm text-zinc-400">
            Context:
            <span className="ml-1 font-semibold text-white">
              {contexts.length}
            </span>
          </div>

        </div>
      </div>
    </header>
  );
}