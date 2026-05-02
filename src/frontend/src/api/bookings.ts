import { api } from './client';
import type { Booking, CreateBookingRequest } from '@/types/domain';

export const bookingsApi = {
  mine: () => api.get<Booking[]>('/bookings'),
  byId: (id: number) => api.get<Booking>(`/bookings/${id}`),
  create: (req: CreateBookingRequest) => api.post<Booking>('/bookings', req),
};
