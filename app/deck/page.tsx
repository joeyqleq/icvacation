import {
  AnimatedCounter,
  AnimatedFunnel,
  ComparisonTable,
  ResponseComparison,
  FilingCabinet,
  HowLiamThinks,
  LiamArchitecture,
  ChecklistItem,
  RoadmapItem,
} from "./deck-widgets";

/* ─────────────────────────────────────────────
   Slide wrapper — consistent padding + optional accent line
───────────────────────────────────────────── */
function Slide({
  children,
  className = "",
  accentColor,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  accentColor?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`relative px-6 md:px-12 lg:px-20 py-20 md:py-28 border-b border-[#151515] ${className}`}
    >
      {accentColor && (
        <div
          className="absolute left-0 top-0 h-full w-1"
          style={{ backgroundColor: accentColor + "60" }}
        />
      )}
      {children}
    </section>
  );
}

/* ─────────────────────────────────────────────
   Section divider — big label
───────────────────────────────────────────── */
function SectionDivider({
  label,
  color = "#26FC00",
}: {
  label: string;
  color?: string;
}) {
  return (
    <div className="px-6 md:px-12 lg:px-20 py-6 flex items-center gap-4 border-b border-[#151515] bg-[#030303]">
      <div
        className="h-px flex-1 max-w-[60px]"
        style={{ backgroundColor: color + "60" }}
      />
      <span
        className="font-mono text-xs uppercase tracking-[0.25em]"
        style={{ color }}
      >
        {label}
      </span>
      <div
        className="h-px flex-1"
        style={{ backgroundColor: color + "20" }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Eyebrow + heading helper
───────────────────────────────────────────── */
function SlideHeading({
  eyebrow,
  heading,
  eyebrowColor = "#26FC00",
}: {
  eyebrow?: string;
  heading: React.ReactNode;
  eyebrowColor?: string;
}) {
  return (
    <div className="mb-10">
      {eyebrow && (
        <p
          className="font-mono text-xs uppercase tracking-[0.2em] mb-3"
          style={{ color: eyebrowColor }}
        >
          {eyebrow}
        </p>
      )}
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-[#f7f7f5]">
        {heading}
      </h2>
    </div>
  );
}

/* ═════════════════════════════════════════════
   PAGE
═════════════════════════════════════════════ */
export default function DeckPage() {
  return (
    <main className="max-w-5xl mx-auto">

      {/* ── PART 1 HEADER ─────────────────────── */}
      <SectionDivider label="Part 1 of 2 — Liam AI" color="#26FC00" />

      {/* ── SLIDE 1: HERO ─────────────────────── */}
      <Slide id="hero" accentColor="#26FC00" className="min-h-[85vh] flex flex-col justify-center">
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#26FC00] mb-6">
            IC Vacation — Technology Overview
          </p>
          <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-bold leading-[0.9] tracking-tight mb-8">
            <span className="text-[#f7f7f5]">Meet</span>
            <br />
            <span className="text-[#26FC00]">Liam.</span>
          </h1>
          <p className="text-xl md:text-2xl text-[#8a8a86] font-serif italic leading-relaxed max-w-xl mb-10">
            Your AI travel consultant — built specifically for IC Vacation.
            Not a generic chatbot. Not a widget. A purpose-built consultant
            that knows Isaac&apos;s philosophy and funnels every visitor toward a
            real conversation.
          </p>
          <div className="flex flex-wrap gap-6 items-center">
            <div className="border border-[#252426] bg-[#0e0e0e] px-5 py-3">
              <p className="text-xs font-mono text-[#8a8a86] uppercase tracking-wider mb-0.5">
                Built for
              </p>
              <p className="font-semibold text-[#f7f7f5]">
                Isaac Chowrimootoo
              </p>
            </div>
            <div className="border border-[#252426] bg-[#0e0e0e] px-5 py-3">
              <p className="text-xs font-mono text-[#8a8a86] uppercase tracking-wider mb-0.5">
                Direct line
              </p>
              <p className="font-semibold text-[#26FC00]">(407) 810-1670</p>
            </div>
          </div>
        </div>

        {/* stat strip */}
        <div className="mt-16 grid grid-cols-3 gap-0 border border-[#252426] max-w-xl">
          {[
            { n: 6, label: "Knowledge verticals" },
            { n: 2400, suffix: "+", label: "Source pages scraped" },
            { n: 24, suffix: "/7", label: "Always on" },
          ].map((s, i) => (
            <div
              key={i}
              className={`px-5 py-4 ${i < 2 ? "border-r border-[#252426]" : ""}`}
            >
              <div className="text-2xl font-bold font-mono text-[#26FC00]">
                <AnimatedCounter target={s.n} suffix={s.suffix} />
              </div>
              <div className="text-xs text-[#8a8a86] font-mono uppercase tracking-wider mt-0.5">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </Slide>

      {/* ── SLIDE 2: WHY LIAM EXISTS ──────────── */}
      <Slide id="why" accentColor="#26FC00">
        <SlideHeading
          eyebrow="The problem Liam solves"
          heading={
            <>
              Isaac can&apos;t be on call{" "}
              <span className="text-[#26FC00]">at 2am.</span>
            </>
          }
        />
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div className="space-y-5 text-[#8a8a86] leading-relaxed">
            <p>
              Before Liam, this is what happened: someone finds IC Vacation
              at midnight — excited, ready to plan a cruise. They have a
              question. There&apos;s nobody there. They leave. That visitor
              is gone.
            </p>
            <p>
              Liam changes that. The moment a visitor arrives, Liam is
              there. It asks questions, listens, and learns exactly what kind
              of trip they&apos;re dreaming of.
            </p>
            <p>
              By the end of the conversation, Liam has built a profile. And
              then it does the most important thing of all — it tells them to
              call Isaac.
            </p>
          </div>
          <div className="space-y-3">
            <div className="border border-[#333537] bg-[#0a0a0a] p-5">
              <p className="font-mono text-xs text-[#444444] uppercase tracking-wider mb-3">
                Before Liam
              </p>
              <div className="space-y-2 text-sm text-[#8a8a86]">
                <div className="flex items-center gap-2">
                  <span className="text-[#333537]">→</span>
                  <span>Visitor arrives at 2am</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#333537]">→</span>
                  <span>Has a question</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#333537]">→</span>
                  <span>Nobody answers</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-900/80">→</span>
                  <span className="text-[#444444]">Visitor leaves. Forever.</span>
                </div>
              </div>
            </div>
            <div className="border border-[#26FC00]/30 bg-[#26FC00]/05 p-5">
              <p className="font-mono text-xs text-[#26FC00] uppercase tracking-wider mb-3">
                With Liam
              </p>
              <div className="space-y-2 text-sm text-[#8a8a86]">
                <div className="flex items-center gap-2">
                  <span className="text-[#26FC00]">→</span>
                  <span>Visitor arrives at 2am</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#26FC00]">→</span>
                  <span>Liam asks what they&apos;re dreaming of</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#26FC00]">→</span>
                  <span>Liam builds a trip brief</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#26FC00]">→</span>
                  <span className="text-[#26FC00] font-semibold">
                    &quot;Call Isaac — (407) 810-1670&quot;
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Slide>

      {/* ── SLIDE 3: THE FUNNEL ───────────────── */}
      <Slide id="funnel" accentColor="#26FC00">
        <SlideHeading
          eyebrow="How the funnel works"
          heading={
            <>
              Visitor{" "}
              <span className="text-[#8a8a86] font-serif italic font-normal">
                to
              </span>{" "}
              <span className="text-[#26FC00]">consultation.</span>
            </>
          }
        />
        <AnimatedFunnel />
      </Slide>

      {/* ── SLIDE 3b: ARCHITECTURE ────────────── */}
      <Slide id="architecture" accentColor="#4fc3f7">
        <SlideHeading
          eyebrow="Technical overview"
          heading={
            <>
              The architecture{" "}
              <span className="text-[#4fc3f7]">behind Liam.</span>
            </>
          }
          eyebrowColor="#4fc3f7"
        />
        <p className="text-[#8a8a86] leading-relaxed mb-10 max-w-2xl">
          Two ways to see the same system. Choose the view that suits you.
        </p>
        <LiamArchitecture />
      </Slide>

      {/* ── SLIDE 4: LIAM VS CHATGPT ──────────── */}
      <Slide id="comparison" accentColor="#FFE500">
        <SlideHeading
          eyebrow="Why Liam isn't just ChatGPT"
          heading={
            <>
              Built for{" "}
              <span className="text-[#FFE500]">IC Vacation.</span>
              <br />
              Not the whole internet.
            </>
          }
          eyebrowColor="#FFE500"
        />
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <p className="text-[#8a8a86] leading-relaxed mb-8">
              Anyone can go to ChatGPT and ask about cruises. What they
              get is generic, surface-level, and goes nowhere. Liam is
              different — it&apos;s been given Isaac&apos;s specific context, trained
              across six professional travel verticals, and programmed to end
              every conversation with a clear next step.
            </p>
            <ComparisonTable />
          </div>
          <div>
            <p className="font-mono text-xs text-[#FFE500] uppercase tracking-wider mb-4">
              See the difference in action
            </p>
            <ResponseComparison />
          </div>
        </div>
      </Slide>

      {/* ── SLIDE 5: THE KNOWLEDGE BASE ───────── */}
      <Slide id="knowledge" accentColor="#26FC00">
        <SlideHeading
          eyebrow="Liam's library"
          heading={
            <>
              We gave Liam{" "}
              <span className="text-[#26FC00]">a library.</span>
              <br />
              Here&apos;s what&apos;s in it.
            </>
          }
        />
        <p className="text-[#8a8a86] leading-relaxed mb-10 max-w-2xl">
          Liam was trained by scraping publicly available sources across every
          vertical a professional travel consultant would know. Before it ever
          speaks to a visitor, it has read everything in these six filing
          cabinets. Click any one to open it.
        </p>
        <div className="space-y-4">
          <FilingCabinet
            count={1}
            label="Visa & Entry Intelligence"
            description="Government consulate sites, IATA Travel Centre, embassy portals, TIMATIC"
            color="#26FC00"
            items={[
              "US passport visa requirements by country",
              "TSA PreCheck & Global Entry enrollment process",
              "ESTA application process for visa-waiver nations",
              "Biometric passport rules by nationality",
              "Entry restrictions and health declaration requirements",
              "Dual-nationality passport usage rules",
              "Visa-on-arrival eligibility by destination",
              "Transit visa requirements at major hubs",
              "Vaccination certificate requirements by country",
              "Consulate appointment booking guides",
              "Emergency travel document procedures",
              "Border crossing hours and land-entry rules",
            ]}
          />
          <FilingCabinet
            count={2}
            label="Aviation & Flight Data"
            description="Airline alliance sites, airport authority pages, aviation forums, ATC blogs"
            color="#4fc3f7"
            items={[
              "Airline alliance lounges by status tier (Star Alliance, Oneworld, SkyTeam)",
              "Minimum connection times at major hubs (CDG, DXB, SIN, JFK, LHR)",
              "Seat map guides by aircraft type (777, A380, A350, 787)",
              "Baggage policy by airline and fare class",
              "Frequent flyer redemption sweet spots",
              "Airport terminal maps and inter-terminal transit times",
              "Premium cabin meal service guides",
              "Lounge access rules for non-status holders",
              "Long-haul vs. ultra-long-haul route options",
              "Upgrade bidding strategies by airline",
              "Aircraft livery and cabin refresh timelines",
              "Codeshare and interline partner rules",
            ]}
          />
          <FilingCabinet
            count={3}
            label="Cruise & Maritime Knowledge"
            description="Cruise line public sites, cruise forums, port authority pages, maritime safety"
            color="#FFE500"
            items={[
              "River cruise lines compared: AmaWaterways, Viking, Scenic, Avalon",
              "Ocean luxury lines: Silversea, Regent Seven Seas, Seabourn, Ponant",
              "Expedition cruise operators: Lindblad, Hurtigruten, Aurora Expeditions",
              "Port embarkation and disembarkation guides",
              "Cabin category glossary: suite, balcony, French balcony, inside",
              "Muster drill protocols and safety procedures",
              "River water-level impact on itineraries",
              "Shore excursion selection strategy by port",
              "Solo traveller supplements and deals",
              "Group booking and affinity cruise programs",
              "Ship dry-dock schedules and refurbishment timelines",
              "Gratuity policies by cruise line",
            ]}
          />
          <FilingCabinet
            count={4}
            label="Hotel & Accommodation Intelligence"
            description="Hotel brand sites, luxury travel blogs, Condé Nast archives, advisor networks"
            color="#d4b800"
            items={[
              "Luxury brand tiers: AMAN, Six Senses, Rosewood, Belmond, Auberge",
              "Boutique hotel networks: SLH, Design Hotels, Relais & Châteaux",
              "Points program comparisons: Marriott Bonvoy, World of Hyatt, IHG",
              "Room category glossary: garden view, ocean-facing, villa, overwater",
              "Butler service etiquette and how to request upgrades",
              "Early check-in and late checkout strategies",
              "All-inclusive vs. room-only comparison by destination",
              "Preferred partner rates through travel advisor networks",
              "Seasonal pricing calendars for luxury resorts",
              "Amenity packages for honeymooners and anniversaries",
              "Overwater villa destinations compared",
              "Soft-brand vs. flagship positioning guides",
            ]}
          />
          <FilingCabinet
            count={5}
            label="Destination & Cultural Deep Dives"
            description="Travel blogs, Reddit r/travel, Lonely Planet, Fodor's, cultural embassy sites, UNESCO"
            color="#9ef088"
            items={[
              "Country-by-country cultural etiquette guides",
              "Religious site dress codes: temples, mosques, cathedrals",
              "Tipping customs by region and service type",
              "Photography rules at sacred and military sites",
              "Local transportation guides: rail passes, tuk-tuks, ferries",
              "Street food safety by destination",
              "Currency and payment norms by country",
              "Best-season calendars for 60+ destinations",
              "Crowd-avoidance strategies at UNESCO World Heritage sites",
              "Language essentials for travellers (key phrases by country)",
              "LGBTQ+ travel safety by destination",
              "Altitude sickness guidance for highland destinations",
            ]}
          />
          <FilingCabinet
            count={6}
            label="Dining, Experiences & Wellness"
            description="Michelin guide summaries, sommelier blogs, wellness resort directories, experience platforms"
            color="#f7a8a8"
            items={[
              "Michelin-starred restaurant reservation strategies",
              "Wine region guides: Burgundy, Douro Valley, Tuscany, Rioja",
              "Diving certification requirements by site (PADI, SSI)",
              "Spa treatment menus by property type (Ayurveda, Balinese, hammam)",
              "Cooking class destinations: Tuscany, Oaxaca, Tokyo, Marrakech",
              "Hot air balloon experiences: Cappadocia, Serengeti, Napa",
              "Private safari guide selection criteria",
              "Truffle hunting season calendars by region",
              "Sommelier-led cellar tour guides",
              "Thermal and geothermal spa destinations compared",
              "Luxury train journeys: Orient Express, Rovos Rail, Belmond",
              "Wildlife encounter ethics and best-practice guides",
            ]}
          />
        </div>
        <div className="mt-8 border border-[#252426] bg-[#0a0a0a] p-5 flex items-start gap-4">
          <div className="w-8 h-8 border border-[#26FC00]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#26FC00" strokeWidth="1.5">
              <circle cx="7" cy="7" r="6" />
              <line x1="7" y1="5" x2="7" y2="7.5" strokeWidth="2" />
              <circle cx="7" cy="10" r="0.8" fill="#26FC00" stroke="none" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-[#f7f7f5] font-semibold mb-1">
              Why does this matter?
            </p>
            <p className="text-sm text-[#8a8a86] leading-relaxed">
              A chatbot without a library gives you guesses. Liam gives you
              answers pulled from thousands of scraped pages across every
              vertical a professional travel consultant would know. When Liam
              explains entry requirements, recommends a cruise line, or suggests
              a Michelin restaurant in Lisbon — it actually read that. It&apos;s not
              making it up.
            </p>
          </div>
        </div>
      </Slide>

      {/* ── SLIDE 6: HOW LIAM THINKS ──────────── */}
      <Slide id="how" accentColor="#26FC00">
        <SlideHeading
          eyebrow="Under the hood"
          heading={
            <>
              How Liam{" "}
              <span className="text-[#26FC00]">actually thinks.</span>
            </>
          }
        />
        <p className="text-[#8a8a86] leading-relaxed mb-10 max-w-2xl">
          No jargon. Here&apos;s the plain-English version of what happens every
          time someone sends Liam a message.
        </p>
        <HowLiamThinks />
        <div className="mt-8 border-l-2 border-[#26FC00]/40 pl-5 py-1">
          <p className="text-[#8a8a86] text-sm italic">
            &ldquo;Think of Liam like a very smart secretary. Before picking up the
            phone, she quickly looks up everything relevant in the filing
            cabinet — then gives you a real, informed answer. Not a guess.
            Not a generic response. An answer rooted in thousands of pages of
            professional travel knowledge.&rdquo;
          </p>
        </div>
      </Slide>

      {/* ── SLIDE 7: REAL-TIME WEB ────────────── */}
      <Slide id="realtime" accentColor="#26FC00">
        <div className="flex gap-6 items-start max-w-2xl">
          <div className="w-12 h-12 border border-[#26FC00]/30 bg-[#26FC00]/05 flex items-center justify-center flex-shrink-0 mt-1">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#26FC00" strokeWidth="1.5">
              <circle cx="11" cy="11" r="9" />
              <path d="M11 2a14 14 0 010 18M11 2a14 14 0 000 18" />
              <line x1="2" y1="11" x2="20" y2="11" />
            </svg>
          </div>
          <div>
            <p className="font-mono text-xs text-[#26FC00] uppercase tracking-wider mb-3">
              Real-time web knowledge
            </p>
            <h3 className="text-2xl font-bold text-[#f7f7f5] mb-3">
              Liam also checks live sources.
            </h3>
            <p className="text-[#8a8a86] leading-relaxed">
              When a visitor asks about something time-sensitive — current
              flight prices, weather at a destination, recent travel news —
              Liam can search the web in real time. This means Liam&apos;s
              answers are never just from a fixed snapshot. The library is
              the foundation. The web keeps it current.
            </p>
          </div>
        </div>
      </Slide>

      {/* ── SLIDE 8: THE GOAL ────────────────── */}
      <Slide id="goal" accentColor="#26FC00">
        <div className="max-w-2xl">
          <p className="font-mono text-xs text-[#26FC00] uppercase tracking-wider mb-6">
            The bottom line
          </p>
          <blockquote className="text-3xl md:text-4xl font-serif italic text-[#f7f7f5] leading-snug mb-8">
            &ldquo;Liam doesn&apos;t replace Isaac. He prepares your brief so that
            when you <span className="text-[#26FC00] not-italic font-bold">do</span>{" "}
            call, every minute counts.&rdquo;
          </blockquote>
          <p className="text-[#8a8a86] leading-relaxed">
            Isaac&apos;s value is in the nuance, the relationships, the
            judgment call that no AI can make. Liam handles the first
            introduction — the qualification, the curiosity, the brief.
            By the time someone dials Isaac&apos;s number, they already know
            what they want. The conversation starts at a completely
            different level.
          </p>
        </div>
      </Slide>

      {/* ── PART 2 HEADER ─────────────────────── */}
      <SectionDivider label="Part 2 of 2 — SEO" color="#FFE500" />

      {/* ── SLIDE 9: SEO INTRO ───────────────── */}
      <Slide id="seo-intro" accentColor="#FFE500">
        <SlideHeading
          eyebrow="Search Engine Optimisation"
          heading={
            <>
              What&apos;s the point of a beautiful{" "}
              <span className="text-[#FFE500]">website</span>{" "}
              if no one sees it?
            </>
          }
          eyebrowColor="#FFE500"
        />
        <p className="text-[#8a8a86] leading-relaxed max-w-2xl">
          Building a great site is only half the job. The other half is
          making sure Google (and Bing, and DuckDuckGo, and every other
          search engine) knows you exist, trusts your content, and shows
          your pages when someone searches for what you offer. That&apos;s
          what SEO does.
        </p>
      </Slide>

      {/* ── SLIDE 10: WHAT IS SEO ────────────── */}
      <Slide id="seo-explainer" accentColor="#FFE500">
        <SlideHeading
          eyebrow="Plain-English explanation"
          heading={
            <>
              SEO, explained{" "}
              <span className="text-[#FFE500]">simply.</span>
            </>
          }
          eyebrowColor="#FFE500"
        />
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <p className="text-[#8a8a86] leading-relaxed mb-6">
              Imagine the Yellow Pages, but for the internet — and instead
              of paying for a listing, you earn your spot by having the
              best, most relevant answer to what someone is searching for.
            </p>
            <p className="text-[#8a8a86] leading-relaxed mb-6">
              When someone types &ldquo;boutique cruise planner Florida&rdquo; or
              &ldquo;luxury river cruise advisor&rdquo; into Google, SEO is what
              determines whether IC Vacation shows up — and whether it
              shows up on page one or page ten.
            </p>
            <p className="text-[#8a8a86] leading-relaxed">
              Page one gets almost all the clicks. Page two is where
              websites go to be forgotten.
            </p>
          </div>
          <div className="space-y-3">
            {[
              {
                term: "boutique cruise planner",
                note: "Someone actively shopping",
              },
              {
                term: "luxury river cruise advisor",
                note: "High-intent, premium buyer",
              },
              {
                term: "AmaWaterways Danube itinerary",
                note: "Specific product research",
              },
              {
                term: "honeymoon cruise expert Florida",
                note: "Local + intent search",
              },
              {
                term: "best anniversary cruise ideas",
                note: "Early research stage",
              },
            ].map((q, i) => (
              <div
                key={i}
                className="flex items-center justify-between border border-[#252426] bg-[#0a0a0a] px-4 py-3"
              >
                <span className="font-mono text-sm text-[#FFE500]">
                  &ldquo;{q.term}&rdquo;
                </span>
                <span className="text-xs text-[#8a8a86] hidden sm:block">
                  {q.note}
                </span>
              </div>
            ))}
            <p className="text-xs font-mono text-[#444444] uppercase tracking-wider text-center pt-2">
              These are the searches IC Vacation is targeting
            </p>
          </div>
        </div>
      </Slide>

      {/* ── SLIDE 11: WHAT WE'VE DONE ────────── */}
      <Slide id="seo-done" accentColor="#26FC00">
        <SlideHeading
          eyebrow="Already completed"
          heading={
            <>
              What we&apos;ve{" "}
              <span className="text-[#26FC00]">already built.</span>
            </>
          }
        />
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-xs font-mono text-[#444444] uppercase tracking-wider mb-4">
              Technical foundation
            </p>
            <div className="border border-[#1a1a1a]">
              <ChecklistItem>
                <strong className="text-[#f7f7f5]">
                  Domain registered and submitted to Google Search Console
                </strong>{" "}
                — Google now knows icvacation.com exists and is indexing it.
                Think of Search Console as the form you fill out to get
                listed.
              </ChecklistItem>
              <ChecklistItem>
                <strong className="text-[#f7f7f5]">
                  Sitemap submitted
                </strong>{" "}
                — A map of every page on the site was sent to Google so
                nothing gets missed.
              </ChecklistItem>
              <ChecklistItem>
                <strong className="text-[#f7f7f5]">
                  Semantic metadata on every page
                </strong>{" "}
                — Every page has a title, description, and Open Graph tags
                so it looks right when shared on social media too.
              </ChecklistItem>
              <ChecklistItem>
                <strong className="text-[#f7f7f5]">
                  JSON-LD structured data
                </strong>{" "}
                — A machine-readable label on every article that tells
                Google &ldquo;this is authored content, written by a real person,
                about this specific topic.&rdquo; Google rewards this with better
                placement.
              </ChecklistItem>
              <ChecklistItem>
                <strong className="text-[#f7f7f5]">
                  Privacy-first analytics at matomo.icvacation.com
                </strong>{" "}
                — Not Google Analytics. This means real visitor data without
                feeding Google your audience information. Isaac can log in
                and see exactly who&apos;s visiting, right now.
              </ChecklistItem>
            </div>
          </div>
          <div>
            <p className="text-xs font-mono text-[#444444] uppercase tracking-wider mb-4">
              Content
            </p>
            <div className="border border-[#1a1a1a]">
              <ChecklistItem>
                <strong className="text-[#f7f7f5]">
                  Blog expanded to{" "}
                  <AnimatedCounter
                    target={48}
                    className="text-[#26FC00] font-bold"
                  />{" "}
                  articles
                </strong>{" "}
                — Each one targets a real search query. Not filler — these
                are articles people actually search for.
              </ChecklistItem>
              <ChecklistItem>
                <strong className="text-[#f7f7f5]">Topics covered:</strong>
                <ul className="mt-2 space-y-1 text-[#8a8a86]">
                  <li>— Luxury river cruising guides</li>
                  <li>— Expedition cruise planning</li>
                  <li>— Destination customs (Japan, Egypt, Douro)</li>
                  <li>— Packing guides for 14-night sailings</li>
                  <li>— Honeymoon and anniversary cruise planning</li>
                </ul>
              </ChecklistItem>
              <ChecklistItem>
                <strong className="text-[#f7f7f5]">
                  Every article targets real search terms
                </strong>{" "}
                — &ldquo;best river cruise for couples&rdquo;, &ldquo;luxury cruise planner
                Florida&rdquo;, &ldquo;AmaWaterways vs Viking&rdquo; — these are phrases people
                actually type.
              </ChecklistItem>
            </div>
          </div>
        </div>
      </Slide>

      {/* ── SLIDE 12: WHAT THE DATA TELLS US ─── */}
      <Slide id="seo-data" accentColor="#FFE500">
        <SlideHeading
          eyebrow="Analytics"
          heading={
            <>
              What the data{" "}
              <span className="text-[#FFE500]">tells us.</span>
            </>
          }
          eyebrowColor="#FFE500"
        />
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div className="space-y-5 text-[#8a8a86] leading-relaxed">
            <p>
              As visitors come in, Matomo — the analytics dashboard at
              matomo.icvacation.com — shows Isaac exactly what&apos;s happening.
              In real time. No waiting for monthly reports.
            </p>
            <p>
              This data shapes every future decision: which articles to
              write more of, which pages need improving, and which search
              terms are already bringing in the right kind of visitor.
            </p>
          </div>
          <div className="space-y-3">
            {[
              {
                metric: "Which pages they read",
                detail:
                  "See which articles hold attention vs. which ones people leave immediately",
              },
              {
                metric: "How long they stayed",
                detail:
                  "Long dwell time = Google ranks you higher. Short time = needs work",
              },
              {
                metric: "Which search terms brought them",
                detail:
                  "The exact words they typed into Google before clicking on icvacation.com",
              },
              {
                metric: "Which pages they visited before contacting",
                detail:
                  "Shows the conversion path — what content turns browsers into callers",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="border border-[#252426] bg-[#0a0a0a] p-4"
              >
                <p className="text-[#FFE500] font-semibold text-sm mb-1">
                  {item.metric}
                </p>
                <p className="text-xs text-[#8a8a86]">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </Slide>

      {/* ── SLIDE 13: SEO ROADMAP ────────────── */}
      <Slide id="seo-roadmap" accentColor="#FFE500">
        <SlideHeading
          eyebrow="What's next"
          heading={
            <>
              The SEO{" "}
              <span className="text-[#FFE500]">roadmap.</span>
            </>
          }
          eyebrowColor="#FFE500"
        />
        <p className="text-[#8a8a86] leading-relaxed mb-10 max-w-2xl">
          The foundation is in place. These are the next phases — ordered
          by impact. Each one builds on what&apos;s already working.
        </p>
        <div className="border border-[#1a1a1a]">
          {[
            {
              title: "Build backlinks from travel authority sites",
              body: "Get IC Vacation mentioned and linked from cruise review sites, travel forums, and Signature Travel Network member pages. Google trusts sites that other trusted sites link to.",
            },
            {
              title: "Expand blog: destination-specific deep dives",
              body: "New articles for Japan river cruising, Egypt Nile cruises, and Douro Valley wine voyages — high-intent searches with relatively low competition right now.",
            },
            {
              title: "Google My Business profile",
              body: "When someone Googles 'travel advisor near Orlando' or 'cruise consultant Florida', a Google Business profile shows Isaac's info in the sidebar. Free to set up, high local impact.",
            },
            {
              title: "Video content: Isaac on camera",
              body: "Short clips of Isaac discussing specific routes get embedded on the site. Google counts video dwell time toward rankings — and YouTube is the second-largest search engine.",
            },
            {
              title: "Structured FAQ pages",
              body: "Dedicated pages answering the most common cruise questions. These often appear as 'featured snippets' — the big answer box at the top of Google results, before any other links.",
            },
            {
              title: "Search Console optimization loop",
              body: "Once we have 60–90 days of impression data from Search Console, we identify which pages are ranking on page 2 and give them one small targeted update to push them to page 1. This is where the compound growth starts.",
            },
          ].map((item, i) => (
            <RoadmapItem key={i} title={item.title} body={item.body} index={i} />
          ))}
        </div>
      </Slide>

      {/* ── SLIDE 14: CLOSING ────────────────── */}
      <Slide id="closing" className="min-h-[70vh] flex flex-col justify-center">
        <div className="max-w-3xl">
          <p className="font-mono text-xs text-[#444444] uppercase tracking-[0.25em] mb-8">
            IC Vacation — built to be found, trusted, and remembered
          </p>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-12">
            <span className="text-[#26FC00]">Found.</span>
            <br />
            <span className="text-[#FFE500]">Trusted.</span>
            <br />
            <span className="text-[#f7f7f5]">Remembered.</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            <div className="border border-[#252426] bg-[#0e0e0e] p-5">
              <p className="font-mono text-xs text-[#8a8a86] uppercase tracking-wider mb-3">
                Reach Isaac directly
              </p>
              <p className="text-[#26FC00] font-bold text-lg mb-1">
                (407) 810-1670
              </p>
              <p className="text-[#8a8a86] text-sm">isaac@icvacation.com</p>
            </div>
            <div className="border border-[#26FC00]/30 bg-[#26FC00]/05 p-5 flex items-center">
              <div>
                <p className="font-mono text-xs text-[#26FC00] uppercase tracking-wider mb-2">
                  Ready to talk?
                </p>
                <p className="text-[#f7f7f5] font-semibold">
                  Book a consultation call with Isaac.
                </p>
                <p className="text-[#8a8a86] text-sm mt-1">
                  No forms. No bots. Just a real conversation.
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs text-[#333537] font-mono">
            <div className="h-px w-8 bg-[#252426]" />
            <span>icvacation.com</span>
            <div className="h-px flex-1 bg-[#1a1a1a]" />
          </div>
        </div>
      </Slide>

    </main>
  );
}
