import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const from = (location.state as any)?.from?.pathname ?? '/';

  return (
    <div className="grid md:grid-cols-2 min-h-[calc(100vh-4rem)]">
      <div className="hidden md:block bg-[color:var(--color-primary-soft)] bg-[url('https://images.unsplash.com/photo-1531179091010-bbb5fd6f0c2c?w=1200')] bg-cover bg-center" />
      <div className="grid place-items-center px-6">
        <div className="w-full max-w-sm">
          <h1 className="font-display text-3xl mb-1">{t('auth.login.title')}</h1>
          <p className="text-[color:var(--color-muted)] mb-6">{t('auth.login.subtitle')}</p>
          <form
            onSubmit={async e => {
              e.preventDefault();
              try {
                await login.mutateAsync({ username, password });
                navigate(from, { replace: true });
              } catch {
                toast.error(t('auth.login.invalid'));
              }
            }}
            className="space-y-4"
          >
            <div>
              <Label>{t('auth.username')}</Label>
              <Input value={username} onChange={e => setUsername(e.target.value)} required />
            </div>
            <div>
              <Label>{t('auth.password')}</Label>
              <Input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[color:var(--color-primary)] hover:bg-[color:var(--color-primary-hover)] text-white"
            >
              {t('auth.login.cta')}
            </Button>
          </form>
          <p className="mt-4 text-sm text-[color:var(--color-muted)]">
            {t('auth.login.noAccount')}{' '}
            <Link to="/register" className="text-[color:var(--color-primary)] underline">
              {t('auth.register.cta')}
            </Link>
          </p>
          <p className="mt-2 text-xs text-[color:var(--color-muted)]">{t('auth.demoHint')}</p>
        </div>
      </div>
    </div>
  );
}
