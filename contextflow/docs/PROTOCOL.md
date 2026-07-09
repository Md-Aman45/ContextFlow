# Protocol

ContextFlow communicates with the backend using a custom WebSocket protocol.

## Client Messages

- USER_MESSAGE
- TOOL_ACK

## Server Events

- TOKEN
- TOOL_CALL
- TOOL_RESULT
- CONTEXT_SNAPSHOT
- STREAM_END
- ERROR

---

## Streaming Flow

```
USER_MESSAGE

↓

TOKEN

↓

TOKEN

↓

TOOL_CALL

↓

TOOL_RESULT

↓

TOKEN

↓

STREAM_END
```

Streaming responses are rendered incrementally to provide a smooth user experience.