import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { apartmentsApi } from '@/api/apartments';
import { bookingsApi } from '@/api/bookings';
import { ApiException } from '@/api/client';
import MapView from '@/components/MapView';
import BookingWidget from '@/components/BookingWidget';
import { useAuth } from '@/hooks/useAuth';

export default function ApartmentDetailPage() {
  const { id } = useParams();
  const apartmentId = Number(id);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const apartment = useQuery({
    queryKey: ['apartments', apartmentId],
    queryFn: () => apartmentsApi.byId(apartmentId),
  });

  const book = useMutation({
    mutationFn: ({ start, end }: { start: string; end: string }) =>
      bookingsApi.create({ type: 'APARTMENT', apartmentId, startAt: start, endAt: end }),
    onSuccess: b => {
      toast.success('Booked!');
      navigate(`/bookings/${b.id}`);
    },
    onError: e => {
      if (e instanceof ApiException && e.status === 409) toast.error('Already booked for these dates');
      else if (e instanceof ApiException) toast.error(e.payload.message);
    },
  });

  if (!apartment.data) return null;
  const a = apartment.data;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-[2fr_1fr] gap-10">
      <div>
        <img
          src={a.imageUrl}
          alt={a.title}
          className="w-full aspect-[16/10] object-cover rounded-[16px] border border-[color:var(--color-border)]"
        />
        <h1 className="font-display text-4xl mt-6">{a.title}</h1>
        <p className="text-[color:var(--color-muted)]">
          {a.address} · {a.bedrooms} bd · {a.guests} guests
        </p>
        <div className="mt-6 rounded-[16px] overflow-hidden border border-[color:var(--color-border)]">
          <MapView
            center={[a.latitude, a.longitude]}
            zoom={14}
            apartments={[
              {
                id: a.id,
                lat: a.latitude,
                lng: a.longitude,
                pricePerNight: a.pricePerNight,
                rating: a.rating,
                available: a.available,
              },
            ]}
            height="320px"
          />
        </div>
      </div>
      <aside>
        {isAuthenticated ? (
          <BookingWidget
            unitLabel="night"
            unitPrice={a.pricePerNight}
            accent="green"
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
