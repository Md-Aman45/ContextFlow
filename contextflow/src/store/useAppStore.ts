import { create } from "zustand";

import type { AppStore } from "./types";

import { createConnectionSlice } from "./slices/connectionSlice";
import { createStreamSlice } from "./slices/streamSlice";
import { createMessageSlice } from "./slices/messageSlice";
import { createToolSlice } from "./slices/toolSlice";
import { createContextSlice } from "./slices/contextSlice";
import { createConversationSlice } from "./slices/conversationSlice";

export const useAppStore = create<AppStore>()((...a) => ({
  ...createConnectionSlice(...a),
  ...createStreamSlice(...a),
  ...createMessageSlice(...a),
  ...createToolSlice(...a),
  ...createContextSlice(...a),
  ...createConversationSlice(...a),
}));