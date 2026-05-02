import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { adminApi } from '@/api/admin';
import { carsApi } from '@/api/cars';
import { ApiException, resolveUrl } from '@/api/client';
import ImageDropzone from '@/components/ImageDropzone';
import MapView from '@/components/MapView';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { CreateCarRequest } from '@/types/domain';

const empty: CreateCarRequest = {
  brand: '',
  model: '',
  year: new Date().getFullYear(),
  pricePerHour: 0,
  latitude: 43.2389,
  longitude: 76.8897,
  city: 'Almaty',
  fuelType: 'PETROL',
  seats: 4,
  rating: 4.5,
  available: true,
};

export default function CarFormPage() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const [form, setForm] = useState<CreateCarRequest>(empty);
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const existing = useQuery({
    queryKey: ['cars', Number(id)],
    queryFn: () => carsApi.byId(Number(id)),
    enabled: isEdit,
  });

  useEffect(() => {
    if (existing.data) {
      const e = existing.data;
      setForm({
        brand: e.brand,
        model: e.model,
        year: e.year,
        pricePerHour: e.pricePerHour,
        latitude: e.latitude,
        longitude: e.longitude,
        city: e.city,
        fuelType: e.fuelType,
        seats: e.seats,
        rating: e.rating,
        available: e.available,
      });
    }
  }, [existing.data]);

  const update = <K extends keyof CreateCarRequest>(k: K, v: CreateCarRequest[K]) =>
    setForm(prev => ({ ...prev, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const saved = isEdit
        ? await adminApi.updateCar(Number(id), form)
        : await adminApi.createCar(form);
      if (file) await adminApi.uploadCarImage(saved.id, file);
      toast.success(isEdit ? 'Car updated' : 'Car created');
      navigate('/admin');
    } catch (err) {
      if (err instanceof ApiException) toast.error(err.payload.message);
      else toast.error('Save failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="font-display text-3xl mb-6">{isEdit ? 'Edit car' : 'Add car'}</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Brand</Label>
            <Input value={form.brand} onChange={e => update('brand', e.target.value)} required />
          </div>
          <div>
            <Label>Model</Label>
            <Input value={form.model} onChange={e => update('model', e.target.value)} required />
          </div>
          <div>
            <Label>Year</Label>
            <Input
              type="number"
              value={form.year}
              onChange={e => update('year', Number(e.target.value))}
              required
            />
          </div>
          <div>
            <Label>Price per hour (₸)</Label>
            <Input
              type="number"
              value={form.pricePerHour}
              onChange={e => update('pricePerHour', Number(e.target.value))}
              required
            />
          </div>
          <div>
            <Label>City</Label>
            <Input value={form.city} onChange={e => update('city', e.target.value)} required />
          </div>
          <div>
            <Label>Fuel type</Label>
            <Input
              value={form.fuelType}
              onChange={e => update('fuelType', e.target.value)}
              required
            />
          </div>
          <div>
            <Label>Seats</Label>
            <Input
              type="number"
              value={form.seats}
              onChange={e => update('seats', Number(e.target.value))}
              required
            />
          </div>
          <div>
            <Label>Rating</Label>
            <Input
              type="number"
              step="0.1"
              value={form.rating}
              onChange={e => update('rating', Number(e.target.value))}
              required
            />
          </div>
          <div>
            <Label>Latitude</Label>
            <Input
              type="number"
              step="any"
              value={form.latitude}
              onChange={e => update('latitude', Number(e.target.value))}
              required
            />
          </div>
          <div>
            <Label>Longitude</Label>
            <Input
              type="number"
              step="any"
              value={form.longitude}
              onChange={e => update('longitude', Number(e.target.value))}
              required
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            id="available"
            type="checkbox"
            checked={form.available}
            onChange={e => update('available', e.target.checked)}
          />
          <Label htmlFor="available">Available</Label>
        </div>

        <div>
          <Label>Image</Label>
          <ImageDropzone
            value={file}
            onChange={setFile}
            existingUrl={isEdit ? resolveUrl(`/api/cars/${id}/image`) : undefined}
          />
        </div>

        <div>
          <Label>Pick location on map</Label>
          <div className="rounded-[16px] overflow-hidden border border-[color:var(--color-border)] mt-2">
            <MapView
              center={[form.latitude, form.longitude]}
              zoom={12}
              height="320px"
              onMapClick={(lat, lng) => {
                update('latitude', lat);
                update('longitude', lng);
              }}
              pickedPosition={[form.latitude, form.longitude]}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            type="submit"
            disabled={submitting}
            className="bg-[color:var(--color-primary)] hover:bg-[color:var(--color-primary-hover)] text-white"
          >
            {submitting ? 'Saving…' : 'Save'}
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate('/admin')}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
