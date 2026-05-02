import { api, resolveUrl } from './client';
import type { Apartment } from '@/types/domain';

const fix = (a: Apartment): Apartment => ({ ...a, imageUrl: resolveUrl(a.imageUrl) });

export const apartmentsApi = {
  list: (city?: string) =>
    api.get<Apartment[]>(`/apartments${city ? `?city=${encodeURIComponent(city)}` : ''}`).then(as => as.map(fix)),
  byId: (id: number) => api.get<Apartment>(`/apartments/${id}`).then(fix),
};
