#!/usr/bin/env python3
import json
import time
import urllib.request
import urllib.error
from pathlib import Path

ACCOUNT_ID = '0228e3fe174bbc185f30b1d4eaf5f166'
AUTH_EMAIL = 'joe.maari@coyotes.usd.edu'
AUTH_KEY = '8d7c3a9b1e90846a143170e4696a93be960ee'

EMBEDDING_URL = f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/baai/bge-base-en-v1.5"
VECTORIZE_URL = f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/vectorize/v2/indexes/liam-kb/upsert"

EMBED_BATCH = 50
UPSERT_BATCH = 100
MAX_RETRIES = 3
TEXT_TRUNCATE = 800

LIAM_FILE = Path('/home/jq/Desktop/icvacation/scripts/azure_docs_liam_travel_kb.json')
AMA_FILE = Path('/home/jq/Desktop/icvacation/scripts/azure_docs_amawaterways.json')


def api_request(url, data, retries=MAX_RETRIES, content_type='application/json'):
    headers = {
        'X-Auth-Email': AUTH_EMAIL,
        'X-Auth-Key': AUTH_KEY,
        'Content-Type': content_type,
    }
    body = data if isinstance(data, bytes) else json.dumps(data).encode('utf-8')
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, data=body, headers=headers, method='POST')
            with urllib.request.urlopen(req, timeout=60) as resp:
                return json.loads(resp.read().decode('utf-8'))
        except (urllib.error.URLError, urllib.error.HTTPError, OSError) as e:
            if attempt < retries - 1:
                wait = 2 ** attempt
                time.sleep(wait)
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

        doc_id = f'liam-travel-kb_{i}'
        metadata = {
            'source': 'liam-travel-kb',
            'title': title,
            'text': combined
        }
        items.append({
            'id': doc_id,
            'text': combined,
            'metadata': metadata
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

        doc_id = f'amawaterways_{i}'
        metadata = {
            'source': 'amawaterways',
            'title': title,
            'text': combined
        }
        items.append({
            'id': doc_id,
            'text': combined,
            'metadata': metadata
        })
    return items


def main():
    print("Loading documents from JSON files...")
    liam_items = load_liam_docs()
    ama_items = load_ama_docs()
    all_items = liam_items + ama_items

    total_items = len(all_items)
    print(f"Loaded {len(liam_items)} liam docs and {len(ama_items)} ama docs (Total: {total_items})")

    texts = [item['text'] for item in all_items]
    all_embeddings = []
    print(f"Generating embeddings for {total_items} texts in batches of {EMBED_BATCH}...")
    for start in range(0, total_items, EMBED_BATCH):
        batch_texts = texts[start : start + EMBED_BATCH]
        embs = get_embeddings(batch_texts)
        all_embeddings.extend(embs)
        print(f"  Embedded {start + len(batch_texts)}/{total_items}")

    vectors = []
    for item, emb in zip(all_items, all_embeddings):
        vectors.append({
            'id': item['id'],
            'values': emb,
            'metadata': item['metadata'],
        })

    print(f"Upserting {len(vectors)} vectors into Vectorize 'liam-kb' in batches of {UPSERT_BATCH}...")
    for start in range(0, len(vectors), UPSERT_BATCH):
        batch_vectors = vectors[start : start + UPSERT_BATCH]
        upsert_vectors(batch_vectors)
        print(f"  Upserted {start + len(batch_vectors)}/{len(vectors)}")

    print(f"Done! Successfully processed and upserted {len(vectors)} total vectors.")


if __name__ == '__main__':
    main()
