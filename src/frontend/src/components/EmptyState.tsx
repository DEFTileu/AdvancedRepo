export default function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="text-center py-16">
      <h3 className="font-display text-2xl mb-2">{title}</h3>
      {hint && <p className="text-[color:var(--color-muted)]">{hint}</p>}
    </div>
  );
}
