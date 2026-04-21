import json
import os
import uuid
import urllib.parse
import psycopg2
from psycopg2.extras import RealDictCursor


def handler(event, context):
    """Создаёт заказ и возвращает ссылку на оплату ЮMoney"""
    method = event.get('httpMethod', 'POST')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    dsn = os.environ.get('DATABASE_URL')

    if method == 'GET':
        params = event.get('queryStringParameters') or {}
        order_uid = params.get('uid', '')
        if not order_uid:
            return _resp(400, {'error': 'uid required'})
        conn = psycopg2.connect(dsn)
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(
                    "SELECT order_uid, nickname, product_name, amount, status, created_at "
                    "FROM orders WHERE order_uid = %s",
                    (order_uid,)
                )
                row = cur.fetchone()
                if not row:
                    return _resp(404, {'error': 'order not found'})
                return _resp(200, {
                    'order_uid': row['order_uid'],
                    'nickname': row['nickname'],
                    'product_name': row['product_name'],
                    'amount': row['amount'],
                    'status': row['status'],
                    'created_at': row['created_at'].isoformat() if row['created_at'] else None,
                })
        finally:
            conn.close()

    if method != 'POST':
        return _resp(405, {'error': 'method not allowed'})

    body_raw = event.get('body') or '{}'
    try:
        body = json.loads(body_raw)
    except Exception:
        return _resp(400, {'error': 'invalid json'})

    nickname = (body.get('nickname') or '').strip()
    product_slug = (body.get('product_slug') or '').strip()
    email = (body.get('email') or '').strip()

    if not nickname or len(nickname) < 3 or len(nickname) > 16:
        return _resp(400, {'error': 'Ник должен быть от 3 до 16 символов'})
    if not product_slug:
        return _resp(400, {'error': 'product_slug required'})

    conn = psycopg2.connect(dsn)
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(
                "SELECT slug, name, price FROM products WHERE slug = %s AND active = TRUE",
                (product_slug,)
            )
            product = cur.fetchone()
            if not product:
                return _resp(404, {'error': 'Товар не найден'})

            order_uid = uuid.uuid4().hex[:16]
            cur.execute(
                "INSERT INTO orders (order_uid, nickname, product_slug, product_name, amount, email, status) "
                "VALUES (%s, %s, %s, %s, %s, %s, 'pending') RETURNING id",
                (order_uid, nickname, product['slug'], product['name'], product['price'], email)
            )
            conn.commit()

        wallet = os.environ.get('YOOMONEY_WALLET', '')
        origin = (event.get('headers') or {}).get('origin') or (event.get('headers') or {}).get('Origin') or ''
        success_url = f"{origin}/order/{order_uid}" if origin else f"https://mineshovel.ru/order/{order_uid}"

        if wallet:
            params = {
                'receiver': wallet,
                'quickpay-form': 'shop',
                'targets': f"MineShovel: {product['name']} для {nickname}",
                'paymentType': 'AC',
                'sum': str(product['price']),
                'label': order_uid,
                'successURL': success_url,
            }
            payment_url = 'https://yoomoney.ru/quickpay/confirm?' + urllib.parse.urlencode(params)
        else:
            payment_url = success_url

        return _resp(200, {
            'order_uid': order_uid,
            'payment_url': payment_url,
            'amount': product['price'],
            'product_name': product['name'],
            'nickname': nickname,
        })
    finally:
        conn.close()


def _resp(status, body):
    return {
        'statusCode': status,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        'body': json.dumps(body, ensure_ascii=False)
    }
