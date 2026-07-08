"use client";

import { useEffect, useRef } from "react";

import { ProtocolRuntime } from "@/core/runtime";
import {
  ConnectionState,
  type ConnectionLifecycleEvent,
} from "@/core/protocol/connection";

import {
  useAppStore,
  ConnectionStatus,
} from "@/store";

export function useProtocolRuntime() {
  const runtimeRef = useRef<ProtocolRuntime | null>(null);

  const setConnectionStatus =
    useAppStore((state) => state.setConnectionStatus);

  const addUserMessage =
    useAppStore((state) => state.addUserMessage);

  const showThinking = useAppStore(
    (state) => state.showThinking
  );

  const appendAssistantToken =
    useAppStore((state) => state.appendAssistantToken);

  const finishAssistantMessage =
    useAppStore((state) => state.finishAssistantMessage);


  const startTool = useAppStore(
    (state) => state.startTool
  );

  const finishTool = useAppStore(
    (state) => state.finishTool
  );

  const addContext = useAppStore(
    (state) => state.addContext
  );

  useEffect(() => {
    const runtime = new ProtocolRuntime(
      "ws://localhost:4747/ws",

      (event) => {
        switch (event.type) {
          case "TOKEN":
            appendAssistantToken(
              event.stream_id,
              event.text
            );
            break;

          case "STREAM_END":
            finishAssistantMessage(
              event.stream_id
            );
            runtimeRef.current?.reset();
            break;

          case "CONTEXT_SNAPSHOT":
            addContext(
            event.context_id,
            event.data
          );
          break;

          case "TOOL_CALL":
            startTool(
            event.call_id,
            event.tool_name,
            event.args
          );


          runtimeRef.current?.send({
            type: "TOOL_ACK",
            call_id: event.call_id,
          });

          break;

          case "TOOL_RESULT":
            finishTool(
            event.call_id,
            event.result
          );

          break;

          case "ERROR":
            console.error(event.message);
            break;

          default:
            break;
        }
      },

      (event: ConnectionLifecycleEvent) => {
        switch (event.state) {
          case ConnectionState.CONNECTING:
            setConnectionStatus(ConnectionStatus.CONNECTING);
            break;

          case ConnectionState.CONNECTED:
            setConnectionStatus(ConnectionStatus.CONNECTED);
            break;

          case ConnectionState.RECONNECTING:
            setConnectionStatus(ConnectionStatus.RECONNECTING);
            break;

          case ConnectionState.DISCONNECTED:
          case ConnectionState.CLOSED:
            setConnectionStatus(ConnectionStatus.DISCONNECTED);
            break;
        }
      }
    );

    runtimeRef.current = runtime;

    runtime.connect();

    return () => {
      runtime.disconnect();
    };
  }, [
    setConnectionStatus,
    appendAssistantToken,
    finishAssistantMessage,
    startTool,
    finishTool,
    addContext,
  ]);

  return {
    connect: () => runtimeRef.current?.connect(),

    disconnect: () => runtimeRef.current?.disconnect(),

    sendMessage: (content: string) => {
      const trimmed = content.trim();

      if (!trimmed) return;

      addUserMessage(trimmed);

      showThinking();

      runtimeRef.current?.send({
        type: "USER_MESSAGE",
        content: trimmed,
      });
    },
  };
}