/**
 * ============================================================================
 * ContextFlow Protocol - Shared Types
 * ----------------------------------------------------------------------------
 * These types represent the fundamental building blocks of the communication
 * protocol between the client and the AI Agent server.
 *
 * Every protocol event and message is composed using these shared types.
 * ============================================================================
 */

/**
 * Globally ordered sequence number assigned by the server.
 *
 * Used for:
 * - Ordering messages
 * - Deduplication
 * - State recovery
 */
export type SequenceNumber = number;

/**
 * Unique identifier for a streaming AI response.
 */
export type StreamId = string;

/**
 * Unique identifier for a tool invocation.
 */
export type CallId = string;

/**
 * Unique identifier for a context snapshot.
 */
export type ContextId = string;

/**
 * Heartbeat challenge sent by the server.
 * The client must echo this value back in a PONG.
 */
export type Challenge = string;