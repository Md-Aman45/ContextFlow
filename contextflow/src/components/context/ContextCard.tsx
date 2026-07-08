interface ContextCardProps {
  title: string;
  value: string;
}

export function ContextCard({
  title,
  value,
}: ContextCardProps) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-3">
      <div className="text-xs uppercase tracking-wide text-zinc-500">
        {title}
      </div>

      <div className="mt-1 break-words text-sm font-medium text-white">
        {value}
      </div>
    </div>
  );
}