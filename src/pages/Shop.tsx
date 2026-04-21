import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import BuyDialog from '@/components/BuyDialog';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Product, fetchProducts } from '@/lib/api';
import { toast } from 'sonner';

const CATEGORIES = [
  { id: 'all', label: 'Все', icon: 'LayoutGrid' },
  { id: 'privilege', label: 'Привилегии', icon: 'Crown' },
  { id: 'case', label: 'Кейсы', icon: 'Package' },
  { id: 'currency', label: 'Валюта', icon: 'Coins' },
];

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [selected, setSelected] = useState<Product | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(() => toast.error('Не удалось загрузить товары'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = category === 'all' ? products : products.filter((p) => p.category === category);

  const buy = (p: Product) => {
    setSelected(p);
    setDialogOpen(true);
  };

  return (
    <Layout>
      <section className="relative overflow-hidden pt-20 pb-12 border-b border-border">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="absolute top-0 -left-32 w-[400px] h-[400px] bg-brand-blue/25 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 -right-32 w-[400px] h-[400px] bg-brand-sky/20 rounded-full blur-[120px]" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="font-mono text-xs text-brand-sky mb-4">// SHOP · RCON + ЮMONEY</div>
          <h1 className="font-display font-black text-5xl md:text-7xl tracking-tighter mb-4">
            Магазин <span className="text-gradient">MineShovel</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Привилегии, кейсы и внутриигровая валюта. Выдача автоматически через RCON после оплаты.
          </p>
        </div>
      </section>

      <section className="py-10 container mx-auto px-6">
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((c) => (
            <Button
              key={c.id}
              variant={category === c.id ? 'default' : 'outline'}
              onClick={() => setCategory(c.id)}
              className={category === c.id
                ? 'bg-brand-sky text-background hover:bg-brand-sky/90 font-display font-bold'
                : 'border-border font-display font-bold'}
            >
              <Icon name={c.icon} size={16} className="mr-2" />
              {c.label}
            </Button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20 text-muted-foreground">
            <Icon name="Loader2" size={24} className="animate-spin mr-3" /> Загружаем товары...
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">В этой категории пока пусто</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((p, i) => (
              <div key={p.slug} className={`relative rounded-3xl p-[2px] tilt-card ${p.is_popular ? 'bg-gradient-to-br from-brand-sky via-brand-cyan to-brand-blue' : 'bg-border'}`}>
                {p.is_popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-sky text-background font-display font-black text-xs px-4 py-1.5 rounded-full z-10">
                    ТОП
                  </div>
                )}
                <div className="bg-card rounded-3xl p-6 h-full flex flex-col">
                  <div
                    className="h-28 rounded-2xl mb-5 flex items-center justify-center relative overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${p.color_from || '#38BDF8'}, ${p.color_to || '#2563EB'})` }}
                  >
                    <div className="absolute inset-0 grid-bg opacity-30" />
                    <span className="font-display font-black text-3xl text-white drop-shadow-lg relative z-10">
                      #{String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="absolute top-2 right-3 font-mono text-[10px] uppercase text-white/80">
                      {p.category}
                    </div>
                  </div>
                  <div className="font-display font-black text-xl" style={{ color: p.color_from || '#38BDF8' }}>
                    {p.name}
                  </div>
                  {p.description && (
                    <div className="text-xs text-muted-foreground mt-1 mb-3 line-clamp-2">{p.description}</div>
                  )}
                  <div className="font-display font-black text-3xl mt-2 mb-5">{p.price}₽</div>
                  <ul className="space-y-1.5 flex-1 mb-5">
                    {p.features.slice(0, 4).map((perk) => (
                      <li key={perk} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <Icon name="Check" size={14} className="text-brand-sky flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{perk}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => buy(p)}
                    className={`w-full font-display font-bold ${p.is_popular ? 'bg-brand-sky text-background hover:bg-brand-sky/90' : 'bg-secondary hover:bg-secondary/80'}`}
                  >
                    Купить
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 p-6 rounded-2xl border border-brand-sky/20 bg-brand-sky/5 flex flex-wrap items-center gap-4">
          <Icon name="Info" className="text-brand-sky flex-shrink-0" size={20} />
          <div className="text-sm text-muted-foreground flex-1 min-w-[200px]">
            После оплаты привилегия будет выдана автоматически в течение 1-5 минут. Если этого не произошло — напишите в поддержку с номером заказа.
          </div>
        </div>
      </section>

      <BuyDialog product={selected} open={dialogOpen} onOpenChange={setDialogOpen} />
    </Layout>
  );
};

export default Shop;
