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
    <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 p-5 shadow-sm transition-all duration-200 hover:border-zinc-700">

      {/* Timeline Dot */}
      <div
        className={`absolute left-0 top-0 h-full w-1 ${
          running ? "bg-yellow-500" : "bg-green-500"
        }`}
      />

      {/* Header */}
      <div className="flex items-start justify-between gap-4">

        <div>
          <h3 className="text-base font-semibold text-white">
            🔧 {formatToolName(toolName)}
          </h3>

          <p className="mt-1 text-xs text-zinc-500">
            Tool Execution
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            running
              ? "bg-yellow-500/10 text-yellow-400"
              : "bg-green-500/10 text-green-400"
          }`}
        >
          {running ? "Running..." : "Completed"}
        </span>
      </div>

      {/* Progress */}

      {running && (
        <div className="mt-5">
          <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
            <div className="h-full w-1/3 animate-pulse rounded-full bg-yellow-400" />
          </div>
        </div>
      )}

      {/* Arguments */}

      {Object.keys(args).length > 0 && (
        <div className="mt-6">

          <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Arguments
          </div>

          <div className="overflow-hidden rounded-xl border border-zinc-800">

            {Object.entries(args).map(([key, value], index) => (
              <div
                key={key}
                className={`flex items-start justify-between gap-4 px-4 py-3 text-sm ${
                  index !== Object.entries(args).length - 1
                    ? "border-b border-zinc-800"
                    : ""
                }`}
              >
                <span className="font-medium text-zinc-400">
                  {key}
                </span>

                <span className="max-w-[60%] break-all text-right text-zinc-100">
                  {String(value)}
                </span>
              </div>
            ))}

          </div>

        </div>
      )}

      {/* Result */}

      {result &&
        Object.keys(result).length > 0 && (
          <div className="mt-6">

            <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Result
            </div>

            <div className="overflow-hidden rounded-xl border border-zinc-800">

              {Object.entries(result).map(([key, value], index) => (
                <div
                  key={key}
                  className={`flex items-start justify-between gap-4 px-4 py-3 text-sm ${
                    index !== Object.entries(result).length - 1
                      ? "border-b border-zinc-800"
                      : ""
                  }`}
                >
                  <span className="font-medium text-zinc-400">
                    {key}
                  </span>

                  <span className="max-w-[60%] break-all text-right text-zinc-100">
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