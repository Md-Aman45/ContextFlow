"use client";

import { useState } from "react";

import {
  useAppStore,
  ConnectionStatus,
} from "@/store";

interface ChatInputProps {
  onSend: (message: string) => void;
}

export function ChatInput({
  onSend,
}: ChatInputProps) {
  const [message, setMessage] = useState("");

  const connectionStatus = useAppStore(
    (state) => state.connectionStatus
  );

  const connected =
    connectionStatus === ConnectionStatus.CONNECTED;

  const handleSend = () => {
    const trimmed = message.trim();

    if (!trimmed || !connected) return;

    onSend(trimmed);

    setMessage("");
  };

  return (
    <div className="border-t border-zinc-800 bg-black px-6 py-5">
      <div className="mx-auto max-w-5xl">

        <div className="flex items-end gap-3">

          <textarea
            rows={1}
            value={message}
            disabled={!connected}
            placeholder={
              connected
                ? "Type your message... (Enter to send, Shift+Enter for a new line)"
                : "Waiting for server connection..."
            }
            onChange={(e) =>
              setMessage(e.target.value)
            }
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                !e.shiftKey
              ) {
                e.preventDefault();

                handleSend();
              }
            }}
            className="
              flex-1
              resize-none
              rounded-2xl
              border
              border-zinc-700
              bg-zinc-900
              px-5
              py-4
              text-white
              placeholder:text-zinc-500
              outline-none
              transition
              focus:border-blue-500
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          />

          <button
            onClick={handleSend}
            disabled={!connected || !message.trim()}
            className="
              rounded-2xl
              bg-blue-600
              px-7
              py-4
              font-medium
              text-white
              transition
              hover:bg-blue-500
              disabled:cursor-not-allowed
              disabled:bg-zinc-700
              disabled:text-zinc-400
            "
          >
            Send
          </button>

        </div>

        <div className="mt-2 flex items-center justify-between text-xs text-zinc-500">

          <span>
            Press <b>Enter</b> to send ·{" "}
            <b>Shift + Enter</b> for a new line
          </span>

          <span>
            {connected
              ? "🟢 Ready"
              : "🔴 Offline"}
          </span>

        </div>

      </div>
    </div>
  );
}