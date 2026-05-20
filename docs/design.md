# IC Vacation — Design System

> This document captures all brand guidelines, design decisions, and visual patterns for the IC Vacation website.

---

## Brand Color Palette

### Primary Colors (80% of all colored elements)

| Name | Hex | Usage |
|------|-----|-------|
| **Main Green** | `#26FC00` | Primary accent, CTAs, highlights, links |
| **Main Grey** | `#444444` | Secondary text, borders, muted elements |
| **Main Black** | `#000000` | Backgrounds, primary text |
| **Main White** | `#FFFFFF` | Text on dark, cards, contrast |

### Accent Colors (20% of colored elements)

| Name | Hex | Usage |
|------|-----|-------|
| **Pale Yellow** | `#FDF972` | Soft highlights, hover states |
| **Olive** | `#94BD00` | Secondary accent, badges |

### Grey Gradient Scale

For subtle gradations and glassmorphism effects:

```
#697174 → #54585D → #464B4E → #3F4245 → #333537 → #252426
```

### CSS Variables (in globals.css)

```css
--brand-green: #26FC00;
--brand-yellow: #FDF972;
--brand-olive: #94BD00;
--brand-grey: #444444;
--grey-600: #697174;
--grey-500: #54585D;
--grey-400: #464B4E;
--grey-300: #3F4245;
--grey-200: #333537;
--grey-100: #252426;
```

### Color Rules

1. **NO purple** — Was accidentally introduced, user explicitly rejected
2. **NO orange/amber** — Not in brand palette
3. **Green is the star** — Use it confidently but not excessively
4. **Black dominates** — The site should feel like a premium noir editorial
5. **White for contrast** — Text, cards, and key UI elements

---

## Typography System

### Font Stack (Current Implementation)

| Purpose | Font | CSS Class | Notes |
|---------|------|-----------|-------|
| Display Headlines | Bricolage Grotesque | `font-display` | Variable font with width axis |
| Editorial/Body | Instrument Serif | `font-serif` | Elegant, readable |
| UI/Labels | Inter Tight | `font-sans` | Clean, modern |
| Code/Technical | JetBrains Mono | `font-mono` | Monospace for stats, labels |
| Command/Nav | Anton | `font-command` | Bold, commanding |

### User Feedback on Typography

The user explicitly stated the current fonts are "plain boring generic" and wants:

1. **Different fonts for different storytelling levels** — Headlines should feel completely different from body text
2. **Creative variable font axis usage** — Play with width, weight, optical size
3. **Text gradients** — Especially on hero headlines
4. **Letter animations** — Characters that reveal, shift, or transform
5. **Opacity variations** — Ghost text, layered text effects
6. **Letters that "speak creativity"** — Typography as a design element, not just content

### Typography Hierarchy

```
LEVEL 1: Hero Headlines
- Massive scale (text-7xl to text-9xl)
- Display font with creative styling
- Potential gradient fills
- Animated reveals (DiaTextReveal)

LEVEL 2: Section Headlines
- Large scale (text-4xl to text-6xl)
- Display font
- Tight tracking

LEVEL 3: Card/Feature Titles
- Medium scale (text-xl to text-2xl)
- Sans or display font
- Medium weight

LEVEL 4: Body Copy
- Standard scale (text-base to text-lg)
- Serif font for editorial feel
- Relaxed leading (1.6-1.7)

LEVEL 5: Labels/Captions
- Small scale (text-xs to text-sm)
- Monospace for technical feel
- Uppercase with wide tracking
- Format: "[ 01 ] // SECTION NAME"
```

### Section Label Pattern

```tsx
<span className="inline-flex items-center gap-3 text-xs font-mono uppercase tracking-[0.22em] text-muted-foreground">
  <span className="w-12 h-px bg-brand-green" />
  [ 02 ] // Section Title
</span>
```

---

## Component Patterns

### Buttons

**Primary (Green)**
```tsx
<button className="btn-primary group">
  Label
  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
</button>
```

**Glass (Transparent)**
```tsx
<button className="btn-glass">
  Label
</button>
```

**Pixel Button (with hover pixelation effect)**
```tsx
<PixelButton variant="green" onClick={fn}>
  Book a consultation
</PixelButton>
```

### Cards

**Glass Card**
```tsx
<div className="glass-card p-6">
  Content
</div>
```

**Feature Card**
```tsx
<div className="border border-foreground/10 bg-background/50 backdrop-blur-sm p-6 hover:border-brand-green/30 transition-all">
  Content
</div>
```

### Glassmorphism

The user specifically requested "neu glassmorphism" effects:

```css
.glass-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

/* With neon glow */
.glass-card-glow {
  box-shadow: 
    0 0 20px rgba(38, 252, 0, 0.15),
    inset 0 0 20px rgba(38, 252, 0, 0.05);
}
```

---

## Animation Patterns

### DiaTextReveal

Character-by-character reveal for cycling words:

```tsx
<DiaTextReveal
  words={["quietly", "thoughtfully", "personally", "beautifully"]}
  className="text-brand-green"
/>
```

### Pixelation Hover

6x3 grid tiles that cascade from color to black:

```tsx
<PixelButton variant="green">
  // Tiles animate on hover
  // Text inverts from black to white
</PixelButton>
```

### Navbar Orb Expansion

User's vision (needs refinement):
1. Initial: Circular orb with rotating grey dandelion
2. Orb pulses with neon yellow glow
3. On scroll: Terminal boot-up sequence text
4. Expands into centered pill navbar
5. Nav items have sliding underline + weight animation on hover

### Mascot Animations

```tsx
<Mascot 
  type="owl" 
  variant="neon"      // neon | glow | ghost | outline
  size="lg"           // sm | md | lg | xl
  className="animate-drift"
/>
```

Available animations:
- `animate-drift` — Slow floating motion
- `animate-drift-slow` — Even slower floating
- `animate-spin-slow` — Slow rotation (12s)

---

## Mascot Usage

### Types & Contexts

| Mascot | Context | Meaning |
|--------|---------|---------|
| **Owl** | AI Consultant, Advisor sections | Wisdom, guidance |
| **Penguin** | Cruises, Family travel | Fun, adventure |
| **Bird** | Flights, Journey, Start | Freedom, takeoff |
| **Dandelion** | Brand identity, Transitions | Wishes, travel dreams |

### Variants

| Variant | Effect |
|---------|--------|
| `neon` | Strong green glow, high contrast |
| `glow` | Soft ambient glow |
| `ghost` | Low opacity, subtle presence |
| `outline` | Stroke only, no fill |

### User Feedback

"The sizes, positions, and alignments of how you rendered and placed the 3 svg mascot is not Acceptable at all... play around with the path vectors, apply modifications to the svg so it would seem like a whole new version of the mascot."

**Action needed**: Modify SVG paths directly to create unique variants — adjust shapes, add strokes, apply drop shadows, create animation states.

---

## Layout Patterns

### Max Widths

```
Hero: 100% (full bleed)
Content sections: max-w-[1440px]
Narrow content: max-w-[1100px]
Article prose: max-w-[720px]
```

### Section Spacing

```
Vertical padding: py-24 lg:py-32
Between sections: border-t border-foreground/10
Inner spacing: px-6 lg:px-12
```

### Grid Patterns

```tsx
// 12-column grid
<div className="grid lg:grid-cols-12 gap-8">
  <div className="lg:col-span-7">Main</div>
  <div className="lg:col-span-5">Side</div>
</div>

// Card grid
<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => <Card />)}
</div>
```

---

## Background Patterns

### Background Boxes

Animated grid that highlights on mouse hover:

```tsx
<BackgroundBoxes 
  variant="green"  // green | yellow | grey
  className="opacity-25" 
/>
```

Used in sections with large empty space to add visual interest without content.

### Particle Fields

Subtle floating dots used in hero and transition zones:

```css
.particle {
  width: 2px;
  height: 2px;
  background: rgba(38, 252, 0, 0.3);
  border-radius: 50%;
  animation: float 20s infinite;
}
```

---

## Responsive Breakpoints

```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### Mobile Considerations

- Navigation collapses to hamburger below lg
- Full-screen mobile menu overlay
- Typography scales down proportionally
- Cards stack vertically
- Mascots hidden on mobile (`hidden lg:block`)
- Touch targets minimum 44x44px

---

## Image Guidelines

### Hero Images

- Cinematic, editorial quality
- Mountain landscapes, coastal scenes, luxury settings
- No people in primary focus (lifestyle over faces)
- Dark, moody atmosphere preferred
- Current: Mountain lake with rowboat

### Destination Cards

- Location-specific imagery
- Consistent aspect ratio (4:3)
- Color grading that complements brand palette

### Blog/Journal

- Editorial photography
- Authors can be shown in blog contexts
- Drop caps for article intros

---

## Iconography

Using Lucide React icons throughout:

```tsx
import { ArrowUpRight, Check, X, Menu, ChevronDown } from "lucide-react";
```

Common patterns:
- `ArrowUpRight` on CTAs and links
- `Check` for feature lists
- `ChevronDown` for accordions
- Consistent sizing: `w-4 h-4` for inline, `w-5 h-5` for standalone

---

## Dark Mode

The site is dark-mode only. No light mode toggle exists or is planned.

```tsx
// In layout.tsx
<ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
```

---

## Accessibility

- All images have alt text (decorative mascots use `alt=""` and `aria-hidden="true"`)
- Focus states use brand-green outline
- Interactive elements have visible hover/focus states
- Color contrast meets WCAG AA for text
- Skip links and semantic HTML structure

---

## Future Design Directions

Based on user feedback, future iterations should explore:

1. **Bolder typography** — More experimental font choices
2. **Text animations** — Reveals, morphs, glitches
3. **SVG manipulation** — Custom mascot variants via path editing
4. **Micro-interactions** — Hover states that delight
5. **Parallax depth** — Layered scrolling effects (done carefully)
6. **Video backgrounds** — For hero if performance allows
