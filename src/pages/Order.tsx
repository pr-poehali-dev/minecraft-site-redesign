import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Order as OrderType, fetchOrder } from '@/lib/api';

const Order = () => {
  const { uid } = useParams<{ uid: string }>();
  const [order, setOrder] = useState<OrderType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    if (!uid) return;
    fetchOrder(uid)
      .then((o) => { setOrder(o); setError(null); })
      .catch(() => setError('Заказ не найден'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    const t = setInterval(load, 8000);
    return () => clearInterval(t);
     
  }, [uid]);

  const isPaid = order?.status === 'paid' || order?.status === 'delivered';
  const isPending = order?.status === 'pending';

  return (
    <Layout>
      <section className="relative overflow-hidden pt-20 pb-16 border-b border-border">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="absolute top-0 -left-32 w-[400px] h-[400px] bg-brand-blue/25 rounded-full blur-[120px]" />

        <div className="container mx-auto px-6 relative z-10">
          <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-brand-sky mb-8 font-mono">
            <Icon name="ArrowLeft" size={14} /> в магазин
          </Link>
          <div className="font-mono text-xs text-brand-sky mb-4">// ORDER</div>
          <h1 className="font-display font-black text-4xl md:text-6xl tracking-tighter">
            Заказ <span className="text-brand-sky">#{uid}</span>
          </h1>
        </div>
      </section>

      <section className="py-16 container mx-auto px-6 max-w-2xl">
        {loading && !order ? (
          <Card className="p-12 bg-card/50 border-border text-center">
            <Icon name="Loader2" size={32} className="text-brand-sky mx-auto mb-4 animate-spin" />
            <div className="text-muted-foreground">Загружаем информацию о заказе...</div>
          </Card>
        ) : error ? (
          <Card className="p-12 bg-card/50 border-border text-center">
            <Icon name="XCircle" size={48} className="text-destructive mx-auto mb-4" />
            <h2 className="font-display font-black text-2xl mb-2">{error}</h2>
            <p className="text-muted-foreground mb-6">Проверьте ссылку или обратитесь в поддержку</p>
            <Link to="/shop">
              <Button className="bg-brand-sky text-background hover:bg-brand-sky/90 font-display font-bold">
                В магазин
              </Button>
            </Link>
          </Card>
        ) : order ? (
          <div className="space-y-6">
            <Card className={`p-8 border-2 ${isPaid ? 'border-brand-sky bg-brand-sky/5' : isPending ? 'border-brand-cyan bg-brand-cyan/5' : 'border-destructive bg-destructive/5'}`}>
              <div className="flex items-start gap-5">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${isPaid ? 'bg-brand-sky text-background' : isPending ? 'bg-brand-cyan text-background' : 'bg-destructive text-white'}`}>
                  <Icon
                    name={isPaid ? 'CheckCircle2' : isPending ? 'Clock' : 'XCircle'}
                    size={28}
                  />
                </div>
                <div className="flex-1">
                  <div className="font-mono text-xs text-muted-foreground uppercase mb-1">Статус</div>
                  <div className="font-display font-black text-2xl mb-2">
                    {isPaid && 'Оплачено · Привилегия выдана'}
                    {isPending && 'Ожидаем оплату'}
                    {!isPaid && !isPending && 'Заказ отменён'}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {isPaid && 'Привилегия отправлена на сервер через RCON. Зайди в игру и проверь.'}
                    {isPending && 'Мы обновим статус автоматически после получения платежа от ЮMoney.'}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-card/50 border-border">
              <h2 className="font-display font-black text-xl mb-6">Детали заказа</h2>
              <dl className="space-y-4">
                {[
                  ['Товар', order.product_name],
                  ['Ник в игре', order.nickname],
                  ['Сумма', `${order.amount} ₽`],
                  ['Номер заказа', order.order_uid],
                  ['Создан', new Date(order.created_at).toLocaleString('ru-RU')],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                    <dt className="font-mono text-xs uppercase text-muted-foreground">{k}</dt>
                    <dd className="font-display font-bold text-right">{v}</dd>
                  </div>
                ))}
              </dl>
            </Card>

            {isPending && (
              <Card className="p-6 bg-brand-sky/5 border-brand-sky/20 flex gap-4">
                <Icon name="Info" className="text-brand-sky flex-shrink-0 mt-0.5" size={20} />
                <div className="text-sm text-muted-foreground">
                  Если вы уже оплатили, но статус не обновился в течение 5 минут — напишите в поддержку с номером заказа.
                </div>
              </Card>
            )}

            <div className="flex flex-wrap gap-3">
              <Link to="/shop" className="flex-1">
                <Button variant="outline" className="w-full border-border h-12 font-display font-bold">
                  <Icon name="Store" size={16} className="mr-2" /> В магазин
                </Button>
              </Link>
              <a href="mailto:support@mineshovel.ru" className="flex-1">
                <Button variant="outline" className="w-full border-border h-12 font-display font-bold">
                  <Icon name="Mail" size={16} className="mr-2" /> Поддержка
                </Button>
              </a>
            </div>
          </div>
        ) : null}
      </section>
    </Layout>
  );
};

export default Order;
