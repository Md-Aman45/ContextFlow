interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  completed: boolean;
  loading?: boolean;
}

import { MarkdownRenderer } from "./MarkdownRenderer";

export function ChatMessage({
  role,
  content,
  completed,
  loading,
}: ChatMessageProps) {
  const isUser = role === "user";

  // Temporary assistant placeholder
  if (loading) {
    return (
      <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-5 shadow-md">
        <div className="mb-4 text-xs font-semibold uppercase tracking-wide text-zinc-500">
          Assistant
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500" />
            <span className="text-zinc-300">
              Thinking...
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-purple-500" />
            <span className="text-sm text-zinc-500">
              Understanding your request
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            <span className="text-sm text-zinc-500">
              Searching context
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-yellow-500" />
            <span className="text-sm text-zinc-500">
              Preparing response
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[75%] rounded-xl p-4 shadow-md ${
          isUser
            ? "bg-blue-600 text-white"
            : "border border-zinc-700 bg-zinc-900 text-white"
        }`}
      >
        <div className="mb-2 text-xs font-semibold opacity-70">
          {isUser ? "You" : "Assistant"}
        </div>

        <div className="prose prose-invert max-w-none">
          <MarkdownRenderer content={content} />

          {!completed && !isUser && (
            <span className="animate-pulse">▋</span>
          )}
        </div>
      </div>
    </div>
  );
}