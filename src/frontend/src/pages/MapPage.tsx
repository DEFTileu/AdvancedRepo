import { useQuery } from '@tanstack/react-query';
import { markersApi } from '@/api/markers';
import MapView from '@/components/MapView';

export default function MapPage() {
  const cars = useQuery({ queryKey: ['markers', 'cars'], queryFn: () => markersApi.cars() });
  const apartments = useQuery({
    queryKey: ['markers', 'apartments'],
    queryFn: () => markersApi.apartments(),
  });
  return (
    <div className="max-w-[1600px] mx-auto px-4 py-4">
      <MapView
        center={[43.2389, 76.8897]}
        zoom={12}
        cars={cars.data ?? []}
        apartments={apartments.data ?? []}
        height="calc(100vh - 9rem)"
      />
    </div>
  );
}
