CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(64) UNIQUE NOT NULL,
    name VARCHAR(128) NOT NULL,
    category VARCHAR(64) NOT NULL,
    price INTEGER NOT NULL,
    old_price INTEGER,
    description TEXT,
    features JSONB DEFAULT '[]'::jsonb,
    rcon_commands JSONB DEFAULT '[]'::jsonb,
    color_from VARCHAR(32),
    color_to VARCHAR(32),
    is_popular BOOLEAN DEFAULT FALSE,
    sort_order INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    order_uid VARCHAR(64) UNIQUE NOT NULL,
    nickname VARCHAR(32) NOT NULL,
    product_slug VARCHAR(64) NOT NULL,
    product_name VARCHAR(128) NOT NULL,
    amount INTEGER NOT NULL,
    status VARCHAR(32) DEFAULT 'pending',
    payment_method VARCHAR(32) DEFAULT 'yoomoney',
    email VARCHAR(128),
    created_at TIMESTAMP DEFAULT NOW(),
    paid_at TIMESTAMP,
    delivered_at TIMESTAMP,
    rcon_log TEXT
);

CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_nickname ON orders(nickname);

INSERT INTO products (slug, name, category, price, description, features, rcon_commands, color_from, color_to, is_popular, sort_order) VALUES
('dirt', 'DIRT', 'privilege', 99, 'Базовая привилегия для знакомства с сервером', '["Цветной ник в чате", "Префикс [DIRT]", "Доступ к /hat", "Скрытие присоединения", "2 приватных дома"]'::jsonb, '["lp user {player} parent add dirt"]'::jsonb, '#475569', '#1e293b', false, 1),
('copper', 'COPPER', 'privilege', 299, 'Расширенные возможности для активных игроков', '["Всё из DIRT", "/fly на 5 мин раз в час", "Приват до 30x30", "/feed и /heal раз в 30 мин", "Кастомный префикс", "4 приватных дома"]'::jsonb, '["lp user {player} parent add copper"]'::jsonb, '#fb923c', '#b45309', false, 2),
('shovel', 'SHOVEL', 'privilege', 599, 'Легендарная привилегия сервера', '["Всё из COPPER", "/fly везде без лимита", "Приват до 100x100", "Обход AFK-кика", "Эксклюзивный префикс [SHOVEL]", "Приоритет входа на сервер", "8 приватных домов"]'::jsonb, '["lp user {player} parent add shovel"]'::jsonb, '#38bdf8', '#2563eb', true, 3),
('netherite', 'NETHERITE', 'privilege', 1299, 'Максимальная привилегия для топ-игроков', '["Всё из SHOVEL", "Безлимит приватов", "/god на 30 сек в час", "Кастомные команды", "Доступ к VIP-чату", "Именной сундук на спавне", "Безлимит домов"]'::jsonb, '["lp user {player} parent add netherite"]'::jsonb, '#67e8f9', '#1d4ed8', false, 4),
('case-basic', 'Обычный кейс', 'case', 49, 'Случайные внутриигровые предметы', '["3 случайных предмета", "Шанс редкой вещи 5%", "Минимум 1 ресурс"]'::jsonb, '["give {player} chest_minecart 1"]'::jsonb, '#64748b', '#334155', false, 5),
('case-premium', 'Премиум кейс', 'case', 149, 'Повышенный шанс редких предметов', '["5 случайных предметов", "Шанс редкой вещи 25%", "Гарантированный алмаз"]'::jsonb, '["give {player} diamond 1"]'::jsonb, '#a78bfa', '#6d28d9', false, 6),
('case-legendary', 'Легендарный кейс', 'case', 499, 'Уникальные предметы сервера', '["10 предметов", "Шанс незерита 50%", "Кастомное оружие", "Эффекты при открытии"]'::jsonb, '["give {player} netherite_ingot 1"]'::jsonb, '#fbbf24', '#b45309', false, 7),
('coins-small', '1000 монет', 'currency', 99, 'Внутриигровая валюта для торговли', '["1000 монет на баланс", "Мгновенное зачисление"]'::jsonb, '["eco give {player} 1000"]'::jsonb, '#fde047', '#ca8a04', false, 8),
('coins-medium', '5000 монет', 'currency', 399, 'Бонус +500 монет', '["5000 монет на баланс", "+500 бонусных монет", "Мгновенное зачисление"]'::jsonb, '["eco give {player} 5500"]'::jsonb, '#fde047', '#ca8a04', false, 9),
('coins-large', '20000 монет', 'currency', 1299, 'Бонус +5000 монет', '["20000 монет на баланс", "+5000 бонусных монет", "VIP-статус магазина"]'::jsonb, '["eco give {player} 25000"]'::jsonb, '#fde047', '#ca8a04', false, 10)
ON CONFLICT (slug) DO NOTHING;
