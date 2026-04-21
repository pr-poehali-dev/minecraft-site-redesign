import { Link, useLocation } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';

const NAV = [
  { to: '/', label: 'Главная' },
  { to: '/#shop', label: 'Магазин' },
  { to: '/#status', label: 'Статус' },
  { to: '/rules', label: 'Правила' },
  { to: '/offer', label: 'Оферта' },
  { to: '/privacy', label: 'Конфиденциальность' },
  { to: '/#support', label: 'Поддержка' },
];

export const ShovelLogo = ({ size = 18 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v10" />
    <path d="M9 2h6" />
    <path d="M7 12h10l-1.2 6a2 2 0 0 1-2 1.6h-3.6a2 2 0 0 1-2-1.6L7 12z" />
  </svg>
);

const Layout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();

  const copyIP = () => {
    navigator.clipboard?.writeText('play.mineshovel.ru');
  };

  return (
    <div className="min-h-screen noise flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-display font-black text-lg tracking-tight">
            <div className="w-9 h-9 bg-gradient-to-br from-brand-sky to-brand-blue rounded-lg flex items-center justify-center glow-cyan text-background">
              <ShovelLogo size={18} />
            </div>
            MINE<span className="text-brand-sky">SHOVEL</span>
          </Link>
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((n) => {
              const active = location.pathname === n.to;
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`px-3 py-2 text-sm transition-colors ${active ? 'text-brand-sky' : 'text-muted-foreground hover:text-brand-sky'}`}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>
          <Button size="sm" onClick={copyIP} className="bg-brand-sky text-background hover:bg-brand-sky/90 font-display font-bold">
            <Icon name="Copy" size={14} className="mr-1.5" /> IP
          </Button>
        </div>
      </header>

      <main className="flex-1 pt-16">{children}</main>

      <footer className="border-t border-border py-10">
        <div className="container mx-auto px-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-display font-black text-xl">
            <span className="text-brand-sky"><ShovelLogo size={22} /></span>
            MINE<span className="text-brand-sky">SHOVEL</span>
          </div>
          <div className="font-mono text-xs text-muted-foreground">
            © 2026 · MINESHOVEL · Современная анархия · Не аффилирован с Mojang AB
          </div>
          <div className="flex gap-4 text-xs">
            <Link to="/rules" className="text-muted-foreground hover:text-brand-sky">Правила</Link>
            <Link to="/offer" className="text-muted-foreground hover:text-brand-sky">Оферта</Link>
            <Link to="/privacy" className="text-muted-foreground hover:text-brand-sky">Конфиденциальность</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
