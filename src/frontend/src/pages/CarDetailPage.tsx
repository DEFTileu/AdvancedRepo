import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { carsApi } from '@/api/cars';
import { bookingsApi } from '@/api/bookings';
import { ApiException } from '@/api/client';
import MapView from '@/components/MapView';
import BookingWidget from '@/components/BookingWidget';
import { useAuth } from '@/hooks/useAuth';

export default function CarDetailPage() {
  const { id } = useParams();
  const carId = Number(id);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const car = useQuery({ queryKey: ['cars', carId], queryFn: () => carsApi.byId(carId) });

  const book = useMutation({
    mutationFn: ({ start, end }: { start: string; end: string }) =>
      bookingsApi.create({ type: 'CAR', carId, startAt: start, endAt: end }),
    onSuccess: b => {
      toast.success('Booked!');
      navigate(`/bookings/${b.id}`);
    },
    onError: e => {
      if (e instanceof ApiException && e.status === 409) toast.error('Already booked for these dates');
      else if (e instanceof ApiException) toast.error(e.payload.message);
    },
  });

  if (!car.data) return null;
  const c = car.data;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-[2fr_1fr] gap-10">
      <div>
        <img
          src={c.imageUrl}
          alt={`${c.brand} ${c.model}`}
          className="w-full aspect-[16/10] object-cover rounded-[16px] border border-[color:var(--color-border)]"
        />
        <h1 className="font-display text-4xl mt-6">
          {c.brand} {c.model}
        </h1>
        <p className="text-[color:var(--color-muted)]">
          {c.year} · {c.fuelType} · {c.seats} seats
        </p>
        <div className="mt-6 rounded-[16px] overflow-hidden border border-[color:var(--color-border)]">
          <MapView
            center={[c.latitude, c.longitude]}
            zoom={14}
            cars={[
              {
                id: c.id,
                lat: c.latitude,
                lng: c.longitude,
                pricePerHour: c.pricePerHour,
                rating: c.rating,
                available: c.available,
              },
            ]}
            height="320px"
          />
        </div>
      </div>
      <aside>
        {isAuthenticated ? (
          <BookingWidget
            unitLabel="hour"
            unitPrice={c.pricePerHour}
            accent="purple"
            onSubmit={(start, end) => book.mutate({ start, end })}
            isSubmitting={book.isPending}
          />
        ) : (
          <div className="rounded-[16px] border border-[color:var(--color-border)] p-6 sticky top-24">
            <p>{t('auth.signInToBook')}</p>
          </div>
        )}
      </aside>
    </div>
  );
}
