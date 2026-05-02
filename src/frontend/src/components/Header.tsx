import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

export default function Header() {
  const { t } = useTranslation();
  const { user, isAdmin, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-[color:var(--color-bg)]/80 border-b border-[color:var(--color-border)]">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/">
          <Logo />
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <NavLink
            to="/cars"
            className={({ isActive }) => (isActive ? 'text-[color:var(--color-primary)]' : '')}
          >
            {t('nav.cars')}
          </NavLink>
          <NavLink
            to="/apartments"
            className={({ isActive }) => (isActive ? 'text-[color:var(--color-primary)]' : '')}
          >
            {t('nav.apartments')}
          </NavLink>
          <NavLink
            to="/combo"
            className={({ isActive }) => (isActive ? 'text-[color:var(--color-accent)]' : '')}
          >
            {t('nav.combo')}
          </NavLink>
          <NavLink to="/map">{t('nav.map')}</NavLink>
          {user && <NavLink to="/bookings">{t('nav.bookings')}</NavLink>}
          {isAdmin && <NavLink to="/admin">{t('nav.admin')}</NavLink>}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          {user ? (
            <Button variant="ghost" size="sm" onClick={() => logout.mutate()}>
              {t('common.logout')}
            </Button>
          ) : (
            <Button
              asChild
              size="sm"
              className="bg-[color:var(--color-primary)] hover:bg-[color:var(--color-primary-hover)] text-white"
            >
              <Link to="/login">{t('auth.login.cta')}</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
