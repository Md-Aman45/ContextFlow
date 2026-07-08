import type {
  CallId,
  Challenge,
  SequenceNumber,
} from "./types";

/**
 * USER_MESSAGE
 */
export interface UserMessage {
  type: "USER_MESSAGE";
  content: string;
}

/**
 * PONG
 */
export interface PongMessage {
  type: "PONG";
  echo: Challenge;
}

/**
 * RESUME
 */
export interface ResumeMessage {
  type: "RESUME";
  last_seq: SequenceNumber;
}

/**
 * TOOL_ACK
 */
export interface ToolAckMessage {
  type: "TOOL_ACK";
  call_id: CallId;
}

export type ClientMessage =
  | UserMessage
  | PongMessage
  | ResumeMessage
  | ToolAckMessage;

export type ClientMessageType = ClientMessage["type"];