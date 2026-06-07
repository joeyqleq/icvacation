# Antigravity Handoff: IC Vacation Website

Workspace: `C:\Users\ADMIN\Desktop\icvacation`

This is a v0-exported Next.js site for the IC Vacation travel agency redesign. Treat this repo as the active website build, not just an intelligence package. The owner wants a polished boutique travel consultancy site that consolidates the old IC Vacation WordPress/cruise/flight/hotel presence into one modern website.

## Read First

Read these files before changing code:

1. `AGENTS.md`
2. `docs/starting_docs/MASTER_CODEX_PROMPT.md`
3. `docs/starting_docs/icvacations_website_outline.md`
4. `docs/ANTIGRAVITY_INITIAL_PROMPT.md`
5. Current app files under `app/`, `components/landing/`, and `components/site/`

If a doc conflicts with the current app implementation, preserve the current app direction unless the owner explicitly asks otherwise.

## Current Design Direction

- Brand: IC Vacation, boutique/custom travel consultancy, high-touch planning, quiet luxury, personal advisor energy.
- Visual language: dark premium base, neon brand green/yellow accents, sharp editorial layout inherited from the v0 Template A direction.
- Dandelion SVG is the primary mark. The full IC Vacation wordmark is the main logo. Mascot SVGs should be sprinkled lightly, not overused.
- Tone: professional, warm, specific, travel-consultant led. Avoid generic agency filler where a concrete travel-planning detail works better.
- AI travel consultant feature is a frontend preview/teaser only for now. Do not claim live booking, live fares, or real connected inventory until backend integrations are added.

## Important Assets

Public assets already staged:

- Hero video: `public/video/hero-bg-desktop.mp4`
- Hero posters:
  - `public/video/hero-bg-poster.png`
  - `public/video/hero-bg-mobile-poster.png`
- AI image set:
  - `public/images/ai/isaac-office-advisor.png`
  - `public/images/ai/isaac-flight-transfer.png`
  - `public/images/ai/isaac-cruise-helm.png`
  - `public/images/ai/isaac-hotel-bellboy.png`
  - `public/images/ai/isaac-beach-advisor.png`
  - `public/images/ai/annette-car-specialist.png`

Source copies live in `docs/ai_images/` and `docs/video/`.

The About Isaac hero was showing a stale placeholder in the browser. The correct Isaac office file exists, so current code now uses the fresh URL `/images/ai/isaac-office-advisor.png` to avoid cached placeholder behavior.

## Work Completed In Current Pass

- Added a video hero to `components/landing/hero-section.tsx`.
- Updated navigation and footer links so they fit the IC Vacation site instead of generic template content.
- Added a mock flight/search surface in `components/landing/flight-search-preview.tsx`.
- Added family continuity section in `components/landing/family-legacy-section.tsx`.
- Added those sections to the homepage through `components/landing/deferred-home-sections.tsx`.
- Reworked the AI consultant section in `components/landing/features-section.tsx` as a future backend preview.
- Updated page hero images:
  - About Isaac -> Isaac in office
  - Cruises -> Isaac at ship helm
  - Hotels/Resorts -> Isaac bellboy/hospitality image
  - Flights/Packages -> Isaac in transfer/taxi image
- Updated contact email defaults to `info@icvacation.com`.
- Added `.env.example`.
- Updated `.gitignore` so real env files stay local.
- Updated contact API to fail gracefully when `RESEND_API_KEY` is absent.
- Excluded `docs` from TypeScript compilation because `docs/remotion-beach-hero-example.tsx` is reference material, not app code.

## Key Files Changed

- `.gitignore`
- `.env.example`
- `app/about-isaac/page.tsx`
- `app/api/contact/route.ts`
- `app/contact/page.tsx`
- `app/cruises/page.tsx`
- `app/flights-packages/page.tsx`
- `app/hotels-resorts/page.tsx`
- `app/privacy/page.tsx`
- `app/terms/page.tsx`
- `app/cookies/page.tsx`
- `app/accessibility/page.tsx`
- `components/landing/deferred-home-sections.tsx`
- `components/landing/family-legacy-section.tsx`
- `components/landing/features-section.tsx`
- `components/landing/flight-search-preview.tsx`
- `components/landing/footer-section.tsx`
- `components/landing/hero-section.tsx`
- `components/landing/navigation.tsx`
- `components/site/contact-modal.tsx`
- `components/site/page-hero.tsx`
- `tsconfig.json`

## Verification Status

Previously passed:

- `npm run typecheck`

Local route smoke status from prior pass:

- `/`, `/cruises`, `/hotels-resorts`, `/flights-packages`, `/destinations`, `/blog`, `/privacy`, `/terms`, `/cookies`, `/accessibility` returned 200.
- `/about-isaac` and `/contact` compiled and returned 200 in server output but first compile was slow and the client timed out at 20 seconds.

Current caveat:

- Browser automation bridge was unavailable in Codex, so final visual verification should be done directly in a browser.
- The owner may stop the dev server to save resources. Start it only when actively testing.

## Dev Server Notes

Use webpack dev mode, not Turbopack, because this machine reported CPU instruction issues with Turbopack:

```powershell
npm run dev
```

`package.json` already maps this to:

```text
next dev --webpack
```

If the site is slow on first page load, let Next finish compiling. Avoid leaving the server running when not testing.

## Known Local Performance Issues

- The machine is resource-constrained and may lag if other browser tabs/video are active.
- Earlier webpack dev output showed Google Fonts network timeouts. The project now has local fonts under `public/fonts`; keep using local fonts and avoid adding remote `next/font/google` imports.
- Matomo cookie warnings may appear locally because the analytics script tries to write cookies for the production domain. Do not treat that as a build failure.

## Immediate Next Tasks

1. Visually verify `/about-isaac`; the hero should now use Isaac in the office, not the old placeholder woman image.
2. If stale image still appears, restart the dev server and hard refresh. The code points to the new filename, so stale output likely means cached dev output.
3. Spread AI images evenly and tastefully across the site:
   - Isaac office: About Isaac and family legacy.
   - Isaac helm: Cruises.
   - Isaac bellboy: Hotels/resorts.
   - Isaac transfer/taxi: Flights/packages.
   - Isaac beach: add to a travel inspiration, testimonials, or concierge planning section without making it repetitive.
   - Annette car specialist: family legacy/future continuity.
4. Continue beefing up missing route content using `docs/starting_docs/MASTER_CODEX_PROMPT.md`.
5. Add or enrich pages/sections for:
   - Flights/packages
   - Cruises
   - Hotels/resorts
   - Destinations
   - About Isaac and family legacy
   - AI travel consultant preview
   - Blog/journal content
   - Legal/footer pages
6. Keep the flight search as a mock frontend component until backend links/APIs are explicitly added.
7. Run `npm run typecheck` after code edits.
8. Start the dev server only for visual verification, then stop it if the owner needs resources back.

## Guardrails

- Do not paste or expose real env values.
- Do not submit real booking, cruise, hotel, or contact forms during testing.
- Do not claim live AI booking/search unless real integrations are added.
- Keep raw capture/session/cookie/network material out of chat and out of committed files.
- Do not revert unrelated user files, especially deleted `public/apple-icon.png` or untracked docs/assets.

