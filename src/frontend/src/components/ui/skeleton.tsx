import { cn } from '@/lib/cn';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-[12px] bg-[color:var(--color-primary-soft)]', className)}
      {...props}
    />
  );
}

export { Skeleton };
