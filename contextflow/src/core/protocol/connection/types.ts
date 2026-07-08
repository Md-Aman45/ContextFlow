import type { ServerEvent } from "../events";

/**
 * Callback invoked whenever a protocol event
 * has been successfully parsed.
 */
export type ProtocolEventHandler = (event: ServerEvent) => void;