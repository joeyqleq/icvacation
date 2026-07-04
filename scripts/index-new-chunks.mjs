import { readFileSync } from 'fs';

const ENDPOINT = process.env.AZURE_SEARCH_ENDPOINT;
const API_KEY = process.env.AZURE_SEARCH_ADMIN_KEY;
const INDEX = 'liam-travel-kb';
const API_VERSION = '2024-05-01-preview';
const BATCH_SIZE = 25;

const chunks = JSON.parse(readFileSync('/home/jq/Desktop/icvacation/scripts/new-knowledge-chunks.json', 'utf8'));

console.log(`Loaded ${chunks.length} chunks to index`);

async function indexBatch(batch, batchNum) {
  const url = `${ENDPOINT}/indexes/${INDEX}/docs/index?api-version=${API_VERSION}`;
  const body = {
    value: batch.map(doc => ({
      '@search.action': 'mergeOrUpload',
      ...doc
    }))
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': API_KEY
    },
    body: JSON.stringify(body)
  });

  const result = await response.json();

  if (!response.ok) {
    console.error(`Batch ${batchNum} HTTP error ${response.status}:`, JSON.stringify(result));
    return { succeeded: 0, failed: batch.length };
  }

  const items = result.value || [];
  const succeeded = items.filter(i => i.status === true).length;
  const failed = items.filter(i => i.status === false);

  if (failed.length > 0) {
    console.error(`Batch ${batchNum}: ${failed.length} failures:`);
    failed.forEach(f => console.error(`  id=${f.key} status=${f.statusCode} error=${f.errorMessage}`));
  }

  return { succeeded, failed: failed.length };
}

async function main() {
  const totalBatches = Math.ceil(chunks.length / BATCH_SIZE);
  let totalSucceeded = 0;
  let totalFailed = 0;

  for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
    const batch = chunks.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    console.log(`Indexing batch ${batchNum}/${totalBatches} (${batch.length} docs)...`);

    const { succeeded, failed } = await indexBatch(batch, batchNum);
    totalSucceeded += succeeded;
    totalFailed += failed;
    console.log(`  Batch ${batchNum}: ${succeeded} succeeded, ${failed} failed`);

    // Small delay between batches to avoid rate limiting
    if (i + BATCH_SIZE < chunks.length) {
      await new Promise(r => setTimeout(r, 500));
    }
  }

  console.log(`\n=== INDEXING COMPLETE ===`);
  console.log(`Total chunks attempted: ${chunks.length}`);
  console.log(`Successfully indexed: ${totalSucceeded}`);
  console.log(`Failed: ${totalFailed}`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
