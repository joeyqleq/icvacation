# Initial Prompt For Antigravity

You are taking over as the senior website developer for the IC Vacation redesign in this local workspace:

`C:\Users\ADMIN\Desktop\icvacation`

This is a v0-exported Next.js website that I downloaded locally. I want you to continue from the current repo state, not restart. Read and obey:

1. `AGENTS.md`
2. `docs/ANTIGRAVITY_HANDOFF.md`
3. `docs/starting_docs/MASTER_CODEX_PROMPT.md`
4. `docs/starting_docs/icvacations_website_outline.md`

Project goal: finish a polished IC Vacation travel agency website. IC Vacation is a boutique, customized travel consultancy led by Isaac, with family continuity through Annette. The site should consolidate the old scattered WordPress/cruise/flight/hotel content into one premium modern website. Keep the brand professional, warm, editorial, and high-touch. Use the dandelion/logo SVGs as primary brand identity and sprinkle the mascot SVGs lightly.

Important current context:

- The homepage hero now uses `public/video/hero-bg-desktop.mp4`.
- The flight search is currently a polished frontend mockup, not wired to a backend yet.
- The AI travel consultant section is only a frontend preview/teaser. Do not claim live fares, live booking, or connected inventory.
- The About Isaac image should be Isaac in the office, not the old placeholder. Current intended image path is `/images/ai/isaac-office-advisor.png`.
- Use the AI images in `public/images/ai/` evenly across the site:
  - `isaac-office-advisor.png`
  - `isaac-flight-transfer.png`
  - `isaac-cruise-helm.png`
  - `isaac-hotel-bellboy.png`
  - `isaac-beach-advisor.png`
  - `annette-car-specialist.png`
- Source assets also exist in `docs/ai_images/` and `docs/video/`.

Start by inspecting the current app files under `app/`, `components/landing/`, and `components/site/`, then verify the current page at `http://localhost:3000/about-isaac` if the dev server is running. If it is not running, start it with:

```powershell
npm run dev
```

This project should use webpack dev mode, not Turbopack. The package script already does that.

Your first implementation tasks:

1. Confirm `/about-isaac` uses Isaac in the office. If a stale placeholder appears, hard refresh or restart the dev server; the code should point to `/images/ai/isaac-office-advisor.png`.
2. Finish spreading the AI images tastefully across the website, especially Isaac office/About, Isaac helm/Cruises, Isaac bellboy/Hotels, Isaac taxi/Flights, Isaac beach/inspiration or concierge section, and Annette/family continuity.
3. Continue expanding the website content and sections using `MASTER_CODEX_PROMPT.md`.
4. Keep the tone boutique travel consultant, not generic travel portal.
5. Keep the UI aligned with the current v0 Template A direction: dark premium layout, precise editorial sections, brand green/yellow accents, modern and professional.
6. Run `npm run typecheck` after edits and visually verify important pages.

Do not expose real env values, do not submit real travel/contact/booking forms, do not add fake live inventory claims, and do not revert unrelated user changes.

