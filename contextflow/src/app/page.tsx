"use client";

import { Navbar } from "@/components/Navbar";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { ChatInput } from "@/components/chat/ChatInput";

import { useProtocolRuntime } from "@/hooks/useProtocolRuntime";

export default function Home() {
  const runtime = useProtocolRuntime();

  return (
    <main className="flex h-screen flex-col bg-black">

      <Navbar />

      <div className="flex-1 overflow-hidden">
        <div className="mx-auto flex h-full w-full max-w-6xl flex-col">

          <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8">
            <ChatWindow />
          </div>

          <ChatInput
            onSend={runtime.sendMessage}
          />

        </div>
      </div>

    </main>
  );
}