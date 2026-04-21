import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const NAV = [
  { id: 'home', label: 'Главная' },
  { id: 'shop', label: 'Магазин' },
  { id: 'status', label: 'Статус' },
  { id: 'privileges', label: 'Привилегии' },
  { id: 'rules', label: 'Правила' },
  { id: 'offer', label: 'Оферта' },
  { id: 'privacy', label: 'Конфиденциальность' },
  { id: 'support', label: 'Поддержка' },
];

const PRIVILEGES = [
  {
    name: 'STONE',
    price: '99₽',
    color: 'from-zinc-600 to-zinc-800',
    accent: 'text-white',
    perks: ['/fly на спавне', '3 дома', 'Цветной ник', 'Префикс [STONE]'],
  },
  {
    name: 'IRON',
    price: '299₽',
    color: 'from-cyan-400 to-blue-600',
    accent: 'text-neon-cyan',
    perks: ['Всё из STONE', '/kit iron раз в 12ч', '6 домов', '/heal и /feed', 'Доступ к /workbench'],
  },
  {
    name: 'DIAMOND',
    price: '599₽',
    color: 'from-fuchsia-500 to-pink-600',
    accent: 'text-neon-magenta',
    perks: ['Всё из IRON', '/fly везде', '10 домов', '/enderchest', 'Эксклюзивный префикс', 'Приоритет входа'],
    popular: true,
  },
  {
    name: 'NETHERITE',
    price: '1299₽',
    color: 'from-lime-300 to-emerald-500',
    accent: 'text-neon-lime',
    perks: ['Всё из DIAMOND', 'Безлимит домов', 'Кастомные команды', '/god режим', 'Своя приват-зона 200×200', 'VIP-чат'],
  },
];

const RULES = [
  { q: 'Можно ли использовать читы?', a: 'Запрещены любые клиенты с X-Ray, KillAura, Fly-хаки и автокликеры. Разрешены только оптимизации (OptiFine, Sodium, Lunar).' },
  { q: 'Правила общения в чате', a: 'Запрещены оскорбления, флуд, реклама сторонних серверов и разжигание конфликтов. Используйте /ticket для жалоб.' },
  { q: 'Гриферство и воровство', a: 'Приват вашей территории обязателен. На неприваченных чанках всё делается на ваш страх и риск. Взлом приватов — перманентный бан.' },
  { q: 'PvP-зоны', a: 'PvP разрешено только в специально отмеченных зонах и на арене. Нападение на спавне приведёт к блокировке.' },
];

const Index = () => {
  const [online, setOnline] = useState(247);

  useEffect(() => {
    const t = setInterval(() => {
      setOnline((o) => Math.max(180, Math.min(420, o + Math.round((Math.random() - 0.5) * 8))));
    }, 2500);
    return () => clearInterval(t);
  }, []);

  const copyIP = () => {
    navigator.clipboard?.writeText('play.neoncraft.ru');
  };

  return (
    <div className="min-h-screen noise">
      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border/50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2 font-display font-black text-lg tracking-tight">
            <div className="w-8 h-8 bg-neon-lime rounded-md flex items-center justify-center glow-lime">
              <Icon name="Box" size={18} className="text-background" />
            </div>
            NEON<span className="text-neon-lime">CRAFT</span>
          </a>
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="px-3 py-2 text-sm text-muted-foreground hover:text-neon-lime transition-colors">
                {n.label}
              </a>
            ))}
          </nav>
          <Button size="sm" onClick={copyIP} className="bg-neon-lime text-background hover:bg-neon-lime/90 font-display font-bold">
            <Icon name="Copy" size={14} className="mr-1.5" /> IP
          </Button>
        </div>
      </header>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg animate-grid-move opacity-60" />
        <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] bg-neon-violet/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 -right-40 w-[500px] h-[500px] bg-neon-magenta/30 rounded-full blur-[120px]" />

        <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-12 gap-8 items-center py-20">
          <div className="lg:col-span-7 space-y-8 opacity-0 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-lime/30 bg-neon-lime/5 font-mono text-xs">
              <span className="w-2 h-2 rounded-full bg-neon-lime animate-blink" />
              SEASON 4 · ONLINE NOW
            </div>

            <h1 className="font-display font-black text-6xl md:text-8xl leading-[0.9] tracking-tighter">
              Собери
              <br />
              <span className="text-gradient">новый мир</span>
              <br />
              <span className="inline-flex items-baseline gap-3">
                с нуля
                <span className="text-neon-lime text-4xl md:text-6xl">▮</span>
              </span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Стабильный 24/7 сервер с честным геймплеем, продуманной экономикой и кастомными привилегиями.
              Без p2w, без лагов, без токсичности.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" onClick={copyIP} className="bg-neon-lime text-background hover:bg-neon-lime/90 font-display font-bold text-base h-14 px-8 animate-pulse-glow">
                <Icon name="Play" size={18} className="mr-2" />
                play.neoncraft.ru
              </Button>
              <a href="#shop">
                <Button size="lg" variant="outline" className="h-14 px-8 border-neon-magenta/50 text-neon-magenta hover:bg-neon-magenta/10 font-display font-bold text-base">
                  Магазин <Icon name="ArrowRight" size={18} className="ml-2" />
                </Button>
              </a>
            </div>

            <div className="flex items-center gap-8 pt-6">
              <div>
                <div className="font-display font-black text-3xl text-neon-lime">{online}</div>
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
              <div className="aspect-square bg-gradient-to-br from-neon-violet via-neon-magenta to-neon-lime rounded-3xl p-1 glow-magenta">
                <div className="w-full h-full rounded-3xl bg-background/90 backdrop-blur-sm p-8 flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-mono text-xs text-muted-foreground">SERVER.STATUS</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-neon-lime animate-blink" />
                        <span className="font-display font-bold">ONLINE</span>
                      </div>
                    </div>
                    <Icon name="Wifi" className="text-neon-lime" size={24} />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="font-mono text-xs text-muted-foreground mb-1">PING</div>
                      <div className="font-display font-black text-5xl text-neon-cyan">12ms</div>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full w-[68%] bg-gradient-to-r from-neon-lime to-neon-cyan" />
                    </div>
                    <div className="grid grid-cols-3 gap-2 font-mono text-[10px] uppercase text-muted-foreground">
                      <div><div className="text-foreground font-bold text-sm">TPS</div>20.0</div>
                      <div><div className="text-foreground font-bold text-sm">RAM</div>68%</div>
                      <div><div className="text-foreground font-bold text-sm">CPU</div>34%</div>
                    </div>
                  </div>

                  <div className="font-mono text-[10px] text-muted-foreground border-t border-border pt-3">
                    $ last_update: 2s ago_<span className="animate-blink">▊</span>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-neon-magenta text-white font-display font-black text-xs px-4 py-2 rounded-full rotate-12 glow-magenta">
                LIVE
              </div>
            </div>
          </div>
        </div>

        {/* marquee */}
        <div className="absolute bottom-0 left-0 right-0 border-y border-border/50 bg-background/40 backdrop-blur-sm overflow-hidden py-4">
          <div className="flex gap-12 animate-marquee whitespace-nowrap font-display font-black text-2xl">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="flex items-center gap-12">
                SURVIVAL <span className="text-neon-lime">✦</span>
                MINIGAMES <span className="text-neon-magenta">✦</span>
                PVP ARENAS <span className="text-neon-cyan">✦</span>
                NO P2W <span className="text-neon-violet">✦</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* STATUS */}
      <section id="status" className="py-24 container mx-auto px-6">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <div className="font-mono text-xs text-neon-lime mb-3">// 02 — STATUS</div>
            <h2 className="font-display font-black text-5xl md:text-6xl tracking-tight">Сервер живой.<br />Всегда.</h2>
          </div>
          <div className="font-mono text-xs text-muted-foreground">Данные обновляются каждые 30 секунд</div>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          {[
            { label: 'Онлайн', value: online, icon: 'Users', color: 'text-neon-lime', sub: 'из 500 слотов' },
            { label: 'Пинг', value: '12ms', icon: 'Zap', color: 'text-neon-cyan', sub: 'стабильно' },
            { label: 'TPS', value: '20.0', icon: 'Activity', color: 'text-neon-magenta', sub: 'идеально' },
            { label: 'Аптайм', value: '99.8%', icon: 'Shield', color: 'text-neon-violet', sub: '30 дней' },
          ].map((s) => (
            <Card key={s.label} className="tilt-card border-border bg-card/50 backdrop-blur p-6">
              <div className="flex items-start justify-between mb-6">
                <Icon name={s.icon as any} className={s.color} size={24} />
                <span className="w-2 h-2 rounded-full bg-neon-lime animate-blink" />
              </div>
              <div className="font-display font-black text-4xl mb-1">{s.value}</div>
              <div className="font-mono text-xs uppercase text-muted-foreground">{s.label}</div>
              <div className="text-xs text-muted-foreground mt-2">{s.sub}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* SHOP / PRIVILEGES */}
      <section id="shop" className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="font-mono text-xs text-neon-magenta mb-3">// 03 — SHOP · RCON + ЮMONEY</div>
            <h2 id="privileges" className="font-display font-black text-5xl md:text-7xl tracking-tight">
              Кастомные<br /><span className="text-gradient">привилегии</span>
            </h2>
            <p className="text-muted-foreground mt-6 max-w-xl mx-auto">
              Выдача автоматическая через RCON сразу после оплаты. Поддержка ЮMoney, банковских карт и СБП.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRIVILEGES.map((p, i) => (
              <div key={p.name} className={`relative rounded-3xl p-[2px] tilt-card ${p.popular ? 'bg-gradient-to-br from-neon-lime via-neon-magenta to-neon-violet' : 'bg-border'}`}>
                {p.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-neon-lime text-background font-display font-black text-xs px-4 py-1.5 rounded-full z-10">
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
                        <Icon name="Check" size={16} className="text-neon-lime flex-shrink-0 mt-0.5" />
                        {perk}
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full font-display font-bold ${p.popular ? 'bg-neon-lime text-background hover:bg-neon-lime/90' : 'bg-secondary hover:bg-secondary/80'}`}>
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
                <Icon name={f.icon as any} className="text-neon-lime mx-auto mb-3" size={28} />
                <div className="font-display font-bold mb-1">{f.title}</div>
                <div className="text-sm text-muted-foreground">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RULES */}
      <section id="rules" className="py-24 container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="font-mono text-xs text-neon-cyan mb-3">// 04 — RULES</div>
            <h2 className="font-display font-black text-5xl md:text-6xl tracking-tight mb-6">Правила<br />сервера</h2>
            <p className="text-muted-foreground mb-6">
              Мы за честную игру. Правила простые и одинаковые для всех — включая администрацию.
            </p>
            <div className="inline-flex items-center gap-3 p-4 rounded-2xl bg-neon-magenta/10 border border-neon-magenta/30">
              <Icon name="AlertTriangle" className="text-neon-magenta" />
              <span className="text-sm">Незнание правил не освобождает от бана</span>
            </div>
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {RULES.map((r, i) => (
              <AccordionItem key={i} value={`r${i}`} className="border border-border rounded-2xl px-6 bg-card/30 backdrop-blur">
                <AccordionTrigger className="font-display font-bold text-left hover:no-underline">
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-xs text-neon-lime">0{i + 1}</span>
                    {r.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{r.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* LEGAL */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-6">
          <Card id="offer" className="p-8 border-border bg-card/30 backdrop-blur tilt-card">
            <div className="font-mono text-xs text-neon-lime mb-3">// OFFER</div>
            <h3 className="font-display font-black text-3xl mb-4">Публичная оферта</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Договор между администрацией NEONCRAFT и игроком. Покупая привилегию или любой товар в магазине, вы принимаете условия оферты. Товары — цифровые услуги, возврат возможен в течение 24 часов при технических сбоях.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2"><Icon name="FileText" size={16} className="text-neon-lime" /> Предмет договора — доступ к игровому контенту</li>
              <li className="flex gap-2"><Icon name="FileText" size={16} className="text-neon-lime" /> Оплата — через ЮMoney, карты, СБП</li>
              <li className="flex gap-2"><Icon name="FileText" size={16} className="text-neon-lime" /> Возврат — при невыдаче товара RCON-системой</li>
            </ul>
          </Card>

          <Card id="privacy" className="p-8 border-border bg-card/30 backdrop-blur tilt-card">
            <div className="font-mono text-xs text-neon-cyan mb-3">// PRIVACY</div>
            <h3 className="font-display font-black text-3xl mb-4">Конфиденциальность</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Мы собираем минимум данных: никнейм, email для связи и данные платежа через защищённый шлюз. Данные не передаются третьим лицам, кроме платёжного провайдера для обработки транзакций.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2"><Icon name="Lock" size={16} className="text-neon-cyan" /> Шифрование SSL на всех этапах</li>
              <li className="flex gap-2"><Icon name="Lock" size={16} className="text-neon-cyan" /> Хранение согласно 152-ФЗ</li>
              <li className="flex gap-2"><Icon name="Lock" size={16} className="text-neon-cyan" /> Удаление данных по запросу</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* SUPPORT */}
      <section id="support" className="py-24 container mx-auto px-6">
        <div className="rounded-3xl p-[2px] bg-gradient-to-br from-neon-lime via-neon-cyan to-neon-magenta">
          <div className="bg-card rounded-3xl p-12 md:p-16 grid md:grid-cols-2 gap-8 items-center relative overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="relative">
              <div className="font-mono text-xs text-neon-lime mb-3">// 06 — SUPPORT</div>
              <h2 className="font-display font-black text-4xl md:text-5xl mb-4 tracking-tight">Нужна помощь?</h2>
              <p className="text-muted-foreground mb-8">
                Техническая поддержка работает круглосуточно. Отвечаем в среднем за 7 минут.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button className="bg-neon-lime text-background hover:bg-neon-lime/90 font-display font-bold h-12">
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
                  <Icon name={s.icon as any} className="text-neon-cyan mb-3" size={20} />
                  <div className="font-display font-black text-xl">{s.label}</div>
                  <div className="font-mono text-[10px] uppercase text-muted-foreground">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-10">
        <div className="container mx-auto px-6 flex flex-wrap items-center justify-between gap-4">
          <div className="font-display font-black text-xl">
            NEON<span className="text-neon-lime">CRAFT</span>
          </div>
          <div className="font-mono text-xs text-muted-foreground">
            © 2026 · NEONCRAFT · Не аффилирован с Mojang AB
          </div>
          <div className="flex gap-3">
            <a href="#offer" className="text-xs text-muted-foreground hover:text-neon-lime">Оферта</a>
            <a href="#privacy" className="text-xs text-muted-foreground hover:text-neon-lime">Конфиденциальность</a>
            <a href="#rules" className="text-xs text-muted-foreground hover:text-neon-lime">Правила</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
