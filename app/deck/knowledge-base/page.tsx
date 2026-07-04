"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, ChevronDown, ArrowLeft, BookOpen, Database, ExternalLink } from "lucide-react";

interface TreeNode {
  label: string;
  count?: number;
  tag?: string;
  children?: TreeNode[];
  source?: string;
  color?: string;
}

const KB_TREE: TreeNode[] = [
  {
    label: "Visa & Entry Intelligence",
    tag: "visa_entry",
    color: "#26FC00",
    count: 48,
    children: [
      {
        label: "Government & Consulate Sources",
        source: "travel.state.gov, embassy portals, IATA Travel Centre, TIMATIC",
        children: [
          { label: "US passport visa requirements by country (195 entries)" },
          { label: "TSA PreCheck & Global Entry enrollment process" },
          { label: "ESTA application process for visa-waiver nations" },
          { label: "Biometric passport rules by nationality" },
          { label: "Entry restrictions and health declaration requirements" },
          { label: "Dual-nationality passport usage rules" },
          { label: "Visa-on-arrival eligibility by destination" },
          { label: "Transit visa requirements at major hubs (CDG, DXB, SIN, JFK, LHR)" },
        ],
      },
      {
        label: "Health & Vaccination Requirements",
        source: "CDC, NHS, WHO travel advisories",
        children: [
          { label: "Vaccination certificate requirements by country (Yellow Fever, COVID)" },
          { label: "Required vs. recommended vaccinations by region" },
          { label: "Medical declaration requirements at borders" },
          { label: "Traveler's health insurance requirements by destination" },
        ],
      },
      {
        label: "Entry Procedures & Documentation",
        source: "Embassy portals, IATA",
        children: [
          { label: "Consulate appointment booking guides (50+ countries)" },
          { label: "Emergency travel document procedures" },
          { label: "Border crossing hours and land-entry rules" },
          { label: "Arrival card and immigration form guides by country" },
          { label: "Customs declaration limits by destination" },
        ],
      },
    ],
  },
  {
    label: "Aviation & Flight Data",
    tag: "aviation",
    color: "#4fc3f7",
    count: 62,
    children: [
      {
        label: "Airline Alliances & Programs",
        source: "Star Alliance, Oneworld, SkyTeam, airline sites",
        children: [
          { label: "Alliance lounge access by status tier" },
          { label: "Frequent flyer redemption sweet spots (20+ airlines)" },
          { label: "Upgrade bidding strategies by airline" },
          { label: "Codeshare and interline partner rules" },
          { label: "Mileage expiry rules by program" },
        ],
      },
      {
        label: "Airport Operations",
        source: "Airport authority pages, aviation forums",
        children: [
          { label: "Minimum connection times at 40+ major hubs" },
          { label: "Airport terminal maps and inter-terminal transit times" },
          { label: "Lounge access rules for non-status holders" },
          { label: "Priority lane access by card type (Amex Centurion, Priority Pass)" },
        ],
      },
      {
        label: "Aircraft & Cabin Intelligence",
        source: "SeatGuru, airline sites, aviation blogs",
        children: [
          { label: "Seat map guides by aircraft type (777, A380, A350, 787, A220)" },
          { label: "Business class product comparisons by route" },
          { label: "First class product deep-dives (Emirates, Etihad, Singapore Airlines)" },
          { label: "Premium cabin meal service guides" },
          { label: "Aircraft livery and cabin refresh timelines" },
          { label: "Long-haul vs. ultra-long-haul route options" },
          { label: "Baggage policy by airline and fare class" },
        ],
      },
    ],
  },
  {
    label: "Cruise & Maritime Knowledge",
    tag: "cruise_maritime",
    color: "#FFE500",
    count: 88,
    children: [
      {
        label: "River Cruising",
        source: "AmaWaterways, Viking, Scenic, Avalon public sites",
        children: [
          { label: "River cruise lines compared: AmaWaterways, Viking, Scenic, Avalon, Emerald" },
          { label: "River water-level impact on itineraries (Rhine, Danube, Mekong)" },
          { label: "European river cruise season calendar (April–November)" },
          { label: "Mekong & Asia river cruise operators and itineraries" },
          { label: "Amazon and South America river expedition options" },
        ],
      },
      {
        label: "Ocean & Luxury Cruising",
        source: "Silversea, Regent, Seabourn, Ponant public sites",
        children: [
          { label: "Luxury lines: Silversea, Regent Seven Seas, Seabourn, Crystal, Explora" },
          { label: "Premium lines: Celebrity, Holland America, Princess, Oceania" },
          { label: "Ultra-luxury all-inclusive comparison" },
          { label: "Solo traveller supplements and deals" },
          { label: "Group booking and affinity cruise programs" },
          { label: "Ship dry-dock schedules and refurbishment timelines" },
          { label: "Gratuity policies by cruise line" },
        ],
      },
      {
        label: "Expedition Cruising",
        source: "Lindblad, Hurtigruten, Aurora, Ponant sites",
        children: [
          { label: "Expedition operators: Lindblad, Hurtigruten, Aurora, HX, Ponant" },
          { label: "Antarctica expedition season and permit requirements" },
          { label: "Arctic and Svalbard expedition itineraries" },
          { label: "Galapagos liveaboard vs. expedition cruise options" },
          { label: "Zodiac landing protocols and shore excursion safety" },
        ],
      },
      {
        label: "Ship Operations",
        source: "Maritime safety, port authority pages, cruise forums",
        children: [
          { label: "Cabin category glossary: suite, balcony, French balcony, inside" },
          { label: "Muster drill protocols and safety procedures" },
          { label: "Shore excursion selection strategy by port" },
          { label: "Port embarkation and disembarkation guides (50+ ports)" },
          { label: "Sea sickness prevention and management" },
        ],
      },
    ],
  },
  {
    label: "Hotel & Accommodation Intelligence",
    tag: "hotel_accommodation",
    color: "#d4b800",
    count: 74,
    children: [
      {
        label: "Ultra-Luxury Brands",
        source: "AMAN, Six Senses, Rosewood, Belmond, Auberge brand sites",
        children: [
          { label: "AMAN resorts: philosophy, portfolio, signature experiences" },
          { label: "Six Senses: wellness focus, sustainability ethos, key properties" },
          { label: "Rosewood: sense of place philosophy, top properties" },
          { label: "Belmond: train journeys + hotels combined experiences" },
          { label: "Auberge: intimate luxury, US and international portfolio" },
          { label: "Mandarin Oriental: flagship properties, spa program" },
          { label: "Four Seasons: service standards, portfolio overview" },
        ],
      },
      {
        label: "Boutique & Independent Hotels",
        source: "SLH, Design Hotels, Relais & Châteaux directories",
        children: [
          { label: "Small Luxury Hotels of the World (SLH): 520+ properties" },
          { label: "Design Hotels: architecture-forward independent collection" },
          { label: "Relais & Châteaux: gastronomy + hospitality standard" },
          { label: "Leading Hotels of the World: classic grand hotels" },
        ],
      },
      {
        label: "Loyalty Programs & Rates",
        source: "Marriott, Hyatt, IHG, Hilton loyalty program sites",
        children: [
          { label: "Marriott Bonvoy: point redemption sweet spots, elite benefits" },
          { label: "World of Hyatt: category chart, transfer partners, Globalist perks" },
          { label: "IHG One Rewards: redemption tiers, InterContinental perks" },
          { label: "Preferred partner rates through travel advisor networks" },
        ],
      },
      {
        label: "Room Types & Booking Intelligence",
        source: "Hotel brand sites, luxury travel blogs, Condé Nast",
        children: [
          { label: "Room category glossary: garden view, ocean-facing, villa, overwater" },
          { label: "Butler service etiquette and how to request upgrades" },
          { label: "Early check-in and late checkout strategies" },
          { label: "All-inclusive vs. room-only comparison by destination" },
          { label: "Overwater villa destinations compared (Maldives, French Poly, Bora Bora)" },
          { label: "Seasonal pricing calendars for 40+ luxury resorts" },
          { label: "Amenity packages: honeymoon, anniversary, special occasions" },
        ],
      },
    ],
  },
  {
    label: "Destination & Cultural Deep Dives",
    tag: "destination_cultural",
    color: "#9ef088",
    count: 156,
    children: [
      {
        label: "Cultural Etiquette by Region",
        source: "Kwintessential, cultural embassy sites, UNESCO, Lonely Planet",
        children: [
          { label: "Japan: shoes-off etiquette, queueing culture, cash norms, onsen rules" },
          { label: "UAE / Dubai: dress codes, alcohol rules, Ramadan protocols" },
          { label: "Thailand: temple etiquette, monarchy respect, left-hand rules" },
          { label: "Southeast Asia broadly: bargaining, feet-pointing, head-touching" },
          { label: "India: religious site protocols, clothing, photography rules" },
          { label: "Morocco: medina navigation, bargaining culture, dress codes" },
          { label: "France / Europe: greeting customs, tipping, dining pace" },
          { label: "Latin America: personal space, punctuality norms, language tips" },
          { label: "Sub-Saharan Africa: photography protocols, wildlife reserve rules" },
          { label: "Religious site dress codes: 60+ temples, mosques, cathedrals globally" },
          { label: "LGBTQ+ travel safety index by destination (80+ countries)" },
        ],
      },
      {
        label: "Destination Deep Dives",
        source: "Travel blogs, Reddit r/travel, Fodor's, Lonely Planet, destination tourism boards",
        children: [
          { label: "Best-season calendars for 65+ destinations" },
          { label: "Crowd-avoidance strategies at 40+ UNESCO sites" },
          { label: "Local transportation guides: rail passes, tuk-tuks, ferries, water taxis" },
          { label: "Street food safety by destination (35+ countries)" },
          { label: "Currency and payment norms: cash vs card by country" },
          { label: "Language essentials: key phrases for 30+ destinations" },
          { label: "Altitude sickness guidance: Cusco, Machu Picchu, Kilimanjaro, Tibet" },
          { label: "Photography rules at sacred and military sites (40+ locations)" },
          { label: "Tipping customs by region and service type" },
        ],
      },
    ],
  },
  {
    label: "Dining, Experiences & Wellness",
    tag: "dining_wellness",
    color: "#f7a8a8",
    count: 52,
    children: [
      {
        label: "Fine Dining & Gastronomy",
        source: "Michelin guide summaries, sommelier blogs, James Beard Foundation",
        children: [
          { label: "Michelin-starred restaurant reservation strategies" },
          { label: "Wine region guides: Burgundy, Douro Valley, Tuscany, Rioja, Napa, Willamette" },
          { label: "Cooking class destinations: Tuscany, Oaxaca, Tokyo, Marrakech, Lyon" },
          { label: "Truffle hunting season calendars by region" },
          { label: "Sake and whisky distillery tours by country" },
        ],
      },
      {
        label: "Experiences & Adventures",
        source: "Activity platforms, tourism boards, adventure travel sites",
        children: [
          { label: "Diving certification requirements by site (PADI, SSI) — 25+ locations" },
          { label: "Hot air balloon experiences: Cappadocia, Serengeti, Napa, Luxor" },
          { label: "Private safari guide selection criteria (East Africa, Southern Africa)" },
          { label: "Glacier and fjord expedition guides" },
          { label: "Northern Lights viewing: best locations and seasons" },
          { label: "Wildlife watching calendars: Galápagos, Antarctic, East Africa" },
        ],
      },
      {
        label: "Wellness & Spa",
        source: "Wellness resort directories, ayurveda institutes, spa associations",
        children: [
          { label: "Spa treatment menus by property type (Ayurveda, Balinese, hammam, hot spring)" },
          { label: "Dedicated wellness retreat destinations: Bali, Kerala, Tuscany, Sedona" },
          { label: "Thermal bath guides: Budapest, Iceland, Japan onsen, Baden-Baden" },
          { label: "Meditation and yoga retreat formats: silent, guided, integration" },
          { label: "Digital detox travel: lodges and retreats with no-phone policies" },
        ],
      },
    ],
  },
  {
    label: "Travel Consultant Acumen",
    tag: "consultant_acumen",
    color: "#c084fc",
    count: 34,
    children: [
      {
        label: "Consultative Sales & Client Management",
        source: "Signature Travel Network, ASTA, luxury travel advisor training",
        children: [
          { label: "Consultative selling frameworks for luxury travel advisors" },
          { label: "Client qualification: budget discovery, timeline, travel style profiling" },
          { label: "Objection handling: price sensitivity, first-time cruisers, nervous travelers" },
          { label: "Trust-building language patterns in consultative conversations" },
          { label: "Lead scoring: warm, hot, 'not yet but track' classification" },
          { label: "Handling group travel dynamics and decision-making hierarchies" },
        ],
      },
      {
        label: "Luxury Hospitality Standards",
        source: "Four Seasons, AMAN, Ritz-Carlton service training materials (public)",
        children: [
          { label: "Luxury hospitality service standards: AMAN, Four Seasons, Ritz-Carlton" },
          { label: "The art of the evocative destination pitch — verbal and written" },
          { label: "Cultural intelligence for advisors: managing client expectations globally" },
          { label: "Post-trip follow-up sequences and referral generation" },
          { label: "CRM best practices for boutique travel advisory practices" },
          { label: "Phone and email etiquette for high-net-worth clients" },
        ],
      },
    ],
  },
  {
    label: "Health, Safety & Emergency Travel",
    tag: "health_safety",
    color: "#fb923c",
    count: 28,
    children: [
      {
        label: "Travel Health",
        source: "CDC travel health, NHS travel vaccinations, WHO",
        children: [
          { label: "Traveler's diarrhea: prevention, treatment, safe food and water by region" },
          { label: "Altitude sickness: symptoms, treatment, medications (Diamox)" },
          { label: "Mosquito-borne disease prevention by destination" },
          { label: "Travel vaccination schedule and timing requirements" },
          { label: "Travel health insurance: what to look for, exclusions, EHIC vs private" },
        ],
      },
      {
        label: "Emergency Procedures",
        source: "State Dept, FCDO, emergency travel guides",
        children: [
          { label: "Lost passport abroad: embassy contacts, emergency travel documents" },
          { label: "Medical emergency abroad: what to do, who to call, air evacuation" },
          { label: "Travel insurance claims process" },
          { label: "Natural disaster protocols: earthquake, hurricane, tsunami response" },
          { label: "Safe destinations by political stability index" },
        ],
      },
    ],
  },
];

function TreeItem({ node, depth = 0 }: { node: TreeNode; depth?: number }) {
  const [open, setOpen] = useState(depth < 1);
  const hasChildren = node.children && node.children.length > 0;
  const isLeaf = !hasChildren;

  if (isLeaf) {
    return (
      <div
        className="flex items-start gap-2 py-1 pl-4 group"
        style={{ paddingLeft: `${depth * 20 + 8}px` }}
      >
        <span className="text-[#444] mt-0.5 flex-shrink-0">─</span>
        <span className="text-[#c4c4c0] text-sm font-mono leading-snug">{node.label}</span>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 w-full text-left py-1.5 hover:opacity-80 transition-opacity"
        style={{ paddingLeft: `${depth * 20}px` }}
      >
        <span className="flex-shrink-0 text-[#555]">
          {open ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
        </span>
        <span
          className="font-mono text-sm font-semibold"
          style={{ color: depth === 0 ? (node.color ?? "#f7f7f5") : "#f7f7f5" }}
        >
          {node.label}
        </span>
        {node.count !== undefined && depth === 0 && (
          <span
            className="ml-2 font-mono text-[10px] px-2 py-0.5 border"
            style={{ color: node.color, borderColor: node.color + "40", backgroundColor: node.color + "10" }}
          >
            ~{node.count} docs
          </span>
        )}
        {node.source && depth === 1 && (
          <span className="ml-2 font-mono text-[10px] text-[#555] truncate hidden md:block">{node.source}</span>
        )}
      </button>

      {open && node.children && (
        <div className={`border-l border-[#1e1e1e] ml-${depth === 0 ? "4" : "2"}`} style={{ marginLeft: `${depth * 20 + 10}px` }}>
          {node.children.map((child, i) => (
            <TreeItem key={i} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function KnowledgeBasePage() {
  const [search, setSearch] = useState("");
  const [expandAll, setExpandAll] = useState(false);

  const totalDocs = KB_TREE.reduce((sum, v) => sum + (v.count ?? 0), 0);

  const filtered = search.trim()
    ? KB_TREE.map((vertical) => ({
        ...vertical,
        children: vertical.children?.map((cat) => ({
          ...cat,
          children: cat.children?.filter((item) =>
            item.label.toLowerCase().includes(search.toLowerCase())
          ),
        })).filter((cat) => (cat.children?.length ?? 0) > 0),
      })).filter((v) => (v.children?.length ?? 0) > 0)
    : KB_TREE;

  return (
    <div className="min-h-screen bg-[#050505] text-[#f7f7f5] px-4 md:px-8 py-12 max-w-5xl mx-auto">
      {/* Back link */}
      <Link
        href="/deck"
        className="inline-flex items-center gap-2 font-mono text-xs text-[#555] hover:text-[#26FC00] transition-colors mb-8 uppercase tracking-wider"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to presentation
      </Link>

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <img src="/liam-ai_logo.png" alt="Liam AI" className="w-10 h-10 object-contain" />
          <p className="font-mono text-xs text-[#555] uppercase tracking-[0.2em]">Liam AI · Knowledge Base</p>
        </div>
        <h1 className="font-sans font-black text-4xl md:text-5xl mb-4">
          What Liam AI<br />
          <span className="text-[#26FC00]">has read.</span>
        </h1>
        <p className="text-[#8a8a86] text-base max-w-2xl">
          Every item in Liam AI&apos;s knowledge base — organized by vertical, sub-category, and source.
          This is the full contents of the seven filing cabinets.
        </p>
      </div>

      {/* Stats bar */}
      <div className="flex flex-wrap gap-6 mb-8 py-4 border-y border-[#1e1e1e]">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-[#26FC00]" />
          <span className="font-mono text-sm"><span className="text-[#26FC00] font-bold">~{totalDocs}</span> indexed documents</span>
        </div>
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#4fc3f7]" />
          <span className="font-mono text-sm"><span className="text-[#4fc3f7] font-bold">{KB_TREE.length}</span> knowledge verticals</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#26FC00] animate-pulse" />
          <span className="font-mono text-sm text-[#555]">Azure AI Search · liam-travel-kb index</span>
        </div>
      </div>

      {/* Search + expand controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="text"
          placeholder="Search knowledge base..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-[#0e0e0e] border border-[#252526] px-4 py-2.5 font-mono text-sm text-[#f7f7f5] placeholder-[#444] focus:outline-none focus:border-[#26FC00]/50"
        />
        <button
          onClick={() => setExpandAll(!expandAll)}
          className="font-mono text-xs uppercase tracking-wider px-4 py-2.5 border border-[#252526] text-[#555] hover:text-[#f7f7f5] hover:border-[#444] transition-colors"
        >
          {expandAll ? "Collapse all" : "Expand all"}
        </button>
      </div>

      {/* Tree */}
      <div className="space-y-2">
        {filtered.map((vertical, i) => (
          <div key={i} className="border border-[#1a1a1a] bg-[#080808] p-4">
            <TreeItem node={vertical} depth={0} key={`${expandAll}-${i}`} />
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-[#555] font-mono text-sm py-12">No results for &ldquo;{search}&rdquo;</p>
        )}
      </div>

      {/* Footer note */}
      <div className="mt-10 border border-[#1a1a1a] bg-[#080808] p-4">
        <p className="font-mono text-xs text-[#555]">
          Document counts are approximate. The knowledge base is continuously updated as new sources are scraped and indexed.
          All content originates from publicly available sources across the seven travel verticals.
          Liam AI retrieves the 6 most relevant documents per query via semantic vector search.
        </p>
      </div>
    </div>
  );
}
