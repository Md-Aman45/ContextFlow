# ⚡ ContextFlow

> A protocol-driven AI client demonstrating real-time streaming, tool execution, context synchronization, and resilient WebSocket communication.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![React](https://img.shields.io/badge/React-19-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4-38BDF8)
![Zustand](https://img.shields.io/badge/Zustand-State-orange)
![WebSocket](https://img.shields.io/badge/WebSocket-Real--Time-success)

---

# 🚀 Overview

ContextFlow is a modern protocol-driven AI client built with Next.js, React, TypeScript, Zustand, and WebSockets.

Instead of using traditional REST-based request/response communication, ContextFlow demonstrates how modern AI assistants communicate through an event-driven protocol supporting real-time streaming, tool execution, and synchronized context updates.

The project simulates an enterprise-grade AI client where every protocol event is visualized, making the internal workflow transparent and easy to understand.

---

# ✨ Key Highlights

- ⚡ Real-time token streaming
- 🔧 Live tool execution timeline
- 🧠 Context synchronization
- 🔄 Automatic WebSocket reconnection
- 💾 Persistent application state
- 📱 Fully responsive UI
- 🎯 Protocol-driven architecture
- 🧩 Modular runtime design

---

# ✨ Features

## 💬 Streaming Responses

Assistant responses stream token-by-token in real time instead of waiting for the complete message.

---

## 🔧 Tool Execution Timeline

Visualizes every tool invocation with:

- Tool Name
- Running Status
- Arguments
- Final Result

---

## 🧠 Context Synchronization

Context snapshots are synchronized independently from chat messages, allowing structured protocol data to remain separate from conversations.

---

## 🔌 WebSocket Lifecycle

Supports complete connection management:

- Connecting
- Connected
- Reconnecting
- Disconnected

---

## ♻ Automatic Reconnection

Implements exponential backoff:

```
500ms
↓
1s
↓
2s
↓
4s
↓
8s
↓
10s
```

---

## 💾 Persistent State

Built with Zustand Persist.

The application preserves:

- Conversation history
- Tool executions
- Context snapshots

even after refreshing the browser.

---

## 📱 Responsive Design

Optimized for:

- Desktop
- Tablet
- Mobile

---

# 🏗 Architecture

```text
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

# 📡 Protocol Flow

```text
User
 │
 ▼
USER_MESSAGE
 │
 ▼
Server
 │
 ├── TOKEN
 ├── TOKEN
 ├── TOKEN
 ├── TOOL_CALL
 ├── TOOL_RESULT
 ├── CONTEXT_SNAPSHOT
 └── STREAM_END
```

---

# 🔄 Connection Lifecycle

```text
Disconnected
      │
      ▼
Connecting
      │
      ▼
Connected
      │
Connection Lost
      │
      ▼
Reconnecting
      │
      ▼
Connected
```

---

# 🛠 Tech Stack

| Technology | Purpose |
|------------|----------|
| Next.js 15 | Frontend Framework |
| React 19 | UI Library |
| TypeScript | Type Safety |
| Tailwind CSS | Styling |
| Zustand | State Management |
| WebSocket | Real-time Communication |
| Markdown | Assistant Rendering |

---

# 📂 Project Structure

```text
ContextFlow
│
├── app/
├── components/
├── core/
│   ├── protocol/
│   ├── runtime/
│   ├── parser/
│   └── messages/
│
├── hooks/
├── lib/
├── store/
├── screenshots/
├── docs/
└── README.md
```

---

# 🚀 Getting Started

Install dependencies

```bash
npm install
```

Start the frontend

```bash
npm run dev
```

Run the mock backend

```bash
npm run server
```

Open:

```
http://localhost:3000
```

---

# 📸 Screenshots

## Landing Page

![Landing](./screenshots/landing_page_01.png)

---

## Streaming Conversation

![Chat 1](./screenshots/chat_01.png)

![Chat 2](./screenshots/chat_02.png)

---

## Context Snapshot

![Context](./screenshots/context_snapshot.png)

---

## Tool Timeline

![Tools](./screenshots/tool_timeline.png)

---

## Mobile Responsive

![Mobile](./screenshots/mobile.png)

---

# 🎯 Design Decisions

- Event-driven architecture instead of REST polling
- Separate runtime layer from UI components
- Independent context synchronization
- Modular protocol parser
- Automatic reconnection with exponential backoff
- Persistent global state using Zustand

---

# 📹 Demo

A walkthrough video covering:

- Project architecture
- WebSocket lifecycle
- Streaming responses
- Tool execution
- Context synchronization
- Responsive design

will be available soon.

---

# 📚 Documentation

Additional documentation is available in the **docs/** folder.

- Architecture
- Runtime
- Protocol
- WebSocket Lifecycle
- State Management
- Reconnection Strategy

---

# 🚀 Future Improvements

- Conversation history sidebar
- Multiple AI sessions
- Authentication
- Theme customization
- Plugin system
- Real backend integration
- Docker deployment

---

# 👨‍💻 Author

**Md Aman**

GitHub

https://github.com/Md-Aman45

LinkedIn

https://www.linkedin.com/in/md-aman-7941a0355/

Portfolio

https://md-aman45.github.io/

---

# 📄 License

This project is licensed under the MIT License.