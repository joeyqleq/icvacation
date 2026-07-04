#!/usr/bin/env node
import { readFileSync } from "fs";

const ENDPOINT = process.env.AZURE_SEARCH_ENDPOINT;
const KEY = process.env.AZURE_SEARCH_ADMIN_KEY;
const INDEX = "liam-travel-kb";
const API_VERSION = "2024-05-01-preview";

const chunks = JSON.parse(readFileSync(new URL("./batch1-chunks.json", import.meta.url), "utf8"));

async function uploadBatch(batch) {
  const url = `${ENDPOINT}/indexes/${INDEX}/docs/index?api-version=${API_VERSION}`;
  const body = { value: batch.map((doc) => ({ "@search.action": "mergeOrUpload", ...doc })) };
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "api-key": KEY },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  const failed = data.value?.filter((r) => !r.status) ?? [];
  if (failed.length) console.error("Failed docs:", failed.map((f) => `${f.key}: ${f.errorMessage}`));
  return data.value?.filter((r) => r.status).length ?? 0;
}

const BATCH_SIZE = 25;
let total = 0;
for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
  const batch = chunks.slice(i, i + BATCH_SIZE);
  const uploaded = await uploadBatch(batch);
  total += uploaded;
  console.log(`Uploaded ${total}/${chunks.length} docs...`);
}
console.log(`Done. ${total} documents indexed into ${INDEX}.`);

// Verify count
const verifyRes = await fetch(`${ENDPOINT}/indexes/${INDEX}/docs/search?api-version=${API_VERSION}`, {
  method: "POST",
  headers: { "Content-Type": "application/json", "api-key": KEY },
  body: JSON.stringify({ "search": "*", "top": 0, "count": true })
});
const verifyData = await verifyRes.json();
console.log(`\nTotal docs in index: ${verifyData["@odata.count"]}`);
