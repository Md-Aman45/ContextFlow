# Architecture

## Overview

ContextFlow is a protocol-driven AI client built with Next.js, React, TypeScript, and Zustand.

Instead of communicating through traditional REST APIs, the application establishes a persistent WebSocket connection to receive real-time protocol events.

These events are parsed by the runtime layer and synchronized with a centralized Zustand store, allowing the UI to react immediately to streaming responses, tool execution, and context updates.

---

## High-Level Architecture

```
User
  │
  ▼
React Components
  │
  ▼
Zustand Store
  │
  ▼
Protocol Runtime
  │
  ▼
Connection Manager
  │
  ▼
WebSocket
  │
  ▼
AI Backend
```

---

## Main Layers

### UI Layer

Responsible for rendering:

- Chat messages
- Tool execution timeline
- Context snapshots
- Connection status

---

### Runtime Layer

Responsible for:

- Parsing protocol events
- Handling streaming
- Sending user messages
- Dispatching state updates

---

### Store Layer

Application state is managed using Zustand.

Slices include:

- Connection
- Messages
- Tools
- Context
- Streams

---

## Event Flow

```
User Message

↓

WebSocket

↓

Protocol Event

↓

Runtime

↓

Zustand

↓

React UI
```