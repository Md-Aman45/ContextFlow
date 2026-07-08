"use client";

import { useState } from "react";

import { ConnectionStatus as ConnectionStatusCard } from "@/components/ConnectionStatus";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { useProtocolRuntime } from "@/hooks/useProtocolRuntime";
import { useAppStore, ConnectionStatus } from "@/store";
import { ToolTimeline } from "@/components/tool/ToolTimeline";
import { ContextPanel } from "@/components/context/ContextPanel";
import { Navbar } from "@/components/Navbar";


export default function Home() {
  const runtime = useProtocolRuntime();

  const [message, setMessage] = useState("");

  const connectionStatus = useAppStore(
    (state) => state.connectionStatus
  );

  return (
    // <main className="min-h-screen bg-black text-white">

    //   <Navbar />
    //   <div className="mx-auto flex max-w-4xl flex-col gap-6 p-8">

    //   <ChatWindow />

    //   <ContextPanel />

    //   <ToolTimeline />

    //   <div className="flex gap-3">
    //     <input
    //       className="flex-1 rounded-lg border p-3"
    //       placeholder="Type a message..."
    //       value={message}
    //       onChange={(e) =>
    //         setMessage(e.target.value)
    //       }
    //     />

    //     <button
    //       disabled={connectionStatus !== ConnectionStatus.CONNECTED}
    //       className="rounded-lg bg-black px-5 py-3 text-white disabled:opacity-50"
    //       onClick={() => {
    //         runtime.sendMessage(message);
    //         setMessage("");
    //       }}
    //     >
    //       Send
    //     </button>
    //   </div>
    // </div>
    // </main>

    <main className="flex h-screen flex-col bg-black">

  {/* Navbar */}
  <Navbar />

  {/* Chat Area */}
  <div className="flex-1 overflow-hidden">
    <div className="mx-auto flex h-full max-w-5xl flex-col">

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-8 py-6">

        <ChatWindow />

        {/* <ContextPanel />

        <ToolTimeline /> */}

      </div>

      {/* Fixed Input */}
      <div className="border-t border-zinc-800 bg-black p-6">
        <div className="flex gap-3">

          <textarea
            className="flex-1 resize-none rounded-lg border p-3"
            rows={1}
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();

                if (!message.trim()) return;

                runtime.sendMessage(message);
                setMessage("");
              }
            }}
          />

          <button
            disabled={
              connectionStatus !==
              ConnectionStatus.CONNECTED
            }
            className="rounded-lg bg-blue-600 px-6 text-white disabled:opacity-50"
            onClick={() => {
              runtime.sendMessage(message);
              setMessage("");
            }}
          >
            Send
          </button>

        </div>
      </div>

    </div>
  </div>

</main>
  );
}