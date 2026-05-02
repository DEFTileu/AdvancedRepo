import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Props {
  to: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  price: string;
  rating: number;
  available: boolean;
  accent?: 'green' | 'purple';
}

export default function ListingCard({
  to,
  imageUrl,
  title,
  subtitle,
  price,
  rating,
  available,
  accent = 'green',
}: Props) {
  return (
    <Link to={to} className="group block">
      <div className="relative overflow-hidden rounded-[16px] bg-[color:var(--color-surface)] border border-[color:var(--color-border)] transition-shadow hover:shadow-lg">
        <div className="aspect-[16/10] overflow-hidden bg-[color:var(--color-primary-soft)]">
          <img
            src={imageUrl}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={e => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
        {!available && (
          <Badge className="absolute top-3 left-3 bg-[color:var(--color-danger)] text-white">
            Unavailable
          </Badge>
        )}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-lg leading-tight">{title}</h3>
            <div className="flex items-center gap-1 text-sm">
              <Star className="w-4 h-4 fill-[color:var(--color-star)] text-[color:var(--color-star)]" />
              <span className="price">{rating.toFixed(1)}</span>
            </div>
          </div>
          <p className="text-sm text-[color:var(--color-muted)] mt-1">{subtitle}</p>
          <p
            className={`mt-3 font-semibold price ${
              accent === 'purple'
                ? 'text-[color:var(--color-accent)]'
                : 'text-[color:var(--color-primary)]'
            }`}
          >
            {price}
          </p>
        </div>
      </div>
    </Link>
  );
}
