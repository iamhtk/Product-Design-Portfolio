# Case Study Design System

This document captures the design system used across the portfolio site: **design tokens (variables), UI components, and case study structure.** Use it to build new case studies and to **showcase the design system inside a case study** (e.g. token tables, component gallery).

**Showcasing in a case study:** Copy the **Part 1** token tables (typography, color, spacing, shadow, motion) into your case study content as “Design tokens” or “Foundation.” Use **Part 2** to describe and screenshot the UI component set (Button variants, Input, Badge, Card, Alert, etc.) as a “Component library” or “UI components” section. All values and component names match the live codebase.

---

# For Figma Make / AI design tools

Figma Make (and similar AI tools) work best with **plain specs: hex colors, px sizes, and clear prompts.** Below is a **copy-paste-friendly version** of the design system. Use it as the context/prompt when asking Figma Make to generate frames or components.

**Colors (hex):**
- Background: `#FFFFFF`
- Primary: `#030213` (buttons, key text)
- Primary foreground (text on primary): `#FFFFFF`
- Foreground (body text): `#1A1A24`
- Secondary (secondary buttons/surfaces): `#F0F0F5`
- Muted (muted backgrounds): `#ECECF0`
- Muted foreground (secondary text): `#717182`
- Accent (hover/highlights): `#E9EBEF`
- Destructive: `#D4183D`
- Border: `rgba(0,0,0,0.1)` or `#E5E5E5`
- Input background: `#F3F3F5`

**Typography:** Font: Titillium Web (fallback: system-ui).
- Display: 44px / 46px, Bold (700), -2% letter spacing
- H1: 34px / 36px, Semibold (600)
- H2: 26px / 28px, Semibold (600)
- H3: 22px / 24px, Medium (500)
- Body large: 18px, Regular (400), line height 1.7
- Body: 15px, Regular (400), line height 1.65
- Caption: 13px, Regular (400)
- Overline: 11px, Semibold (600), uppercase, letter spacing 0.22em

**Radius:** Base 10px, Card 12px, Small 6px, Large 10px, XL 14px.

**Shadows (Figma-style):**
- Subtle: Y 1, Blur 2, rgba(0,0,0,0.04)
- Card: Y 2, Blur 8, rgba(0,0,0,0.06)
- Card hover: Y 12, Blur 32, rgba(0,0,0,0.1)

**Example prompts for Figma Make:**
- "Button, primary: bg #030213, text white, 15px Titillium Web Medium, height 36px, padding horizontal 16px, radius 6px."
- "Button, outline: border 1px #E5E5E5, bg transparent, text #030213, same typography and size."
- "Badge: 13px Titillium Web Medium, padding 2px 8px, radius 6px, primary variant bg #030213 text white."
- "Card: white bg, border 1px rgba(0,0,0,0.1), radius 12px, shadow Y 2 Blur 8 rgba(0,0,0,0.06), padding 24px."
- "Input: height 36px, padding 8px 12px, bg #F3F3F5, border 1px #E5E5E5, radius 6px, placeholder #717182, 15px Titillium Web."
- "Alert: border 1px, padding 12px 16px, radius 8px, default variant bg white, destructive variant red border and text #D4183D."

You can paste the whole "For Figma Make" section (or the Part 1 token tables) into the tool's context, then ask for specific components by name (Button, Input, Badge, Card, Alert, etc.).

---

# Part 1 — Design tokens (variables)

All tokens live in `src/styles/globals.css` (`:root`). Use these tables when documenting or showcasing the system in a case study.

## 1.1 Typography tokens

| CSS variable | Value (mobile) | Value (desktop 1024px+) | Class | Use for |
|--------------|----------------|--------------------------|--------|---------|
| `--type-display` | 2.75rem (~44px) | 2.875rem (~46px) | `.type-display` | Hero titles |
| `--type-h1` | 2.125rem (~34px) | 2.25rem (~36px) | `.type-h1` | Page titles |
| `--type-h2` | 1.625rem (~26px) | 1.75rem (~28px) | `.type-h2` | Section titles |
| `--type-h3` | 1.375rem (~22px) | 1.5rem (24px) | `.type-h3` | Subheadings |
| `--type-body-lg` | 1.125rem (18px) | 1.125rem | `.type-body-lg` | Long-form body |
| `--type-body` | 0.9375rem (15px) | 0.9375rem | `.type-body` | Default body, buttons |
| `--type-caption` | 0.8125rem (13px) | 0.8125rem | `.type-caption` | Captions, meta, footer |
| `--type-overline` | 0.6875rem (11px) | 0.6875rem | `.type-overline` | Uppercase labels |

**Font family:** `--font-primary` (Titillium Web + system stack), `--font-mono` (monospace stack).  
**Root font size:** `--font-size: 16px`.

---

## 1.2 Color tokens

**Semantic (use these in UI):**

| Token | Light value | Use for |
|-------|-------------|---------|
| `--background` | #ffffff | Page background |
| `--foreground` | oklch(0.18 0.01 265) | Primary text |
| `--primary` | #030213 | Primary actions, key text |
| `--primary-foreground` | white | Text on primary |
| `--secondary` | oklch(0.95 .0058 264.53) | Secondary buttons/surfaces |
| `--muted` | #ececf0 | Muted backgrounds |
| `--muted-foreground` | #717182 | Secondary text |
| `--accent` | #e9ebef | Hover states, highlights |
| `--destructive` | #d4183d | Errors, destructive actions |
| `--border` | rgba(0,0,0,0.1) | Borders |
| `--input` | transparent | Input border |
| `--input-background` | #f3f3f5 | Input fill |
| `--ring` | oklch(0.708 0 0) | Focus rings |

**Chart / data viz:** `--chart-1` … `--chart-5` (oklch colors).  
**Card:** `--card`, `--card-foreground` (white / dark text).  
**Dark mode:** All semantic tokens are overridden in `.dark`.

---

## 1.3 Spacing & radius

| Token | Value | Use for |
|-------|--------|---------|
| `--radius` | 0.625rem (10px) | Base radius |
| `--radius-card` | 0.75rem (12px) | Cards, panels |
| `--radius-sm` | calc(var(--radius) - 4px) | Small elements |
| `--radius-md` | calc(var(--radius) - 2px) | Medium |
| `--radius-lg` | var(--radius) | Large |
| `--radius-xl` | calc(var(--radius) + 4px) | Extra large |
| `--nav-height` | 4.5rem | Header height, scroll offset |

**Common spacing in layout:** `px-6 md:px-12`, `py-12 md:py-16`, `gap-6` / `gap-8` / `gap-12` / `gap-16`.

---

## 1.4 Shadow tokens

| Token | Value | Use for |
|-------|--------|---------|
| `--shadow-subtle` | 0 1px 2px rgba(0,0,0,0.04) | Very light elevation |
| `--shadow-card` | 0 2px 8px rgba(0,0,0,0.06) | Cards at rest |
| `--shadow-card-hover` | 0 12px 32px rgba(0,0,0,0.1) | Cards on hover |
| `--shadow-depth` | 0 20px 40px …, 0 4px 12px … | Elevated panels |
| `--shadow-elevated` | 0 8px 24px rgba(0,0,0,0.08) | Dropdowns, popovers |
| `--shadow-glass` | 0 4px 24px rgba(0,0,0,0.06) | Glass surfaces |
| `--shadow-expanded` | 0 16px 48px …, 0 4px 16px … | Modals, expanded state |
| `--shadow-nav-scrolled` | 0 4px 20px rgba(0,0,0,0.06) | Nav after scroll |

**Usage in Tailwind:** `shadow-[var(--shadow-card)]`, etc.

---

## 1.5 Motion

| Token | Value | Use for |
|-------|--------|---------|
| `--transition-premium` | 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94) | Cards, hover, modals |

**Liquid glass (nav, buttons, progress bar, dialogs):** Backdrop blur + light border + shadow; see classes `.liquid-glass`, `.liquid-glass-btn`, `.liquid-glass-progress-strip`, `.liquid-glass-overlay`, `.liquid-glass-dialog-panel` in `globals.css`.

---

# Part 2 — UI components

Components live in `src/components/ui/`. They use the design tokens above. Use this catalog when showcasing the system in a case study.

## 2.1 Button

**Import:** `import { Button } from '@/components/ui/button';`

**Variants:** `default` | `destructive` | `outline` | `secondary` | `ghost` | `link`  
**Sizes:** `default` (h-9) | `sm` (h-8) | `lg` (h-10) | `icon` (square)

| Variant | Appearance |
|---------|------------|
| default | Primary background, primary-foreground text |
| destructive | Red (destructive token), white text |
| outline | Border, background, hover accent |
| secondary | Secondary background |
| ghost | Transparent, hover accent |
| link | Underline, primary color |

**Typography:** Body (15px), font-medium. Focus: ring 3px, ring color `--ring`.

---

## 2.2 Input

**Import:** `import { Input } from '@/components/ui/input';`

Single-line text input. Height `h-9`, rounded-md, border, `--input-background`. Placeholder uses `--muted-foreground`. Focus: border-ring, ring 3px. Typography: body (15px). File upload styling: type-body, font-medium.

---

## 2.3 Badge

**Import:** `import { Badge } from '@/components/ui/badge';`

**Variants:** `default` | `secondary` | `destructive` | `outline`

Small label/pill. Typography: **Caption** (13px), font-medium. Padding `px-2 py-0.5`, rounded-md, border. Use for tags, status, counts.

---

## 2.4 Card

**Import:** `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction } from '@/components/ui/card';`

- **Card** — Container: `bg-card`, `text-card-foreground`, rounded-xl, border, flex flex-col gap-6.
- **CardHeader** — Top section, optional border-b.
- **CardTitle** — Heading (add your own type class, e.g. `type-h3`).
- **CardDescription** — Muted text (uses `text-muted-foreground`).
- **CardContent** — Main body, px-6, pb-6.
- **CardFooter** — Bottom, flex items, optional border-t.
- **CardAction** — Optional action slot in header (e.g. button).

Use for feature blocks, testimonials, or any grouped content in a case study.

---

## 2.5 Alert

**Import:** `import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';`

**Variants:** `default` | `destructive`

Banner with optional icon (grid layout). Typography: body. **AlertTitle** — font-medium. **AlertDescription** — muted-foreground, leading-relaxed. Use for callouts or notices in a case study.

---

## 2.6 Separator

**Import:** `import { Separator } from '@/components/ui/separator';`

Horizontal or vertical 1px line using `--border`. `orientation="horizontal" | "vertical"`, `decorative` for accessibility.

---

## 2.7 Progress

**Import:** `import { Progress } from '@/components/ui/progress';`

Radix-based progress bar. Height h-2, rounded-full, `bg-primary/20` track, `bg-primary` indicator. Pass `value={0–100}`. Use for loading or scroll progress (case study template uses a custom liquid-glass strip for scroll).

---

## 2.8 Other UI components (reference)

| Component | Path | Purpose |
|-----------|------|---------|
| Tabs | `ui/tabs.tsx` | Tabbed content |
| Select | `ui/select.tsx` | Dropdown select |
| Dialog | `ui/dialog.tsx` | Modal dialog |
| Sheet | `ui/sheet.tsx` | Slide-out panel |
| Accordion | `ui/accordion.tsx` | Expand/collapse |
| Label | `ui/label.tsx` | Form labels |
| Textarea | `ui/textarea.tsx` | Multi-line input |
| Toggle | `ui/toggle.tsx` | Toggle button |
| Tooltip | `ui/tooltip.tsx` | Hover tooltip |
| Table | `ui/table.tsx` | Data tables |
| Breadcrumb | `ui/breadcrumb.tsx` | Breadcrumb nav |

All use the same tokens (primary, muted, border, radius, type-body/type-caption) for consistency.

---

# Part 3 — Typography usage & case study layout

**Rule: Use only the 8 core type sizes. No ad-hoc pixel sizes (e.g. no 14px).**

Use the **type-*** classes in markup (tokens in Part 1.1).

### Type scale quick reference (mobile → desktop)

| Token | Class | Mobile | Desktop (1024px+) | Use for |
|-------|--------|--------|--------------------|---------|
| Display | `.type-display` | ~44px | ~46px | Hero titles, large marketing headlines |
| H1 | `.type-h1` | ~34px | ~36px | Case study main title (optional; see layout) |
| H2 | `.type-h2` | ~26px | ~28px | Section titles |
| H3 | `.type-h3` | ~22px | 24px | Subheadings |
| Body large | `.type-body-lg` | 18px | 18px | Long-form body, intro paragraphs, speed-read content |
| Body | `.type-body` | 15px | 15px | Default body, meta, links, buttons |
| Caption | `.type-caption` | 13px | 13px | Captions, labels, “Company”, “When”, read time, footer |
| Overline | `.type-overline` | 11px | 11px | Section labels (e.g. “Speed Read”, “Explore more”), uppercase labels |

### Typography in case studies

- **Case study hero title**: Large custom size in template (e.g. `text-[48px] md:text-[64px] lg:text-[72px]`) — maps to **Display** scale.
- **Subtitle under title**: Use **H2**-sized body (e.g. `text-[26px] md:text-[28px] lg:text-[30px]`) with `leading-relaxed`, `text-gray-700`.
- **Section labels** (e.g. “Speed Read”, “Challenge”, “Process”): **Overline** — `type-overline` or `text-[11px] tracking-[0.2em] text-gray-400 uppercase font-medium`.
- **Speed-read paragraphs**: **Body large** — `type-body-lg` or `text-[18px] leading-[1.85] text-gray-700`.
- **Left sidebar meta** (Company, My Deliverables, Team, When): Label = **Overline** (11px), value = **Body large** (18px).
- **Body content blocks**: **Body large** — `text-[18px] leading-[1.85] text-gray-700`.
- **Back button / footer / “Explore more” links**: **Body** or **Caption** — e.g. `type-body` or `text-[13px] text-gray-500`.
- **“Explore more” section**: Label “Explore more” = **Overline**; project titles = **Body** (15px) or slightly larger (17px) for emphasis.

**Do not use:** `text-sm`, `text-xs`, or arbitrary `text-[14px]` — they are not part of the scale. Use `type-body` (15px) or `type-caption` (13px) instead.

---

## 4. Color (case study usage)

### Brand & UI (from `globals.css`)

- **Primary**: `#030213` (near black) — primary text, buttons.
- **Background**: `#ffffff` (page and cards).
- **Foreground (text)**: `oklch(0.18 0.01 265)` — primary text.

### Case study–specific grays (Tailwind)

Use these for hierarchy and readability:

- **Primary text / headings**: `text-gray-900`
- **Subtitle / body**: `text-gray-700`
- **Secondary / meta**: `text-gray-500`
- **Labels / overline**: `text-gray-400`
- **Muted / disabled**: `text-gray-400`, `text-gray-500`

### Accent per case study

Each case study defines its own:

- **Header banner**: `headerColor` (e.g. `#6366F1`) — full-width top banner.
- **Progress bar**: `progressBarColor` (scroll indicator).
- **Scroll-to-content arrow**: `arrowColor` (defaults to `headerColor`).

Use hex or CSS variables; keep contrast accessible.

---

## 5. Spacing & layout

### Container widths

- **Case study content**: `max-w-[1200px] mx-auto px-6 md:px-12 py-12 md:py-16`.
- **Footer**: `max-w-[1600px] mx-auto px-6 md:px-8 lg:px-12`.

### Grid (case study main column + sidebar)

- **Layout**: `grid grid-cols-1 md:grid-cols-[240px_1fr] gap-12 md:gap-16`.
- **Left column**: 240px on desktop; meta (Company, Role, Team, When), icon, Back button.
- **Right column**: Title, subtitle, Speed Read, then content blocks.

### Vertical rhythm

- **Between major sections**: `space-y-16` or `mt-16`.
- **Within section**: `space-y-6` or `space-y-8`.
- **Between label and value**: `space-y-2` or `space-y-4`.
- **Footer**: `pt-12 pb-8`.

### Header banner

- **Height**: `h-[300px] md:h-[500px]`.
- **Content**: Centered; image or video with `object-contain`, or placeholder icon.

---

## 6. Shadows & elevation

Use CSS variables from `globals.css`:

- **Subtle**: `--shadow-subtle` — very light (e.g. tiles at rest).
- **Card**: `--shadow-card` — default card.
- **Card hover**: `--shadow-card-hover` — lift on hover.
- **Depth**: `--shadow-depth` — elevated panels.
- **Glass / progress bar**: `--shadow-glass`, `--shadow-nav-scrolled`.

**Case studies:** Use `shadow-[var(--shadow-subtle)]` or `shadow-[var(--shadow-card)]` on image containers in “Explore more” tiles; hover can use `shadow-[var(--shadow-card)]` or `--shadow-card-hover`.

---

## 7. Case study page structure (order)

Build each case study in this order:

1. **ScrollToTop** (component).
2. **Progress bar** (optional) — fixed top, liquid glass style, width = scroll %; use `progressBarColor`.
3. **Header banner** — full width, `headerColor`, image/video or icon.
4. **Main container** — `max-w-[1200px]`, grid with sidebar + content.
   - **Left column**: Icon (optional), meta (Company, My Deliverables, Team, When), “← Back to Work” (desktop).
   - **Right column**:
     - “← Back to Homepage” (mobile only).
     - **Hero**: Title (display size) + subtitle (H2-size).
     - **Speed Read**: Label “Speed Read”, then 2-column grid (Challenge, Process, Takeaways, Impact); CTA “Click the arrow to read the entire case study” + arrow button.
     - **Case study content** (when visible): List of **ContentBlock**s (see below).
     - **ExploreMoreSection** (previous/next project tiles).
     - “← Back to Work” (mobile only, below content).
5. **Footer** — “Designed and Developed.”, “© 2026”, social links; `type-caption` or 13px, `text-gray-500`.

---

## 8. Content block types

Case study body is an array of **ContentBlock**s (see `src/components/projects/types.ts`). Order in array = order on page.

| Type | Purpose | Example |
|------|--------|--------|
| `text` | Paragraph with optional section header | `{ type: 'text', header: 'THE PROBLEM', content: '...' }` |
| `textBullets` | Bullet list with optional header | `{ type: 'textBullets', header: 'FINDINGS', items: ['...', '...'] }` |
| `image` | Full-width image or video | `{ type: 'image', src: '/path.jpg' }` |
| `textImageRow` | Two columns: text + image/video | `{ type: 'textImageRow', header: '...', content: '...', src: '...' }` |
| `textTextRow` | Two columns: text + text | `{ type: 'textTextRow', headerLeft: '...', contentLeft: '...', headerRight: '...', contentRight: '...' }` |
| `colors` | Color palette swatches | `{ type: 'colors', colors: ['#hex', ...] }` |

**Rendering:**

- **Section headers** in blocks: **Overline** — 11px, uppercase, `tracking-[0.2em]`, `text-gray-400`.
- **Body text** in blocks: **Body large** — 18px, `leading-[1.85]`, `text-gray-700`.
- **Lists**: `pl-6`, `list-style-type: disc`, same body large.

Optional: `indent` / `indentLevel` on blocks for visual nesting (e.g. `marginLeft: '2.5rem'`).

---

## 9. Components to use (case study)

- **ScrollToTop** — `import { ScrollToTop } from '../ScrollToTop';`
- **ExploreMoreSection** — `import { ExploreMoreSection } from './ExploreMoreSection';`  
  Props: `currentProjectId`, `onBack`, `onProjectClick`.
- **ImageWithFallback** — `import { ImageWithFallback } from '../figma/ImageWithFallback';` for images.
- **Scroll-to-case-study arrow** — use `getArrowGradientColors(arrowColor)` from `./arrowGradient` for the SVG arrow that scrolls to `#case-study-start`.
- **Footer** — reuse the same footer markup (Designed and Developed, © 2026, social links) and `data-footer` if needed for styling.

---

## 10. Checklist for a new case study

1. **Copy** an existing case study file (e.g. `CWPC.tsx`) and rename (e.g. `MyProject.tsx`).
2. **Set** `CURRENT_PROJECT_ID` to the project id used in `projectOrder.ts`.
3. **Fill** all content variables: `title`, `company`, `subtitle`, `headerColor`, `progressBarColor`, `arrowColor`, `icon`, `headerIcon`, `role`, `team`, `when`, `overview`, `speedReadChallenge`, `speedReadProcess`, `speedReadTakeaways`, `speedReadImpact`.
4. **Build** the `blocks` array (order = page order) using only the block types in §6.
5. **Use only** the type scale (§1) and colors (§2); no 14px or random font sizes.
6. **Register** the project:
   - In `src/components/projects/index.tsx`: add import and add entry to `projectComponents`.
   - In `src/components/projects/projectOrder.ts`: add to `PROJECT_ORDER`, set `PROJECT_ENABLED[id]`, and add `PROJECT_TILE_MEDIA[id]` (image + bgColor).
7. **Optional**: Add to `PROJECT_TILE_MEDIA` and homepage project list if it should appear on the homepage.

---

## 11. Quick reference — CSS classes by role

| Role | Classes |
|------|--------|
| Section label (overline) | `type-overline` or `text-[11px] tracking-[0.2em] text-gray-400 uppercase font-medium` |
| Body large (paragraphs) | `type-body-lg` or `text-[18px] leading-[1.85] text-gray-700` |
| Body (default) | `type-body` or `text-[15px]` + color |
| Caption / meta / footer | `type-caption` or `text-[13px] text-gray-500` |
| Hero title | `text-[48px] md:text-[64px] lg:text-[72px] leading-[1.1] font-bold text-gray-900 tracking-tight` |
| Hero subtitle | `text-[26px] md:text-[28px] lg:text-[30px] text-gray-700 leading-relaxed font-medium` |
| Back link | `type-body text-gray-500 hover:text-gray-900 transition-colors` |
| Footer container | `flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-12 pb-8 type-caption text-gray-500` |

---

*This design system is derived from the current portfolio implementation. When in doubt, match existing case studies (e.g. CWPC, bound, productivity) and use only the 8 type sizes and the tokens above.*
