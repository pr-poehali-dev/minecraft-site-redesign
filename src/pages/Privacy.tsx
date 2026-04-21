import Icon from '@/components/ui/icon';
import DocPage from '@/components/DocPage';

const SECTIONS = [
  {
    num: '01',
    title: 'Какие данные мы собираем',
    items: [
      'Игровой никнейм и UUID Minecraft-аккаунта',
      'Email для обратной связи и уведомлений о заказе',
      'IP-адрес (используется для защиты от мультиаккаунтов и DDoS)',
      'Данные платёжной транзакции (номер заказа, сумма) — без номеров карт',
      'Лог действий в игре и чате (хранится 90 дней)',
    ],
  },
  {
    num: '02',
    title: 'Как мы используем данные',
    items: [
      'Предоставление услуг и выдача купленных товаров через RCON',
      'Техническая поддержка и разрешение спорных ситуаций',
      'Защита сервера от нарушителей и мошенничества',
      'Информирование о статусе заказа и важных изменениях',
      'Обезличенная аналитика посещаемости через Яндекс.Метрику',
    ],
  },
  {
    num: '03',
    title: 'Передача третьим лицам',
    items: [
      'Платёжному провайдеру ЮMoney — только для обработки транзакций',
      'Яндекс.Метрике — обезличенные данные о посещениях сайта',
      'Государственным органам — только по официальному запросу',
      'В остальных случаях данные не передаются никому',
    ],
  },
  {
    num: '04',
    title: 'Защита данных',
    items: [
      'Все соединения используют SSL/TLS шифрование',
      'Пароли хранятся в виде необратимых bcrypt-хешей',
      'Номера карт не сохраняются на наших серверах',
      'Доступ к базе данных имеют только 2 администратора',
    ],
  },
  {
    num: '05',
    title: 'Ваши права',
    items: [
      'Запросить копию хранящихся о вас данных',
      'Потребовать удаления аккаунта и связанных данных',
      'Исправить неточные данные через техподдержку',
      'Отозвать согласие на обработку данных',
    ],
  },
  {
    num: '06',
    title: 'Cookies',
    items: [
      'Сессионные cookies — для работы корзины и авторизации',
      'Аналитические cookies Яндекс.Метрики — с вашего согласия',
      'Отключить cookies можно в настройках браузера',
    ],
  },
];

const Privacy = () => (
  <DocPage
    badge="PRIVACY POLICY"
    title="Конфиденциальность"
    subtitle="Мы собираем минимум данных и обрабатываем их согласно 152-ФЗ «О персональных данных»."
    icon="Lock"
  >
    <div className="p-5 rounded-2xl bg-brand-sky/10 border border-brand-sky/30 mb-10 flex gap-4">
      <Icon name="ShieldCheck" className="text-brand-sky flex-shrink-0 mt-1" size={20} />
      <div className="text-sm text-muted-foreground">
        Редакция от 15.04.2026. Используя сайт и сервер MineShovel, вы принимаете условия этой политики.
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

    <div className="mt-16 p-8 rounded-3xl border border-brand-sky/30 bg-brand-sky/5">
      <div className="flex items-start gap-4">
        <Icon name="Mail" className="text-brand-sky flex-shrink-0" size={24} />
        <div>
          <h3 className="font-display font-black text-xl mb-2">Связаться по вопросам данных</h3>
          <p className="text-sm text-muted-foreground">
            Если у вас есть вопросы о хранении или обработке ваших данных — напишите на{' '}
            <span className="text-brand-sky">privacy@mineshovel.ru</span>. Ответим в течение 3 рабочих дней.
          </p>
        </div>
      </div>
    </div>
  </DocPage>
);

export default Privacy;
