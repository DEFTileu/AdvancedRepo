import { api } from './client';
import type { CarMarker, ApartmentMarker } from '@/types/domain';

export const markersApi = {
  cars: () => api.get<CarMarker[]>('/markers/cars'),
  apartments: () => api.get<ApartmentMarker[]>('/markers/apartments'),
};
