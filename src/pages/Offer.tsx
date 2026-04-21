import Icon from '@/components/ui/icon';
import DocPage from '@/components/DocPage';

const SECTIONS = [
  {
    num: '01',
    title: 'Общие положения',
    text: 'Настоящая публичная оферта является официальным предложением администрации Minecraft-сервера MineShovel (далее — «Исполнитель») заключить договор на предоставление цифровых услуг в рамках игрового сервера. Принятие условий оферты производится путём оплаты любого товара или услуги на сайте.',
  },
  {
    num: '02',
    title: 'Предмет договора',
    text: 'Исполнитель предоставляет Заказчику (игроку) доступ к цифровым товарам: привилегии, внутриигровые предметы, валюта, кастомные команды. Услуги выдаются автоматически через систему RCON после подтверждения оплаты платёжным провайдером ЮMoney.',
  },
  {
    num: '03',
    title: 'Стоимость и оплата',
    text: 'Актуальные цены указаны на странице магазина. Оплата производится в российских рублях через платёжный шлюз ЮMoney. Поддерживаются: банковские карты МИР, Visa, Mastercard, кошелёк ЮMoney, СБП. Комиссию провайдера оплачивает Исполнитель.',
  },
  {
    num: '04',
    title: 'Порядок выдачи',
    text: 'Цифровой товар выдаётся автоматически в течение 1-5 минут после успешной оплаты. При технических сбоях выдача производится вручную после обращения в техподдержку с указанием номера транзакции.',
  },
  {
    num: '05',
    title: 'Возврат средств',
    text: 'Возврат возможен в течение 24 часов с момента оплаты при условии: товар не был выдан или был выдан с дефектами, покупка совершена по ошибке (не использовалась), нарушение работы сервиса со стороны Исполнителя. Возврат НЕ производится если: товар был использован, игрок получил бан за нарушение правил, с момента покупки прошло более 24 часов.',
  },
  {
    num: '06',
    title: 'Ответственность',
    text: 'Исполнитель не несёт ответственности за потерю внутриигровых предметов из-за действий других игроков, багов клиента, исключений из геймплея анархии. Исполнитель гарантирует стабильность работы сервера не менее 99% времени в месяц.',
  },
  {
    num: '07',
    title: 'Реквизиты',
    text: 'ИП Иванов Иван Иванович · ИНН 770000000000 · ОГРНИП 320770000000000 · email: support@mineshovel.ru',
  },
];

const Offer = () => (
  <DocPage
    badge="PUBLIC OFFER"
    title="Оферта"
    subtitle="Публичный договор между администрацией MineShovel и игроком о предоставлении цифровых услуг."
    icon="FileText"
  >
    <div className="p-5 rounded-2xl bg-brand-cyan/10 border border-brand-cyan/30 mb-10 flex gap-4">
      <Icon name="ShieldCheck" className="text-brand-cyan flex-shrink-0 mt-1" size={20} />
      <div className="text-sm text-muted-foreground">
        Редакция от 15.04.2026. Оплачивая товары в магазине, вы подтверждаете, что ознакомились и согласны с условиями оферты.
      </div>
    </div>

    <div className="space-y-10">
      {SECTIONS.map((s) => (
        <div key={s.num} className="border-l-2 border-brand-cyan/40 pl-6">
          <div className="flex items-baseline gap-4 mb-3">
            <span className="font-mono text-sm text-brand-cyan">{s.num}</span>
            <h2 className="font-display font-black text-2xl md:text-3xl">{s.title}</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">{s.text}</p>
        </div>
      ))}
    </div>

    <div className="mt-16 grid md:grid-cols-3 gap-4">
      {[
        { icon: 'CreditCard', label: 'Способы оплаты', value: 'МИР, Visa, СБП, ЮMoney' },
        { icon: 'Clock', label: 'Время выдачи', value: '1-5 минут' },
        { icon: 'Undo2', label: 'Возврат', value: 'до 24 часов' },
      ].map((b) => (
        <div key={b.label} className="p-5 rounded-2xl bg-card/50 border border-border">
          <Icon name={b.icon} className="text-brand-sky mb-3" size={20} />
          <div className="font-display font-bold">{b.value}</div>
          <div className="font-mono text-[10px] uppercase text-muted-foreground mt-1">{b.label}</div>
        </div>
      ))}
    </div>
  </DocPage>
);

export default Offer;
