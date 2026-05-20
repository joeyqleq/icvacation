# IC Vacation — Technical Reference

> Technical implementation details for continuing development.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui |
| Icons | Lucide React |
| Animations | Motion (framer-motion successor) |
| Email | Resend |
| Analytics | Tianji + Matomo |
| Fonts | Google Fonts (next/font) |

---

## Key Files Reference

### Root Configuration

| File | Purpose |
|------|---------|
| `app/layout.tsx` | Root layout with providers, fonts, analytics |
| `app/globals.css` | Tailwind config, CSS variables, custom utilities |
| `components.json` | shadcn/ui configuration |
| `next.config.mjs` | Next.js configuration |
| `tsconfig.json` | TypeScript configuration |

### Global Styles (app/globals.css)

The globals.css file contains:
- Tailwind v4 `@theme inline` block with CSS variables
- Font family definitions
- Custom utility classes (`.btn-primary`, `.btn-glass`, `.glass-card`, etc.)
- Animation keyframes
- Custom scrollbar styling

### Layout Structure (app/layout.tsx)

```tsx
<html>
  <body>
    <ThemeProvider>
      <ContactProvider>
        {children}
        <ContactModal />
        <Toaster />
      </ContactProvider>
    </ThemeProvider>
    <SiteAnalytics />
  </body>
</html>
```

---

## Contact Modal System

### Architecture

1. `ContactProvider` — React context that exposes `openContact()` and `closeContact()`
2. `ContactModal` — The actual modal component with form
3. `useContact()` — Hook to access modal controls from any component

### Usage

```tsx
import { useContact } from "@/components/site/contact-provider";

function MyComponent() {
  const { openContact } = useContact();
  
  return (
    <button onClick={openContact}>
      Contact Us
    </button>
  );
}
```

### Form Fields

The contact modal collects:
- Name (required)
- Email (required)
- Phone
- Travel dates (from/to)
- Budget range (select)
- Travel style (select)
- Destinations of interest
- Message

### API Route

`app/api/contact/route.ts` handles form submission:
- Validates required fields
- Sends email via Resend
- From: `contact-form@icvacation.com`
- To: `eojiraam@gmail.com`
- Returns JSON response

---

## Component Patterns

### Page Components

All content pages follow this structure:

```tsx
import { PageShell } from "@/components/site/page-shell";
import { PageHero } from "@/components/site/page-hero";
import { PageCta } from "@/components/site/page-cta";

export default function SomePage() {
  return (
    <PageShell>
      <PageHero {...heroProps} />
      
      {/* Page-specific sections */}
      
      <PageCta />
    </PageShell>
  );
}
```

### Landing Page Components

The homepage uses dedicated section components:

```tsx
import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { ConsultantSection } from "@/components/landing/features-section";
// etc.
```

### Client vs Server Components

- Pages are Server Components by default
- Interactive components use `"use client"` directive
- Contact triggers require client components for `useContact()`

---

## Mascot Component API

```tsx
interface MascotProps {
  type: "owl" | "penguin" | "bird" | "dandelion";
  variant?: "neon" | "glow" | "ghost" | "outline";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}
```

The component applies CSS filters based on variant:
- `neon`: `drop-shadow(0 0 12px #26FC00) brightness(1.1)`
- `glow`: `drop-shadow(0 0 8px #26FC00)`
- `ghost`: `opacity-40 grayscale`
- `outline`: SVG stroke modification (needs implementation)

---

## Background Boxes Component

```tsx
interface BackgroundBoxesProps {
  variant?: "green" | "yellow" | "grey";
  className?: string;
}
```

Renders an animated grid that highlights cells on mouse proximity.

---

## Blog Data

`lib/blog-data.ts` contains a static array of blog posts:

```tsx
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  featured?: boolean;
  content: string; // Markdown or HTML
}

export const posts: BlogPost[] = [...];
```

For dynamic content, this would be replaced with a CMS or database fetch.

---

## Environment Variables

Required in production:

```env
RESEND_API_KEY=re_...
```

Optional/configured:
```env
XAI_API_KEY=...
UPSTASH_SEARCH_REST_URL=...
UPSTASH_SEARCH_REST_TOKEN=...
UPSTASH_SEARCH_REST_READONLY_TOKEN=...
```

---

## Analytics Implementation

### Tianji

```tsx
<Script
  src="https://tianji.myhayat.app/tracker.js"
  data-website-id="cmp55csod00dj8lxcvvwj78rs"
  strategy="afterInteractive"
/>
```

### Matomo

```tsx
<Script id="matomo" strategy="afterInteractive">
  {`
    var _paq = window._paq = window._paq || [];
    _paq.push(["setDocumentTitle", document.domain + "/" + document.title]);
    _paq.push(["setCookieDomain", "*.icvacation.com"]);
    _paq.push(["setDomains", ["*.icvacation.com","*.staging.icvacation.com","*.www.icvacation.com"]]);
    _paq.push(["enableCrossDomainLinking"]);
    _paq.push(['trackPageView']);
    _paq.push(['enableLinkTracking']);
    (function() {
      var u="//matomo.myhayat.app/";
      _paq.push(['setTrackerUrl', u+'matomo.php']);
      _paq.push(['setSiteId', '10']);
      var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
      g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
    })();
  `}
</Script>
```

---

## Animation Classes

Custom keyframes defined in globals.css:

| Class | Animation |
|-------|-----------|
| `animate-drift` | Slow floating up/down (6s) |
| `animate-drift-slow` | Slower floating (10s) |
| `animate-spin-slow` | Slow rotation (12s) |
| `animate-ken-burns` | Subtle zoom/pan (30s) |
| `animate-pulse-green` | Green glow pulse |
| `animate-pixel-cascade` | Tile-by-tile reveal |

---

## Tailwind Custom Utilities

```css
/* Buttons */
.btn-primary { /* Green filled button */ }
.btn-secondary { /* Outlined button */ }
.btn-glass { /* Glassmorphic button */ }

/* Cards */
.glass-card { /* Glassmorphic card */ }

/* Typography */
.drop-cap { /* Large first letter */ }
.text-gradient-green { /* Green gradient text */ }
.label-ticker { /* Monospace section label */ }

/* Effects */
.hover-lift { /* Subtle lift on hover */ }
.glow-green { /* Green box shadow glow */ }
```

---

## Common Patterns

### Section Headers

```tsx
<div className="mb-16">
  <span className="label-ticker mb-4">[ 01 ] // Section Name</span>
  <h2 className="text-4xl lg:text-6xl font-display tracking-tight">
    Headline Here
  </h2>
</div>
```

### CTA Blocks

```tsx
<div className="flex flex-col sm:flex-row items-stretch gap-3">
  <PixelButton variant="green" onClick={openContact}>
    Primary Action
  </PixelButton>
  <button className="btn-glass">
    Secondary Action
  </button>
</div>
```

### Responsive Grids

```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => <Card key={item.id} />)}
</div>
```

---

## Development Commands

```bash
# Install dependencies
pnpm install

# Run dev server
pnpm dev

# Build for production
pnpm build

# Type check
pnpm type-check

# Lint
pnpm lint
```

---

## Debugging Tips

1. Check `user_read_only_context/v0_debug_logs.log` for runtime errors
2. Use `console.log("[v0] ...")` for debugging (remove before commit)
3. Verify `useContact()` is only called inside `ContactProvider`
4. Check that all pages import from correct paths (`@/components/...`)
5. Ensure client components have `"use client"` directive

---

## Known Type Issues

- `motion` package types may need `@types/framer-motion` in some setups
- Blog post content is typed as `string` but rendered as HTML
- Some shadcn components may need variant type updates

---

## Deployment

The project is connected to Vercel via GitHub:
- Org: `joeyqleq`
- Repo: `icvacation`
- Branch: `v0/joeyq-7e7830be`

Environment variables must be set in Vercel dashboard for production.
