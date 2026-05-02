import { api } from './client';
import type {
  Car,
  Apartment,
  CreateCarRequest,
  CreateApartmentRequest,
} from '@/types/domain';

export const adminApi = {
  createCar: (req: CreateCarRequest) => api.post<Car>('/admin/cars', req),
  updateCar: (id: number, req: CreateCarRequest) => api.put<Car>(`/admin/cars/${id}`, req),
  deleteCar: (id: number) => api.delete<void>(`/admin/cars/${id}`),
  uploadCarImage: (id: number, file: File) => {
    const fd = new FormData();
    fd.append('image', file);
    return api.post<void>(`/admin/cars/${id}/image`, fd);
  },

  createApartment: (req: CreateApartmentRequest) => api.post<Apartment>('/admin/apartments', req),
  updateApartment: (id: number, req: CreateApartmentRequest) =>
    api.put<Apartment>(`/admin/apartments/${id}`, req),
  deleteApartment: (id: number) => api.delete<void>(`/admin/apartments/${id}`),
  uploadApartmentImage: (id: number, file: File) => {
    const fd = new FormData();
    fd.append('image', file);
    return api.post<void>(`/admin/apartments/${id}/image`, fd);
  },
};
