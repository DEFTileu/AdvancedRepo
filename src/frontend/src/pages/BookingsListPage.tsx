import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { bookingsApi } from '@/api/bookings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EmptyState from '@/components/EmptyState';

export default function BookingsListPage() {
  const { t } = useTranslation();
  const bookings = useQuery({ queryKey: ['bookings'], queryFn: () => bookingsApi.mine() });
  const now = new Date();
  const upcoming = (bookings.data ?? []).filter(b => new Date(b.endAt) >= now);
  const past = (bookings.data ?? []).filter(b => new Date(b.endAt) < now);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-display text-3xl mb-6">{t('booking.myTitle')}</h1>
      {bookings.data && bookings.data.length === 0 && <EmptyState title={t('booking.empty')} />}
      {bookings.data && bookings.data.length > 0 && (
        <Tabs defaultValue="upcoming">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming">
            {upcoming.map(b => (
              <Link
                key={b.id}
                to={`/bookings/${b.id}`}
                className="block py-3 border-b border-[color:var(--color-border)]"
              >
                <div className="flex justify-between">
                  <span className="font-display">{b.type}</span>
                  <span className="price">{b.totalPrice.toLocaleString('ru-RU')} ₸</span>
                </div>
                <div className="text-sm text-[color:var(--color-muted)]">
                  {new Date(b.startAt).toLocaleString()} → {new Date(b.endAt).toLocaleString()}
                </div>
              </Link>
            ))}
          </TabsContent>
          <TabsContent value="past">
            {past.map(b => (
              <Link
                key={b.id}
                to={`/bookings/${b.id}`}
                className="block py-3 border-b border-[color:var(--color-border)] opacity-70"
              >
                <div className="flex justify-between">
                  <span className="font-display">{b.type}</span>
                  <span className="price">{b.totalPrice.toLocaleString('ru-RU')} ₸</span>
                </div>
              </Link>
            ))}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
