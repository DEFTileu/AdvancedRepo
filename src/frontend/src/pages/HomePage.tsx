import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { markersApi } from '@/api/markers';
import { comboApi } from '@/api/combo';
import MapView from '@/components/MapView';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const { t } = useTranslation();
  const cars = useQuery({ queryKey: ['markers', 'cars'], queryFn: () => markersApi.cars() });
  const apartments = useQuery({
    queryKey: ['markers', 'apartments'],
    queryFn: () => markersApi.apartments(),
  });
  const combo = useQuery({ queryKey: ['combo'], queryFn: () => comboApi.recommended() });

  return (
    <div>
      <section className="max-w-7xl mx-auto px-4 pt-12 pb-8 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="font-display text-5xl md:text-6xl mb-4 leading-tight">
            {t('map.title', { city: 'Almaty' })}
          </h1>
          <p className="text-lg text-[color:var(--color-muted)] mb-6">{t('map.subtitle')}</p>
          <div className="flex gap-3">
            <Button
              asChild
              className="bg-[color:var(--color-primary)] hover:bg-[color:var(--color-primary-hover)] text-white"
            >
              <Link to="/apartments">{t('apartments.title')}</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/cars">{t('cars.title')}</Link>
            </Button>
          </div>
        </div>
        <div className="rounded-[16px] overflow-hidden border border-[color:var(--color-border)]">
          <MapView
            center={[43.2389, 76.8897]}
            zoom={12}
            cars={cars.data ?? []}
            apartments={apartments.data ?? []}
            height="420px"
          />
        </div>
      </section>

      {combo.data && (
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="rounded-[16px] bg-[color:var(--color-accent-soft)] p-8 grid md:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[color:var(--color-accent)]">
                Combo
              </span>
              <h2 className="font-display text-3xl mt-2 mb-1">
                {combo.data.car.brand} {combo.data.car.model} + {combo.data.apartment.title}
              </h2>
              <p className="text-[color:var(--color-muted)]">
                Best pairing for your trip — book together in one click.
              </p>
            </div>
            <Button
              asChild
              className="bg-[color:var(--color-accent)] hover:bg-[color:var(--color-accent-hover)] text-white"
            >
              <Link to="/combo">{t('combo.bookCta')}</Link>
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}
