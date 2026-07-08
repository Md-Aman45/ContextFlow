import type { ConnectionSlice } from "./slices/connectionSlice";
import type { StreamSlice } from "./slices/streamSlice";
import type { MessageSlice } from "./slices/messageSlice";
import type { ToolSlice } from "./slices/toolSlice";
import type { ContextSlice } from "./slices/contextSlice";
import {
  ConversationSlice,
} from "./slices/conversationSlice";

export type AppStore =
  ConnectionSlice &
  StreamSlice &
  MessageSlice &
  ToolSlice &
  ContextSlice &
  ConnectionSlice &
  ConversationSlice;





  

// export type AppStore =
//     ConnectionSlice
//   & StreamSlice
//   & MessageSlice
//   & ToolSlice
//   & ContextSlice
//   & TimelineSlice;