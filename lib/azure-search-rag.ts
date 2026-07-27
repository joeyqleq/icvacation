export async function retrieveRAGContext(userMessage: string, topK = 6): Promise<string> {
  const accountId = process.env.CF_CENTRAL_ACCOUNT_ID;
  const key = process.env.CF_CENTRAL_KEY;

  if (!accountId || !key) {
    return '';
  }

  try {
    const authHeaders = {
      'X-Auth-Email': 'joe.maari@coyotes.usd.edu',
      'X-Auth-Key': key,
      'Content-Type': 'application/json',
    };

    // 1. Embed query
    const embedRes = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/baai/bge-base-en-v1.5`,
      {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({ text: [userMessage.slice(0, 512)] }),
      }
    );
    if (!embedRes.ok) return '';
    const embedData = await embedRes.json();
    const vector = embedData?.result?.data?.[0];
    if (!vector) return '';

    // 2. Query Vectorize
    const vectorizeRes = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/vectorize/v2/indexes/liam-kb/query`,
      {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({ vector, topK: 9, returnMetadata: 'all' }),
      }
    );
    if (!vectorizeRes.ok) return '';
    const vectorizeData = await vectorizeRes.json();
    const matches = vectorizeData?.result?.matches ?? [];
    if (matches.length === 0) return '';

    // 3. Format result
    const chunks = matches.map((match: any) => {
      const parts: string[] = [];
      if (match.metadata?.title) parts.push(`**${match.metadata.title}**`);
      if (match.metadata?.source) parts.push(`Source: ${match.metadata.source}`);
      if (match.metadata?.text) parts.push(match.metadata.text);
      return parts.join('\n');
    }).filter((chunk: string) => chunk.length > 0);

    if (chunks.length === 0) return '';

    return '## Retrieved Travel Knowledge\n\n' + chunks.join('\n\n---\n\n');
  } catch (error) {
    return '';
  }
}
