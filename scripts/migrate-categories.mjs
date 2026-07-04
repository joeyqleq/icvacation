/**
 * Migrates legacy category names to the new unified taxonomy.
 * Fetches all docs with old categories, patches only the category field.
 */
import { readFileSync } from 'fs';

const env = Object.fromEntries(
  readFileSync('.env.local', 'utf8')
    .split('\n')
    .filter(l => l.includes('=') && !l.startsWith('#'))
    .map(l => [l.split('=')[0].trim(), l.split('=').slice(1).join('=').trim()])
);

const ENDPOINT = env.AZURE_SEARCH_ENDPOINT;
const KEY = env.AZURE_SEARCH_ADMIN_KEY;
const API = '2024-05-01-preview';
const INDEX = 'liam-travel-kb';

const CATEGORY_MAP = {
  'budget-travel':          'destination_cultural',
  'cruise-ports':           'cruise_maritime',
  'hidden-gems':            'destination_cultural',
  'practical-travel':       'destination_cultural',
  'safety-and-scams':       'health_safety',
  'tourist-education':      'destination_cultural',
  'travel-health':          'health_safety',
  'travel-rights-insurance':'health_safety',
  'destination-costs':      'destination_cultural',
  'traveler-profiles':      'traveler_profiles',  // hyphen → underscore
};

const OLD_CATEGORIES = Object.keys(CATEGORY_MAP);

async function fetchLegacyDocs() {
  const results = [];
  for (const cat of OLD_CATEGORIES) {
    let skip = 0;
    while (true) {
      const res = await fetch(`${ENDPOINT}/indexes/${INDEX}/docs/search?api-version=${API}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'api-key': KEY },
        body: JSON.stringify({
          search: '*',
          filter: `category eq '${cat}'`,
          select: 'id,category',
          top: 50,
          skip,
        }),
      });
      const data = await res.json();
      const docs = data.value ?? [];
      results.push(...docs.map(d => ({ id: d.id, oldCat: cat, newCat: CATEGORY_MAP[cat] })));
      if (docs.length < 50) break;
      skip += 50;
    }
  }
  return results;
}

async function patchCategories(docs) {
  const BATCH = 100;
  let updated = 0;
  for (let i = 0; i < docs.length; i += BATCH) {
    const batch = docs.slice(i, i + BATCH);
    const body = {
      value: batch.map(d => ({
        '@search.action': 'merge',
        id: d.id,
        category: d.newCat,
      })),
    };
    const res = await fetch(`${ENDPOINT}/indexes/${INDEX}/docs/index?api-version=${API}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'api-key': KEY },
      body: JSON.stringify(body),
    });
    const result = await res.json();
    const succeeded = result.value?.filter(r => r.status).length ?? 0;
    const failed = result.value?.filter(r => !r.status) ?? [];
    updated += succeeded;
    if (failed.length) console.error('Failed:', failed.map(f => f.key + ': ' + f.errorMessage));
    console.log(`Batch ${Math.floor(i/BATCH)+1}: ${succeeded} updated`);
  }
  return updated;
}

// Main
const docs = await fetchLegacyDocs();
console.log(`Found ${docs.length} legacy docs to remap:`);
const grouped = {};
docs.forEach(d => { grouped[d.oldCat] = (grouped[d.oldCat] ?? 0) + 1; });
Object.entries(grouped).forEach(([k, v]) => console.log(`  ${k} (${v}) → ${CATEGORY_MAP[k]}`));

const total = await patchCategories(docs);
console.log(`\n✓ Migration complete: ${total}/${docs.length} documents updated`);

// Verify
const verRes = await fetch(`${ENDPOINT}/indexes/${INDEX}/docs/search?api-version=${API}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'api-key': KEY },
  body: JSON.stringify({ search: '*', top: 0, count: true, facets: ['category,count:50'] }),
});
const ver = await verRes.json();
console.log(`\nFinal category distribution (${ver['@odata.count']} total docs):`);
(ver['@search.facets']?.category ?? []).forEach(f => console.log(`  ${f.value}: ${f.count}`));
