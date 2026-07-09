# State Management

ContextFlow uses Zustand for global state management.

The application is organized into multiple slices.

## Connection Slice

Tracks:

- Connecting
- Connected
- Reconnecting
- Disconnected

---

## Message Slice

Stores:

- User messages
- Assistant messages
- Streaming state

---

## Tool Slice

Tracks:

- Running tools
- Completed tools
- Tool results

---

## Context Slice

Stores synchronized context snapshots received from the backend.

---

## Benefits

- Simple API
- Fast updates
- Minimal boilerplate
- Easy scalability