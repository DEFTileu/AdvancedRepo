import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="max-w-md mx-auto py-32 text-center">
      <h1 className="font-display text-6xl mb-4">404</h1>
      <p className="text-[color:var(--color-muted)] mb-6">We couldn't find that page.</p>
      <Link to="/" className="text-[color:var(--color-primary)] underline">
        Back home
      </Link>
    </div>
  );
}
