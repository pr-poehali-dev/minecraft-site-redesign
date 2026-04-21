import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Layout, { ShovelLogo } from '@/components/Layout';

const PRIVILEGES = [
  {
    name: 'DIRT',
    price: '99₽',
    color: 'from-slate-600 to-slate-800',
    accent: 'text-slate-300',
    perks: ['Цветной ник', 'Префикс [DIRT]', 'Доступ к /hat', 'Скрытие присоединения'],
  },
  {
    name: 'COPPER',
    price: '299₽',
    color: 'from-orange-400 to-amber-700',
    accent: 'text-amber-400',
    perks: ['Всё из DIRT', '/fly на 5 мин раз в час', 'Приват до 30×30', '/feed и /heal', 'Кастомный префикс'],
  },
  {
    name: 'SHOVEL',
    price: '599₽',
    color: 'from-sky-400 to-blue-600',
    accent: 'text-brand-sky',
    perks: ['Всё из COPPER', '/fly везде', 'Приват до 100×100', 'Обход АФК-кика', 'Эксклюзивный префикс', 'Приоритет входа'],
    popular: true,
  },
  {
    name: 'NETHERITE',
    price: '1299₽',
    color: 'from-cyan-300 to-blue-700',
    accent: 'text-brand-cyan',
    perks: ['Всё из SHOVEL', 'Безлимит приватов', '/god на 30 сек в час', 'Кастомные команды', 'Доступ к VIP-чату', 'Именной сундук на спавне'],
  },
];

const Index = () => {
  const [online, setOnline] = useState(847);

  useEffect(() => {
    const t = setInterval(() => {
      setOnline((o) => Math.max(600, Math.min(1200, o + Math.round((Math.random() - 0.5) * 12))));
    }, 2500);
    return () => clearInterval(t);
  }, []);

  const copyIP = () => {
    navigator.clipboard?.writeText('play.mineshovel.ru');
  };

  return (
    <Layout>
      {/* HERO */}
      <section id="home" className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 grid-bg animate-grid-move opacity-70" />
        <div className="absolute top-1/3 -left-40 w-[520px] h-[520px] bg-brand-blue/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 -right-40 w-[520px] h-[520px] bg-brand-sky/25 rounded-full blur-[120px]" />

        <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-12 gap-8 items-center py-20">
          <div className="lg:col-span-7 space-y-8 opacity-0 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-sky/30 bg-brand-sky/5 font-mono text-xs text-brand-sky">
              <span className="w-2 h-2 rounded-full bg-brand-sky animate-blink" />
              СОВРЕМЕННАЯ АНАРХИЯ · SEASON 4
            </div>

            <h1 className="font-display font-black text-6xl md:text-8xl leading-[0.9] tracking-tighter">
              Копай.
              <br />
              <span className="text-gradient">Строй.</span>
              <br />
              <span className="inline-flex items-baseline gap-3">
                Выживай.
                <span className="text-brand-sky inline-block animate-dig origin-bottom">
                  <ShovelLogo size={64} />
                </span>
              </span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              MineShovel — сервер современной анархии нового поколения. Минимум правил, максимум свободы.
              Честная экономика, стабильный онлайн, никакого p2w-беспредела.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" onClick={copyIP} className="bg-brand-sky text-background hover:bg-brand-sky/90 font-display font-bold text-base h-14 px-8 animate-pulse-glow">
                <Icon name="Play" size={18} className="mr-2" />
                play.mineshovel.ru
              </Button>
              <a href="#shop">
                <Button size="lg" variant="outline" className="h-14 px-8 border-brand-cyan/50 text-brand-cyan hover:bg-brand-cyan/10 font-display font-bold text-base">
                  Магазин <Icon name="ArrowRight" size={18} className="ml-2" />
                </Button>
              </a>
            </div>

            <div className="flex items-center gap-8 pt-6">
              <div>
                <div className="font-display font-black text-3xl text-brand-sky">{online}</div>
                <div className="font-mono text-xs text-muted-foreground uppercase">игроков онлайн</div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div>
                <div className="font-display font-black text-3xl">1.20.4</div>
                <div className="font-mono text-xs text-muted-foreground uppercase">версия</div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div>
                <div className="font-display font-black text-3xl">99.8%</div>
                <div className="font-mono text-xs text-muted-foreground uppercase">аптайм</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative animate-float">
              <div className="aspect-square bg-gradient-to-br from-brand-sky via-brand-blue to-brand-cyan rounded-3xl p-1 glow-blue">
                <div className="w-full h-full rounded-3xl bg-background/90 backdrop-blur-sm p-8 flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-mono text-xs text-muted-foreground">SERVER.STATUS</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-brand-sky animate-blink" />
                        <span className="font-display font-bold">ONLINE</span>
                      </div>
                    </div>
                    <span className="text-brand-sky"><ShovelLogo size={24} /></span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="font-mono text-xs text-muted-foreground mb-1">PING</div>
                      <div className="font-display font-black text-5xl text-brand-cyan">12ms</div>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full w-[72%] bg-gradient-to-r from-brand-sky to-brand-cyan" />
                    </div>
                    <div className="grid grid-cols-3 gap-2 font-mono text-[10px] uppercase text-muted-foreground">
                      <div><div className="text-foreground font-bold text-sm">TPS</div>20.0</div>
                      <div><div className="text-foreground font-bold text-sm">RAM</div>72%</div>
                      <div><div className="text-foreground font-bold text-sm">CPU</div>34%</div>
                    </div>
                  </div>

                  <div className="font-mono text-[10px] text-muted-foreground border-t border-border pt-3">
                    $ last_update: 2s ago_<span className="animate-blink">▊</span>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-brand-blue text-white font-display font-black text-xs px-4 py-2 rounded-full rotate-12 glow-blue">
                LIVE
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 border-y border-border/50 bg-background/40 backdrop-blur-sm overflow-hidden py-4">
          <div className="flex gap-12 animate-marquee whitespace-nowrap font-display font-black text-2xl">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="flex items-center gap-12">
                АНАРХИЯ <span className="text-brand-sky">✦</span>
                ЭКОНОМИКА <span className="text-brand-cyan">✦</span>
                PVP <span className="text-brand-blue">✦</span>
                NO P2W <span className="text-brand-sky">✦</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* STATUS */}
      <section id="status" className="py-24 container mx-auto px-6">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <div className="font-mono text-xs text-brand-sky mb-3">// 02 — STATUS</div>
            <h2 className="font-display font-black text-5xl md:text-6xl tracking-tight">Сервер живой.<br />Всегда.</h2>
          </div>
          <div className="font-mono text-xs text-muted-foreground">Данные обновляются каждые 30 секунд</div>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          {[
            { label: 'Онлайн', value: online, icon: 'Users', color: 'text-brand-sky', sub: 'из 1500 слотов' },
            { label: 'Пинг', value: '12ms', icon: 'Zap', color: 'text-brand-cyan', sub: 'стабильно' },
            { label: 'TPS', value: '20.0', icon: 'Activity', color: 'text-brand-blue', sub: 'идеально' },
            { label: 'Аптайм', value: '99.8%', icon: 'Shield', color: 'text-brand-sky', sub: '30 дней' },
          ].map((s) => (
            <Card key={s.label} className="tilt-card border-border bg-card/50 backdrop-blur p-6">
              <div className="flex items-start justify-between mb-6">
                <Icon name={s.icon} className={s.color} size={24} />
                <span className="w-2 h-2 rounded-full bg-brand-sky animate-blink" />
              </div>
              <div className="font-display font-black text-4xl mb-1">{s.value}</div>
              <div className="font-mono text-xs uppercase text-muted-foreground">{s.label}</div>
              <div className="text-xs text-muted-foreground mt-2">{s.sub}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* SHOP */}
      <section id="shop" className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="font-mono text-xs text-brand-cyan mb-3">// 03 — SHOP · RCON + ЮMONEY</div>
            <h2 className="font-display font-black text-5xl md:text-7xl tracking-tight">
              Кастомные<br /><span className="text-gradient">привилегии</span>
            </h2>
            <p className="text-muted-foreground mt-6 max-w-xl mx-auto">
              Выдача автоматическая через RCON сразу после оплаты. Поддержка ЮMoney, банковских карт и СБП.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRIVILEGES.map((p, i) => (
              <div key={p.name} className={`relative rounded-3xl p-[2px] tilt-card ${p.popular ? 'bg-gradient-to-br from-brand-sky via-brand-cyan to-brand-blue' : 'bg-border'}`}>
                {p.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-sky text-background font-display font-black text-xs px-4 py-1.5 rounded-full z-10">
                    ПОПУЛЯРНОЕ
                  </div>
                )}
                <div className="bg-card rounded-3xl p-6 h-full flex flex-col">
                  <div className={`h-24 rounded-2xl bg-gradient-to-br ${p.color} mb-6 flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 grid-bg opacity-30" />
                    <span className="font-display font-black text-2xl text-white drop-shadow-lg relative z-10">#{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div className={`font-display font-black text-2xl ${p.accent}`}>{p.name}</div>
                  <div className="font-display font-black text-4xl mt-2 mb-6">{p.price}</div>
                  <ul className="space-y-2 flex-1 mb-6">
                    {p.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Icon name="Check" size={16} className="text-brand-sky flex-shrink-0 mt-0.5" />
                        {perk}
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full font-display font-bold ${p.popular ? 'bg-brand-sky text-background hover:bg-brand-sky/90' : 'bg-secondary hover:bg-secondary/80'}`}>
                    Купить
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-4 text-center">
            {[
              { icon: 'Zap', title: 'Мгновенная выдача', desc: 'RCON отправляет команду на сервер сразу после оплаты' },
              { icon: 'ShieldCheck', title: 'Безопасно', desc: 'Платежи проходят через защищённый шлюз ЮMoney' },
              { icon: 'Headphones', title: 'Поддержка 24/7', desc: 'Не пришла привилегия — вернём деньги или выдадим вручную' },
            ].map((f) => (
              <div key={f.title} className="p-6 rounded-2xl border border-border bg-card/30 backdrop-blur">
                <Icon name={f.icon} className="text-brand-sky mx-auto mb-3" size={28} />
                <div className="font-display font-bold mb-1">{f.title}</div>
                <div className="text-sm text-muted-foreground">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOCS */}
      <section className="py-24 container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="font-mono text-xs text-brand-sky mb-3">// 04 — LEGAL</div>
          <h2 className="font-display font-black text-5xl md:text-6xl tracking-tight">Документы и правила</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { to: '/rules', icon: 'ScrollText', title: 'Правила сервера', desc: 'Что можно, а за что бан. Читается за 3 минуты.' },
            { to: '/offer', icon: 'FileText', title: 'Публичная оферта', desc: 'Условия покупки привилегий и услуг на сервере.' },
            { to: '/privacy', icon: 'Lock', title: 'Конфиденциальность', desc: 'Как мы обрабатываем и храним ваши данные.' },
          ].map((d) => (
            <Link key={d.to} to={d.to} className="group">
              <Card className="tilt-card border-border bg-card/30 backdrop-blur p-8 h-full">
                <Icon name={d.icon} className="text-brand-sky mb-6" size={32} />
                <h3 className="font-display font-black text-2xl mb-3">{d.title}</h3>
                <p className="text-muted-foreground text-sm mb-6">{d.desc}</p>
                <div className="flex items-center gap-2 text-brand-sky font-mono text-xs group-hover:gap-3 transition-all">
                  Открыть <Icon name="ArrowRight" size={14} />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* SUPPORT */}
      <section id="support" className="py-24 container mx-auto px-6">
        <div className="rounded-3xl p-[2px] bg-gradient-to-br from-brand-sky via-brand-cyan to-brand-blue">
          <div className="bg-card rounded-3xl p-12 md:p-16 grid md:grid-cols-2 gap-8 items-center relative overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="relative">
              <div className="font-mono text-xs text-brand-sky mb-3">// 05 — SUPPORT</div>
              <h2 className="font-display font-black text-4xl md:text-5xl mb-4 tracking-tight">Нужна помощь?</h2>
              <p className="text-muted-foreground mb-8">
                Техническая поддержка работает круглосуточно. Отвечаем в среднем за 7 минут.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button className="bg-brand-sky text-background hover:bg-brand-sky/90 font-display font-bold h-12">
                  <Icon name="Send" size={16} className="mr-2" /> Telegram
                </Button>
                <Button variant="outline" className="border-border h-12 font-display font-bold">
                  <Icon name="MessageCircle" size={16} className="mr-2" /> Discord
                </Button>
                <Button variant="outline" className="border-border h-12 font-display font-bold">
                  <Icon name="Mail" size={16} className="mr-2" /> Email
                </Button>
              </div>
            </div>
            <div className="relative grid grid-cols-2 gap-3">
              {[
                { icon: 'Clock', label: '< 7 мин', sub: 'время ответа' },
                { icon: 'MessageSquare', label: '24/7', sub: 'доступность' },
                { icon: 'Users', label: '12 000+', sub: 'решённых тикетов' },
                { icon: 'Star', label: '4.9/5', sub: 'рейтинг' },
              ].map((s) => (
                <div key={s.label} className="p-5 rounded-2xl bg-background/60 border border-border backdrop-blur">
                  <Icon name={s.icon} className="text-brand-cyan mb-3" size={20} />
                  <div className="font-display font-black text-xl">{s.label}</div>
                  <div className="font-mono text-[10px] uppercase text-muted-foreground">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
