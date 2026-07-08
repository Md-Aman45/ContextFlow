"use client";

import {
  useAppStore,
  ConnectionStatus as Status,
} from "@/store";

export function ConnectionStatus() {
  const status = useAppStore(
    (state) => state.connectionStatus
  );

  return (
    <div className="rounded-lg border p-4">
      <h2 className="text-lg font-semibold">
        Connection
      </h2>

      <p>{status}</p>
    </div>
  );
}