import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { bookingsApi } from '@/api/bookings';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function BookingDetailPage() {
  const { id } = useParams();
  const { t } = useTranslation();
  const b = useQuery({
    queryKey: ['booking', id],
    queryFn: () => bookingsApi.byId(Number(id)),
  });
  if (!b.data) return null;
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Card>
        <CardContent className="p-8">
          <Badge className="bg-[color:var(--color-primary-soft)] text-[color:var(--color-primary)]">
            {b.data.status}
          </Badge>
          <h1 className="font-display text-3xl mt-3 mb-2">{t('booking.confirmedTitle')}</h1>
          <p className="text-[color:var(--color-muted)] mb-6">Booking #{b.data.id}</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>From</span>
              <span>{new Date(b.data.startAt).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>To</span>
              <span>{new Date(b.data.endAt).toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>{t('booking.total')}</span>
              <span className="price">{b.data.totalPrice.toLocaleString('ru-RU')} ₸</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
