import { useQuery, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { comboApi } from '@/api/combo';
import { bookingsApi } from '@/api/bookings';
import { ApiException } from '@/api/client';
import ListingCard from '@/components/ListingCard';
import BookingWidget from '@/components/BookingWidget';
import EmptyState from '@/components/EmptyState';
import { useAuth } from '@/hooks/useAuth';

export default function ComboPage() {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const combo = useQuery({ queryKey: ['combo'], queryFn: () => comboApi.recommended() });

  const book = useMutation({
    mutationFn: ({ start, end }: { start: string; end: string }) =>
      bookingsApi.create({
        type: 'COMBO',
        carId: combo.data!.car.id,
        apartmentId: combo.data!.apartment.id,
        startAt: start,
        endAt: end,
      }),
    onSuccess: b => {
      toast.success('Combo booked!');
      navigate(`/bookings/${b.id}`);
    },
    onError: e => {
      if (e instanceof ApiException) toast.error(e.payload.message);
    },
  });

  if (!combo.data)
    return <EmptyState title={t('combo.title')} hint="No combo available right now." />;
  const { car, apartment } = combo.data;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-display text-4xl mb-2">{t('combo.title')}</h1>
      <p className="text-[color:var(--color-muted)] mb-8">{t('combo.subtitle')}</p>
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <ListingCard
          to={`/cars/${car.id}`}
          imageUrl={car.imageUrl}
          title={`${car.brand} ${car.model}`}
          subtitle={`${car.year} · ${car.fuelType}`}
          price={`${car.pricePerHour} ₸ / hour`}
          rating={car.rating}
          available={car.available}
          accent="purple"
        />
        <ListingCard
          to={`/apartments/${apartment.id}`}
          imageUrl={apartment.imageUrl}
          title={apartment.title}
          subtitle={apartment.address}
          price={`${apartment.pricePerNight} ₸ / night`}
          rating={apartment.rating}
          available={apartment.available}
          accent="green"
        />
      </div>
      <div className="max-w-md">
        {isAuthenticated && (
          <BookingWidget
            unitLabel="night"
            unitPrice={apartment.pricePerNight + car.pricePerHour * 24}
            accent="purple"
            onSubmit={(start, end) => book.mutate({ start, end })}
            isSubmitting={book.isPending}
          />
        )}
      </div>
    </div>
  );
}
