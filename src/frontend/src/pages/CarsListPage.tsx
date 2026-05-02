import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { carsApi } from '@/api/cars';
import ListingCard from '@/components/ListingCard';
import SearchBar from '@/components/SearchBar';
import EmptyState from '@/components/EmptyState';
import { Skeleton } from '@/components/ui/skeleton';

export default function CarsListPage() {
  const { t } = useTranslation();
  const [city, setCity] = useState('Almaty');
  const cars = useQuery({ queryKey: ['cars', city], queryFn: () => carsApi.list(city) });

  return (
    <div>
      <SearchBar initialCity={city} onSubmit={setCity} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="font-display text-3xl mb-6">{t('cars.title')}</h1>
        {cars.isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[16/10] rounded-[16px]" />
            ))}
          </div>
        )}
        {cars.data?.length === 0 && <EmptyState title={t('cars.empty')} />}
        {cars.data && cars.data.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.data.map(c => (
              <ListingCard
                key={c.id}
                to={`/cars/${c.id}`}
                imageUrl={c.imageUrl}
                title={`${c.brand} ${c.model}`}
                subtitle={`${c.year} · ${c.fuelType} · ${c.seats} seats`}
                price={t('cars.pricePerHour', { price: c.pricePerHour.toLocaleString('ru-RU') })}
                rating={c.rating}
                available={c.available}
                accent="purple"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
