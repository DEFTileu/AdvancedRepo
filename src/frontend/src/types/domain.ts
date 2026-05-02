export type BookingType = 'CAR' | 'APARTMENT' | 'COMBO';
export type UserRole = 'USER' | 'ADMIN';

export interface User {
  id: number;
  username: string;
  displayName: string | null;
  role: UserRole;
}

export interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  pricePerHour: number;
  latitude: number;
  longitude: number;
  city: string;
  fuelType: string;
  seats: number;
  rating: number;
  available: boolean;
  imageUrl: string;
}

export interface Apartment {
  id: number;
  title: string;
  address: string;
  pricePerNight: number;
  latitude: number;
  longitude: number;
  city: string;
  bedrooms: number;
  guests: number;
  rating: number;
  available: boolean;
  imageUrl: string;
}

export interface Booking {
  id: number;
  type: BookingType;
  userId: number;
  carId: number | null;
  apartmentId: number | null;
  startAt: string;
  endAt: string;
  hours: number | null;
  nights: number | null;
  totalPrice: number;
  status: string;
  createdAt: string;
}

export interface CarMarker {
  id: number;
  lat: number;
  lng: number;
  pricePerHour: number;
  rating: number;
  available: boolean;
}

export interface ApartmentMarker {
  id: number;
  lat: number;
  lng: number;
  pricePerNight: number;
  rating: number;
  available: boolean;
}

export interface Combo {
  car: Car;
  apartment: Apartment;
  estimatedSavings: number;
}

export interface ApiError {
  error: string;
  message: string;
  fields?: Record<string, string>;
}

export interface CreateBookingRequest {
  type: BookingType;
  carId?: number;
  apartmentId?: number;
  startAt: string;
  endAt: string;
}

export interface CreateCarRequest {
  brand: string;
  model: string;
  year: number;
  pricePerHour: number;
  latitude: number;
  longitude: number;
  city: string;
  fuelType: string;
  seats: number;
  rating: number;
  available: boolean;
}

export interface CreateApartmentRequest {
  title: string;
  address: string;
  pricePerNight: number;
  latitude: number;
  longitude: number;
  city: string;
  bedrooms: number;
  guests: number;
  rating: number;
  available: boolean;
}
