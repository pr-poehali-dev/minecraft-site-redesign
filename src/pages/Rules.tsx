import Icon from '@/components/ui/icon';
import DocPage from '@/components/DocPage';

const SECTIONS = [
  {
    num: '01',
    title: 'Философия сервера',
    items: [
      'MineShovel — современная анархия. Минимум правил, максимум свободы.',
      'Мы не вмешиваемся в отношения игроков, если они не нарушают пункты ниже.',
      'Гриферство, воровство, обманы в рамках игры — часть геймплея.',
    ],
  },
  {
    num: '02',
    title: 'Что запрещено без исключений',
    items: [
      'Читы: X-Ray, KillAura, Fly, авто-кликеры, ESP. Разрешены OptiFine, Sodium, Lunar, Minimap без радара.',
      'DDoS, взлом аккаунтов, использование уязвимостей сервера.',
      'Реклама сторонних серверов в чате и ЛС.',
      'Расизм, призывы к насилию, 18+ контент в чате, никах и постройках.',
      'Мультиаккаунты для обхода банов.',
    ],
  },
  {
    num: '03',
    title: 'Чат и общение',
    items: [
      'Флуд, капс и спам более 3 сообщений подряд — мут 30 минут.',
      'Мат разрешён, но без перехода на личности.',
      'Провокации администрации и троллинг тикетов — бан.',
    ],
  },
  {
    num: '04',
    title: 'PvP и рейды',
    items: [
      'PvP разрешено везде, кроме спавна и торговой зоны.',
      'Рейды чужих баз разрешены. Приваченные чанки — неприкосновенны.',
      'Ловушки, замуровывание, TNT-канноны — всё разрешено.',
    ],
  },
  {
    num: '05',
    title: 'Администрация',
    items: [
      'Админы не вмешиваются в игровые конфликты между игроками.',
      'Решения по банам — окончательные, обжалование через тикеты.',
      'Админ НИКОГДА не попросит пароль или доступ к аккаунту.',
    ],
  },
];

const Rules = () => (
  <DocPage
    badge="RULES"
    title="Правила"
    subtitle="Коротко о том, за что бан, а что — часть геймплея. Анархия не значит беспредел."
    icon="ScrollText"
  >
    <div className="p-5 rounded-2xl bg-brand-sky/10 border border-brand-sky/30 mb-10 flex gap-4">
      <Icon name="Info" className="text-brand-sky flex-shrink-0 mt-1" size={20} />
      <div className="text-sm text-muted-foreground">
        Правила действительны с 01.01.2026. Последнее обновление: 15.04.2026. Незнание правил не освобождает от бана.
      </div>
    </div>

    <div className="space-y-10">
      {SECTIONS.map((s) => (
        <div key={s.num} className="border-l-2 border-brand-sky/40 pl-6">
          <div className="flex items-baseline gap-4 mb-4">
            <span className="font-mono text-sm text-brand-sky">{s.num}</span>
            <h2 className="font-display font-black text-2xl md:text-3xl">{s.title}</h2>
          </div>
          <ul className="space-y-3">
            {s.items.map((item, i) => (
              <li key={i} className="flex gap-3 text-muted-foreground leading-relaxed">
                <span className="text-brand-sky font-mono text-sm flex-shrink-0 mt-1">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <div className="mt-16 p-8 rounded-3xl border border-destructive/30 bg-destructive/5">
      <div className="flex items-start gap-4">
        <Icon name="AlertTriangle" className="text-destructive flex-shrink-0" size={24} />
        <div>
          <h3 className="font-display font-black text-xl mb-2">Наказания</h3>
          <p className="text-sm text-muted-foreground">
            Первое нарушение — предупреждение. Повторное — мут/кик. Третье — бан от 3 дней. Грубые нарушения (читы, DDoS) — перманентный бан без предупреждения.
          </p>
        </div>
      </div>
    </div>
  </DocPage>
);

export default Rules;
