interface ContextCardProps {
  title: string;
  value: string;
}

export function ContextCard({
  title,
  value,
}: ContextCardProps) {
  return (
    <div className="group rounded-xl border border-zinc-800 bg-zinc-900 p-4 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-800/60">
      <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
        {title.replace(/_/g, " ")}
      </div>

      <div className="break-words text-sm leading-6 font-medium text-zinc-100">
        {value}
      </div>
    </div>
  );
}