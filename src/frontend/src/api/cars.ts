import { api, resolveUrl } from './client';
import type { Car } from '@/types/domain';

const fix = (c: Car): Car => ({ ...c, imageUrl: resolveUrl(c.imageUrl) });

export const carsApi = {
  list: (city?: string) =>
    api.get<Car[]>(`/cars${city ? `?city=${encodeURIComponent(city)}` : ''}`).then(cs => cs.map(fix)),
  byId: (id: number) => api.get<Car>(`/cars/${id}`).then(fix),
};
