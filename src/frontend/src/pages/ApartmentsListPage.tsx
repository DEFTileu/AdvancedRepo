import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { apartmentsApi } from '@/api/apartments';
import ListingCard from '@/components/ListingCard';
import SearchBar from '@/components/SearchBar';
import EmptyState from '@/components/EmptyState';
import { Skeleton } from '@/components/ui/skeleton';

export default function ApartmentsListPage() {
  const { t } = useTranslation();
  const [city, setCity] = useState('Almaty');
  const apartments = useQuery({
    queryKey: ['apartments', city],
    queryFn: () => apartmentsApi.list(city),
  });

  return (
    <div>
      <SearchBar initialCity={city} onSubmit={setCity} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="font-display text-3xl mb-6">{t('apartments.title')}</h1>
        {apartments.isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[16/10] rounded-[16px]" />
            ))}
          </div>
        )}
        {apartments.data?.length === 0 && <EmptyState title={t('apartments.empty')} />}
        {apartments.data && apartments.data.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apartments.data.map(a => (
              <ListingCard
                key={a.id}
                to={`/apartments/${a.id}`}
                imageUrl={a.imageUrl}
                title={a.title}
                subtitle={`${a.address} · ${a.bedrooms} bd · ${a.guests} guests`}
                price={t('apartments.pricePerNight', {
                  price: a.pricePerNight.toLocaleString('ru-RU'),
                })}
                rating={a.rating}
                available={a.available}
                accent="green"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
