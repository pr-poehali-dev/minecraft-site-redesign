import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor


def handler(event, context):
    """Возвращает список активных товаров магазина MineShovel"""
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    dsn = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(dsn)
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(
                "SELECT id, slug, name, category, price, old_price, description, "
                "features, color_from, color_to, is_popular, sort_order "
                "FROM products WHERE active = TRUE ORDER BY sort_order ASC"
            )
            rows = cur.fetchall()
            products = []
            for r in rows:
                products.append({
                    'id': r['id'],
                    'slug': r['slug'],
                    'name': r['name'],
                    'category': r['category'],
                    'price': r['price'],
                    'old_price': r['old_price'],
                    'description': r['description'],
                    'features': r['features'] or [],
                    'color_from': r['color_from'],
                    'color_to': r['color_to'],
                    'is_popular': r['is_popular'],
                    'sort_order': r['sort_order'],
                })
    finally:
        conn.close()

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        'body': json.dumps({'products': products}, ensure_ascii=False)
    }
