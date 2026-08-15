#!/usr/bin/env python3
import json
import os
import time
import urllib.request
import urllib.error
from pathlib import Path

ACCOUNT_ID = os.environ.get('CF_CENTRAL_ACCOUNT_ID', '')
API_TOKEN = os.environ.get('CF_CENTRAL_API_TOKEN', '')
LEGACY_KEY = os.environ.get('CF_CENTRAL_KEY', '')
AUTH_EMAIL = os.environ.get('CF_AUTH_EMAIL', 'joemaari@gmail.com')

if not ACCOUNT_ID:
    raise RuntimeError('CF_CENTRAL_ACCOUNT_ID is required')
if not API_TOKEN and not LEGACY_KEY:
    raise RuntimeError('Set CF_CENTRAL_API_TOKEN (preferred) or CF_CENTRAL_KEY')

EMBEDDING_URL = f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/baai/bge-base-en-v1.5"
VECTORIZE_URL = f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/vectorize/v2/indexes/liam-kb/upsert"

EMBED_BATCH = 50
UPSERT_BATCH = 100
MAX_RETRIES = 3
TEXT_TRUNCATE = 800

BASE_DIR = Path(__file__).resolve().parent
LIAM_FILE = Path(os.environ.get('LIAM_KB_FILE', BASE_DIR / 'azure_docs_liam_travel_kb.json'))
AMA_FILE = Path(os.environ.get('AMA_KB_FILE', BASE_DIR / 'azure_docs_amawaterways.json'))


def auth_headers(content_type='application/json'):
    headers = {'Content-Type': content_type}
    if API_TOKEN:
        headers['Authorization'] = f'Bearer {API_TOKEN}'
    else:
        # Temporary compatibility path for existing deployments. Rotate away
        # from Global API Keys and use CF_CENTRAL_API_TOKEN instead.
        headers['X-Auth-Email'] = AUTH_EMAIL
        headers['X-Auth-Key'] = LEGACY_KEY
    return headers


def api_request(url, data, retries=MAX_RETRIES, content_type='application/json'):
    headers = auth_headers(content_type)
    body = data if isinstance(data, bytes) else json.dumps(data).encode('utf-8')
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, data=body, headers=headers, method='POST')
            with urllib.request.urlopen(req, timeout=60) as resp:
                return json.loads(resp.read().decode('utf-8'))
        except (urllib.error.URLError, urllib.error.HTTPError, OSError):
            if attempt < retries - 1:
                time.sleep(2 ** attempt)
            else:
                raise


def get_embeddings(texts):
    resp = api_request(EMBEDDING_URL, {'text': texts})
    if not resp.get('success'):
        raise RuntimeError(f'Embedding API error: {resp}')
    return resp['result']['data']


def upsert_vectors(vectors):
    ndjson_lines = [json.dumps(v) for v in vectors]
    body = '\n'.join(ndjson_lines).encode('utf-8')
    resp = api_request(VECTORIZE_URL, body, content_type='application/x-ndjson')
    if not resp.get('success'):
        raise RuntimeError(f'Vectorize upsert error: {resp}')
    return resp


def stringify_field(val):
    if not val:
        return ''
    if isinstance(val, list):
        return ', '.join(str(x) for x in val)
    return str(val)


def load_liam_docs():
    if not LIAM_FILE.exists():
        raise FileNotFoundError(f"File not found: {LIAM_FILE}")
    with open(LIAM_FILE, 'r', encoding='utf-8') as f:
        docs = json.load(f)

    items = []
    for i, doc in enumerate(docs):
        title = stringify_field(doc.get('title'))
        category = stringify_field(doc.get('category'))
        destinations = stringify_field(doc.get('destinations'))
        chunk_text = stringify_field(doc.get('chunk_text'))

        parts = [title, category, destinations, chunk_text[:TEXT_TRUNCATE]]
        combined = ' | '.join(filter(None, parts))

        items.append({
            'id': f'liam-travel-kb_{i}',
            'text': combined,
            'metadata': {
                'source': 'liam-travel-kb',
                'title': title,
                'text': combined,
            },
        })
    return items


def load_ama_docs():
    if not AMA_FILE.exists():
        raise FileNotFoundError(f"File not found: {AMA_FILE}")
    with open(AMA_FILE, 'r', encoding='utf-8') as f:
        docs = json.load(f)

    items = []
    for i, doc in enumerate(docs):
        title = stringify_field(doc.get('title'))
        travel_brand = stringify_field(doc.get('travel_brand'))
        destinations = stringify_field(doc.get('destinations'))
        text_field = stringify_field(doc.get('chunk_text')) or stringify_field(doc.get('body_text'))

        parts = [title, travel_brand, destinations, text_field[:TEXT_TRUNCATE]]
        combined = ' | '.join(filter(None, parts))

        items.append({
            'id': f'amawaterways_{i}',
            'text': combined,
            'metadata': {
                'source': 'amawaterways',
                'title': title,
                'text': combined,
            },
        })
    return items


def main():
    print('Loading documents from JSON files...')
    liam_items = load_liam_docs()
    ama_items = load_ama_docs()
    all_items = liam_items + ama_items

    total_items = len(all_items)
    print(f'Loaded {len(liam_items)} liam docs and {len(ama_items)} ama docs (Total: {total_items})')

    texts = [item['text'] for item in all_items]
    all_embeddings = []
    print(f'Generating embeddings for {total_items} texts in batches of {EMBED_BATCH}...')
    for start in range(0, total_items, EMBED_BATCH):
        batch_texts = texts[start:start + EMBED_BATCH]
        all_embeddings.extend(get_embeddings(batch_texts))
        print(f'  Embedded {start + len(batch_texts)}/{total_items}')

    vectors = [
        {'id': item['id'], 'values': emb, 'metadata': item['metadata']}
        for item, emb in zip(all_items, all_embeddings)
    ]

    print(f"Upserting {len(vectors)} vectors into Vectorize 'liam-kb' in batches of {UPSERT_BATCH}...")
    for start in range(0, len(vectors), UPSERT_BATCH):
        batch_vectors = vectors[start:start + UPSERT_BATCH]
        upsert_vectors(batch_vectors)
        print(f'  Upserted {start + len(batch_vectors)}/{len(vectors)}')

    print(f'Done! Successfully processed and upserted {len(vectors)} total vectors.')


if __name__ == '__main__':
    main()
