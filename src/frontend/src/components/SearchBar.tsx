import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

interface Props {
  initialCity?: string;
  onSubmit: (city: string) => void;
}

export default function SearchBar({ initialCity = 'Almaty', onSubmit }: Props) {
  const [city, setCity] = useState(initialCity);
  const { t } = useTranslation();
  return (
    <div className="sticky top-16 z-30 bg-[color:var(--color-bg)]/90 backdrop-blur py-3 border-b border-[color:var(--color-border)]">
      <div className="max-w-7xl mx-auto px-4 flex gap-2">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--color-muted)]" />
          <Input
            value={city}
            onChange={e => setCity(e.target.value)}
            className="pl-9"
            placeholder="City"
          />
        </div>
        <Button
          onClick={() => onSubmit(city)}
          className="bg-[color:var(--color-primary)] hover:bg-[color:var(--color-primary-hover)] text-white"
        >
          {t('common.search')}
        </Button>
      </div>
    </div>
  );
}
