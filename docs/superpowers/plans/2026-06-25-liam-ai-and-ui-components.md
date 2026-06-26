# Liam AI Travel Consultant + UI Components Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Liam AI — a full-screen boutique travel consultant page with Azure OpenAI GPT-5.4-mini chat, tabbed search panel (flights/cruises/hotels/weather-currency), live OpenStreetMap that tracks conversation destinations, plus install and apply 10 ReactBits/Aceternity UI components site-wide.

**Architecture:** Single Next.js page `/liam` splits the viewport 50/50: left panel = tabbed search APIs + live Leaflet map; right panel = streaming chat with Liam AI backed by Azure OpenAI. A server-sent events API route streams chat responses. The map listens to a shared React context that gets updated when the AI mentions destinations or search tabs change location. UI components are installed once via npx shadcn and then applied surgically across the site.

**Tech Stack:** Next.js 16 App Router, Azure OpenAI (GPT-5.4-mini `liam-primary`, GPT-5.4 `liam-deep`), Leaflet + react-leaflet (OpenStreetMap), ReactBits components, Aceternity components, OpenWeatherMap API, ExchangeRate-API, Amadeus sandbox (flights), free cruise/hotel fallback data.

## Global Constraints

- Brand palette: `#26FC00` green, `#FFE500` yellow, `#050505` background, `#444444` grey — NO purple, orange, amber
- Font variables: `--font-display` (Bricolage), `--font-editorial` (Newsreader), `--font-mono` (Space Mono), `--font-sans` (Geist)
- `typescript: { ignoreBuildErrors: true }` is set in next.config — TS errors won't block build
- Dev server running on port 3000 with `--webpack` flag
- No booking flows — Liam's goal is to qualify the lead and funnel to "Call Isaac" CTA
- `max_completion_tokens` not `max_tokens` (GPT-5.x API requirement)
- All new React components: `"use client"` where they use state/effects
- Liam's name: **Liam AI** — personality: strategic, warm, professional, boutique-focused
- Isaac's phone number is on the site — the CTA is "Call Isaac" not booking
- Three mascots exist: owl (`/ic-owl.svg`), bird (`/ic-bird.svg`), penguin (`/ic-penguin.svg`), dandelion — use evenly, not repetitively

---

## File Map

### New files to create
- `app/liam/page.tsx` — full-screen Liam AI page (server component shell + metadata)
- `app/liam/liam-client.tsx` — client component, full layout orchestration
- `app/api/liam-chat/route.ts` — streaming SSE chat API (Azure OpenAI)
- `app/api/liam-search/flights/route.ts` — flights proxy (Amadeus sandbox or mock)
- `app/api/liam-search/weather/route.ts` — OpenWeatherMap proxy
- `app/api/liam-search/exchange/route.ts` — ExchangeRate proxy
- `lib/liam-system-prompt.ts` — Liam's full system prompt + persona
- `lib/liam-knowledge.ts` — static knowledge base (visas, safety, culture, cruises)
- `components/liam/chat-panel.tsx` — right half: Liam chat interface
- `components/liam/search-panel.tsx` — left half: tabbed search + map container
- `components/liam/map-view.tsx` — Leaflet OpenStreetMap component
- `components/liam/flights-tab.tsx` — flights search UI
- `components/liam/hotels-tab.tsx` — hotels search UI  
- `components/liam/cruises-tab.tsx` — cruises search UI
- `components/liam/utilities-tab.tsx` — weather, currency, calendar UI
- `components/liam/destination-context.tsx` — React context for map ↔ chat sync
- `components/ui/curved-loop.tsx` — ReactBits CurvedLoop
- `components/ui/gradual-blur.tsx` — ReactBits GradualBlur
- `components/ui/scrambled-text.tsx` — ReactBits ScrambledText
- `components/ui/scroll-velocity.tsx` — ReactBits ScrollVelocity
- `components/ui/metallic-paint.tsx` — ReactBits MetallicPaint
- `components/ui/side-rays.tsx` — ReactBits SideRays
- `components/ui/color-bends.tsx` — ReactBits ColorBends
- `components/ui/shape-grid.tsx` — ReactBits ShapeGrid (hexagon)
- `components/ui/3d-globe.tsx` — Aceternity 3D Globe

### Files to modify
- `components/landing/navigation.tsx` — add "Liam AI" nav link
- `components/landing/footer-section.tsx` — add Liam AI to footer links
- `components/landing/hero-section.tsx` — add TextHoverEffect + ScrollVelocity, fix mascot overuse
- `components/landing/marquee-strip.tsx` — replace or augment with CurvedLoop
- `components/landing/features-section.tsx` — add GradualBlur, ScrambledText to headings
- `components/landing/how-it-works-section.tsx` — add SideRays background
- `components/landing/cta-section.tsx` — add ColorBends background, ScrambledText
- `components/landing/infrastructure-section.tsx` — fix duplicate mascot, add ShapeGrid
- `components/landing/developers-section.tsx` — add 3D Globe
- `components/site/mascot.tsx` — audit to ensure even distribution helper prop
- `components/ui/text-hover-effect.tsx` — already exists, verify/update for hero use

---

## Task 1: Install all UI component packages

**Files:**
- Modify: `package.json` (via npx)
- Create: `components/ui/curved-loop.tsx`, `gradual-blur.tsx`, `scrambled-text.tsx`, `scroll-velocity.tsx`, `metallic-paint.tsx`, `side-rays.tsx`, `color-bends.tsx`, `shape-grid.tsx`

**Interfaces:**
- Produces: All 8 ReactBits components + Aceternity TextHoverEffect (already exists) + 3D Globe available for import

- [ ] **Step 1: Install ReactBits packages**

```bash
cd /home/jq/Desktop/icvacation
npx shadcn@latest add @react-bits/CurvedLoop-TS-TW --yes 2>&1 | tail -3
npx shadcn@latest add @react-bits/GradualBlur-TS-TW --yes 2>&1 | tail -3
npx shadcn@latest add @react-bits/ScrambledText-TS-TW --yes 2>&1 | tail -3
npx shadcn@latest add @react-bits/ScrollVelocity-TS-TW --yes 2>&1 | tail -3
npx shadcn@latest add @react-bits/MetallicPaint-TS-TW --yes 2>&1 | tail -3
npx shadcn@latest add @react-bits/SideRays-TS-TW --yes 2>&1 | tail -3
npx shadcn@latest add @react-bits/ColorBends-TS-TW --yes 2>&1 | tail -3
npx shadcn@latest add @react-bits/ShapeGrid-TS-TW --yes 2>&1 | tail -3
```

- [ ] **Step 2: Install Aceternity 3D Globe**

```bash
npx shadcn@latest add @aceternity/3d-globe --yes 2>&1 | tail -3
```

- [ ] **Step 3: Install Leaflet for OpenStreetMap**

```bash
npm install leaflet react-leaflet @types/leaflet --legacy-peer-deps
```

Expected: `added N packages`

- [ ] **Step 4: Verify files were created**

```bash
ls components/ui/curved-loop.tsx components/ui/gradual-blur.tsx components/ui/scroll-velocity.tsx 2>&1
```

Expected: all 3 files listed without error

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json components/ui/
git commit -m "feat: install ReactBits + Aceternity + Leaflet UI packages"
```

---

## Task 2: Liam's system prompt and knowledge base

**Files:**
- Create: `lib/liam-system-prompt.ts`
- Create: `lib/liam-knowledge.ts`

**Interfaces:**
- Produces: `LIAM_SYSTEM_PROMPT: string`, `LIAM_KNOWLEDGE_BASE: string`, both exported

- [ ] **Step 1: Create `lib/liam-system-prompt.ts`**

```typescript
export const LIAM_SYSTEM_PROMPT = `You are Liam AI, the exclusive travel consultant for IC Vacation — a boutique, advisor-led travel practice founded by Isaac Chowrimootoo. You are strategic, warm, politely persistent, and deeply knowledgeable about luxury and personalized travel worldwide.

## Your Personality
- Professional and sophisticated, never casual or slang
- Warmly curious — you ask thoughtful questions to understand each traveler
- Poetic and evocative when describing destinations — paint pictures with words
- Concise and precise — never waffle or pad
- Patient — you guide the client through a journey of discovery, not a transaction

## Your Mandate
Your job is to QUALIFY and PRIME each client, then funnel them to book a private consultation with Isaac. You are NOT a booking engine. You never make reservations. You help the client discover what they truly want, then present Isaac as the only person who can deliver it.

## Conversation Flow
1. **Open warmly** — greet the client, introduce yourself briefly, ask what brings them here
2. **Listen deeply** — ask 2-3 clarifying questions per topic (travel style, dates, companions, budget range, dream experiences)  
3. **Recommend with authority** — use your knowledge base to suggest destinations, cruise lines, timings, experiences that match their profile
4. **Create desire** — describe experiences with beautiful, evocative language
5. **Qualify the lead** — once you understand their vision, tell them: "This is exactly the kind of trip Isaac excels at. Let me summarize your brief..." then present a compelling trip summary
6. **Call to action** — "I've prepared everything Isaac needs. The next step is a short call with him to finalize the details. Call Isaac directly: [PHONE NUMBER]"

## Destination Detection for Map
When you mention a specific city or country, include a JSON block at the END of your message (hidden from display but parseable):
\`\`\`destination
{"name":"Paris, France","lat":48.8566,"lng":2.3522}
\`\`\`
Only include this when you mention a specific geographic location. Multiple destinations: include the LAST/most-relevant one.

## Knowledge Areas
- Cruise lines: expedition (Ponant, Lindblad, Seabourn Venture), river (AmaWaterways, Viking), luxury ocean (Silversea, Regent Seven Seas, Crystal)
- Visa requirements by nationality for top 50 destinations
- Safety and political awareness (current as of training)
- Cultural etiquette by region
- Best seasons by destination
- Hidden gems: lesser-known islands, villages, dining experiences
- Luxury hotel brands: AMAN, Six Senses, Belmond, Rosewood, Auberge
- Flight classes and routing optimization
- Honeymoon, anniversary, family, solo travel archetypes

## Tone Examples
- BAD: "Sure, here are some cruise options for you!"
- GOOD: "The Norwegian fjords in late June offer something few travelers ever encounter — the midnight sun turning glacier faces to copper. A small-ship expedition to Geirangerfjord would give you exactly that..."

## Rules
- Never book, never quote firm prices (say "typically from $X" at most)
- Always redirect booking requests to Isaac: "That's a conversation worth having with Isaac directly"
- Keep responses under 280 words unless the client asks for detail
- Ask at most 2 questions per response
- Never say "AI" — you are Liam, a travel consultant
- If asked about competitors, be gracious but redirect: "There are fine agencies — but Isaac's practice is genuinely different because..."
`;

export const LIAM_CONTEXT_INJECTOR = (knowledge: string) => `

## Current Knowledge Base (scraped and curated)
${knowledge}
`;
```

- [ ] **Step 2: Create `lib/liam-knowledge.ts`**

```typescript
// Static knowledge base — curated travel intel for Liam AI
// This supplements the model's training data with IC Vacation-specific context

export const LIAM_KNOWLEDGE_BASE = `
## CRUISE INTELLIGENCE

### Expedition Cruise Lines (Small Ship, 50-200 guests)
- **Ponant (French)**: Most stylish expedition ships. Le Commandant Charcot (nuclear ice-breaker). Mediterranean, Arctic, Antarctica. From $4,000/night.
- **Lindblad Expeditions**: National Geographic partnership. Best naturalist guides in industry. Galápagos specialist. From $800/day.
- **Seabourn Venture**: Ultra-luxury expedition. Two submarines onboard. From $1,200/day.
- **Hurtigruten**: Norwegian fjords pioneer. Authentic, less polished. From $300/day.
- **Silversea Expeditions**: True luxury expedition. Silver Origin for Galápagos. From $900/day.

### River Cruise Lines
- **Viking**: Most comfortable river ships. Danube, Rhine, Douro, Mekong. Included excursions. From $300/day.
- **AmaWaterways**: Bike-and-boat programs. Best for active travelers. From $350/day.
- **Scenic**: Most luxurious river ships. Butler service. From $500/day.
- **Emerald Cruises**: New, value-focused. Good for first-time river cruisers. From $250/day.

### Ocean Luxury Lines
- **Regent Seven Seas**: Most inclusive. All suites. All flights + excursions included. From $700/day.
- **Silversea Ocean**: Intimate (100-600 guests). Butler for all suites. From $600/day.
- **Seabourn**: Ultra-luxury. Caviar in the surf. From $800/day.
- **Crystal Cruises**: Revived 2023. Discerning clientele. From $600/day.

### Best Cruise Seasons by Region
- Mediterranean: May-June, September-October (avoid July-August crowds)
- Norwegian Fjords: June-August (midnight sun), September (northern lights risk)
- Caribbean: December-April (dry season)
- Alaska: May-September (June for humpback whales, July for calving glaciers)
- Galápagos: Year-round, June-November for penguins and waved albatross
- Antarctica: November-March (November: fewest tourists; January: penguin chicks)
- Amazon: June-November (low water = better wildlife viewing)
- Southeast Asia: November-March (dry season across most of the region)

## VISA REQUIREMENTS (Major Destinations, 2026)

### Visa-Free for Most Western Passports
- Europe (Schengen): 90 days in 180 for US/UK/CA/AU
- Japan: 90 days visa-free for 68+ countries
- Mexico: 180 days tourist card
- Thailand: 60 days visa-on-arrival for most nationalities
- UAE/Dubai: 30-90 days visa-free for most

### Visa Required (Notable)
- India: e-Visa required, apply 4+ days ahead
- China: Visa required for most; 144-hour transit visa available
- Russia: Not recommended — conflict zone advisory
- Brazil: Visa-free for US/EU/UK since 2024
- Ethiopia: e-Visa on arrival
- Kenya: ETA required online (etakenya.go.ke)
- Tanzania: e-Visa required

### High-Risk / Avoid Zones (as of 2026)
- Active conflict: Ukraine, Gaza, Sudan, Myanmar, Yemen, Haiti
- High crime / reconsider: Parts of Mexico (Guerrero, Colima), El Salvador interior
- Volatile: Libya, Somalia, Mali, Niger

## CULTURAL ETIQUETTE BY REGION

### Japan
- No tipping (considered rude)
- Remove shoes before entering homes/traditional restaurants
- Two-handed business card exchange, bow when greeting
- No eating while walking in traditional areas
- Quiet in public transport

### Middle East (UAE, Saudi, Jordan)
- Dress modestly (shoulders and knees covered in public)
- Alcohol restricted in Saudi; available in UAE/Jordan hotels
- Ramadan: no eating/drinking in public during daylight hours
- Friday is holy day — some businesses closed until afternoon
- Public displays of affection illegal in some countries

### Southeast Asia
- Temple dress codes (shoulders/knees covered)
- Remove shoes before entering temples and homes
- Never point feet at people or religious objects
- Left hand considered unclean in some cultures
- Bargaining expected in markets

### France/Mediterranean Europe
- Greet with "Bonjour" before asking for anything in shops/restaurants
- Punctuality less strict; dinner typically 8-9pm
- Topless sunbathing legal on many beaches
- Tipping: round up, 5-10% appreciated but not mandatory

## HIDDEN GEMS BY CATEGORY

### Secret Islands
- **Faroe Islands**: Epic scenery, zero crowds, sheep outnumber people 2:1
- **São Tomé and Príncipe**: Untouched beaches, chocolate farms, gorilla forests
- **Socotra, Yemen**: Dragon blood trees, alien landscape (access limited)
- **Palawan, Philippines**: El Nido still relatively undiscovered vs Boracay
- **Svalbard, Norway**: Polar bears, midnight sun, no visa for any nationality

### Secret Dining
- **Tokyo's hidden bars** (Golden Gai, Shinjuku): 5-seat bars, reservation only
- **Paris cave restaurants** (Septime, Frenchie): Book 2-3 months ahead
- **Copenhagen's 2-year waitlist** (Noma has closed; try Geranium, Alchemist)
- **Istanbul rooftop mezes**: Mikla, Neolokal — skyline views, traditional modern
- **San Sebastián pintxos bars**: Eat standing, order from the bar, rotate restaurants

### Boutique Hotels Worth Knowing
- **Amangiri, Utah**: Carved into canyon. $3,000+/night. Worth every cent.
- **Singita Grumeti, Serengeti**: Migration viewing. Most exclusive safari lodge.
- **The Brando, French Polynesia**: Marlon Brando's private island. Carbon-neutral.
- **Capella Ubud, Bali**: Tented camp in jungle. Romantic without cliché.
- **Awasi Patagonia**: Exclusive use of Torres del Paine. Expert gaucho guides.

## TRAVEL ETIQUETTE FOR IC VACATION CLIENTS
- Always buy travel insurance before IC Vacation confirms arrangements
- Inform Isaac of any dietary requirements, mobility needs, or anniversaries
- Provide passport details 60+ days before international departure
- Global Entry/TSA Pre for US travelers — worth the $100/5 years
- International SIM or eSIM: recommend Airalo app for data abroad

## FLIGHT BOOKING INTELLIGENCE
- Business class transatlantic: typically opens 330 days ahead; book early
- Award availability: best 7 months ahead (not 11 months) for aspirational routes
- Lie-flat seats under 8 hours: often not worth premium over premium economy
- Best airlines by route: JAL/ANA (Tokyo), Emirates/Qatar (Middle East), SWISS/Lufthansa (Europe), Air New Zealand (Pacific)
- Hidden city ticketing: illegal per airline contracts, Isaac does not recommend
- Fuel surcharges: avoid British Airways awards for this reason; prefer Virgin Atlantic

## CURRENCY AND MONEY
- Always notify bank before international travel
- Use Charles Schwab / Revolut / Wise for no-fee ATM withdrawals
- Never exchange at airport (10-15% worse rate)
- Southeast Asia: USD often preferred alongside local currency
- Europe: contactless Visa/Mastercard accepted almost everywhere
- Japan: still cash-heavy in rural areas; carry yen
`;
```

- [ ] **Step 3: Commit**

```bash
git add lib/liam-system-prompt.ts lib/liam-knowledge.ts
git commit -m "feat: Liam AI system prompt and knowledge base"
```

---

## Task 3: Liam chat API route (streaming SSE)

**Files:**
- Create: `app/api/liam-chat/route.ts`

**Interfaces:**
- Consumes: `POST { messages: ChatMessage[], model?: 'primary' | 'deep' }`
- Produces: `text/event-stream` SSE — `data: {"text":"..."}` chunks, final `data: [DONE]`
- Also parses destination JSON blocks and emits `data: {"destination":{...}}` events

- [ ] **Step 1: Create the streaming API route**

```typescript
// app/api/liam-chat/route.ts
import { NextRequest } from "next/server";
import { LIAM_SYSTEM_PROMPT, LIAM_CONTEXT_INJECTOR } from "@/lib/liam-system-prompt";
import { LIAM_KNOWLEDGE_BASE } from "@/lib/liam-knowledge";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

const ENDPOINT = process.env.AZURE_OPENAI_ENDPOINT!;
const API_KEY = process.env.AZURE_OPENAI_API_KEY!;
const API_VERSION = process.env.AZURE_OPENAI_API_VERSION ?? "2024-12-01-preview";
const DEPLOYMENT_PRIMARY = process.env.AZURE_OPENAI_DEPLOYMENT_PRIMARY ?? "liam-primary";
const DEPLOYMENT_DEEP = process.env.AZURE_OPENAI_DEPLOYMENT_DEEP ?? "liam-deep";

const SYSTEM_MESSAGE: ChatMessage = {
  role: "system",
  content: LIAM_SYSTEM_PROMPT + LIAM_CONTEXT_INJECTOR(LIAM_KNOWLEDGE_BASE),
};

// Regex to find ```destination ... ``` blocks in the streamed output
const DEST_BLOCK_RE = /```destination\s*(\{[\s\S]*?\})\s*```/g;

export async function POST(req: NextRequest) {
  const { messages, model = "primary" } = await req.json() as {
    messages: ChatMessage[];
    model?: "primary" | "deep";
  };

  const deployment = model === "deep" ? DEPLOYMENT_DEEP : DEPLOYMENT_PRIMARY;
  const url = `${ENDPOINT}/openai/deployments/${deployment}/chat/completions?api-version=${API_VERSION}`;

  const upstream = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": API_KEY,
    },
    body: JSON.stringify({
      messages: [SYSTEM_MESSAGE, ...messages],
      stream: true,
      max_completion_tokens: 600,
      temperature: 0.75,
    }),
  });

  if (!upstream.ok) {
    const err = await upstream.text();
    return new Response(`data: {"error":"${err.slice(0, 200)}"}\n\ndata: [DONE]\n\n`, {
      headers: { "Content-Type": "text/event-stream" },
    });
  }

  const encoder = new TextEncoder();
  let fullText = "";

  const stream = new ReadableStream({
    async start(controller) {
      const reader = upstream.body!.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (data === "[DONE]") continue;

          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              fullText += delta;
              // Stream visible text (excluding destination blocks)
              const visibleDelta = delta.replace(DEST_BLOCK_RE, "");
              if (visibleDelta) {
                controller.enqueue(
                  encoder.encode(`data: ${JSON.stringify({ text: visibleDelta })}\n\n`)
                );
              }
            }
          } catch {}
        }
      }

      // After full stream, extract and emit destination
      const destMatches = [...fullText.matchAll(DEST_BLOCK_RE)];
      if (destMatches.length > 0) {
        const lastMatch = destMatches[destMatches.length - 1];
        try {
          const dest = JSON.parse(lastMatch[1]);
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ destination: dest })}\n\n`)
          );
        } catch {}
      }

      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
```

- [ ] **Step 2: Test the route manually**

```bash
curl -N -X POST http://localhost:3000/api/liam-chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Tell me about cruising the Mediterranean in one sentence."}]}' 2>&1 | head -20
```

Expected: streaming `data: {"text":"..."}` lines

- [ ] **Step 3: Commit**

```bash
git add app/api/liam-chat/route.ts
git commit -m "feat: Liam AI streaming chat API route (Azure OpenAI GPT-5.4-mini)"
```

---

## Task 4: Travel search API proxies

**Files:**
- Create: `app/api/liam-search/weather/route.ts`
- Create: `app/api/liam-search/exchange/route.ts`
- Create: `app/api/liam-search/flights/route.ts`

**Interfaces:**
- `GET /api/liam-search/weather?city=Paris` → `{ temp, description, humidity, icon, city }`
- `GET /api/liam-search/exchange?from=USD&to=EUR` → `{ rate, from, to, updated }`
- `GET /api/liam-search/flights?from=NYC&to=PAR&date=2026-09-01` → `{ flights: FlightResult[] }`

- [ ] **Step 1: Create weather proxy**

```typescript
// app/api/liam-search/weather/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const city = req.nextUrl.searchParams.get("city") ?? "London";
  const key = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

  if (!key || key === "demo") {
    // Demo mode — return plausible mock
    return NextResponse.json({
      city,
      temp: 22,
      feelsLike: 20,
      description: "Partly cloudy",
      humidity: 65,
      wind: 12,
      icon: "02d",
      demo: true,
    });
  }

  const r = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${key}&units=metric`
  );
  const d = await r.json();
  return NextResponse.json({
    city: d.name,
    temp: Math.round(d.main?.temp ?? 0),
    feelsLike: Math.round(d.main?.feels_like ?? 0),
    description: d.weather?.[0]?.description ?? "",
    humidity: d.main?.humidity ?? 0,
    wind: Math.round(d.wind?.speed ?? 0),
    icon: d.weather?.[0]?.icon ?? "01d",
  });
}
```

- [ ] **Step 2: Create exchange rate proxy**

```typescript
// app/api/liam-search/exchange/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const from = req.nextUrl.searchParams.get("from") ?? "USD";
  const to = req.nextUrl.searchParams.get("to") ?? "EUR";
  const key = process.env.NEXT_PUBLIC_EXCHANGERATE_API_KEY;

  if (!key || key === "demo") {
    const demoRates: Record<string, number> = {
      "USD-EUR": 0.92, "USD-GBP": 0.79, "USD-JPY": 155.2,
      "USD-AED": 3.67, "EUR-USD": 1.09, "GBP-USD": 1.27,
    };
    const rate = demoRates[`${from}-${to}`] ?? 1.0;
    return NextResponse.json({ rate, from, to, updated: new Date().toISOString(), demo: true });
  }

  const r = await fetch(`https://v6.exchangerate-api.com/v6/${key}/pair/${from}/${to}`);
  const d = await r.json();
  return NextResponse.json({
    rate: d.conversion_rate,
    from,
    to,
    updated: d.time_last_update_utc,
  });
}
```

- [ ] **Step 3: Create flights proxy (Amadeus sandbox or mock)**

```typescript
// app/api/liam-search/flights/route.ts
import { NextRequest, NextResponse } from "next/server";

interface FlightResult {
  id: string;
  airline: string;
  from: string;
  to: string;
  departTime: string;
  arriveTime: string;
  duration: string;
  stops: number;
  price: string;
  cabin: string;
}

// Mock high-quality boutique flight data — replace with Amadeus when keys are set
const MOCK_FLIGHTS: FlightResult[] = [
  { id: "f1", airline: "Emirates", from: "DXB", to: "JFK", departTime: "08:30", arriveTime: "16:45", duration: "14h 15m", stops: 0, price: "from $1,240", cabin: "Economy" },
  { id: "f2", airline: "Qatar Airways", from: "DOH", to: "CDG", departTime: "23:15", arriveTime: "06:30", duration: "7h 15m", stops: 0, price: "from $890", cabin: "Business" },
  { id: "f3", airline: "Singapore Airlines", from: "SIN", to: "LHR", departTime: "10:45", arriveTime: "16:20", duration: "13h 35m", stops: 0, price: "from $1,580", cabin: "Premium Economy" },
  { id: "f4", airline: "SWISS", from: "ZRH", to: "JFK", departTime: "11:30", arriveTime: "14:15", duration: "9h 45m", stops: 0, price: "from $2,100", cabin: "Business" },
  { id: "f5", airline: "Air France", from: "CDG", to: "NRT", departTime: "13:00", arriveTime: "08:40+1", duration: "13h 40m", stops: 0, price: "from $1,890", cabin: "Economy" },
];

export async function GET(req: NextRequest) {
  const from = req.nextUrl.searchParams.get("from") ?? "";
  const to = req.nextUrl.searchParams.get("to") ?? "";
  const amadeusId = process.env.AMADEUS_CLIENT_ID;
  const amadeusSecret = process.env.AMADEUS_CLIENT_SECRET;

  if (amadeusId && amadeusSecret) {
    // Real Amadeus flow (activated when credentials set)
    try {
      const tokenRes = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          client_id: amadeusId,
          client_secret: amadeusSecret,
        }),
      });
      const { access_token } = await tokenRes.json();
      const date = req.nextUrl.searchParams.get("date") ?? new Date().toISOString().slice(0, 10);
      const searchRes = await fetch(
        `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${from}&destinationLocationCode=${to}&departureDate=${date}&adults=1&max=5`,
        { headers: { Authorization: `Bearer ${access_token}` } }
      );
      const data = await searchRes.json();
      // Map Amadeus format to FlightResult[]
      const flights: FlightResult[] = (data.data ?? []).map((o: any, i: number) => ({
        id: o.id ?? `f${i}`,
        airline: o.validatingAirlineCodes?.[0] ?? "Various",
        from: o.itineraries?.[0]?.segments?.[0]?.departure?.iataCode ?? from,
        to: o.itineraries?.[0]?.segments?.at(-1)?.arrival?.iataCode ?? to,
        departTime: o.itineraries?.[0]?.segments?.[0]?.departure?.at?.slice(11, 16) ?? "",
        arriveTime: o.itineraries?.[0]?.segments?.at(-1)?.arrival?.at?.slice(11, 16) ?? "",
        duration: o.itineraries?.[0]?.duration?.replace("PT", "").replace("H", "h ").replace("M", "m") ?? "",
        stops: (o.itineraries?.[0]?.segments?.length ?? 1) - 1,
        price: `from $${Math.round(parseFloat(o.price?.total ?? "999"))}`,
        cabin: o.travelerPricings?.[0]?.fareDetailsBySegment?.[0]?.cabin ?? "Economy",
      }));
      return NextResponse.json({ flights, live: true });
    } catch {
      // Fall through to mock
    }
  }

  return NextResponse.json({ flights: MOCK_FLIGHTS, demo: true });
}
```

- [ ] **Step 4: Commit**

```bash
git add app/api/liam-search/
git commit -m "feat: travel search API proxies (weather, exchange rate, flights)"
```

---

## Task 5: Destination context (map ↔ chat sync)

**Files:**
- Create: `components/liam/destination-context.tsx`

**Interfaces:**
- Produces: `DestinationProvider`, `useDestination(): { destination, setDestination }`
- `destination: { name: string, lat: number, lng: number } | null`

- [ ] **Step 1: Create the context**

```typescript
// components/liam/destination-context.tsx
"use client";
import { createContext, useContext, useState } from "react";

interface Destination {
  name: string;
  lat: number;
  lng: number;
}

interface DestinationCtx {
  destination: Destination | null;
  setDestination: (d: Destination | null) => void;
  history: Destination[];
}

const DestinationContext = createContext<DestinationCtx>({
  destination: null,
  setDestination: () => {},
  history: [],
});

export function DestinationProvider({ children }: { children: React.ReactNode }) {
  const [destination, setDestinationRaw] = useState<Destination | null>(null);
  const [history, setHistory] = useState<Destination[]>([]);

  function setDestination(d: Destination | null) {
    setDestinationRaw(d);
    if (d) setHistory((prev) => [...prev.slice(-9), d]);
  }

  return (
    <DestinationContext.Provider value={{ destination, setDestination, history }}>
      {children}
    </DestinationContext.Provider>
  );
}

export const useDestination = () => useContext(DestinationContext);
```

- [ ] **Step 2: Commit**

```bash
git add components/liam/destination-context.tsx
git commit -m "feat: destination context for map-chat sync"
```

---

## Task 6: OpenStreetMap component

**Files:**
- Create: `components/liam/map-view.tsx`

**Interfaces:**
- Consumes: `useDestination()` from context
- Props: `className?: string`

- [ ] **Step 1: Create the map component**

```typescript
// components/liam/map-view.tsx
"use client";
import { useEffect, useRef } from "react";
import { useDestination } from "./destination-context";

// Leaflet must be dynamically imported because it uses window
export default function MapView({ className }: { className?: string }) {
  const mapRef = useRef<any>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const { destination } = useDestination();

  useEffect(() => {
    if (typeof window === "undefined") return;

    async function init() {
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");

      // Fix default icon paths broken by Webpack
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      if (!mapRef.current || mapInstanceRef.current) return;

      const map = L.map(mapRef.current, {
        center: [20, 0],
        zoom: 2,
        zoomControl: true,
        attributionControl: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    init();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Move map when destination changes
  useEffect(() => {
    if (!mapInstanceRef.current || !destination) return;

    const L_Dynamic = async () => {
      const L = (await import("leaflet")).default;
      const map = mapInstanceRef.current;

      if (markerRef.current) {
        markerRef.current.remove();
      }

      map.flyTo([destination.lat, destination.lng], 6, { duration: 1.8 });

      const marker = L.marker([destination.lat, destination.lng])
        .addTo(map)
        .bindPopup(`<b>${destination.name}</b>`, { className: "liam-popup" })
        .openPopup();

      markerRef.current = marker;
    };

    L_Dynamic();
  }, [destination]);

  return (
    <div className={className}>
      <style>{`
        .liam-popup .leaflet-popup-content-wrapper {
          background: #0e0e0e;
          color: #f7f7f5;
          border: 1px solid #26FC00;
          border-radius: 0;
          font-family: var(--font-mono);
          font-size: 11px;
        }
        .liam-popup .leaflet-popup-tip {
          background: #26FC00;
        }
      `}</style>
      <div
        ref={mapRef}
        style={{ width: "100%", height: "100%", background: "#0a0a0a" }}
      />
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/liam/map-view.tsx
git commit -m "feat: OpenStreetMap component with destination fly-to animation"
```

---

## Task 7: Search panel tabs (flights, hotels, cruises, utilities)

**Files:**
- Create: `components/liam/flights-tab.tsx`
- Create: `components/liam/hotels-tab.tsx`
- Create: `components/liam/cruises-tab.tsx`
- Create: `components/liam/utilities-tab.tsx`
- Create: `components/liam/search-panel.tsx`

- [ ] **Step 1: Create `flights-tab.tsx`**

```typescript
// components/liam/flights-tab.tsx
"use client";
import { useState } from "react";
import { useDestination } from "./destination-context";
import { Plane, ArrowRight, Loader2 } from "lucide-react";

interface FlightResult {
  id: string; airline: string; from: string; to: string;
  departTime: string; arriveTime: string; duration: string;
  stops: number; price: string; cabin: string;
}

export function FlightsTab() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [results, setResults] = useState<FlightResult[]>([]);
  const [loading, setLoading] = useState(false);
  const { setDestination } = useDestination();

  async function search() {
    if (!from || !to) return;
    setLoading(true);
    const r = await fetch(`/api/liam-search/flights?from=${from}&to=${to}&date=${date}`);
    const d = await r.json();
    setResults(d.flights ?? []);
    setLoading(false);
  }

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="grid grid-cols-2 gap-2">
        <input
          className="bg-background border border-foreground/15 px-3 py-2 text-sm font-mono text-white/80 placeholder:text-white/30 focus:outline-none focus:border-brand-green"
          placeholder="From (IATA: NYC)"
          value={from}
          onChange={e => setFrom(e.target.value.toUpperCase())}
          maxLength={3}
        />
        <input
          className="bg-background border border-foreground/15 px-3 py-2 text-sm font-mono text-white/80 placeholder:text-white/30 focus:outline-none focus:border-brand-green"
          placeholder="To (IATA: CDG)"
          value={to}
          onChange={e => setTo(e.target.value.toUpperCase())}
          maxLength={3}
        />
      </div>
      <div className="flex gap-2">
        <input
          type="date"
          className="flex-1 bg-background border border-foreground/15 px-3 py-2 text-sm font-mono text-white/80 focus:outline-none focus:border-brand-green"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <button
          onClick={search}
          className="px-4 py-2 bg-brand-green text-black font-mono text-xs tracking-[0.2em] uppercase hover:bg-brand-yellow transition-colors flex items-center gap-2"
        >
          {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plane className="w-3.5 h-3.5" />}
          Search
        </button>
      </div>
      <div className="flex-1 overflow-y-auto space-y-2">
        {results.map(f => (
          <div key={f.id} className="border border-foreground/10 p-3 flex flex-col gap-1 hover:border-brand-green/40 transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] tracking-[0.2em] text-brand-green uppercase">{f.airline}</span>
              <span className="font-display text-brand-yellow text-sm">{f.price}</span>
            </div>
            <div className="flex items-center gap-2 text-white/80 font-mono text-xs">
              <span>{f.from} {f.departTime}</span>
              <ArrowRight className="w-3 h-3 text-white/30" />
              <span>{f.to} {f.arriveTime}</span>
            </div>
            <div className="flex items-center justify-between font-mono text-[10px] text-white/40">
              <span>{f.duration}</span>
              <span>{f.stops === 0 ? "Direct" : `${f.stops} stop${f.stops > 1 ? "s" : ""}`}</span>
              <span>{f.cabin}</span>
            </div>
          </div>
        ))}
        {results.length === 0 && !loading && (
          <p className="font-editorial italic text-sm text-white/35 text-center pt-8">Enter origin, destination, and date to search flights</p>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create `utilities-tab.tsx`**

```typescript
// components/liam/utilities-tab.tsx
"use client";
import { useState, useEffect } from "react";
import { CloudSun, RefreshCw, DollarSign } from "lucide-react";

export function UtilitiesTab() {
  const [city, setCity] = useState("Paris");
  const [weather, setWeather] = useState<any>(null);
  const [fromCur, setFromCur] = useState("USD");
  const [toCur, setToCur] = useState("EUR");
  const [amount, setAmount] = useState("100");
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  async function fetchWeather() {
    setLoading(true);
    const r = await fetch(`/api/liam-search/weather?city=${encodeURIComponent(city)}`);
    setWeather(await r.json());
    setLoading(false);
  }

  async function fetchRate() {
    const r = await fetch(`/api/liam-search/exchange?from=${fromCur}&to=${toCur}`);
    const d = await r.json();
    setRate(d.rate);
  }

  useEffect(() => { fetchRate(); }, [fromCur, toCur]);

  return (
    <div className="flex flex-col gap-5 h-full overflow-y-auto">
      {/* Weather */}
      <div className="border border-foreground/10 p-4">
        <div className="flex items-center gap-2 mb-3">
          <CloudSun className="w-4 h-4 text-brand-yellow" />
          <span className="font-mono text-[11px] tracking-[0.2em] text-white/60 uppercase">Weather</span>
        </div>
        <div className="flex gap-2">
          <input
            className="flex-1 bg-background border border-foreground/15 px-3 py-1.5 text-sm font-mono text-white/80 placeholder:text-white/30 focus:outline-none focus:border-brand-green"
            value={city}
            onChange={e => setCity(e.target.value)}
            placeholder="City name"
          />
          <button
            onClick={fetchWeather}
            className="px-3 py-1.5 bg-brand-green/10 border border-brand-green/30 text-brand-green hover:bg-brand-green/20 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
        {weather && (
          <div className="mt-3 flex items-center justify-between">
            <div>
              <p className="font-display text-3xl text-white">{weather.temp}°C</p>
              <p className="font-mono text-[10px] text-white/50 capitalize">{weather.description}</p>
            </div>
            <div className="text-right font-mono text-[10px] text-white/40">
              <p>Feels {weather.feelsLike}°C</p>
              <p>Humidity {weather.humidity}%</p>
              <p>Wind {weather.wind} km/h</p>
              {weather.demo && <p className="text-brand-yellow/60">demo mode</p>}
            </div>
          </div>
        )}
      </div>

      {/* Currency */}
      <div className="border border-foreground/10 p-4">
        <div className="flex items-center gap-2 mb-3">
          <DollarSign className="w-4 h-4 text-brand-green" />
          <span className="font-mono text-[11px] tracking-[0.2em] text-white/60 uppercase">Currency Exchange</span>
        </div>
        <div className="grid grid-cols-3 gap-2 items-end">
          <div>
            <label className="font-mono text-[9px] text-white/40 uppercase tracking-[0.15em]">From</label>
            <input className="w-full bg-background border border-foreground/15 px-2 py-1.5 text-sm font-mono text-white/80 focus:outline-none focus:border-brand-green" value={fromCur} onChange={e => setFromCur(e.target.value.toUpperCase())} maxLength={3} />
          </div>
          <div>
            <label className="font-mono text-[9px] text-white/40 uppercase tracking-[0.15em]">To</label>
            <input className="w-full bg-background border border-foreground/15 px-2 py-1.5 text-sm font-mono text-white/80 focus:outline-none focus:border-brand-green" value={toCur} onChange={e => setToCur(e.target.value.toUpperCase())} maxLength={3} />
          </div>
          <div>
            <label className="font-mono text-[9px] text-white/40 uppercase tracking-[0.15em]">Amount</label>
            <input className="w-full bg-background border border-foreground/15 px-2 py-1.5 text-sm font-mono text-white/80 focus:outline-none focus:border-brand-green" value={amount} onChange={e => setAmount(e.target.value)} type="number" />
          </div>
        </div>
        {rate !== null && (
          <div className="mt-3 text-center">
            <p className="font-display text-2xl text-brand-yellow">{(parseFloat(amount || "1") * rate).toFixed(2)} {toCur}</p>
            <p className="font-mono text-[10px] text-white/40">1 {fromCur} = {rate.toFixed(4)} {toCur}</p>
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create `hotels-tab.tsx`**

```typescript
// components/liam/hotels-tab.tsx
"use client";
import { useState } from "react";
import { Building2, Star } from "lucide-react";

const SHOWCASE_HOTELS = [
  { id: "h1", name: "Amangiri", location: "Canyon Point, Utah", stars: 5, nights: "from $3,200/night", tags: ["Desert", "Luxury", "Spa"], lat: 37.0, lng: -111.8 },
  { id: "h2", name: "Singita Grumeti", location: "Serengeti, Tanzania", stars: 5, nights: "from $2,800/night", tags: ["Safari", "Wildlife", "Remote"], lat: -2.0, lng: 34.5 },
  { id: "h3", name: "Six Senses Zil Pasyon", location: "Félicité Island, Seychelles", stars: 5, nights: "from $2,200/night", tags: ["Beach", "Eco", "Island"], lat: -4.3, lng: 55.9 },
  { id: "h4", name: "Capella Ubud", location: "Ubud, Bali", stars: 5, nights: "from $950/night", tags: ["Jungle", "Romantic", "Spa"], lat: -8.5, lng: 115.3 },
  { id: "h5", name: "Rosewood Le Guanahani", location: "Saint Barthélemy", stars: 5, nights: "from $1,400/night", tags: ["Caribbean", "Beach", "Private"], lat: 17.9, lng: -62.8 },
  { id: "h6", name: "Amanfayun", location: "Hangzhou, China", stars: 5, nights: "from $1,100/night", tags: ["Culture", "Tea", "Serene"], lat: 30.2, lng: 120.1 },
];

export function HotelsTab() {
  const [filter, setFilter] = useState("");

  const filtered = SHOWCASE_HOTELS.filter(h =>
    h.name.toLowerCase().includes(filter.toLowerCase()) ||
    h.location.toLowerCase().includes(filter.toLowerCase()) ||
    h.tags.some(t => t.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <div className="flex flex-col gap-3 h-full">
      <input
        className="bg-background border border-foreground/15 px-3 py-2 text-sm font-mono text-white/80 placeholder:text-white/30 focus:outline-none focus:border-brand-green"
        placeholder="Filter by name, location, or style..."
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />
      <p className="font-mono text-[9px] text-white/30 uppercase tracking-[0.2em]">IC Vacation Curated Properties</p>
      <div className="flex-1 overflow-y-auto space-y-2">
        {filtered.map(h => (
          <div key={h.id} className="border border-foreground/10 p-3 hover:border-brand-green/40 transition-colors cursor-default">
            <div className="flex items-start justify-between mb-1">
              <span className="font-display text-white text-base leading-tight">{h.name}</span>
              <div className="flex gap-0.5 mt-0.5">
                {Array.from({ length: h.stars }).map((_, i) => (
                  <Star key={i} className="w-2.5 h-2.5 fill-brand-yellow text-brand-yellow" />
                ))}
              </div>
            </div>
            <p className="font-mono text-[10px] text-white/40 mb-2">{h.location}</p>
            <div className="flex items-center justify-between">
              <div className="flex gap-1 flex-wrap">
                {h.tags.map(t => (
                  <span key={t} className="font-mono text-[9px] tracking-[0.15em] text-brand-green/70 border border-brand-green/20 px-1.5 py-0.5">{t}</span>
                ))}
              </div>
              <span className="font-mono text-[10px] text-brand-yellow whitespace-nowrap">{h.nights}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create `cruises-tab.tsx`**

```typescript
// components/liam/cruises-tab.tsx
"use client";
import { useState } from "react";
import { Anchor } from "lucide-react";

const SHOWCASE_CRUISES = [
  { id: "c1", line: "Ponant", ship: "Le Commandant Charcot", region: "Arctic / Antarctic", duration: "14-21 days", price: "from $8,400/cabin", type: "Expedition", guests: 270 },
  { id: "c2", line: "Lindblad/Nat Geo", ship: "National Geographic Islander II", region: "Galápagos", duration: "7 days", price: "from $5,800/cabin", type: "Expedition", guests: 48 },
  { id: "c3", line: "Viking", ship: "Viking Freya", region: "Danube / Rhine", duration: "8-15 days", price: "from $2,400/cabin", type: "River", guests: 190 },
  { id: "c4", line: "Seabourn", ship: "Seabourn Venture", region: "Global Expedition", duration: "14-21 days", price: "from $9,200/cabin", type: "Luxury Expedition", guests: 264 },
  { id: "c5", line: "Regent Seven Seas", ship: "Seven Seas Grandeur", region: "Mediterranean", duration: "7-14 days", price: "from $4,900/cabin", type: "Ocean Luxury", guests: 746 },
  { id: "c6", line: "AmaWaterways", ship: "AmaMora", region: "Douro Valley, Portugal", duration: "7 days", price: "from $2,800/cabin", type: "River", guests: 158 },
];

export function CruisesTab() {
  const [typeFilter, setTypeFilter] = useState("All");
  const types = ["All", "Expedition", "River", "Ocean Luxury", "Luxury Expedition"];

  const filtered = typeFilter === "All"
    ? SHOWCASE_CRUISES
    : SHOWCASE_CRUISES.filter(c => c.type.includes(typeFilter));

  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="flex gap-1 flex-wrap">
        {types.map(t => (
          <button
            key={t}
            onClick={() => setTypeFilter(t)}
            className={`font-mono text-[9px] tracking-[0.15em] uppercase px-2.5 py-1 border transition-colors ${
              typeFilter === t
                ? "bg-brand-green text-black border-brand-green"
                : "border-foreground/20 text-white/50 hover:border-brand-green/40"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto space-y-2">
        {filtered.map(c => (
          <div key={c.id} className="border border-foreground/10 p-3 hover:border-brand-green/40 transition-colors">
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[10px] tracking-[0.2em] text-brand-green uppercase">{c.line}</span>
              <span className="font-mono text-[9px] text-white/30">{c.guests} guests max</span>
            </div>
            <p className="font-display text-white text-base">{c.ship}</p>
            <p className="font-editorial italic text-sm text-white/50 mb-2">{c.region} · {c.duration}</p>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] tracking-[0.15em] text-brand-yellow/70 border border-brand-yellow/20 px-1.5 py-0.5">{c.type}</span>
              <span className="font-display text-brand-yellow text-sm">{c.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Create `search-panel.tsx`**

```typescript
// components/liam/search-panel.tsx
"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Plane, Hotel, Anchor, BarChart2, Map } from "lucide-react";
import { FlightsTab } from "./flights-tab";
import { HotelsTab } from "./hotels-tab";
import { CruisesTab } from "./cruises-tab";
import { UtilitiesTab } from "./utilities-tab";

const MapView = dynamic(() => import("./map-view"), { ssr: false });

const TABS = [
  { id: "flights", label: "Flights", Icon: Plane },
  { id: "cruises", label: "Cruises", Icon: Anchor },
  { id: "hotels", label: "Hotels", Icon: Hotel },
  { id: "utilities", label: "Tools", Icon: BarChart2 },
  { id: "map", label: "Map", Icon: Map },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function SearchPanel() {
  const [activeTab, setActiveTab] = useState<TabId>("map");

  return (
    <div className="flex flex-col h-full bg-background border-r border-foreground/10">
      {/* Tab bar */}
      <div className="flex border-b border-foreground/10 bg-card">
        {TABS.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex-1 flex flex-col items-center gap-1 py-3 px-1 transition-colors ${
              activeTab === id
                ? "border-b-2 border-brand-green text-brand-green"
                : "text-white/40 hover:text-white/70 border-b-2 border-transparent"
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="font-mono text-[8px] tracking-[0.2em] uppercase">{label}</span>
          </button>
        ))}
      </div>

      {/* Map always mounted (just hidden) so it stays initialized */}
      <div className={`flex-1 ${activeTab === "map" ? "block" : "hidden"}`}>
        <MapView className="w-full h-full" />
      </div>

      {/* Other tab content */}
      {activeTab !== "map" && (
        <div className="flex-1 overflow-hidden p-4">
          {activeTab === "flights" && <FlightsTab />}
          {activeTab === "cruises" && <CruisesTab />}
          {activeTab === "hotels" && <HotelsTab />}
          {activeTab === "utilities" && <UtilitiesTab />}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 6: Commit**

```bash
git add components/liam/
git commit -m "feat: search panel with flights/hotels/cruises/tools/map tabs"
```

---

## Task 8: Liam chat panel

**Files:**
- Create: `components/liam/chat-panel.tsx`

**Interfaces:**
- Consumes: `useDestination().setDestination()`
- Full chat UI: message history, streaming input, Liam avatar, "Call Isaac" CTA

- [ ] **Step 1: Create `chat-panel.tsx`**

```typescript
// components/liam/chat-panel.tsx
"use client";
import { useState, useRef, useEffect } from "react";
import { Send, Phone, Loader2 } from "lucide-react";
import { useDestination } from "./destination-context";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const ISAAC_PHONE = "+1 (800) IC-VACATION"; // replace with real number

export function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Good day — I'm Liam, your personal travel consultant here at IC Vacation.\n\nI'm here to help you discover a trip that's genuinely shaped around you — not a template, not a package tour.\n\nTell me: what's been on your mind lately when you think about your next journey?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [showCta, setShowCta] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { setDestination } = useDestination();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Show CTA after 4+ exchanges
  useEffect(() => {
    const assistantMessages = messages.filter(m => m.role === "assistant").length;
    if (assistantMessages >= 3) setShowCta(true);
  }, [messages]);

  async function sendMessage() {
    if (!input.trim() || isStreaming) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsStreaming(true);

    const assistantMsgId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, {
      id: assistantMsgId,
      role: "assistant",
      content: "",
      timestamp: new Date(),
    }]);

    try {
      const res = await fetch("/api/liam-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let fullContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (data === "[DONE]") continue;
          try {
            const parsed = JSON.parse(data);
            if (parsed.text) {
              fullContent += parsed.text;
              setMessages(prev => prev.map(m =>
                m.id === assistantMsgId ? { ...m, content: fullContent } : m
              ));
            }
            if (parsed.destination) {
              setDestination(parsed.destination);
            }
          } catch {}
        }
      }
    } catch (err) {
      setMessages(prev => prev.map(m =>
        m.id === assistantMsgId
          ? { ...m, content: "I apologize — there was a brief connection issue. Please send your message again." }
          : m
      ));
    } finally {
      setIsStreaming(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-foreground/10 bg-card">
        <div className="w-10 h-10 rounded-full bg-brand-green/10 border border-brand-green/30 flex items-center justify-center">
          <img src="/ic-bird.svg" alt="Liam" className="w-6 h-6" style={{ filter: "invert(1) sepia(1) saturate(5) hue-rotate(55deg)" }} />
        </div>
        <div>
          <p className="font-display text-white text-base tracking-tight">Liam AI</p>
          <p className="font-mono text-[9px] tracking-[0.2em] text-brand-green uppercase">● Online · IC Vacation Consultant</p>
        </div>
        <div className="ml-auto">
          <a
            href="tel:+1-800-IC-VACATION"
            className="flex items-center gap-2 font-mono text-[10px] tracking-[0.15em] uppercase text-white/60 border border-foreground/15 px-3 py-1.5 hover:border-brand-green hover:text-brand-green transition-colors"
          >
            <Phone className="w-3.5 h-3.5" /> Call Isaac
          </a>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(msg => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            {msg.role === "assistant" && (
              <div className="w-7 h-7 flex-shrink-0 rounded-full bg-brand-green/10 border border-brand-green/30 flex items-center justify-center mt-0.5">
                <img src="/ic-bird.svg" alt="" className="w-4 h-4" style={{ filter: "invert(1) sepia(1) saturate(5) hue-rotate(55deg)" }} />
              </div>
            )}
            <div
              className={`max-w-[82%] ${
                msg.role === "user"
                  ? "bg-brand-green/10 border border-brand-green/20 px-4 py-3"
                  : "bg-card border border-foreground/10 px-4 py-3"
              }`}
            >
              <p
                className="font-editorial text-[15px] text-white/85 leading-[1.65] whitespace-pre-wrap"
                style={{ textWrap: "pretty" } as any}
              >
                {msg.content}
                {msg.role === "assistant" && msg.content === "" && isStreaming && (
                  <span className="inline-block w-2 h-4 bg-brand-green animate-pulse ml-0.5" />
                )}
              </p>
              <p className="font-mono text-[9px] text-white/25 mt-2">
                {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Call Isaac CTA — appears after conversation deepens */}
      {showCta && (
        <div className="mx-4 mb-3 p-3 border border-brand-yellow/20 bg-brand-yellow/5 flex items-center justify-between">
          <div>
            <p className="font-mono text-[10px] tracking-[0.15em] text-brand-yellow uppercase">Ready to go deeper?</p>
            <p className="font-editorial italic text-sm text-white/60 mt-0.5">Isaac personally reviews every brief.</p>
          </div>
          <a
            href="tel:+1-800-IC-VACATION"
            className="flex items-center gap-2 bg-brand-yellow text-black font-mono text-[10px] tracking-[0.15em] uppercase px-3 py-2 hover:bg-white transition-colors flex-shrink-0"
          >
            <Phone className="w-3 h-3" /> Call Isaac
          </a>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-foreground/10 bg-card">
        <div className="flex gap-2 items-end">
          <textarea
            ref={inputRef}
            className="flex-1 bg-background border border-foreground/15 px-3 py-2.5 text-sm font-editorial text-white/80 placeholder:text-white/25 focus:outline-none focus:border-brand-green resize-none leading-relaxed"
            placeholder="Tell Liam about your dream trip..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={2}
            maxRows={4}
            disabled={isStreaming}
          />
          <button
            onClick={sendMessage}
            disabled={isStreaming || !input.trim()}
            className="p-2.5 bg-brand-green text-black hover:bg-brand-yellow transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
          >
            {isStreaming
              ? <Loader2 className="w-4 h-4 animate-spin" />
              : <Send className="w-4 h-4" />
            }
          </button>
        </div>
        <p className="font-mono text-[9px] text-white/25 mt-1.5">Enter to send · Shift+Enter for new line</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/liam/chat-panel.tsx
git commit -m "feat: Liam AI chat panel with streaming, destination sync, and Call Isaac CTA"
```

---

## Task 9: Liam full-page layout

**Files:**
- Create: `app/liam/page.tsx`
- Create: `app/liam/liam-client.tsx`

- [ ] **Step 1: Create server wrapper `app/liam/page.tsx`**

```typescript
// app/liam/page.tsx
import type { Metadata } from "next";
import { LiamClient } from "./liam-client";

export const metadata: Metadata = {
  title: "Liam AI — Your Personal Travel Consultant · IC Vacation",
  description: "Chat with Liam, IC Vacation's AI travel consultant. Personalized cruise planning, destination discovery, luxury hotels, and boutique vacation design — shaped around you.",
};

export default function LiamPage() {
  return <LiamClient />;
}
```

- [ ] **Step 2: Create `app/liam/liam-client.tsx`**

```typescript
// app/liam/liam-client.tsx
"use client";
import { DestinationProvider } from "@/components/liam/destination-context";
import { SearchPanel } from "@/components/liam/search-panel";
import { ChatPanel } from "@/components/liam/chat-panel";
import { FilmGrain } from "@/components/site/film-grain";
import { Navigation } from "@/components/landing/navigation";

export function LiamClient() {
  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      <Navigation splashDone />
      <FilmGrain />
      <DestinationProvider>
        {/* Header bar */}
        <div className="flex-shrink-0 border-b border-foreground/10 bg-card/50 backdrop-blur px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.25em] text-white/40 uppercase">[ AI ]</span>
            <h1 className="font-display text-white text-xl tracking-tight">Liam <span className="text-brand-green">AI</span></h1>
            <span className="font-mono text-[9px] tracking-[0.2em] text-white/30">// Travel Consultant · IC Vacation</span>
          </div>
          <p className="hidden lg:block font-editorial italic text-sm text-white/35">
            Your personalized boutique vacation, shaped by Liam. Delivered by Isaac.
          </p>
        </div>

        {/* Main split layout */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left: Search + Map panel (40%) */}
          <div className="w-[42%] flex-shrink-0 overflow-hidden border-r border-foreground/10">
            <SearchPanel />
          </div>
          {/* Right: Chat panel (58%) */}
          <div className="flex-1 overflow-hidden">
            <ChatPanel />
          </div>
        </div>
      </DestinationProvider>
    </div>
  );
}
```

- [ ] **Step 3: Add nav link**

In `components/landing/navigation.tsx`, add to `navLinks` array:
```typescript
{ name: "Liam AI",      href: "/liam"                     },
```
Place it after "Destinations" and before "Journal".

- [ ] **Step 4: Test in browser**

```bash
curl -s http://localhost:3000/liam | grep -o "<title>.*</title>"
```
Expected: `<title>Liam AI — Your Personal Travel Consultant · IC Vacation</title>`

- [ ] **Step 5: Screenshot for visual verification**

```bash
agent-browser open http://localhost:3000/liam && sleep 3 && agent-browser screenshot /tmp/liam-page.png
```

Verify: split layout visible, navigation present, chat panel on right, search panel on left.

- [ ] **Step 6: Commit**

```bash
git add app/liam/ components/landing/navigation.tsx
git commit -m "feat: Liam AI page — full-screen split layout (search + map / chat)"
```

---

## Task 10: Apply UI components to existing pages

**Files:**
- Modify: `components/landing/marquee-strip.tsx` — add CurvedLoop
- Modify: `components/landing/hero-section.tsx` — add ScrollVelocity below hero + TextHoverEffect on IC VACATION wordmark area, fix mascot repeat
- Modify: `components/landing/how-it-works-section.tsx` — add SideRays background
- Modify: `components/landing/cta-section.tsx` — add ColorBends background
- Modify: `components/landing/infrastructure-section.tsx` — add ShapeGrid, fix duplicate mascot
- Modify: `components/landing/features-section.tsx` — add GradualBlur to hero image edges, ScrambledText to one key heading
- Modify: `components/landing/developers-section.tsx` — add 3D Globe
- Modify: `components/landing/footer-section.tsx` — add MetallicPaint to owl mascot in footer

**Note on install:** The `npx shadcn` commands will install component files. Check exact installed paths with `ls components/ui/` after each install.

- [ ] **Step 1: Add CurvedLoop to marquee strip**

In `components/landing/marquee-strip.tsx`, import CurvedLoop (path will be `@/components/ui/curved-loop` after install) and replace or supplement the marquee with:
```typescript
<CurvedLoop
  marqueeText="BOUTIQUE TRAVEL · SHAPED AROUND YOU · IC VACATION · PERSONALIZED ITINERARIES · LUXURY CRUISES · "
  speed={5.2}
  className="text-white/60 font-mono tracking-[0.2em] text-sm"
  curveAmount={800}
/>
```
Adjust colors to match brand (white/60 text on dark background).

- [ ] **Step 2: Add ScrollVelocity rows to hero section**

After the main hero content block in `components/landing/hero-section.tsx`, add:
```typescript
<div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
  <ScrollVelocity
    texts={["BOUTIQUE TRAVEL", "IC VACATION", "CURATED ITINERARIES", "LUXURY CRUISES"]}
    velocity={4}
    className="text-white/[0.04] font-display-tight text-8xl lg:text-[10rem] uppercase tracking-tight"
  />
</div>
```

- [ ] **Step 3: Fix TextHoverEffect on IC Vacation logo area**

Locate the section in the hero or homepage where `ic-wordmark-grey.svg` sits alongside the bird owl. The existing `components/ui/text-hover-effect.tsx` is already installed. Apply it:
```typescript
// Wrap in relative container, put TextHoverEffect behind the logo
<div className="relative flex items-center justify-center">
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <TextHoverEffect text="IC VACATION" className="text-[8rem] font-display-tight opacity-60" />
  </div>
  <img src="/ic-wordmark-grey.svg" alt="IC Vacation" className="relative z-10 h-10 opacity-70" />
  <img src="/ic-bird.svg" alt="" className="relative z-10 w-8 h-8 ml-2" />
</div>
```
Reduce the wordmark image by 50% (use `h-8` instead of current size).

- [ ] **Step 4: Add SideRays to how-it-works section**

In `components/landing/how-it-works-section.tsx`, wrap section content with SideRays background:
```typescript
<SideRays
  rayColor1="#26FC00"
  rayColor2="#FFE500"
  rayCount={6}
  className="opacity-10"
/>
```
Position it as `absolute inset-0 z-0 pointer-events-none`.

- [ ] **Step 5: Add ColorBends to CTA section**

In `components/landing/cta-section.tsx`, inside the section's relative container:
```typescript
<ColorBends
  color="#26FC00"
  className="absolute inset-0 z-0 opacity-15 pointer-events-none"
/>
```

- [ ] **Step 6: Fix infrastructure section mascot + add ShapeGrid**

In `components/landing/infrastructure-section.tsx`:
1. Find any `<Mascot type="bird" />` or `<img src="/ic-bird.svg">` that appears near another bird — change one to `<Mascot type="owl" />` or `<Mascot type="penguin" />`
2. Add `<ShapeGrid hoverColor="#FFE500" shape="hexagon" className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none" />`

- [ ] **Step 7: Add ScrambledText to features section heading**

In `components/landing/features-section.tsx`, find the main section `<h2>` and wrap the key word with ScrambledText:
```typescript
<ScrambledText
  text="personalized"
  className="text-brand-yellow"
  speed={0.5}
  trigger="hover"
/>
```

- [ ] **Step 8: Add GradualBlur to features section**

In the features section, find any hero/background image and wrap:
```typescript
<GradualBlur
  direction="bottom"
  blurAmount={12}
  className="absolute bottom-0 left-0 right-0 h-32 z-10 pointer-events-none"
/>
```

- [ ] **Step 9: Add 3D Globe to developers/integrations section**

In `components/landing/developers-section.tsx` or `integrations-section.tsx`, find an appropriate placement (right side of a grid, or standalone section) and add:
```typescript
import { Globe } from "@/components/ui/3d-globe";
// Inside JSX:
<div className="relative w-[400px] h-[400px]">
  <Globe className="w-full h-full" />
</div>
```

- [ ] **Step 10: Add MetallicPaint to owl mascot in footer**

In `components/landing/footer-section.tsx`, find where the owl mascot is rendered:
```typescript
<MetallicPaint
  imageUrl="/ic-owl.svg"
  color="#FFE500"
  metalIntensity={0.8}
  className="w-32 h-32"
/>
```

- [ ] **Step 11: Screenshot before/after comparison**

```bash
agent-browser open http://localhost:3000 && sleep 3 && agent-browser screenshot /tmp/homepage-after.png
agent-browser scroll --direction down --amount 10 && sleep 2 && agent-browser screenshot /tmp/homepage-mid.png
```

Verify: CurvedLoop visible, ScrollVelocity ghost text in hero, no duplicate mascots, new backgrounds on various sections.

- [ ] **Step 12: Commit**

```bash
git add components/landing/ components/ui/
git commit -m "feat: apply 10 ReactBits/Aceternity UI components site-wide + fix mascot distribution"
```

---

## Task 11: Final check + nav + footer links

**Files:**
- Modify: `components/landing/footer-section.tsx` — add Liam AI to footer Travel links
- Verify: Build passes, liam page accessible, all sections render

- [ ] **Step 1: Add Liam AI to footer**

In `components/landing/footer-section.tsx`, add to the `Travel` category in `footerLinks`:
```typescript
{ name: "Liam AI Consultant", href: "/liam" },
```

- [ ] **Step 2: Run build check**

```bash
npm run build 2>&1 | tail -20
```
Expected: `✓ Compiled` (TS errors tolerated due to `ignoreBuildErrors: true`)

- [ ] **Step 3: Final visual sweep**

```bash
agent-browser open http://localhost:3000/liam && sleep 4 && agent-browser screenshot /tmp/liam-final.png && \
agent-browser open http://localhost:3000 && sleep 3 && agent-browser screenshot /tmp/home-final.png && \
agent-browser scroll --direction down --amount 8 && sleep 2 && agent-browser screenshot /tmp/home-scroll-final.png
```

- [ ] **Step 4: Save final checkpoint to Mem0**

Document in Mem0: all files changed, Azure deployments used, API routes created, components applied.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "feat: complete Liam AI + UI components sprint — all 4 phases done"
```

---

## Self-Review

### Spec Coverage Check
| Requirement | Task |
|---|---|
| Azure OpenAI deployment (GPT-5.4, GPT-5.4-mini) | ✅ Pre-done (both deployed) |
| Streaming chat with Liam persona | ✅ Task 3, 8 |
| System prompt + knowledge base | ✅ Task 2 |
| Full-screen page with 50/50 split | ✅ Task 9 |
| Left panel: flights tab | ✅ Task 7 |
| Left panel: cruises tab | ✅ Task 7 |
| Left panel: hotels tab | ✅ Task 7 |
| Left panel: weather/currency/calendar | ✅ Task 7 (UtilitiesTab) |
| Live OpenStreetMap | ✅ Task 6 |
| Map moves when destination mentioned | ✅ Tasks 3 + 5 + 6 (destination context + SSE) |
| Free APIs wired (weather, exchange, flights) | ✅ Task 4 |
| Funnel → Call Isaac CTA | ✅ Task 8 (showCta after 3+ exchanges) |
| Nav link added | ✅ Task 9 |
| CurvedLoop | ✅ Task 10 |
| GradualBlur | ✅ Task 10 |
| ScrambledText | ✅ Task 10 |
| ScrollVelocity | ✅ Task 10 |
| MetallicPaint (on mascot) | ✅ Task 10 |
| SideRays | ✅ Task 10 |
| ColorBends | ✅ Task 10 |
| ShapeGrid (hexagon) | ✅ Task 10 |
| TextHoverEffect (IC VACATION behind logo) | ✅ Task 10 |
| 3D Globe | ✅ Task 10 |
| Fix mascot overuse | ✅ Task 10 |
| Brand consistency (green/yellow/dark) | ✅ all tasks |

### Potential Issues
1. **Leaflet SSR**: MapView uses `dynamic(..., { ssr: false })` — handled
2. **GPT-5.x requires `max_completion_tokens`**: Used throughout — handled  
3. **ReactBits install paths may differ**: Task 10 notes to verify with `ls components/ui/` after install
4. **Amadeus keys empty**: Flights falls back to mock data — handled
5. **OpenWeatherMap key = "demo"**: Returns mock weather — handled
