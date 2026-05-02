import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import type { CarMarker, ApartmentMarker } from '@/types/domain';

const greenPin = L.divIcon({
  html: '<svg width="32" height="40" viewBox="0 0 32 40"><path fill="#1F7A5A" stroke="#fff" stroke-width="2" d="M16 0C7 0 0 7 0 16c0 12 16 24 16 24s16-12 16-24C32 7 25 0 16 0z"/><circle cx="16" cy="16" r="5" fill="#fff"/></svg>',
  className: '',
  iconSize: [32, 40],
  iconAnchor: [16, 40],
});
const purplePin = L.divIcon({
  html: '<svg width="32" height="40" viewBox="0 0 32 40"><path fill="#6B4FBB" stroke="#fff" stroke-width="2" d="M16 0C7 0 0 7 0 16c0 12 16 24 16 24s16-12 16-24C32 7 25 0 16 0z"/><circle cx="16" cy="16" r="5" fill="#fff"/></svg>',
  className: '',
  iconSize: [32, 40],
  iconAnchor: [16, 40],
});

interface Props {
  center: [number, number];
  zoom?: number;
  cars?: CarMarker[];
  apartments?: ApartmentMarker[];
  height?: string;
  onMapClick?: (lat: number, lng: number) => void;
  pickedPosition?: [number, number] | null;
}

function ClickHandler({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function MapView({
  center,
  zoom = 12,
  cars = [],
  apartments = [],
  height = '500px',
  onMapClick,
  pickedPosition,
}: Props) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height, width: '100%', borderRadius: 16 }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {onMapClick && <ClickHandler onMapClick={onMapClick} />}
      {pickedPosition && (
        <Marker position={pickedPosition} icon={greenPin}>
          <Popup>Picked location</Popup>
        </Marker>
      )}
      {apartments.map(a => (
        <Marker key={`apt-${a.id}`} position={[a.lat, a.lng]} icon={greenPin}>
          <Popup>
            <div className="font-display text-base mb-1">Stay</div>
            <div className="price">{a.pricePerNight} ₸ / night</div>
            <Link to={`/apartments/${a.id}`} className="text-[color:var(--color-primary)] font-medium">
              View →
            </Link>
          </Popup>
        </Marker>
      ))}
      {cars.map(c => (
        <Marker key={`car-${c.id}`} position={[c.lat, c.lng]} icon={purplePin}>
          <Popup>
            <div className="font-display text-base mb-1">Car</div>
            <div className="price">{c.pricePerHour} ₸ / hour</div>
            <Link to={`/cars/${c.id}`} className="text-[color:var(--color-accent)] font-medium">
              View →
            </Link>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
