import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const LANGS = [
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' },
  { code: 'kk', label: 'KK' },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm">
          {i18n.language.toUpperCase().slice(0, 2)}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-32">
        <div className="flex flex-col gap-1">
          {LANGS.map(l => (
            <Button
              key={l.code}
              variant="ghost"
              size="sm"
              onClick={() => i18n.changeLanguage(l.code)}
            >
              {l.label}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
