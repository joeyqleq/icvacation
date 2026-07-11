const SEARCH_ENDPOINT = process.env.AZURE_SEARCH_ENDPOINT!;
const SEARCH_KEY = process.env.AZURE_SEARCH_ADMIN_KEY!;
const API_VERSION = "2024-05-01-preview";

interface SearchDoc {
  chunk_text?: string;
  body_text?: string;
  summary?: string;
  title?: string;
  category?: string;
  topics?: string[];
  destinations?: string[];
  travel_brand?: string;
  "@search.score"?: number;
}

// Per-index field maps — only request fields that exist in each schema
const INDEX_SELECT: Record<string, string> = {
  "liam-travel-kb":      "chunk_text,summary,title,category,topics,destinations",
  "amawaterways-chunks": "chunk_text,body_text,summary,title,topics,destinations,travel_brand",
};

async function queryIndex(index: string, query: string, top: number): Promise<SearchDoc[]> {
  const url = `${SEARCH_ENDPOINT}/indexes/${index}/docs/search?api-version=${API_VERSION}`;
  const select = INDEX_SELECT[index] ?? "chunk_text,summary,title,category";
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "api-key": SEARCH_KEY },
      body: JSON.stringify({
        search: query,
        queryType: "simple",
        top,
        select,
        searchMode: "any",
      }),
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.value ?? [];
  } catch {
    return [];
  }
}

function docToContext(doc: SearchDoc): string {
  const parts: string[] = [];
  if (doc.title) parts.push(`**${doc.title}**`);
  if (doc.category || doc.travel_brand) parts.push(`Source: ${doc.travel_brand ?? doc.category}`);
  if (doc.destinations?.length) parts.push(`Destinations: ${doc.destinations.join(", ")}`);
  const body = doc.chunk_text || doc.body_text || doc.summary || "";
  if (body) parts.push(body.slice(0, 800));
  return parts.join("\n");
}

export async function retrieveRAGContext(userMessage: string, topK = 6): Promise<string> {
  const [travelDocs, amaDocs] = await Promise.all([
    queryIndex("liam-travel-kb", userMessage, topK),
    queryIndex("amawaterways-chunks", userMessage, 3),
  ]);

  const all = [...travelDocs, ...amaDocs];
  if (all.length === 0) return "";

  const context = all.map(docToContext).join("\n\n---\n\n");
  return `## Retrieved Travel Knowledge\n\n${context}`;
}
