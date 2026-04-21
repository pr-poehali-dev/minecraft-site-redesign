export const SERVER_IP = 'mc.mineshovel.ru';

export const API = {
  products: 'https://functions.poehali.dev/b1d6ab57-31e3-4a09-b5d6-bc5cf142504c',
  orders: 'https://functions.poehali.dev/70b254a3-7d39-4474-ba7d-aaf371a91921',
  status: 'https://functions.poehali.dev/a4fd90c9-73a8-47cf-b48c-1042421d63f3',
};

export interface Product {
  id: number;
  slug: string;
  name: string;
  category: string;
  price: number;
  old_price: number | null;
  description: string;
  features: string[];
  color_from: string | null;
  color_to: string | null;
  is_popular: boolean;
  sort_order: number;
}

export interface ServerStatus {
  online: boolean;
  players_online: number;
  players_max: number;
  version: string;
  hostname: string;
  motd: string[];
}

export interface OrderResponse {
  order_uid: string;
  payment_url: string;
  amount: number;
  product_name: string;
  nickname: string;
}

export interface Order {
  order_uid: string;
  nickname: string;
  product_name: string;
  amount: number;
  status: string;
  created_at: string;
}

export async function fetchProducts(): Promise<Product[]> {
  const r = await fetch(API.products);
  const data = await r.json();
  return data.products || [];
}

export async function fetchStatus(): Promise<ServerStatus> {
  const r = await fetch(API.status);
  return r.json();
}

export async function createOrder(nickname: string, product_slug: string, email?: string): Promise<OrderResponse> {
  const r = await fetch(API.orders, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nickname, product_slug, email }),
  });
  const data = await r.json();
  if (!r.ok) throw new Error(data.error || 'Ошибка оплаты');
  return data;
}

export async function fetchOrder(uid: string): Promise<Order> {
  const r = await fetch(`${API.orders}?uid=${encodeURIComponent(uid)}`);
  if (!r.ok) throw new Error('Заказ не найден');
  return r.json();
}
