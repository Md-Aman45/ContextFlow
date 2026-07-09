# WebSocket Lifecycle

The application maintains a persistent WebSocket connection.

## Lifecycle

```
Disconnected

↓

Connecting

↓

Connected

↓

Connection Lost

↓

Reconnecting

↓

Connected
```

---

## Reconnection

The client automatically reconnects whenever the connection is lost.

The UI displays the current connection status through the navigation bar.

---

## Message Handling

Incoming protocol events are dispatched to the runtime and synchronized with the Zustand store before updating the UI.