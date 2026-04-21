import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import Layout from '@/components/Layout';
import { ReactNode } from 'react';

interface DocPageProps {
  badge: string;
  title: string;
  subtitle: string;
  icon: string;
  children: ReactNode;
}

const DocPage = ({ badge, title, subtitle, icon, children }: DocPageProps) => {
  return (
    <Layout>
      <section className="relative overflow-hidden pt-20 pb-16 border-b border-border">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="absolute top-0 -left-32 w-[400px] h-[400px] bg-brand-blue/25 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 -right-32 w-[400px] h-[400px] bg-brand-sky/20 rounded-full blur-[120px]" />

        <div className="container mx-auto px-6 relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-brand-sky mb-8 font-mono">
            <Icon name="ArrowLeft" size={14} /> на главную
          </Link>
          <div className="font-mono text-xs text-brand-sky mb-4">// {badge}</div>
          <div className="flex items-start gap-6">
            <div className="hidden md:flex w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-sky to-brand-blue items-center justify-center glow-cyan flex-shrink-0">
              <Icon name={icon} className="text-background" size={28} />
            </div>
            <div>
              <h1 className="font-display font-black text-5xl md:text-7xl tracking-tighter mb-4">
                {title}
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl">{subtitle}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 container mx-auto px-6 max-w-4xl">
        <div className="prose prose-invert max-w-none">
          {children}
        </div>
      </section>
    </Layout>
  );
};

export default DocPage;
