import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Props {
  unitLabel: 'hour' | 'night';
  unitPrice: number;
  onSubmit: (start: string, end: string) => void;
  isSubmitting?: boolean;
  accent?: 'green' | 'purple';
}

function formatTenge(n: number): string {
  // Manual ru-RU style formatting using a regular space as thousands separator
  // (avoids non-breaking-space issues that break test regex matching).
  const sign = n < 0 ? '-' : '';
  const abs = Math.abs(Math.round(n));
  const str = abs.toString();
  const withSeparators = str.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return `${sign}${withSeparators}`;
}

export default function BookingWidget({
  unitLabel,
  unitPrice,
  onSubmit,
  isSubmitting,
  accent = 'green',
}: Props) {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const valid = !!start && !!end && new Date(end) > new Date(start);
  const units = useMemo(() => {
    if (!valid) return 0;
    const diffMs = new Date(end).getTime() - new Date(start).getTime();
    const div = unitLabel === 'hour' ? 1000 * 60 * 60 : 1000 * 60 * 60 * 24;
    return Math.max(1, Math.round(diffMs / div));
  }, [start, end, unitLabel, valid]);

  const total = units * unitPrice;
  const cta =
    accent === 'purple'
      ? 'bg-[color:var(--color-accent)] hover:bg-[color:var(--color-accent-hover)] text-white'
      : 'bg-[color:var(--color-primary)] hover:bg-[color:var(--color-primary-hover)] text-white';

  return (
    <div className="rounded-[16px] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6 space-y-4 sticky top-24">
      <div className="flex items-baseline justify-between">
        <span className="font-display text-2xl price">{formatTenge(unitPrice)} ₸</span>
        <span className="text-sm text-[color:var(--color-muted)]">/ {unitLabel}</span>
      </div>
      <div className="space-y-2">
        <Label htmlFor="start">Start</Label>
        <Input
          id="start"
          type="datetime-local"
          value={start}
          onChange={e => setStart(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="end">End</Label>
        <Input id="end" type="datetime-local" value={end} onChange={e => setEnd(e.target.value)} />
      </div>
      <div className="flex items-baseline justify-between pt-2 border-t border-[color:var(--color-border)]">
        <span className="text-sm text-[color:var(--color-muted)]">Total</span>
        <span className="font-display text-xl price">{formatTenge(total)} ₸</span>
      </div>
      <Button
        disabled={!valid || isSubmitting}
        onClick={() => onSubmit(start, end)}
        className={`w-full ${cta}`}
      >
        {isSubmitting ? 'Booking…' : `Book ${unitLabel === 'hour' ? 'car' : 'stay'}`}
      </Button>
    </div>
  );
}
