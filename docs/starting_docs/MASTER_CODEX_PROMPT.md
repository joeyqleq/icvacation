\*\*\* IMPORTANT NOTE BEFORE YOU BEGIN: Before any scraping or browser work, create the project scaffold and checkpoint files first. The local folder is the source of truth. Do not keep important progress only in chat.\*\*\*



\## BEGIN PROMPT:



You are the lead autonomous scraping, visual analysis, content compilation, website-mapping, and v0 handoff agent for the IC Vacation redesign.



Use GPT-5.5 as the main model.



This is not a generic website summary task.



This is a multi-dimensional scrape and website-planning task.



Your job is to scrape, crawl, visually inspect, locally save, analyze, rewrite, generate, and package everything needed for a first v0.app frontend draft of the redesigned IC Vacation website.



Do not build the final frontend yet.

Do not create embeddings.

Do not build long-term backend systems.

Do not set up production email sending.

Do not set up payment, booking, reservation, or account-creation flows.

Do not submit any forms.

Do not make bookings.

Do not send messages.

Do not make purchases.



This phase is only:



1\. Crawl and scrape all supplied links.

2\. Crawl the old IC Vacation WordPress site.

3\. Save all source files locally.

4\. Visually inspect all pages, media, images, templates, forms, modals, and engines.

5\. Capture screenshots and interaction states.

6\. Extract every visible word, CTA, form field, dropdown, footer item, nav item, testimonial, media item, and search-engine control.

7\. Inspect hotel, flight, cruise, package, quote, and booking/search engines as deeply as allowed.

8\. Capture public URLs, scripts, form actions, query params, network endpoints, response shapes, dropdown values, and integration hints.

9\. Compile the exact source content separately from improved rewritten content.

10\. Generate new boutique travel copy.

11\. Generate blog content.

12\. Create a full sitemap and wireframe.

13\. Create a self-contained v0.app drop-in implementation prompt.



Save everything locally.



────────────────────────────────────

PRIMARY BRAND AND PROJECT VISION

────────────────────────────────────



IC Vacation is a boutique travel-planning service led by Isaac Chowrimootoo.



The new site should feel:



\- personal,

\- curated,

\- emotional,

\- premium,

\- modern,

\- cinematic,

\- human,

\- consultation-first,

\- advisor-led,

\- visually impressive,

\- travel-literate,

\- warm without feeling generic.



The new site should not feel like a generic online travel agency.



The core positioning:



IC Vacation is not trying to out-click or out-book the internet. IC Vacation helps travelers shape real vacations around who they are, where they want to go, who they are traveling with, how they like to move, what they want to feel, and what memories they want to bring home.



The website should make visitors want to:



\- call Isaac,

\- fill out a trip-planning form,

\- explore cruise options,

\- explore hotel/resort options,

\- browse inspiration,

\- use the AI travel consultant preview as a starting point,

\- then move toward a personal consultation.



The site can include booking/search widgets, but the emotional center of the site is Isaac’s personal planning service.



────────────────────────────────────

TOOLS TO USE

────────────────────────────────────



Use these together:



1\. Firecrawl MCP

&#x20;  Use for:

&#x20;  - sitemap discovery,

&#x20;  - page scrape,

&#x20;  - markdown extraction,

&#x20;  - HTML extraction,

&#x20;  - structured extraction,

&#x20;  - screenshots where efficient,

&#x20;  - link extraction,

&#x20;  - page metadata,

&#x20;  - media discovery.

&#x09;- Available credits 12,500 - 2 Concurrent Browser Limit, until credit depletion. SKills and CLI installed



&#x20;2. Browserbase MCP

&#x20;   Use for:

&#x20;  - Similar to Firecrawl. Less stress on this MCP because it's a free account. 3 concurrent browser limit for a total of 60 minutes. Skills + CLI installed.



2\. Codex Browser Use

&#x20;  Use for:

&#x20;  - human-like browsing,

&#x20;  - Cloudflare/Turnstile pages after manual verification,

&#x20;  - visual checks,

&#x20;  - interactive inspection,

&#x20;  - template animation inspection,

&#x20;  - pages where Firecrawl is insufficient.



3\. Playwright MCP

&#x20;  Use for:

&#x20;  - persistent browser sessions,

&#x20;  - screenshots,

&#x20;  - full-page screenshots,

&#x20;  - mobile/tablet/desktop screenshots,

&#x20;  - opening nav menus,

&#x20;  - opening modals,

&#x20;  - interacting with dropdowns,

&#x20;  - recording HAR/network logs,

&#x20;  - inspecting forms,

&#x20;  - capturing DOM snapshots,

&#x20;  - inspecting booking/search engines.

&#x20;  - NOTE: PLAYWRIGHT REPLACED WITH CODEX BUILT IN BROWSER	



4\. Local filesystem and shell

&#x20;  Use for:

&#x20;  - saving all raw files,

&#x20;  - organizing JSON/markdown/screenshots/media,

&#x20;  - deduplicating URLs,

&#x20;  - generating reports,

&#x20;  - creating final ZIP archive if possible.



Use subagents in parallel if Codex supports them.

If true subagents are unavailable, simulate them with separate task files and run workstreams in parallel as much as possible.



IMPORTANT: SPREAD TASKS AND WORK ACROSS ALL BROWSER USE AND SCRAPING MCPS EVENLY ACCORDING TO THEIR CAPABILITIES AND MILEAGE SO THAT WE DONT EXHAUST THE CODEX CHATGPT RATE LIMIT ALL AT ONCE.

────────────────────────────────────

PRIMARY SOURCE LINKS

────────────────────────────────────



Scrape and inspect these exact links:



1\. Main website:

https://icvacation.com/



2\. Cruises page:

https://cruisebenefits.mytravelsite.com/?agency=10197\&advisor=66739



3\. Hotels page:

https://hotelsandresorts.mytravelsite.com/mexico/?agency=10197\&advisor=66739



4\. Cruise booking/search engine:

https://booking.sigtn.com/swift/cruise?sid1=10197\&lang=1\&destinationtype=All\&ruleid=1231792\&sortcolumn=departureDate\&sortorder=asc



5\. About / Signature profile:

https://www.signaturetravelnetwork.com/SigNet/index.cfm/AgentProfileSearch/viewProfile?userid=66739



6\. Contact / request information form:

https://www.signaturetravelnetwork.com/SigNet/index.cfm/RequestMoreInformation/RequestMoreInformationForm/Index?agencyID=10197\&agentID=66739\&utp=consumer



Also crawl the old IC Vacation site as fully as possible:



https://icvacation.com/robots.txt

https://icvacation.com/sitemap.xml

https://icvacation.com/wp-sitemap.xml

https://icvacation.com/wp-json/

https://icvacation.com/wp-json/wp/v2/pages

https://icvacation.com/wp-json/wp/v2/posts

https://icvacation.com/wp-json/wp/v2/media



Also check likely routes:



/privacy

/privacy-policy

/terms

/terms-of-service

/cookie-policy

/cookie-settings

/accessibility

/contact

/about

/blog

/cruises

/hotels

/hotels-resorts

/destinations

/plan-my-trip

/trip-planning

/flights

/packages



Crawl discovered internal pages, posts, public media pages, public WordPress pages, public uploads, legal pages, contact pages, and blog pages.



Do not stop after the homepage.



────────────────────────────────────

TEMPLATE REFERENCES

────────────────────────────────────



Use these templates as design references.



Template A:

https://v0-compute-template.vercel.app/



Use Template A as 80% of the structure and layout philosophy.



Template A visual notes from supplied screenshot:

\- dark cinematic landing page,

\- sparse luxury-tech mood,

\- atmospheric hero,

\- organic glowing tree/particle/video-like visual,

\- minimalist nav,

\- soft top-right CTA,

\- elegant black negative space,

\- restrained section rhythm,

\- three-card sections,

\- large breathing room,

\- visual storytelling over dense UI,

\- final abstract particle/globe-like footer visual.



Template B:

https://v0-modern-design-template.vercel.app/



Use Template B as 20% of the finishing style.



Template B visual notes from supplied screenshot:

\- black and yellow high-contrast design,

\- bold uppercase hero typography,

\- “BUILD WITHOUT LIMITS / PIXEL-PERFECT” style energy,

\- strong neon yellow accents,

\- sharp card borders,

\- UI dashboard preview,

\- service cards,

\- numbered process cards,

\- yellow stats band,

\- testimonials,

\- feature grid,

\- comparison table,

\- carousel/blog cards,

\- FAQ accordion,

\- pricing cards,

\- final CTA,

\- dense footer,

\- more punchy and graphic than Template A.



Final design direction:

Use Template A’s cinematic minimalism and pacing.

Use Template B’s punch, typography confidence, contrast, buttons, cards, yellow accents, grids, FAQ/pricing/blog mechanics, and polished finishing.

The result should be travel-focused, not tech-focused.



All template copy must be replaced.

Do not preserve irrelevant compute, agent, developer, cloud, or SaaS wording.

Only reuse structure, motion ideas, layout patterns, section rhythm, and visual treatment.



Visually inspect both live template URLs using browser tools.

Capture:

\- desktop full-page screenshots,

\- mobile screenshots,

\- above-fold screenshots,

\- animation behavior notes,

\- hover behavior notes,

\- nav behavior,

\- video/canvas/motion elements,

\- component structure,

\- section inventory,

\- reusable layout blocks,

\- typography and spacing notes.



Save template analysis to:



docs/12-v0-template-analysis.md

data/screenshots/templates/



────────────────────────────────────

ATTACHED FILES TO USE

────────────────────────────────────



Use the attached files as source material:



1\. brand\_guidelines 1.png

2\. template-a(1).png

3\. template -b(1).png

4\. icvacations\_website\_outline.md

5\. Pasted text.txt



If these files are not available inside the Codex workspace, stop only long enough to ask the user to attach them.



Use the old outline and pasted brief as strategy context.

Do not blindly copy their typos into polished output.

Preserve intent, requirements, links, component notes, and priorities.



────────────────────────────────────

BRAND SYSTEM

────────────────────────────────────



Use the attached brand guideline image as the design source.



Brand palette:



Primary:

\- Main Yellow/Green: #26FC00

\- Main Grey: #444444

\- Main Black: #000000

\- Main White: #FFFFFF



Accent range:

\- Alternate Yellow: #FDF972

\- Alternate Green: #94BD00



Grey range:

\- #697174

\- #54585D

\- #464B4E

\- #3F4245

\- #333537

\- #252426



Brand rule:

About 80% of visible colored elements should use:

\- #26FC00

\- #444444

\- #000000

\- #FFFFFF



The remaining 20% may use:

\- #FDF972

\- #94BD00

\- grey shades listed above.



Because Template B uses bold yellow and black, adapt its high-contrast style to the IC Vacation palette.

Do not make the site look childish or neon-gaming.

The final effect should be modern, premium, cinematic, and travel-oriented.



Create:



docs/08-brand-system.md



Include:

\- color roles,

\- typography recommendations,

\- button style,

\- hover style,

\- active nav style,

\- section backgrounds,

\- card design,

\- form styling,

\- booking widget styling,

\- mobile behavior,

\- accessibility contrast notes,

\- how Template A and Template B are merged,

\- what v0 should implement.



────────────────────────────────────

NEW LOGO AND MASCOT ASSETS

────────────────────────────────────



Use these newly attached logo and mascot assets as part of the brand identity package.



Location:



"C:\\Users\\ADMIN\\Desktop\\icvacation\\starting\_docs\\images\\svg" - SVG versions

"C:\\Users\\ADMIN\\Desktop\\icvacation\\starting\_docs\\images\\png" - PNG versions



Logo and mascot image philosophy:



* The main logo/icon of IC Vacation is the multi-spoked dandelion shape. I chose the dandelion because it's one of the few flowers that is constantly on the go, constantly traveling, riding the air currents from pasture to pasture giving a new meaning to the phrase going with the wind. The dandelion, unlike pollen, does not simply travel to a destination, but rather treats every journey as a leisurely vacation, allowing it to travel great distances over land, sea and air. The IC vacation dandelion comes in the 2 base brand guidelines colors, with a think, condensed and tight white typography with the words "IC VACATION" next to it. This shape+text logo appears at the top of pages, intro hero, and/or leading the navmenus.



* The dandelion by itself must be sprinkled at strategic points, either enlarged and opaque background shape, behind text, and as a filler for dead empty spaces. It's also used to keep the branding and theme uniform a across all sections and pages that are void of any IC Vacation branding. An interesting consideration is to add code to the SVG, to animate and give motion or user interaction on each of the spokes, paths, etc, of the SVG.



* The semi-cartoon modern noir mascot animals: The Owl, The Penguin, and The Bird are important aspects of the final website, and must be integrated to the animated dark themed floral/tree background shapes from template A. These 3 birds also adhere to the "traveling vacationer" theme of IC Vacation since a traveling creature like a bird is the best kind of traveler that there is. The bird symbolizes airplane flight, the owl symbolizes luxurious getaways and accommodation, while the penguin symbolizes the cruise ship vacationer since a penguin is the only amphibious bird out of the 3.



* In your final instructions, sitemap and wireframe documents, these 3 bird shapes must play a big role in merging the visual design and creative aspect of the basic (template a) 80% / 20% (template b) visual creative merger of the final website. Be mindful of where and how your decide to input these birds, and what visual story you are trying to tell. Also be mindful of playing around with the rendered size, and SVG Framer Motion and Tailwind effects applied to the base SVG in order to give the shapes some life and allow them to sit well and seamless with the core design.





Files:



Raster previews:

\- bird.png

\- grey\_dandelion.png

\- grey\_logo.png

\- owl.png

\- penguin.png

\- yellow\_dandelion.png

\- yellow\_logo.png



SVG source assets:

\- bird.svg

\- grey\_dandelion.svg

\- grey\_logo.svg

\- owl.svg

\- penguin.svg

\- yellow\_dandelion.svg

\- yellow\_logo.svg



Use the SVG files as the source of truth for implementation.

Use PNG files only as visual previews or fallbacks.



Create:



data/normalized/brand-asset-inventory.json

docs/18-logo-and-mascot-usage.md



For every brand asset, document:



\- filename,

\- file type,

\- visual description,

\- colors used,

\- recommended usage,

\- where it should appear in the redesigned site,

\- where it should not appear,

\- whether it should be primary, secondary, decorative, mascot, favicon, loader, watermark, or section illustration,

\- accessibility/contrast notes,

\- v0 implementation notes.



Recommended initial usage:



1\. yellow\_logo.svg

&#x20;  Use as the primary website logo on dark backgrounds.

&#x20;  Use in the navbar, footer, homepage hero, and v0 design handoff.



2\. grey\_logo.svg

&#x20;  Use as secondary/subtle logo variation.

&#x20;  Use in muted footer states, legal pages, watermarks, or monochrome contexts.



3\. yellow\_dandelion.svg

&#x20;  Use as favicon, loader mark, decorative section divider, pattern element, or small brand icon.

&#x20;  Consider animating it subtly as a travel/spark/memory motif.



4\. grey\_dandelion.svg

&#x20;  Use as a background watermark, subtle pattern, footer detail, or low-contrast decorative element.



5\. bird.svg

&#x20;  Treat as a possible primary mascot.

&#x20;  Consider using it in friendly advisor moments, trip-planning illustrations, or “start your journey” sections.

&#x20;  Do not overuse it in the first draft.



6\. owl.svg

&#x20;  Treat as a possible wisdom/advisor mascot.

&#x20;  Consider using it in the AI Travel Consultant preview, planning tips, FAQ, or guidance sections.

&#x20;  Do not make the website feel childish.



7\. penguin.svg

&#x20;  Treat as a possible travel companion mascot.

&#x20;  Consider using it in empty states, loading states, family travel sections, or playful microinteractions.

&#x20;  Do not use it as the primary logo unless the visual strategy strongly supports it.



Important design direction:

The redesigned site should remain premium, cinematic, and boutique.

The mascots can add memorability and warmth, but they should not overpower the luxury/personal-travel feel.

Use the dandelion/wordmark system as the main identity.

Use mascots selectively.



In the final v0 prompt, include clear instructions for:

\- which logo to use in the navbar,

\- which logo to use in the footer,

\- favicon recommendation,

\- whether to use a mascot in the AI Travel Consultant preview,

\- whether to animate the dandelion mark as a loader or decorative background.



────────────────────────────────────

COMPLIANCE, SECURITY, AND BOUNDARIES

────────────────────────────────────



Do not submit forms.

Do not book travel.

Do not reserve rooms.

Do not reserve cruises.

Do not search in a way that triggers purchase/booking commitment.

Do not create accounts.

Do not make payments.

Do not send emails.

Do not modify live sites.

Do not use CAPTCHA-solving services.

Do not bypass Cloudflare/Turnstile through evasion.



Cloudflare/Turnstile:

If a page shows Cloudflare or Turnstile:

1\. Take screenshot.

2\. Save URL and timestamp.

3\. Open in Codex Browser Use or Playwright persistent context.

4\. Pause for human verification.

5\. After user completes verification in the browser, continue with the same browser profile/session.

6\. Save post-verification screenshot.

7\. Continue scraping.

8\. If access fails again, document it as blocked and create a manual-capture checklist.



Booking/search engines:

You may inspect public HTML, public scripts, form actions, iframe URLs, query parameters, HAR/network requests, XHR/fetch calls, visible API-like endpoints, dropdown options, sample response shapes, and deep-link behavior.



Do not save or expose:

\- session cookies,

\- auth tokens,

\- CSRF tokens,

\- private keys,

\- account identifiers,

\- payment information,

\- user-specific secrets.



If a HAR file contains cookies/tokens, create a redacted version for final output.



Do not copy proprietary backend code.

Do not claim private partner APIs are usable unless verified.

If an endpoint looks private, document it as:

“authorization likely required.”



The goal is to produce a clean integration dossier so the new frontend can recreate the user experience through:

\- public links,

\- deep-link builders,

\- iframe embeds if allowed,

\- authorized APIs,

\- custom backend proxy later,

\- or clearly documented manual/partner access requirements.



────────────────────────────────────

FIRECRAWL AND CODEX BUDGET STRATEGY

────────────────────────────────────



The user has around 12,000 Firecrawl credits.

Do not waste credits.



Use this strategy:



1\. Start with cheap discovery:

&#x20;  - robots.txt,

&#x20;  - sitemap.xml,

&#x20;  - wp-sitemap.xml,

&#x20;  - WordPress REST API,

&#x20;  - direct HTTP requests,

&#x20;  - link extraction,

&#x20;  - Playwright DOM snapshots.



2.1 Use Firecrawl for:

&#x20;  - clean markdown conversion,

&#x20;  - pages where HTML is messy,

&#x20;  - dynamic pages where Firecrawl helps,

&#x20;  - structured extraction,

&#x20;  - screenshots only when useful.



&#x20;2.2 Let Browserbase be support for Firecrawl.



3\. Use Playwright for:

&#x20;  - interactive UI,

&#x20;  - dropdowns,

&#x20;  - menus,

&#x20;  - forms,

&#x20;  - modals,

&#x20;  - network logs,

&#x20;  - template animation checks,

&#x20;  - Cloudflare/Turnstile continuation after human verification.



4\. Do not Firecrawl thousands of booking results.

&#x20;  For search/booking engines, capture structure, controls, endpoints, URL params, response samples, and representative result cards.



5\. Cache locally.

&#x20;  If a page has already been captured successfully, do not recrawl it unless needed.



6\. Normalize and deduplicate URLs.

&#x20;  Treat canonical duplicates, tracking params, feeds, pagination loops, and repeated archives carefully.



7\. Reserve at least 25% of Firecrawl credits for retries and final structured extraction.

&#x20;  Do not exceed 9,000 Firecrawl credits unless the user explicitly approves.



8\. Keep a running log:



docs/99-budget-log.md



Log:

\- time,

\- tool used,

\- URL batch,

\- reason for using Firecrawl vs Playwright vs HTTP,

\- approximate credits used if known,

\- outcome,

\- retry count,

\- blocked pages.



9\. If Codex rate limits become tight:

&#x20;  - continue local HTTP/Playwright capture,

&#x20;  - save raw data,

&#x20;  - postpone synthesis,

&#x20;  - do not repeat already completed work.



────────────────────────────────────

SESSION CONTINUITY / RATE-LIMIT / ACCOUNT-SWITCH PROTOCOL

────────────────────────────────────



Assume the Codex session may hit rate limits, disconnect, crash, or need to be continued from another account.



Do not rely on chat memory.

Do not rely on the current Codex session transcript.

The local project folder is the source of truth.



Create and continuously maintain these files:



docs/00-executive-readme.md

docs/19-session-state.md

docs/20-resume-instructions.md

data/normalized/progress-state.json

data/normalized/url-status-ledger.json

data/normalized/subagent-status.json

data/normalized/file-manifest.json

data/normalized/checkpoint-manifest.json



The session state must include:



\- current phase,

\- active workstream,

\- completed workstreams,

\- incomplete workstreams,

\- next exact task,

\- last URL processed,

\- last successful scrape,

\- last failed scrape,

\- blocked URLs,

\- Cloudflare/Turnstile status,

\- human-verification needed yes/no,

\- Firecrawl credits estimated used,

\- Firecrawl credits estimated remaining,

\- Codex/browser limitations encountered,

\- current subagent assignments,

\- files created,

\- files missing,

\- QA status,

\- known issues,

\- exact resume command/prompt.



After every major action, update:



docs/19-session-state.md

data/normalized/progress-state.json

data/normalized/url-status-ledger.json

docs/99-budget-log.md



Update after:



\- every source URL,

\- every batch crawl,

\- every Firecrawl job,

\- every Playwright/HAR capture,

\- every template capture,

\- every engine-inspection step,

\- every generated final document,

\- every blocked page,

\- every manual verification event.



Use atomic, append-friendly writing where possible.

Do not keep important progress only in chat.



Create checkpoint ZIPs periodically if possible:



exports/checkpoint-phase-01-source-crawl.zip

exports/checkpoint-phase-02-visual-capture.zip

exports/checkpoint-phase-03-engine-inspection.zip

exports/checkpoint-phase-04-content-inventory.zip

exports/checkpoint-phase-05-v0-handoff.zip



Also create or update:



exports/latest-checkpoint.zip



Initialize git if available:



\- create .gitignore,

\- exclude .env, cookies, tokens, raw unredacted HAR files if they contain secrets,

\- commit after each major phase,

\- use clear commit messages.



Suggested commits:



checkpoint: project scaffold

checkpoint: source crawl complete

checkpoint: visual capture complete

checkpoint: engine inspection complete

checkpoint: content inventory complete

checkpoint: website copy and blog drafts complete

checkpoint: v0 handoff complete

checkpoint: QA complete



If rate limits appear near exhaustion:

1\. Stop starting new expensive tasks.

2\. Finish writing current files.

3\. Update all session-state files.

4\. Create latest checkpoint ZIP.

5\. Write a clear handoff in docs/20-resume-instructions.md.

6\. List the next exact step for a new Codex session.

7\. Do not leave partial work only in memory.



When resuming from another account/session:

1\. Read README.md first.

2\. Read docs/19-session-state.md.

3\. Read docs/20-resume-instructions.md.

4\. Read data/normalized/progress-state.json.

5\. Read data/normalized/url-status-ledger.json.

6\. Check docs/16-qa-report.md if it exists.

7\. Continue from the first incomplete task.

8\. Do not recrawl completed URLs unless files are missing or corrupt.

9\. Do not regenerate completed final docs unless source data changed.

10\. Update the state files immediately before doing new work.



────────────────────────────────────

PARALLEL SUBAGENT PLAN

────────────────────────────────────



Use subagents in parallel if available.



Coordinator Agent:

\- Owns overall plan.

\- Creates folder structure.

\- Creates task board.

\- Tracks target URLs.

\- Assigns workstreams.

\- Merges outputs.

\- Ensures consistent naming.

\- Runs final QA.

\- Produces final user summary.



Subagent 1: Old Site Crawl Agent

\- Crawls icvacation.com.

\- Uses sitemap and WordPress REST first.

\- Uses Firecrawl selectively.

\- Captures raw HTML, markdown, screenshots, metadata, links, and media.

\- Finds hidden/public pages.

\- Stops only when unique internal public pages are exhausted.



Subagent 2: Visual and Media Agent

\- Uses Playwright.

\- Captures desktop/tablet/mobile screenshots.

\- Opens menus, modals, forms, accordions, carousels.

\- Downloads public images and media where allowed.

\- Describes visual content.

\- Inventories images and video embeds.

\- Creates image replacement prompts.



Subagent 3: Booking/Search Engine Inspector Agent

\- Focuses on cruise, hotel, flight, package, and quote engines.

\- Uses Playwright HAR/network logs.

\- Opens dropdowns.

\- Captures controls, fields, filters, buttons, deep links, query params, endpoints, response samples, and integration feasibility.

\- Documents whether the new frontend can use deep links, embeds, public API calls, backend proxy, or partner authorization.



Subagent 4: Source Copy Inventory Agent

\- Extracts every exact text item.

\- Preserves source copy without rewriting.

\- Inventories headings, paragraphs, testimonials, CTAs, nav, footer, form labels, helper text, legal links, advisor bio, mission statement, modal text, booking labels, and disclaimers.



Subagent 5: Copy and Blog Agent

\- Generates polished IC Vacation copy after source preservation is complete.

\- Generates blog article drafts.

\- Uses current web search where factual grounding is needed.

\- Does not invent current prices, visa rules, cruise schedules, live availability, or airline data.



Subagent 6: Template and v0 Packaging Agent

\- Inspects Template A and Template B.

\- Maps IC Vacation content into the merged design direction.

\- Creates sitemap, wireframe, component map, route map, and v0 drop-in prompt.



Subagent 7: QA Agent

\- Checks every deliverable.

\- Checks all links attempted.

\- Checks no secrets are saved.

\- Checks no forms submitted.

\- Checks no booking attempted.

\- Checks every blocked page has screenshot and manual note.

\- Checks v0 prompt is self-contained.



Every subagent must write local files.

No subagent should only produce chat output.



────────────────────────────────────

LOCAL PROJECT STRUCTURE

────────────────────────────────────



Project root: "C:\\Users\\ADMIN\\Desktop\\icvacation\\"



Create this folder:



icvacation-redesign-intel/



Inside it create:



README.md

AGENTS.md

.env.example

package.json



scripts/

&#x20; crawl/

&#x20; playwright/

&#x20; extract/

&#x20; normalize/

&#x20; qa/

&#x20; research/



data/

&#x20; raw/

&#x20;   firecrawl/

&#x20;   playwright/

&#x20;   http/

&#x20;   har/

&#x20;   html/

&#x20;   markdown/

&#x20;   json/

&#x20;   network/

&#x20; media/

&#x20;   images/

&#x20;   video-embeds/

&#x20;   icons/

&#x20;   logos/

&#x20;   downloads/

&#x20; screenshots/

&#x20;   desktop/

&#x20;   tablet/

&#x20;   mobile/

&#x20;   fullpage/

&#x20;   modals/

&#x20;   engines/

&#x20;   templates/

&#x20;   cloudflare/

&#x20; normalized/

&#x20;   source-map.json

&#x20;   content-inventory.json

&#x20;   image-manifest.json

&#x20;   video-manifest.json

&#x20;   form-inventory.json

&#x20;   link-inventory.json

&#x20;   engine-inventory.json

&#x20;   template-inventory.json

&#x20;   blog-index.json

&#x20;   route-map.json

&#x20;   cta-map.json

&#x20;   legal-pages.json



docs/

&#x20; 00-executive-readme.md

&#x20; 01-source-map.md

&#x20; 02-crawl-report.md

&#x20; 03-visual-audit.md

&#x20; 04-media-inventory.md

&#x20; 05-source-copy-preserved.md

&#x20; 06-content-inventory.md

&#x20; 07-engine-integration-dossier.md

&#x20; 08-brand-system.md

&#x20; 09-sitemap-and-wireframe.md

&#x20; 10-master-website-copy.md

&#x20; 11-blog-content.md

&#x20; 12-v0-template-analysis.md

&#x20; 13-v0-drop-in-prompt.md

&#x20; 14-implementation-tasklist.md

&#x20; 15-legal-footer-pages.md

&#x20; 16-qa-report.md

&#x20; 17-free-api-research.md

&#x20; 99-budget-log.md



If useful, create:



exports/

&#x20; icvacation-redesign-intel.zip



All final docs must be human-readable.

Use markdown for narrative docs and JSON for structured inventories.



────────────────────────────────────

SCRAPE PASSES

────────────────────────────────────



For each accessible URL, perform these passes.



Pass A: Raw archival capture

\- Save raw HTML.

\- Save raw markdown.

\- Save all links.

\- Save metadata.

\- Save title.

\- Save description.

\- Save canonical URL.

\- Save screenshot.

\- Save all visible text.

\- Save nav/footer/modal/popup content.

\- Save script/embed references.

\- Do not over-clean.

\- Do not summarize.

\- Do not rewrite.



Pass B: Clean content capture

\- Save clean markdown.

\- Preserve headings, paragraphs, CTAs, testimonials, forms, labels, buttons, repeated sections.

\- Remove only irrelevant technical boilerplate.

\- Do not rewrite yet.



Pass C: Visual and interactive capture

\- Desktop screenshot.

\- Tablet screenshot.

\- Mobile screenshot.

\- Full-page screenshot.

\- Above-fold screenshot.

\- Open nav menus.

\- Open contact forms.

\- Open popups.

\- Open accordions.

\- Open dropdowns.

\- Capture before/after states.

\- Save DOM snapshots.

\- Save accessibility tree when useful.



Pass D: Structured extraction

Extract:

\- page title,

\- page type,

\- route,

\- canonical URL,

\- headings,

\- sections,

\- body text,

\- CTAs,

\- links,

\- forms,

\- form fields,

\- validation hints,

\- dropdown options,

\- testimonials,

\- images,

\- videos,

\- icons,

\- visible prices,

\- booking/search filters,

\- legal/footer links,

\- analytics snippets if present,

\- scripts and embeds,

\- image alt text,

\- nearby image text,

\- visual descriptions,

\- source screenshots.



Pass E: Rewrite and planning

Only after raw capture and preservation are complete:

\- Create improved copy.

\- Create blog drafts.

\- Create sitemap.

\- Create wireframe.

\- Create template mapping.

\- Create v0 prompt.



────────────────────────────────────

OLD ICVACATION WORDPRESS CRAWL RULES

────────────────────────────────────



Crawl the full public old IC Vacation WordPress site.



Use:

\- robots.txt,

\- sitemap.xml,

\- wp-sitemap.xml,

\- WordPress REST pages,

\- WordPress REST posts,

\- WordPress REST media,

\- internal link crawl.



Include:

\- homepage,

\- public hidden pages,

\- public WordPress pages,

\- public blog posts,

\- public media uploads,

\- legal pages,

\- contact pages,

\- about pages,

\- route-like pages,

\- uploaded images,

\- feeds only if they reveal content not otherwise found.



Exclude:

\- wp-admin,

\- login pages,

\- admin AJAX unless needed only for public form structure,

\- duplicate feeds,

\- comment feeds unless they contain unique content,

\- search result loops,

\- tag/category archive duplicates unless they reveal unique posts,

\- calendar loops,

\- irrelevant external websites.



Crawl cap:

\- Initial cap: 100 unique internal pages.

\- Expand to 200 only if legitimate unique public pages are discovered.

\- Stop when canonical unique page count is exhausted.



Do not stop after the homepage.



────────────────────────────────────

VISUAL AND MEDIA REQUIREMENTS

────────────────────────────────────



This scrape must be visual and interactive, not text-only.



For every image/media asset:



\- download locally where allowed,

\- save original URL,

\- save local path,

\- save source page,

\- save dimensions,

\- save alt text,

\- save nearby text,

\- note whether image contains text,

\- describe what is visually in the image,

\- describe mood and design role,

\- identify whether it is logo, hero image, advisor image, background, testimonial image, icon, map, cruise/hotel visual, or decorative asset,

\- decide whether to keep, replace, recreate, or discard,

\- provide replacement prompt if it should be recreated.



For screenshots:



\- desktop,

\- tablet,

\- mobile,

\- full page,

\- above fold,

\- interaction states,

\- modals,

\- forms,

\- menus,

\- dropdowns,

\- search engines,

\- templates,

\- Cloudflare/Turnstile states.



For video/canvas/animation elements:



\- record source URL if visible,

\- record embed URL if applicable,

\- identify whether video, iframe, canvas, WebGL, SVG, CSS animation, or Lottie-like animation,

\- capture screenshots,

\- describe behavior,

\- suggest how v0 should recreate or approximate the effect.



Do not rely only on OCR.

Use visual reasoning wherever possible.

Use OCR only as fallback for image text.



Create:



docs/03-visual-audit.md

docs/04-media-inventory.md

data/normalized/image-manifest.json

data/normalized/video-manifest.json



────────────────────────────────────

BOOKING / SEARCH ENGINE INSPECTION

────────────────────────────────────



The user wants to recreate hotel, flight, cruise, and package search functions in the new frontend as much as legally and technically possible.



Inspect the supplied links and old site for:



\- booking widgets,

\- search forms,

\- cruise engine,

\- hotel/resort engine,

\- flight-related form or engine,

\- package search,

\- quote request flows,

\- deep links,

\- iframes,

\- scripts,

\- network endpoints,

\- query parameters,

\- form actions,

\- hidden inputs,

\- dropdown options,

\- destination lists,

\- date fields,

\- passenger fields,

\- price fields,

\- cabin fields,

\- cruise line fields,

\- ship fields,

\- departure port fields,

\- hotel location fields,

\- filters,

\- sorting,

\- result cards,

\- request quote buttons,

\- continue buttons,

\- agency IDs,

\- advisor IDs,

\- affiliate parameters.



Use Playwright HAR/network recording.



Save:



data/raw/har/\[source-slug].har

data/raw/network/\[source-slug]-requests.json

data/raw/network/\[source-slug]-responses-samples.json

data/normalized/engine-inventory.json

docs/07-engine-integration-dossier.md



For every engine, document:



1\. Engine name.

2\. Source URL.

3\. What it does.

4\. Whether accessible.

5\. Whether protected by Cloudflare/Turnstile.

6\. Whether iframe-based, script-based, form-based, link-based, or API-like.

7\. Public URL parameters.

8\. Agency/advisor IDs.

9\. Form fields.

10\. Dropdown options.

11\. Search controls.

12\. Filter categories.

13\. Result card anatomy.

14\. Request payload examples.

15\. Response shape examples.

16\. Required headers, but redact private values.

17\. Required cookies, but do not save private cookie values in final docs.

18\. CORS/client-side feasibility.

19\. Whether frontend-only recreation is possible.

20\. Whether backend proxy is needed.

21\. Whether partner/API authorization is likely needed.

22\. Whether a deep-link builder can be used first.

23\. Recommended recreation strategy.

24\. v0 frontend widget instructions.

25\. What remains unknown.



Do not attempt to download every itinerary or hotel result.

For huge result sets:

\- capture controls,

\- capture dropdown values,

\- capture endpoint patterns,

\- capture sample responses,

\- capture representative result cards,

\- capture pricing field structure,

\- capture CTA behavior,

\- capture deep-link behavior.



Cruise engine:

Use the Signature booking link as the main cruise engine.

Document every visible filter category and result card structure.

Open dropdowns and collect options where possible.

Inspect network calls.

Capture sample itineraries and price structure.

Do not click into final checkout or reserve anything.



Hotels/resorts engine:

Use the hotelsandresorts.mytravelsite.com link.

If blocked by Cloudflare, pause for human verification.

After access, inspect content, forms, filters, destination cards, hotel search behavior, and network calls.

If still blocked, document with screenshot and manual-capture checklist.



Cruise benefits page:

Use the cruisebenefits.mytravelsite.com link.

If blocked by Cloudflare, pause for human verification.

After access, inspect offers, widgets, forms, search behavior, links, and media.

If still blocked, document with screenshot and manual-capture checklist.



Flight engine:

The user does not currently know which airline ticket/search engine to use.

Search the current web for free or freemium flight-related APIs and document options.



Research:

\- flight search APIs,

\- flight status APIs,

\- airport/autocomplete APIs,

\- airline route APIs,

\- schedule APIs,

\- travel package APIs,

\- hotel search APIs,

\- cruise data APIs,

\- map/place APIs that could support destination search.



Prefer official docs and developer pages.

Do not assume current pricing or free limits without checking.

Document:

\- provider,

\- API type,

\- free/freemium/paid/partner-only,

\- current limits if published,

\- commercial restrictions,

\- data available,

\- whether it can support frontend prototype,

\- whether backend proxy is needed,

\- whether it is suitable only for placeholder/deep-link use.



Create:



docs/17-free-api-research.md



If no reliable free flight booking/search API is found, recommend:

\- create a frontend flight inquiry widget first,

\- collect departure city, destination, dates, travelers, cabin preference, and notes,

\- route the lead to the contact/planning form,

\- leave API integration as a future backend task.



Do not invent a working flight booking engine.



────────────────────────────────────

CLOUDFLARE / TURNSTILE WORKFLOW

────────────────────────────────────



For protected pages:



1\. Take screenshot before verification.

2\. Save to:

&#x20;  data/screenshots/cloudflare/

3\. Save URL and timestamp.

4\. Open page in persistent Codex Browser Use or Playwright browser.

5\. Pause for user to manually verify.

6\. After verification, continue in same browser context.

7\. Save post-verification screenshot.

8\. Continue visual and content capture.

9\. If blocked again, retry once.

10\. If still blocked, document missing content.



Every blocked page must have either:

\- successful post-verification scrape,

or:

\- screenshot,

\- blocked status,

\- manual capture checklist,

\- explanation of what could not be captured,

\- recommended next step.



────────────────────────────────────

SOURCE COPY PRESERVATION

────────────────────────────────────



Create:



docs/05-source-copy-preserved.md



This file must preserve exact source copy separately from all rewritten copy.



Include every:



\- headline,

\- subheadline,

\- paragraph,

\- testimonial,

\- CTA,

\- nav label,

\- footer label,

\- form label,

\- helper text,

\- field placeholder,

\- button label,

\- mission statement,

\- advisor bio,

\- contact detail,

\- legal/footer item,

\- booking/search label,

\- engine filter,

\- visible disclaimer,

\- modal text,

\- popup text,

\- rating text,

\- price label,

\- destination label,

\- search placeholder,

\- dropdown option.



Do not rewrite in this file.

Do not summarize in this file.

Do not truncate.

If text repeats, record it once and list all locations where it repeats.



────────────────────────────────────

CONTENT INVENTORY

────────────────────────────────────



Create:



docs/06-content-inventory.md

data/normalized/content-inventory.json



Each item should include:



\- id,

\- item type,

\- source URL,

\- source page,

\- section,

\- exact source text,

\- visible location,

\- screenshot reference,

\- local raw file reference,

\- local media reference if relevant,

\- suggested reuse decision,

\- rewrite needed yes/no,

\- destination route in new site,

\- notes.



Item types:



\- page,

\- section,

\- heading,

\- paragraph,

\- testimonial,

\- CTA,

\- nav item,

\- footer link,

\- form field,

\- dropdown option,

\- button,

\- image,

\- video,

\- engine filter,

\- engine result field,

\- legal link,

\- contact method,

\- advisor bio,

\- mission statement,

\- price field,

\- disclaimer,

\- modal text,

\- template component.



────────────────────────────────────

LINK AND CTA FIXING REQUIREMENTS

────────────────────────────────────



The old notes mention broken nav/footer links and a non-working “Plan My Trip” button.



Create:



data/normalized/link-inventory.json

data/normalized/cta-map.json

docs/14-implementation-tasklist.md



For every link/button:



\- source label,

\- source page,

\- current href/action,

\- whether it works,

\- recommended new href/action,

\- route to create,

\- anchor target if applicable,

\- notes.



No dead links in the v0 prompt.



Recommended primary CTA:

Use “Plan My Trip” as the main CTA unless analysis strongly suggests otherwise.



Recommended secondary CTA:

Use “Call Isaac” or “Request a Quote.”



Recommended “Plan My Trip” behavior:

Route to:



/contact#plan-my-trip



Also allow homepage anchor:



/#plan-my-trip



If using a modal in the first draft, still provide a real fallback route.



────────────────────────────────────

CONTACT FORM REQUIREMENTS

────────────────────────────────────



Inventory existing forms:



\- IC Vacation modal form,

\- Signature request information form,

\- any other discovered forms.



Do not submit any form.



Extract:



\- field names,

\- labels,

\- placeholders,

\- field type,

\- required/optional,

\- step order,

\- validation hints,

\- dropdown options,

\- CAPTCHA presence,

\- final button text,

\- advisor/contact info shown near form.



Create recommended new form structure:



\- First name,

\- Last name,

\- Email,

\- Phone optional,

\- Country,

\- Preferred contact method,

\- Destination or trip idea,

\- Need flights?

\- Departure city,

\- Adults,

\- Children,

\- Travel dates,

\- Budget range optional,

\- Cruise interest,

\- Hotel/resort interest,

\- Package interest,

\- Special occasion,

\- Preferred travel style,

\- Description,

\- Advisor name optional, default Isaac,

\- Consent checkbox,

\- Submit CTA.



Do not configure live email sending in this phase.

Only document future implementation requirements.



Create:



data/normalized/form-inventory.json



────────────────────────────────────

COPYWRITING DIRECTION

────────────────────────────────────



After source copy is preserved, create rewritten site copy.



Create:



docs/10-master-website-copy.md



Voice:



\- boutique,

\- emotional,

\- poetic but clear,

\- personal,

\- travel-literate,

\- premium,

\- warm,

\- human,

\- Isaac-forward,

\- consultation-first,

\- confident,

\- modern,

\- not generic,

\- not corporate,

\- not fake luxury,

\- not OTA-style.



Avoid:



\- cheap-deal language,

\- generic vacation clichés,

\- unsupported claims,

\- pretending online booking replaces Isaac,

\- claiming unavailable functionality,

\- overpromising API/search capabilities,

\- making the site sound like Expedia, Booking.com, or TripAdvisor.



The copy should make the reader feel:

\- seen,

\- guided,

\- excited,

\- reassured,

\- curious,

\- ready to share their dream trip with Isaac.



Site copy should include:



\- homepage hero,

\- hero eyebrow,

\- hero CTAs,

\- short AI travel consultant preview near the beginning,

\- personal advisor section,

\- cruise section,

\- hotels/resorts section,

\- flights/packages inquiry section,

\- destination inspiration section,

\- testimonials section,

\- blog preview section,

\- about Isaac section,

\- contact/planning form section,

\- final CTA,

\- footer copy,

\- page-specific copy for all routes.



────────────────────────────────────

AI TRAVEL CONSULTANT PREVIEW

────────────────────────────────────



For this phase, the AI travel consultant is only a frontend preview/teaser.



Include it:



\- in the navbar,

\- near the beginning of the homepage,

\- as a polished visual section,

\- as an anchor route.



Recommended nav label:



AI Travel Consultant



Recommended route/anchor:



/#ai-travel-consultant



Do not build backend AI functionality.

Do not claim it is fully operational unless the frontend clearly labels it as preview/coming soon.

Do not claim access to live prices or all travel APIs.



Safe positioning:



“Start with a conversation. IC Vacation’s upcoming AI travel consultant preview helps you organize your ideas, compare travel styles, and prepare a better planning conversation with Isaac.”



The section should include:

\- chat-style mockup,

\- sample traveler prompts,

\- sample advisor-style responses,

\- tool chips such as Cruises, Resorts, Flights, Family Trips, Romance, Food, Culture, Adventure,

\- CTA to Plan My Trip,

\- CTA to Contact Isaac.



────────────────────────────────────

BLOG CONTENT

────────────────────────────────────



Generate blog content locally.



Create:



docs/11-blog-content.md

data/normalized/blog-index.json



Generate 16 blog article drafts.



Each article must include:



\- title,

\- slug,

\- meta title,

\- meta description,

\- target reader,

\- search intent,

\- intro,

\- full article body,

\- suggested images,

\- CTA,

\- internal links,

\- tags/categories.



Use web search where factual grounding is needed.

Keep articles evergreen unless current facts are verified.

Do not invent current prices, schedules, laws, visa rules, cruise departures, or availability.



Suggested topics:



1\. First-Time Cruise Planning: What to Know Before You Sail

2\. How to Choose the Right Cruise Line for Your Travel Style

3\. Family Cruise Planning Without the Stress

4\. Romantic Resort Escapes That Feel Personal

5\. How to Plan a Mexico Resort Vacation

6\. Alaska Cruise Inspiration for First-Time Explorers

7\. Caribbean Cruise Inspiration for Sun, Food, and Culture

8\. How to Choose Shore Excursions Without Overplanning

9\. Cruise Packing Guide for First-Time Travelers

10\. Planning Travel With Children

11\. Why Use a Human Travel Advisor

12\. How to Plan a Stress-Free Vacation

13\. Resort vs Cruise vs City Stay

14\. Hidden Gems, Dining, and Local Experiences

15\. Special Occasion Travel

16\. How to Turn a Vague Vacation Idea Into a Real Itinerary



The blog should sound like IC Vacation, not generic SEO filler.



────────────────────────────────────

SITEMAP AND WIREFRAME

────────────────────────────────────



Create:



docs/09-sitemap-and-wireframe.md

data/normalized/route-map.json



Recommended routes:



\- /

\- /cruises

\- /hotels-resorts

\- /flights-packages

\- /destinations

\- /blog

\- /blog/\[slug]

\- /about-isaac

\- /contact

\- /privacy-policy

\- /terms-of-service

\- /cookie-policy

\- /accessibility



Homepage structure:



1\. Navbar

2\. Cinematic hero

3\. AI Travel Consultant preview mention

4\. Personal advisor intro

5\. Planning pillars

6\. Cruises section

7\. Hotels \& resorts section

8\. Flights/packages inquiry section

9\. Destination inspiration

10\. Search/quote engine preview

11\. Testimonials

12\. Blog preview

13\. About Isaac

14\. Plan My Trip form

15\. Final CTA

16\. Footer



Main nav:



\- Home

\- Cruises

\- Hotels \& Resorts

\- Flights \& Packages

\- Destinations

\- AI Travel Consultant

\- Blog

\- About Isaac

\- Contact

\- Plan My Trip



Footer:



\- Home

\- Cruises

\- Hotels \& Resorts

\- Flights \& Packages

\- Destinations

\- AI Travel Consultant

\- Blog

\- About Isaac

\- Contact

\- Privacy Policy

\- Terms of Service

\- Cookie Policy

\- Accessibility



Each page and section must include:



\- purpose,

\- exact copy,

\- CTA text,

\- CTA target,

\- visual direction,

\- component suggestions,

\- animation suggestions,

\- source reference,

\- responsive behavior,

\- what template section it maps to,

\- required assets/media,

\- implementation notes.



CTA system:



\- Plan My Trip

\- Call Isaac

\- Explore Cruises

\- Explore Hotels \& Resorts

\- Request a Quote

\- Start With a Travel Idea

\- Contact Isaac

\- Preview the AI Travel Consultant



Use the best CTA hierarchy you think will convert.

Default primary CTA: Plan My Trip.



────────────────────────────────────

TEMPLATE MERGE INSTRUCTIONS

────────────────────────────────────



Create:



docs/12-v0-template-analysis.md



Template A, 80%:



Use:

\- dark cinematic canvas,

\- atmospheric hero,

\- minimal nav,

\- sparse premium pacing,

\- large negative space,

\- elegant hero animation/video behavior,

\- three-card blocks,

\- refined scroll rhythm,

\- clean footer visual,

\- luxury-tech calm.



Translate Template A from “distributed compute agents” into:

\- personally planned vacations,

\- Isaac as expert advisor,

\- cruises/hotels/flights/packages,

\- emotional destination planning,

\- curated travel consultation.



Template B, 20%:



Use:

\- strong black/yellow contrast,

\- bold hero typography inspiration,

\- card borders,

\- stats band,

\- feature grid,

\- FAQ pattern,

\- blog/card carousel idea,

\- comparison table style if useful,

\- pricing-card structure adapted into service tiers or planning styles,

\- stronger buttons and hover states,

\- sharper visual finish.



Translate Template B from “pixel-perfect design/dev” into:

\- travel planning precision,

\- custom trip design,

\- cruise/resort/package options,

\- clear planning process,

\- trust and proof.



Do not copy irrelevant text.

Do not keep technology claims.

Use visual structure only.



────────────────────────────────────

ANIMATION AND COMPONENT NOTES

────────────────────────────────────



Use these as v0 implementation notes, not necessarily something to install during scraping:



\- shadcn / Aceternity resizable navbar,

\- Magic UI interactive hover button behavior,

\- Magic UI interactive grid pattern,

\- active nav pill with soft purple glow,

\- hover text decrypt animation if available in the target codebase,

\- rich chat-style AI Travel Consultant preview,

\- modal or page-based Plan My Trip form,

\- responsive sticky navbar,

\- polished footer,

\- cinematic background media,

\- card hover states,

\- Template A-style atmospheric hero animation,

\- Template B-style yellow accent interactions.



Document these in:



docs/14-implementation-tasklist.md

docs/13-v0-drop-in-prompt.md



Do not install frontend components unless needed for analysis.

This phase is to prepare the v0 handoff.



────────────────────────────────────

V0 DROP-IN PROMPT

────────────────────────────────────



Create:



docs/13-v0-drop-in-prompt.md



This must be a polished prompt the user can paste directly into v0.app.



It must be self-contained.



It must include:



\- project objective,

\- brand palette,

\- style direction,

\- Template A / Template B merge instructions,

\- pages/routes,

\- navbar,

\- footer,

\- full sitemap,

\- section-by-section homepage wireframe,

\- page-by-page wireframes,

\- rewritten final copy,

\- blog content placement,

\- booking/search widget requirements,

\- engine integration notes,

\- form requirements,

\- legal footer links,

\- responsive requirements,

\- component/animation requirements,

\- asset/media references,

\- exact CTA links,

\- accessibility requirements,

\- what not to include.



Tell v0:



\- Use Template A for 80% of structure and cinematic layout.

\- Use Template B for 20% of visual polish, contrast, card style, yellow-accent finishing, and section mechanics.

\- Replace all old template text with IC Vacation travel content.

\- Use the IC Vacation brand palette.

\- Create all routes.

\- No dead nav/footer links.

\- Build frontend only.

\- Do not create real bookings/payments.

\- Search widgets may be frontend shells, deep-link builders, or documented API placeholders unless public/authorized APIs are verified.

\- Contact form should be frontend-ready with API route placeholder, not live email sending.

\- AI Travel Consultant is a visual preview/teaser only.

\- Preserve consultation-first positioning.



The v0 prompt must not require v0 to read raw scrape files.

Include the actual content needed inside the prompt.



────────────────────────────────────

LEGAL / FOOTER PAGES

────────────────────────────────────



Create:



docs/15-legal-footer-pages.md

data/normalized/legal-pages.json



Draft starter content for:



\- Privacy Policy

\- Terms of Service

\- Cookie Policy

\- Accessibility Statement



Important:

These are starter drafts, not legal advice.



Use plain English.

Match IC Vacation context.



Mention:

\- travel inquiry data,

\- contact form data,

\- cookies/analytics,

\- third-party booking links,

\- third-party travel partners,

\- external websites,

\- accessibility support,

\- contact email,

\- user rights in broad terms.



Footer must link to these pages.



────────────────────────────────────

FREE API / SEARCH ENGINE RESEARCH

────────────────────────────────────



Create:



docs/17-free-api-research.md



The user does not yet know what flight, hotel, package, or travel search APIs to use.



Do current web research.

Use official provider docs where possible.

Prefer APIs or approaches that can realistically support a first prototype.



Research categories:



\- flight search,

\- flight status,

\- airport autocomplete,

\- airline route/schedule data,

\- hotel search,

\- hotel destination search,

\- cruise data,

\- package search,

\- maps/places,

\- restaurant/local experience discovery,

\- destination images,

\- weather for travel context,

\- currency conversion if useful.



For every option, document:



\- provider name,

\- official URL,

\- API type,

\- free/freemium/paid/partner-only,

\- current published limits,

\- whether commercial use is allowed,

\- data available,

\- authentication requirements,

\- frontend-only possible yes/no,

\- backend proxy needed yes/no,

\- best use in IC Vacation first frontend,

\- risks/limitations.



Do not hardcode any API key.

Do not commit secrets.

Use .env.example only.



If no good free booking API exists for true booking, recommend inquiry-first widgets and deep links.



Suggested first-draft approach:

\- Cruise: use Signature deep-link/search widget behavior if accessible.

\- Hotels/resorts: use provided mytravelsite link/deep-link behavior if accessible.

\- Flights/packages: create inquiry/search-intent form first and document candidate free/freemium APIs for later.

\- Do not promise live booking unless API access is confirmed.



────────────────────────────────────

IMPLEMENTATION TASKLIST

────────────────────────────────────



Create:



docs/14-implementation-tasklist.md



Include:



1\. Critical fixes:

&#x20;  - nav links,

&#x20;  - footer links,

&#x20;  - Plan My Trip CTA,

&#x20;  - contact route,

&#x20;  - legal pages.



2\. v0 build tasks:

&#x20;  - routes,

&#x20;  - sections,

&#x20;  - components,

&#x20;  - assets,

&#x20;  - forms,

&#x20;  - responsive behavior.



3\. Search/engine tasks:

&#x20;  - cruise widget,

&#x20;  - hotel widget,

&#x20;  - flight inquiry widget,

&#x20;  - package planning widget,

&#x20;  - API/deep-link/backend notes.



4\. Design tasks:

&#x20;  - Template A layout,

&#x20;  - Template B finishing,

&#x20;  - brand palette,

&#x20;  - buttons,

&#x20;  - cards,

&#x20;  - nav,

&#x20;  - chatbot preview,

&#x20;  - forms,

&#x20;  - footer.



5\. Content tasks:

&#x20;  - final copy,

&#x20;  - testimonials,

&#x20;  - blog posts,

&#x20;  - metadata,

&#x20;  - image replacement prompts.



6\. Later technical tasks:

&#x20;  - live email sending,

&#x20;  - API keys,

&#x20;  - booking/search integrations,

&#x20;  - analytics,

&#x20;  - production deployment.



Do not implement production-only tasks in this scrape phase.



────────────────────────────────────

QA REQUIREMENTS

────────────────────────────────────



Create:



docs/16-qa-report.md



QA must verify:



\- all target URLs attempted,

\- full public icvacation.com crawl attempted,

\- sitemap/WordPress API checked,

\- all accessible pages scraped,

\- all blocked pages documented,

\- all screenshots saved,

\- all media inventoried,

\- all forms inventoried,

\- all dropdowns/options captured where accessible,

\- all CTAs captured,

\- all nav/footer links captured,

\- engine integration dossier created,

\- source copy preserved separately,

\- rewritten copy created separately,

\- blog drafts generated,

\- sitemap and wireframe created,

\- v0 prompt created,

\- no secrets saved,

\- no cookies/auth tokens in final output,

\- no forms submitted,

\- no bookings attempted,

\- no final frontend built accidentally,

\- final docs are readable,

\- final v0 prompt is self-contained.



Also create:



README.md



README should explain:



\- what was scraped,

\- what was blocked,

\- where the files are,

\- how to use the v0 prompt,

\- what still needs manual input,

\- how to inspect the engine dossier,

\- what the recommended next step is.



If possible, create:



exports/icvacation-redesign-intel.zip



────────────────────────────────────

GITIGNORE / SECRET SAFETY

────────────────────────────────────



Create a .gitignore before any commits.



It must exclude:



.env

.env.local

.env.\*

!.env.example

node\_modules/

playwright/.cache/

.cache/

\*.log

data/raw/har/unredacted/

data/raw/network/unredacted/

data/raw/cookies/

data/raw/session/

cookies.json

storageState.json

\*.token

\*.secret

.DS\_Store



Never commit API keys, cookies, session storage, auth tokens, CSRF tokens, or private browser profiles.



If HAR/network files contain cookies or tokens, save the original only in a clearly marked local unredacted folder and create a redacted copy for deliverables.





────────────────────────────────────

EXTRA OPTIMIZATION

────────────────────────────────────



Treat the booking/search-engine work as a separate dossier, not as ordinary page content.



That part should become:



docs/07-engine-integration-dossier.md

data/normalized/engine-inventory.json

data/raw/har/\*.har



The goal is not to scrape thousands of cruise/hotel results. The goal is to understand enough to rebuild the search UI and integration layer:



fields,

dropdowns,

filters,

query parameters,

agency/advisor IDs,

endpoint patterns,

sample responses,

deep-link behavior,

iframe/embed possibilities,

whether a backend proxy is needed,

what needs authorization.



That is what will actually help you recreate the widget in the new frontend.



────────────────────────────────────

FINAL RESPONSE TO USER

────────────────────────────────────



When finished, respond with:



1\. Local project folder path.

2\. ZIP path if created.

3\. Completed deliverables.

4\. Blocked/missing items.

5\. Firecrawl credit estimate used.

6\. Codex/browser limitations encountered.

7\. Top 10 findings.

8\. Search/booking engine summary.

9\. Exact next step:

&#x20;  Paste docs/13-v0-drop-in-prompt.md into v0.app.



Do not give a vague summary.



Do not ask questions during execution unless:



\- Cloudflare/Turnstile needs human verification,

\- a login is required,

\- a site requires payment/booking,

\- template inspection is blocked,

\- attached files are missing,

\- a decision is absolutely blocking completion.



Otherwise proceed autonomously.

