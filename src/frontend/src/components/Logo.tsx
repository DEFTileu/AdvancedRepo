export default function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 font-display text-xl ${className}`}>
      <span className="inline-block w-7 h-7 rounded-md bg-[color:var(--color-primary)] grid place-items-center text-white font-bold">
        A
      </span>
      <span>AnyKrysha</span>
    </span>
  );
}
