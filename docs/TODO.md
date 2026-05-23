# IC Vacation — Pending Tasks

> Items that need attention in future development sessions.

---

## High Priority (User Explicitly Requested)

### 1. Hero Viewport Fit
**Status**: Partially done, needs verification
**Issue**: User reported hero content overflows beyond first viewport
**Action**: Ensure headline, subtext, buttons, and stats all fit within `100svh`

### 2. Navbar Orb Animation
**Status**: Implemented but may need refinement
**User's exact vision**:
- Initial state: Circular neon-yellow glowing orb containing slowly rotating grey dandelion
- The orb pulses with neon glow
- On first scroll: Terminal boot-up sequence animation
- Then expands into centered glassmorphic pill navbar
- Nav items: Sliding neon-yellow underline on hover + tandem font-weight animation

### 3. Typography Overhaul
**Status**: Not satisfied
**User quote**: "plain boring generic fonts, plain boring generic font styles"
**Requirements**:
- Different fonts for different storytelling levels
- Creative variable font axis usage (width, weight, optical size)
- Text gradients on headlines
- Letter animations (reveals, morphs)
- Opacity variations, ghost text effects
- "Letters that speak creativity in design language"

### 4. Mascot Redesign
**Status**: Placement improved but not creative enough
**User quote**: "play around with the path vectors, apply modifications to the svg"
**Requirements**:
- Modify SVG paths directly to create unique variants
- Adjust shapes, colors, strokes, shadows
- Apply animations to mascots
- Make each instance feel like a "new version"
- Better integration with surrounding content (less spacing)

### 5. Contact Modal Testing
**Status**: Implemented
**Action**: Test all contact buttons/links site-wide to ensure they open modal

---

## Medium Priority

### 6. Background Boxes Variety
**User request**: Don't make them all look like each other
**Action**: Create more visual variety in how background-boxes appear across pages

### 7. Mobile Responsiveness Pass
**User quote**: "mobile is a critical platform"
**Action**: Comprehensive testing across all breakpoints, especially:
- Hero section on small screens
- Navigation mobile menu
- Card grids stacking
- Typography scaling

### 8. Legal Pages Content
**Status**: Stub pages exist
**Action**: Populate with real content for:
- `/privacy`
- `/terms`
- `/cookies`
- `/accessibility`

### 9. Blog Content Expansion
**Status**: Sample posts in `lib/blog-data.ts`
**Action**: Either expand static content or integrate CMS

---

## Lower Priority

### 10. AI Consultant Preview
**Status**: Marked as "PREVIEW / Coming Soon"
**Future**: When ready, this will need actual AI integration

### 11. Plan My Trip Form
**Status**: Component exists at `components/site/plan-my-trip-form.tsx`
**Action**: Integrate into appropriate locations if needed

### 12. Performance Optimization
- Image optimization (next/image usage)
- Font subsetting
- Animation performance on mobile

### 13. SEO Enhancement
- Meta tags for all pages
- Open Graph images
- Structured data

---

## Bugs to Investigate

1. **Hero overflow** — Verify `100svh` works across all browsers
2. **Navbar transition** — May have jank on fast scroll
3. **Contact modal** — Test form submission error states
4. **Background boxes** — Performance on lower-end devices

---

## Feature Ideas (Not Yet Requested)

- Newsletter signup integration
- Destination detail pages (`/destinations/[slug]`)
- Trip gallery/portfolio section
- Client login area
- Booking system integration (if ever needed)
- Multi-language support

---

## Technical Debt

1. Some sections may still use `<a href="#contact">` instead of `useContact()`
2. Mascot component `outline` variant needs SVG stroke implementation
3. Blog content is static — consider CMS integration
4. No testing framework set up
5. No CI/CD pipeline configured beyond Vercel auto-deploy

---

## Assets Needed

1. More destination images for card variety
2. Isaac's professional photo for about page
3. Client testimonial photos (if using real testimonials)
4. Blog post featured images

---

## Questions for User

1. Should the AI Consultant preview be interactive or purely visual?
2. Are there specific cruise lines, hotels, airlines to feature?
3. Real testimonials available or should we continue with placeholder?
4. Legal copy — will you provide or should we draft?
5. Blog — static content or integrate with CMS like Sanity/Contentful?
