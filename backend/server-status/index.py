import json
import urllib.request


def handler(event, context):
    """Возвращает текущий статус Minecraft сервера через mcsrvstat API"""
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

    server_address = 'mc.mineshovel.ru'
    url = f'https://api.mcsrvstat.us/3/{server_address}'

    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'MineShovel-Site'})
        with urllib.request.urlopen(req, timeout=8) as r:
            data = json.loads(r.read().decode('utf-8'))
    except Exception as e:
        data = {'online': False, 'error': str(e)}

    players = data.get('players', {}) if isinstance(data, dict) else {}
    version = data.get('version', '') if isinstance(data, dict) else ''

    result = {
        'online': data.get('online', False),
        'players_online': players.get('online', 0),
        'players_max': players.get('max', 0),
        'version': version if isinstance(version, str) else version.get('name', ''),
        'ip': data.get('ip', ''),
        'port': data.get('port', 25565),
        'hostname': server_address,
        'motd': (data.get('motd', {}) or {}).get('clean', []) if isinstance(data, dict) else [],
    }

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        'body': json.dumps(result, ensure_ascii=False)
    }
