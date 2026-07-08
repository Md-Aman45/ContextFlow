interface ContextCardProps {
  title: string;
  value: string;
}

export function ContextCard({
  title,
  value,
}: ContextCardProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 transition hover:border-zinc-700">

      <div className="text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500">
        {title}
      </div>

      <div className="mt-3 break-words text-sm leading-6 text-white">
        {value}
      </div>

    </div>
  );
}