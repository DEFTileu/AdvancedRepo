import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { ApiException } from '@/api/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function RegisterPage() {
  const { t } = useTranslation();
  const { register } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

  return (
    <div className="grid md:grid-cols-2 min-h-[calc(100vh-4rem)]">
      <div className="hidden md:block bg-[color:var(--color-accent-soft)] bg-[url('https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200')] bg-cover bg-center" />
      <div className="grid place-items-center px-6">
        <div className="w-full max-w-sm">
          <h1 className="font-display text-3xl mb-1">{t('auth.register.title')}</h1>
          <p className="text-[color:var(--color-muted)] mb-6">{t('auth.register.subtitle')}</p>
          <form
            onSubmit={async e => {
              e.preventDefault();
              try {
                await register.mutateAsync({ username, password, displayName });
                toast.success('Account created! Please sign in.');
                navigate('/login', { replace: true });
              } catch (err) {
                if (err instanceof ApiException) toast.error(err.payload.message);
                else toast.error('Registration failed');
              }
            }}
            className="space-y-4"
          >
            <div>
              <Label>{t('auth.username')}</Label>
              <Input value={username} onChange={e => setUsername(e.target.value)} required />
            </div>
            <div>
              <Label>{t('auth.displayName')}</Label>
              <Input
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                required
              />
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
              className="w-full bg-[color:var(--color-accent)] hover:bg-[color:var(--color-accent-hover)] text-white"
            >
              {t('auth.register.cta')}
            </Button>
          </form>
          <p className="mt-4 text-sm text-[color:var(--color-muted)]">
            {t('auth.register.haveAccount')}{' '}
            <Link to="/login" className="text-[color:var(--color-accent)] underline">
              {t('auth.login.cta')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
