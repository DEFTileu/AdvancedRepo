import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import MapPage from '@/pages/MapPage';
import CarsListPage from '@/pages/CarsListPage';
import CarDetailPage from '@/pages/CarDetailPage';
import ApartmentsListPage from '@/pages/ApartmentsListPage';
import ApartmentDetailPage from '@/pages/ApartmentDetailPage';
import ComboPage from '@/pages/ComboPage';
import BookingsListPage from '@/pages/BookingsListPage';
import BookingDetailPage from '@/pages/BookingDetailPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import NotFoundPage from '@/pages/NotFoundPage';
import DashboardPage from '@/pages/admin/DashboardPage';
import CarFormPage from '@/pages/admin/CarFormPage';
import ApartmentFormPage from '@/pages/admin/ApartmentFormPage';
import AuthGuard from '@/components/AuthGuard';
import AdminGuard from '@/components/AdminGuard';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="map" element={<MapPage />} />
        <Route path="cars" element={<CarsListPage />} />
        <Route path="cars/:id" element={<CarDetailPage />} />
        <Route path="apartments" element={<ApartmentsListPage />} />
        <Route path="apartments/:id" element={<ApartmentDetailPage />} />
        <Route path="combo" element={<ComboPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route
          path="bookings"
          element={
            <AuthGuard>
              <BookingsListPage />
            </AuthGuard>
          }
        />
        <Route
          path="bookings/:id"
          element={
            <AuthGuard>
              <BookingDetailPage />
            </AuthGuard>
          }
        />
        <Route
          path="admin"
          element={
            <AdminGuard>
              <DashboardPage />
            </AdminGuard>
          }
        />
        <Route
          path="admin/cars/new"
          element={
            <AdminGuard>
              <CarFormPage />
            </AdminGuard>
          }
        />
        <Route
          path="admin/cars/:id/edit"
          element={
            <AdminGuard>
              <CarFormPage />
            </AdminGuard>
          }
        />
        <Route
          path="admin/apartments/new"
          element={
            <AdminGuard>
              <ApartmentFormPage />
            </AdminGuard>
          }
        />
        <Route
          path="admin/apartments/:id/edit"
          element={
            <AdminGuard>
              <ApartmentFormPage />
            </AdminGuard>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
