import { formatToolName } from "@/lib/formatToolName";

interface ToolCardProps {
  toolName: string;
  status: "running" | "completed";
  args: Record<string, unknown>;
  result?: Record<string, unknown>;
}

export function ToolCard({
  toolName,
  status,
  args,
  result,
}: ToolCardProps) {
  const running = status === "running";

  return (
    <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-white">
          🔧 {formatToolName(toolName)}
        </h3>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            running
              ? "bg-yellow-500/10 text-yellow-400"
              : "bg-green-500/10 text-green-400"
          }`}
        >
          {running ? "⏳ Running" : "✅ Completed"}
        </span>
      </div>

      {/* Loading Bar */}
      {running && (
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-800">
          <div className="h-full w-1/3 animate-pulse rounded-full bg-yellow-400" />
        </div>
      )}

      {/* Arguments */}
      <div className="mt-5">
        <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
          Arguments
        </div>

        <div className="space-y-2 rounded-lg bg-zinc-950 p-3">
          {Object.entries(args).map(([key, value]) => (
            <div
              key={key}
              className="flex items-start justify-between gap-3 text-sm"
            >
              <span className="text-zinc-400">{key}</span>

              <span className="break-all text-right text-white">
                {String(value)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Result */}
      {result && (
        <div className="mt-5">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Result
          </div>

          <div className="space-y-2 rounded-lg bg-zinc-950 p-3">
            {Object.entries(result).map(([key, value]) => (
              <div
                key={key}
                className="flex items-start justify-between gap-3 text-sm"
              >
                <span className="text-zinc-400">{key}</span>

                <span className="break-all text-right text-white">
                  {String(value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}