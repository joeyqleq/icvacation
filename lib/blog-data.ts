export interface Post {
  slug: string;
  title: string;
  dek: string;          // short editorial subhead
  category: string;
  read: string;         // "8 min read"
  date: string;         // "April 2026"
  image: string;
  author: string;
  feature?: boolean;
}

/**
 * Hand-curated editorial roll. 16 entries, used by /blog and /blog/[slug].
 */
export const posts: Post[] = [
  {
    slug: "why-we-still-call-it-an-advisor",
    title: "Why we still call it an advisor, not an agent",
    dek: "A short note on language, and why the word you choose for the job shapes the work itself.",
    category: "Field notes",
    read: "6 min read",
    date: "May 2026",
    image: "/advisor-desk.jpg",
    author: "Isaac",
    feature: true,
  },
  {
    slug: "the-dolomites-in-late-may",
    title: "The Dolomites in late May",
    dek: "When the lifts have stopped and the wildflowers haven't quite started — the quietest two weeks of the alpine year.",
    category: "Destinations",
    read: "8 min read",
    date: "April 2026",
    image: "/destination-alps.jpg",
    author: "Isaac",
  },
  {
    slug: "cabin-class-isnt-a-personality",
    title: "Cabin class isn't a personality",
    dek: "Choosing a long-haul flight by who you are, not by what's on the upgrade menu.",
    category: "Flights",
    read: "5 min read",
    date: "April 2026",
    image: "/footer-horizon.jpg",
    author: "Isaac",
  },
  {
    slug: "kyoto-without-the-list",
    title: "Kyoto, without the list",
    dek: "A week in Kyoto for people who don't want to tick anything. Walks, baths, three quiet meals.",
    category: "Destinations",
    read: "9 min read",
    date: "March 2026",
    image: "/destination-japan.jpg",
    author: "Isaac",
  },
  {
    slug: "the-quiet-case-for-river-cruises",
    title: "The quiet case for river cruises",
    dek: "Once you're past the marketing, river cruising is the most generous slow-travel format we know.",
    category: "Cruises",
    read: "7 min read",
    date: "March 2026",
    image: "/destination-coast.jpg",
    author: "Isaac",
  },
  {
    slug: "what-mexico-isnt",
    title: "What Mexico isn't",
    dek: "A long-form correction to the all-inclusive caricature, and four corners of the country to actually visit.",
    category: "Destinations",
    read: "11 min read",
    date: "February 2026",
    image: "/destination-coast.jpg",
    author: "Isaac",
  },
  {
    slug: "an-advisors-packing-list",
    title: "An advisor's packing list",
    dek: "The eleven things we travel with, after twenty years on the road.",
    category: "Field notes",
    read: "6 min read",
    date: "February 2026",
    image: "/cta-vista.jpg",
    author: "Isaac",
  },
  {
    slug: "the-migration-isnt-a-month",
    title: "The migration isn't a month",
    dek: "Why the great migration is a year-round system, and how to read it before you book.",
    category: "Safari",
    read: "10 min read",
    date: "January 2026",
    image: "/destination-safari.jpg",
    author: "Isaac",
  },
  {
    slug: "honeymoons-that-arent-pre-packaged",
    title: "Honeymoons that aren't pre-packaged",
    dek: "Six honeymoon templates we genuinely use, and the small details that make them not feel templated.",
    category: "Romance",
    read: "8 min read",
    date: "January 2026",
    image: "/destination-alps.jpg",
    author: "Isaac",
  },
  {
    slug: "the-virtue-of-an-empty-day",
    title: "The virtue of an empty day",
    dek: "Why we leave one un-planned day per week in every itinerary, on purpose.",
    category: "Field notes",
    read: "4 min read",
    date: "December 2025",
    image: "/hero-landscape.jpg",
    author: "Isaac",
  },
  {
    slug: "expedition-cruising-honest",
    title: "Expedition cruising, honestly",
    dek: "Antarctica, the Galápagos, the high Arctic. What's worth the cost, and what isn't.",
    category: "Cruises",
    read: "9 min read",
    date: "December 2025",
    image: "/destination-coast.jpg",
    author: "Isaac",
  },
  {
    slug: "shoulder-weeks-we-actually-book",
    title: "Shoulder weeks we actually book",
    dek: "Eight stretches of the year that are quietly better than the postcard months.",
    category: "Field notes",
    read: "7 min read",
    date: "November 2025",
    image: "/destination-japan.jpg",
    author: "Isaac",
  },
  {
    slug: "what-luxury-quietly-means",
    title: "What luxury quietly means, in 2026",
    dek: "Less marble, more time. A short essay on the shift inside the category.",
    category: "Essays",
    read: "6 min read",
    date: "November 2025",
    image: "/cta-vista.jpg",
    author: "Isaac",
  },
  {
    slug: "the-private-villa-question",
    title: "The private villa question",
    dek: "When a villa is the right answer, and when the resort suite is the better one.",
    category: "Hotels",
    read: "8 min read",
    date: "October 2025",
    image: "/destination-coast.jpg",
    author: "Isaac",
  },
  {
    slug: "family-travel-after-eleven",
    title: "Family travel, after eleven",
    dek: "The trips that work once the kids stop wanting the kids' club, and before they stop wanting to come at all.",
    category: "Family",
    read: "7 min read",
    date: "October 2025",
    image: "/destination-safari.jpg",
    author: "Isaac",
  },
  {
    slug: "on-staying-reachable",
    title: "On staying reachable",
    dek: "A short note on the part of the job nobody talks about — being on the phone when it matters.",
    category: "Field notes",
    read: "5 min read",
    date: "September 2025",
    image: "/advisor-desk.jpg",
    author: "Isaac",
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getRelated(slug: string, n = 3): Post[] {
  const me = getPost(slug);
  if (!me) return posts.slice(0, n);
  return posts.filter((p) => p.slug !== slug && p.category === me.category).slice(0, n).concat(
    posts.filter((p) => p.slug !== slug && p.category !== me.category).slice(0, Math.max(0, n))
  ).slice(0, n);
}
