import type {
  CallId,
  Challenge,
  ContextId,
  SequenceNumber,
  StreamId,
} from "./types";

/**
 * Every server event contains these fields.
 */
export interface BaseServerEvent {
  type: ServerEventType;
  seq: SequenceNumber;
}

/* -------------------------------------------------------------------------- */
/*                                Token Stream                                */
/* -------------------------------------------------------------------------- */

export interface TokenEvent extends BaseServerEvent {
  type: "TOKEN";
  text: string;
  stream_id: StreamId;
}

export interface StreamEndEvent extends BaseServerEvent {
  type: "STREAM_END";
  stream_id: StreamId;
}

/* -------------------------------------------------------------------------- */
/*                                Tool Events                                 */
/* -------------------------------------------------------------------------- */

export interface ToolCallEvent extends BaseServerEvent {
  type: "TOOL_CALL";
  call_id: CallId;
  tool_name: string;
  args: Record<string, unknown>;
  stream_id: StreamId;
}

export interface ToolResultEvent extends BaseServerEvent {
  type: "TOOL_RESULT";
  call_id: CallId;
  result: Record<string, unknown>;
  stream_id: StreamId;
}

/* -------------------------------------------------------------------------- */
/*                               Context Events                               */
/* -------------------------------------------------------------------------- */

export interface ContextSnapshotEvent extends BaseServerEvent {
  type: "CONTEXT_SNAPSHOT";
  context_id: ContextId;
  data: Record<string, unknown>;
}

/* -------------------------------------------------------------------------- */
/*                              Heartbeat Events                              */
/* -------------------------------------------------------------------------- */

export interface PingEvent extends BaseServerEvent {
  type: "PING";
  challenge: Challenge;
}

/* -------------------------------------------------------------------------- */
/*                                 Error Event                                */
/* -------------------------------------------------------------------------- */

export interface ErrorEvent extends BaseServerEvent {
  type: "ERROR";
  code: string;
  message: string;
}

/* -------------------------------------------------------------------------- */

export type ServerEvent =
  | TokenEvent
  | ToolCallEvent
  | ToolResultEvent
  | ContextSnapshotEvent
  | PingEvent
  | StreamEndEvent
  | ErrorEvent;

export type ServerEventType = ServerEvent["type"];