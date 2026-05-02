import { api, resolveUrl } from './client';
import type { Combo } from '@/types/domain';

const fix = (c: Combo): Combo => ({
  ...c,
  car: { ...c.car, imageUrl: resolveUrl(c.car.imageUrl) },
  apartment: { ...c.apartment, imageUrl: resolveUrl(c.apartment.imageUrl) },
});

export const comboApi = {
  recommended: () => api.get<Combo | undefined>('/combo/recommended').then(c => c ? fix(c) : c),
};
