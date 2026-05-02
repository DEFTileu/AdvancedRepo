import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { adminApi } from '@/api/admin';
import { carsApi } from '@/api/cars';
import { apartmentsApi } from '@/api/apartments';
import { ApiException } from '@/api/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function DashboardPage() {
  const qc = useQueryClient();
  const cars = useQuery({ queryKey: ['admin', 'cars'], queryFn: () => carsApi.list() });
  const apartments = useQuery({
    queryKey: ['admin', 'apartments'],
    queryFn: () => apartmentsApi.list(),
  });

  const delCar = useMutation({
    mutationFn: (id: number) => adminApi.deleteCar(id),
    onSuccess: () => {
      toast.success('Car deleted');
      qc.invalidateQueries({ queryKey: ['admin', 'cars'] });
    },
    onError: e => {
      if (e instanceof ApiException) toast.error(e.payload.message);
    },
  });

  const delApt = useMutation({
    mutationFn: (id: number) => adminApi.deleteApartment(id),
    onSuccess: () => {
      toast.success('Apartment deleted');
      qc.invalidateQueries({ queryKey: ['admin', 'apartments'] });
    },
    onError: e => {
      if (e instanceof ApiException) toast.error(e.payload.message);
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-display text-3xl mb-6">Admin dashboard</h1>
      <div className="grid md:grid-cols-3 gap-4 mb-10">
        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-[color:var(--color-muted)]">Cars</div>
            <div className="text-3xl font-display mt-1">{cars.data?.length ?? 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-[color:var(--color-muted)]">Apartments</div>
            <div className="text-3xl font-display mt-1">{apartments.data?.length ?? 0}</div>
          </CardContent>
        </Card>
      </div>
      <div className="flex gap-3 mb-6">
        <Button
          asChild
          className="bg-[color:var(--color-primary)] hover:bg-[color:var(--color-primary-hover)] text-white"
        >
          <Link to="/admin/cars/new">Add car</Link>
        </Button>
        <Button
          asChild
          className="bg-[color:var(--color-accent)] hover:bg-[color:var(--color-accent-hover)] text-white"
        >
          <Link to="/admin/apartments/new">Add apartment</Link>
        </Button>
      </div>

      <h2 className="font-display text-2xl mb-3">Cars</h2>
      <div className="border border-[color:var(--color-border)] rounded-[16px] overflow-hidden mb-10">
        <table className="w-full text-sm">
          <thead className="bg-[color:var(--color-primary-soft)]">
            <tr>
              <th className="text-left px-4 py-2">ID</th>
              <th className="text-left px-4 py-2">Brand/Model</th>
              <th className="text-left px-4 py-2">Price/hr</th>
              <th className="text-left px-4 py-2">Available</th>
              <th className="text-right px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.data?.map(c => (
              <tr key={c.id} className="border-t border-[color:var(--color-border)]">
                <td className="px-4 py-2">{c.id}</td>
                <td className="px-4 py-2">
                  {c.brand} {c.model}
                </td>
                <td className="px-4 py-2 price">{c.pricePerHour} ₸</td>
                <td className="px-4 py-2">{c.available ? 'Yes' : 'No'}</td>
                <td className="px-4 py-2 text-right">
                  <Link
                    to={`/admin/cars/${c.id}/edit`}
                    className="text-[color:var(--color-primary)] mr-3"
                  >
                    Edit
                  </Link>
                  <button
                    className="text-[color:var(--color-danger)]"
                    onClick={() => {
                      if (confirm(`Delete car #${c.id}?`)) delCar.mutate(c.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="font-display text-2xl mb-3">Apartments</h2>
      <div className="border border-[color:var(--color-border)] rounded-[16px] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[color:var(--color-accent-soft)]">
            <tr>
              <th className="text-left px-4 py-2">ID</th>
              <th className="text-left px-4 py-2">Title</th>
              <th className="text-left px-4 py-2">Price/night</th>
              <th className="text-left px-4 py-2">Available</th>
              <th className="text-right px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {apartments.data?.map(a => (
              <tr key={a.id} className="border-t border-[color:var(--color-border)]">
                <td className="px-4 py-2">{a.id}</td>
                <td className="px-4 py-2">{a.title}</td>
                <td className="px-4 py-2 price">{a.pricePerNight} ₸</td>
                <td className="px-4 py-2">{a.available ? 'Yes' : 'No'}</td>
                <td className="px-4 py-2 text-right">
                  <Link
                    to={`/admin/apartments/${a.id}/edit`}
                    className="text-[color:var(--color-accent)] mr-3"
                  >
                    Edit
                  </Link>
                  <button
                    className="text-[color:var(--color-danger)]"
                    onClick={() => {
                      if (confirm(`Delete apartment #${a.id}?`)) delApt.mutate(a.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
