"use client";

import { useAppStore, ConnectionStatus } from "@/store";

export function Navbar() {
  const connectionStatus = useAppStore(
    (state) => state.connectionStatus
  );

  const messages = useAppStore(
    (state) => state.messages.length
  );

  const tools = useAppStore(
    (state) => state.tools.length
  );

  const contexts = useAppStore(
    (state) => state.contexts.length
  );

  const badge = (() => {
    switch (connectionStatus) {
      case ConnectionStatus.CONNECTED:
        return {
          text: "Connected",
          dot: "bg-emerald-500",
        };

      case ConnectionStatus.CONNECTING:
        return {
          text: "Connecting",
          dot: "bg-yellow-500",
        };

      case ConnectionStatus.RECONNECTING:
        return {
          text: "Reconnecting",
          dot: "bg-orange-500",
        };

      default:
        return {
          text: "Disconnected",
          dot: "bg-red-500",
        };
    }
  })();

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">

        {/* Left */}

        <div className="min-w-0">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            ⚡ ContextFlow
          </h1>

          <p className="text-sm text-zinc-500">
            Protocol-Driven AI Client
          </p>
        </div>

        {/* Right */}

        <div className="flex flex-wrap items-center gap-2">

          <StatusBadge
            color={badge.dot}
            text={badge.text}
          />

          <SmallStat
            icon="💬"
            value={messages}
          />

          <SmallStat
            icon="🛠"
            value={tools}
          />

          <SmallStat
            icon="🧠"
            value={contexts}
          />

        </div>

      </div>
    </header>
  );
}

interface StatusBadgeProps {
  color: string;
  text: string;
}

function StatusBadge({
  color,
  text,
}: StatusBadgeProps) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 px-3 py-2">

      <span
        className={`h-2.5 w-2.5 rounded-full ${color} animate-pulse`}
      />

      <span className="text-sm font-medium text-white">
        {text}
      </span>

    </div>
  );
}

interface SmallStatProps {
  icon: string;
  value: number;
}

function SmallStat({
  icon,
  value,
}: SmallStatProps) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-2">

      <span className="text-sm">
        {icon}
      </span>

      <span className="text-sm font-semibold text-white">
        {value}
      </span>

    </div>
  );
}