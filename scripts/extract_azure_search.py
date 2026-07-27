#!/usr/bin/env python3
import json
import urllib.request
import urllib.error
from pathlib import Path

import os
SEARCH_ENDPOINT = os.environ.get('AZURE_SEARCH_ENDPOINT', 'https://srch-icv-rag-usd.search.windows.net')
SEARCH_KEY = os.environ.get('AZURE_SEARCH_ADMIN_KEY', '')
API_VERSION = '2024-05-01-preview'

OUTPUT_DIR = Path('/home/jq/Desktop/icvacation/scripts')


def fetch_all_docs(index_name, select_fields):
    url = f"{SEARCH_ENDPOINT}/indexes/{index_name}/docs?api-version={API_VERSION}&$select={select_fields}&$top=1000"
    all_docs = []
    headers = {'api-key': SEARCH_KEY}

    while url:
        req = urllib.request.Request(url, headers=headers, method='GET')
        with urllib.request.urlopen(req, timeout=60) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            docs = data.get('value', [])
            all_docs.extend(docs)
            url = data.get('@odata.nextLink')

    return all_docs


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    print("Fetching documents from liam-travel-kb...")
    liam_docs = fetch_all_docs('liam-travel-kb', 'chunk_text,title,category,topics,destinations')
    liam_file = OUTPUT_DIR / 'azure_docs_liam_travel_kb.json'
    with open(liam_file, 'w', encoding='utf-8') as f:
        json.dump(liam_docs, f, indent=2, ensure_ascii=False)
    print(f"Saved {len(liam_docs)} documents to {liam_file}")

    print("Fetching documents from amawaterways-chunks...")
    ama_docs = fetch_all_docs('amawaterways-chunks', 'chunk_text,body_text,title,topics,destinations,travel_brand')
    ama_file = OUTPUT_DIR / 'azure_docs_amawaterways.json'
    with open(ama_file, 'w', encoding='utf-8') as f:
        json.dump(ama_docs, f, indent=2, ensure_ascii=False)
    print(f"Saved {len(ama_docs)} documents to {ama_file}")


if __name__ == '__main__':
    main()
