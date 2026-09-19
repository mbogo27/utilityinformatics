# Utility Informatics — Website Rebuild Spec (Astro)

**Purpose of this document:** hand this to Claude Code (or any builder) to rebuild
utilityinformatics.co.ke from scratch as a static Astro site. It replaces the current
WordPress/Elementor build. Everything here is derived from two sources: the live site
(fetched September 2026) and the company's own 2026 Company Profile PDF, which is the
newer and more authoritative statement of positioning, service structure, and brand.
Where the two disagree, this spec follows the profile and flags the conflict below.

---

## 1. Positioning thesis

**Utility Informatics is a data services firm.** Not an AI shop, not a dev shop, not a
BI vendor — a firm that sits across the whole lifecycle a piece of data travels through,
from the moment it's captured to the moment it changes a decision. That lifecycle *is*
the product architecture, the site's information architecture, and the sales pitch, all
at once:

> **Collection → Systems → Visualization → Workflow & Automation → Insights**

Every service the firm sells is a stage in that loop, not a standalone offering. The
current live site presents six-to-nine services as a flat, undifferentiated grid with no
organizing logic. The rebuild's central job is to make the lifecycle the spine of the
entire site, not just a slide in the deck.

Tagline (from brand): **"Enhancing data utilization."**

### 1.1 Conflicts between the live site and the profile — resolved in favor of the profile

| Item | Live site | Profile (authoritative) | Spec follows |
|---|---|---|---|
| Service count/structure | 9 flat services, no grouping | 5 pillars, 7 services nested under them | Profile |
| Background Checks & Screening | Present as a 9th service | Absent entirely | **Drop it** |
| Bulk Messaging | Standalone service | Folded into "AI Customer Engagement" | **Fold it in** |
| Social proof | 4 client testimonials (quotes, named people, no client logos on record) | 2 named, real portfolio pieces (Duka Bee, Jamii Smiles Dental) with live URLs | **Replace testimonials with portfolio** — this was already flagged as a credibility risk for a pre-/low-revenue firm; the profile itself made this swap |
| "Why us" stats | "Projects / Years of Experience / Satisfied Clients" counters that render as empty (no real numbers wired up) | Three qualitative pillars, no invented numbers | **Drop the fake counters.** Don't replace them with new invented numbers either — if real numbers exist, supply them; otherwise the qualitative pillars carry that section alone |
| "Actual Services" label | Live bug — a service card literally titled "Actual Services (Predictive Analytics)," a placeholder that was never replaced | N/A | **Fixed automatically** by the rebuild — this is exactly why a copy pass matters |
| Nav "Resources" | Dead link (`#`), goes nowhere | Not mentioned | **Drop from nav** until there's an actual Resources/Insights section to point it at |

### 1.2 One open flag, not resolved by either source

The profile lists **AI Customer Engagement** (AI customer service automation, bulk
messaging) as a Utility Informatics service under Workflow & Automation. A prior strategy
conversation raised that this may overlap with Weyntech, a related AI infrastructure
venture, and suggested Weyntech own that offering outright to avoid two ventures
competing for the same buyer. The profile — the newer, client-approved document — keeps
it under Utility Informatics, so this spec keeps it too. Flagging it here so the decision
gets made consciously rather than by default before this ships.

---

## 2. Sitemap

```
/                      Home
/services              Services (the five-pillar lifecycle, full depth)
/portfolio             Portfolio (Duka Bee, Jamii Smiles Dental, + room to grow)
/about                 About (mission, the pipeline logic, why us)
/contact               Contact (address, phone/WhatsApp, email, form)
```

Five routes. No blog/Resources route yet — nothing to put there. No individual
service-detail pages (`/services/bi-visualization` etc.) at launch — seven services is
thin enough to keep on one page with anchors; revisit only once individual services have
enough distinct content (case studies, pricing, FAQs) to justify their own URL.

---

## 3. Design system

### 3.1 Design plan

**Color** — the existing logo and profile deck already establish a real palette (dark
charcoal, gold, white, warm off-white). The rebuild keeps it — it's earned brand equity,
not a placeholder — but tightens the exact values so nothing reads as generic
near-black-plus-neon:

| Token | Hex | Use |
|---|---|---|
| `--ink` | `#17161A` | Primary dark surface (warm black, not flat `#000`/`#0B0B0B`) |
| `--paper` | `#F4F2ED` | Primary light surface (warm off-white, not cool grey) |
| `--white` | `#FFFFFF` | Cards on `--paper`, text on `--ink` |
| `--gold` | `#B8912F` | Primary accent — from the existing logo mark |
| `--gold-bright` | `#D4AF37` | Hover/active states, small highlights only |
| `--stone` | `#6B6860` | Secondary/muted text on light surfaces |
| `--stone-on-ink` | `#B7B3A8` | Secondary/muted text on dark surfaces |
| `--line` | `#E3DFD5` | Hairline borders on light surfaces |
| `--line-on-ink` | `rgba(255,255,255,0.12)` | Hairline borders on dark surfaces |

Gold is a signal, not a fill — use it for numerals, active nav state, the one CTA button
per view, and line accents. Don't tint large surfaces gold; it reads cheap fast.

**Type** — one serif, one sans, clearly distinct roles, chosen for what this firm
actually is: a research-and-systems firm serving NGOs, donors, and enterprises, not a
consumer SaaS product.

- **Display/headlines:** Newsreader (serif, variable). Gives the site institutional,
  research-report gravitas instead of the default SaaS-grotesque look every AI/BI vendor
  site converges on. Use at high optical size (`opsz` axis up) for H1/H2, regular weight
  — avoid bolding a serif display face, let size carry the weight.
- **Body/UI:** Public Sans. Built for public-data and civic-service contexts (US Web
  Design System heritage) — it's legible, technical without being cold, and fits a firm
  whose actual differentiator is research rigor. Used for body copy, nav, buttons, form
  labels, and — with tabular figures — any numerals or data callouts. No separate
  monospace face for data labels; Public Sans's tabular numeral set does that job without
  the "techy monospace" cliché.
- Line length: body copy capped around 70ch. Headlines can run wider.

**Layout** — left-aligned throughout, not centered. A centered, symmetrical layout reads
as brochure-template; left alignment with a consistent content column reads as a firm
that produces reports, not marketing decks. The five-pillar lifecycle is the one place
structural numbering (01–05) belongs, because it's an actual sequence, not decoration —
don't extend that numbering treatment to sections that aren't sequential (portfolio
items, "why us" pillars get no numbers).

```
Header:  [Logo]              Services  Portfolio  About  Contact   [Talk to us →]
         ────────────────────────────────────────────────────────────────────

Hero:    Large left-aligned headline (serif, ~2 lines)
         Sub-line (Public Sans, 1-2 sentences)
         [Primary CTA]  [Secondary link: See the services]
                                                    ⌐ lifecycle loop diagram,
                                                      right-aligned, large,
                                                      the "most characteristic
                                                      thing in this firm's world"

Lifecycle:  01  Collection         — one-line description
            02  Systems            — one-line description
            03  Visualization      — one-line description
            04  Workflow & Automation — one-line description
            05  Insights           — one-line description
            (numbered list, left rule connecting 01→05, gold rule)

Services:   Same five pillars, each expanded into its 1-2 real services as
            stacked panels — pillar heading on dark (--ink), service cards on
            light (--paper) nested beneath it. Alternates dark/light per pillar
            band down the page — gives real rhythm instead of one long grey page.

Portfolio:  Two-up card row (Duka Bee / Jamii Smiles Dental), room for a third
            card as a "your project could sit here" open slot, not a fake logo.

Why us:     Three-up, unnumbered, quiet cards. No counters.

CTA band:   Full-width dark section, gold rule top, one headline, one button.

Footer:     Logo + tagline, nav repeat, contact line, copyright.
```

**Motion** — one signature moment: on the home page, the lifecycle loop (hero or
lifecycle section, pick one — not both) draws itself once as it scrolls into view, arrows
tracing the loop in sequence. Everywhere else: no scroll-triggered fade/slide-up on every
section — that's the single most common AI-generated-site tell and this firm should not
have it. Hover states on cards and nav links only; keep them a simple color/border
transition, not a lift-and-shadow.

**Imagery** — the profile deck uses generic stock-style 3D icon illustrations (puzzle
piece, laptop with charts, clipboard with magnifier). These are fine as a stopgap but
read as templated the moment they sit next to real client work (Duka Bee, Jamii Smiles
Dental screenshots). Recommend commissioning a small custom icon/diagram set in the gold
line-art style already used for the lifecycle-loop mark on the logo, so the whole system
feels drawn by one hand rather than assembled from a stock icon pack. Flagged as a content
gap in §7, not a blocker to building the site structure now.

### 3.2 Design plan — self-check

Reviewed against the common AI-generated-site defaults: not warm-cream-plus-terracotta
(uses the firm's actual gold/charcoal), not near-black-plus-neon (gold is desaturated and
used sparingly), not a rounded-card SaaS kit (flat cards, hairline borders, no uniform
shadow), no tracked-out all-caps eyebrows or middle-dot meta strings, no monospace data
labels, no arrow-suffixed buttons by default. Numbered markers are kept only where the
content is a genuine sequence (the five-stage lifecycle) and dropped everywhere else.

---

## 4. Astro project structure

```
src/
  components/
    Header.astro
    Footer.astro
    LifecycleLoop.astro       # SVG diagram, animates once on scroll-into-view
    PillarBand.astro          # one lifecycle stage: heading + nested service cards
    ServiceCard.astro
    PortfolioCard.astro
    WhyUsCard.astro
    CTABand.astro
    ContactForm.astro
  content/
    services/
      research-me.md
      edms.md
      web-mobile-dev.md
      bi-visualization.md
      bpa-ai-integration.md
      ai-customer-engagement.md
      actuarial-predictive.md
    portfolio/
      duka-bee.md
      jamii-smiles-dental.md
    config.ts                 # content collection schemas, see §4.1
  layouts/
    BaseLayout.astro
  pages/
    index.astro
    services.astro
    portfolio.astro
    about.astro
    contact.astro
  lib/
    site.ts                   # see §4.2
  styles/
    global.css                # design tokens as CSS custom properties
```

### 4.1 Content collection schemas

```typescript
// src/content/config.ts
import { defineCollection, z } from "astro:content";

const services = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    pillar: z.enum([
      "collection",
      "systems",
      "visualization",
      "workflow-automation",
      "insights",
    ]),
    pillarOrder: z.number(), // 1–5, matches lifecycle sequence
    summary: z.string(),      // one-line card summary
    // optional deeper detail, used on /services for the expanded panel
    howWeDoIt: z
      .array(z.object({ title: z.string(), body: z.string() }))
      .optional(),
  }),
});

const portfolio = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    url: z.string().url(),
    description: z.string(),
    // which service(s) this project demonstrates — links portfolio back to services
    relatedServices: z.array(z.string()).optional(),
  }),
});

export const collections = { services, portfolio };
```

Note the schema deliberately has **no `testimonial`, `rating`, or `stat` fields.** Don't
add them back in later as a quick way to fill out a thin page — if real testimonials or
numbers exist, they get their own reviewed content type; invented ones don't belong in
the schema at all.

### 4.2 Site config

```typescript
// src/lib/site.ts
export const site = {
  name: "Utility Informatics",
  tagline: "Enhancing data utilization",
  url: "https://utilityinformatics.co.ke",
  description:
    "Utility Informatics partners with organizations to turn raw data into timely, evidence-based decisions — across the full data lifecycle, from collection to insight.",
  contact: {
    phone: "0720 325 755",
    whatsapp: "0720325755", // wa.me link built from this
    email: "utiltyinfogrp@gmail.com",
    address: "Masaba Road, Ground Floor, Room/Door 5, Nairobi",
  },
  nav: [
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  social: {
    // none currently confirmed live — see content gaps, §7
  },
};
```

---

## 5. Page-by-page brief

### 5.1 Home (`/`)

**Hero**
- Headline (serif, ~2 lines): *"Every service we offer starts with data."*
- Sub-line: *"We partner with organizations to turn raw data into timely, evidence-based
  decisions — from the moment it's captured to the moment it drives a strategic choice."*
- Primary CTA: **Talk to us** → `/contact`
- Secondary link: **See how it works** → jumps to the lifecycle section
- Visual: the lifecycle-loop diagram, large, right side of the hero on desktop, stacked
  below the sub-line on mobile.

**The Data Lifecycle** (numbered, sequential — see layout wireframe in §3.1)
1. **Collection** — Capturing the right data at the source
2. **Systems** — Platforms that house and run it
3. **Visualization** — Turning it into something you can see
4. **Workflow & Automation** — Putting it to work without manual effort
5. **Insights** — Forecasting what comes next

Each line links down to its matching pillar on `/services`.

**Services preview** — condensed version of the five pillars, one line each, "View all
services →" to `/services`. Don't repeat full service copy here; that's what `/services`
is for.

**Portfolio strip** — Duka Bee and Jamii Smiles Dental, condensed cards, "See our work →"
to `/portfolio`.

**Why Utility Informatics** — three unnumbered cards:
- **Cross-Industry Expertise** — "Experience delivering data solutions across logistics,
  healthcare, retail, manufacturing, and research programmes."
- **Collaborative Approach** — "We work closely with clients and stakeholders to
  identify needs and tailor strategic information solutions."
- **Proven Track Record** — "A history of delivering timely, evidence-based solutions
  that promote informed decision-making."

(No counters. If the firm later has a real project count or client count worth stating,
add it as a plain stat, not an animated counter with no number behind it.)

**CTA band** — *"Let's transform your business with data."* → `/contact`

---

### 5.2 Services (`/services`)

Intro line: *"Every service sits somewhere on the data lifecycle. Here's where."*

Five pillar bands, dark/light alternating, each built from the `services` content
collection filtered by `pillar` and sorted by `pillarOrder`:

**01 — Collection**
*Good data utilization starts at the source. We help organizations capture accurate,
structured information so everything built downstream — every dashboard, workflow, and
forecast — rests on a reliable foundation.*
- **Research, Monitoring & Evaluation** — Field research, M&E frameworks, and structured
  data-gathering tools, designed around your organization's specific strategic
  information needs.

**02 — Systems**
*The platforms and infrastructure your data lives in, built to hold up as your
organization and its information needs grow.*
- **Electronic Document Management (eDMS)** — Structured digital systems for storing,
  retrieving, and governing your organization's documents and records.
- **Web, Desktop & Mobile App Development** — User-friendly web, mobile, and desktop
  applications that engage customers and scale with your business.

**03 — Visualization**
*Data only creates value once it can be seen and understood. We simplify complex
information into clear, interactive visuals built for faster decisions.*
- **Business Intelligence, Reporting & Visualization Platforms** — Real-time dashboards,
  custom reports, and interactive visualization platforms that turn raw data into
  insights your team can act on at a glance.

**04 — Workflow & Automation**
*Once data moves, it should trigger action on its own. We design automated workflows
that put information to work without manual effort.*
- **Business Process Automation & AI Integration** — AI integration and automated
  workflows that eliminate manual, error-prone tasks and boost operational efficiency.
  *(Detail carried over from the live site: workflow design & mapping → optimization &
  integration with existing ERP/CRM → ongoing maintenance and monitoring — reuse this
  three-step "how we do it" structure for the expanded panel.)*
- **AI Customer Engagement** — AI-backed customer service automation, feedback capture,
  and bulk messaging campaigns, keeping customers informed and heard automatically.
  *(Detail carried over: chatbot design & training on your own data → deployment & staff
  training → continuous learning from real feedback.)* — *see the open flag in §1.2
  before finalizing this section's scope.*

**05 — Insights**
*The payoff of the whole lifecycle: data that tells you what's likely to happen next, not
just what already happened.*
- **Actuarial Services & Predictive Analytics** — Advanced modeling that anticipates
  trends and risk, giving you the foresight to plan proactively for business growth
  rather than react to it. *(Detail carried over: data assessment & risk profiling →
  model development & testing → performance monitoring & iteration.)*

CTA band at bottom, same as home.

---

### 5.3 Portfolio (`/portfolio`)

Intro line: *"A few of the systems we've built."*

Two full-width case-style cards (not testimonial quotes — actual project descriptions):

**Duka Bee** — dukabee.co.ke
*A productized ecommerce platform for Kenyan SMEs. A seller hands over their catalog, and
Duka Bee turns it into a structured, ready-to-sell online storefront.*
Related services: Web & Mobile App Development, Data Systems.

**Jamii Smiles Dental** — jamiismilesdental.co.ke
*A website built for Jamii Smiles Dental. We turned it into a structured, ready-to-use
online presence designed to help patients discover the clinic, understand its services,
and take action.*
Related services: Web & Mobile App Development.

A third, visually distinct slot: an open card reading *"Your project could sit here"*
with a link to `/contact` — honest about a young portfolio rather than padding it with
placeholder logos.

---

### 5.4 About (`/about`)

**The name is the thesis.** Open with the derivation, because it's the strongest,
least-generic thing the firm has to say about itself:

*"Utility Informatics — even the name is about data. Research produces data. Data needs
visualization. Raw data on its own isn't useful, so we extract insight from it. That's
the whole company, stated once: collect it, understand it, act on it."*

**Mission** — *"Empower organizations to make faster, evidence-based decisions with tools
that are intuitive, scalable, and built to be used, not just delivered."*

**Vision** — *"A world where data removes guesswork, not adds to it — where organizations
spend less time reconciling numbers and more time acting on what they show."*

**Industries served** — logistics, healthcare, retail, manufacturing, and research/M&E
programmes for NGOs, donors, and public-interest work. (Keep this list only as broad as
what's actually been delivered — don't let it drift wider than the portfolio supports.)

**Why us** — reuse the three cards from Home, or expand each into 2–3 sentences here
since About has more room. No counters here either, for the same reason as §5.1.

CTA band at bottom.

---

### 5.5 Contact (`/contact`)

- Address: Masaba Road, Ground Floor, Room/Door 5, Nairobi
- Phone / WhatsApp: 0720 325 755 (both a `tel:` and a `wa.me` link — WhatsApp is the
  primary contact channel in the brand materials, lead with it, not a bare phone number)
- Email: utiltyinfogrp@gmail.com
- Form fields: Name, Email, Phone, Service (select — populated from the `services`
  collection, seven real options, no dead/dropped services in the list), Message

**Form handling note:** this is a static Astro site with no CMS/backend behind it. The
live WordPress site currently has a working form (likely via a WP plugin) — that
disappears on migration unless replaced. Pick one before build:
- A form service (Formspree, Web3Forms, or similar) wired to `utiltyinfogrp@gmail.com`, or
- A `mailto:` fallback with prefilled subject/body, or
- Lead with the WhatsApp link as primary and treat the form as secondary.

Given the brand materials already put WhatsApp first, recommend WhatsApp-primary with a
lightweight form-service fallback for people who'd rather not use WhatsApp.

---

## 6. Copy voice

- Plain, active verbs. "We build the systems that make that possible," not "Solutions
  are delivered leveraging advanced methodologies."
- No invented specifics — no percentages, client counts, or "trusted by X companies"
  lines unless a real number is supplied. The live site's testimonials ("Customer
  satisfaction scores jumped 25% in six months," "reducing errors by 90%") read as
  invented and get cut, not softened.
- Say what each service *does*, not what it's *called*. Every service block leads with
  the outcome (Section §5.2 copy already follows this — keep that pattern for any new
  service copy written later).
- Sentence case throughout. No tracked-out all-caps section eyebrows.
- One CTA verb per action, kept consistent: if the primary button says "Talk to us," use
  that same phrase everywhere it points to `/contact` — don't alternate with "Get
  Started," "Begin Now," and "Contact Us" the way the current site does across its three
  different CTA bands.

---

## 7. Content gaps to fill before/during build

These aren't blockers to starting the build, but they're open:

1. **Custom icon/diagram set** — replace the generic stock-style 3D icons from the
   profile deck with a small custom set in the gold line-art style of the logo mark, so
   the lifecycle loop, service icons, and portfolio section feel like one visual system.
2. **Real photography or product screenshots** — the portfolio cards for Duka Bee and
   Jamii Smiles Dental should show the actual sites, not stock imagery.
3. **Any real numbers** — project count, years active, client count — only if they
   exist and are accurate. Otherwise the "Why us" section stays qualitative, permanently.
4. **Social links** — none are live on the current site or in the profile; confirm
   whether any exist before adding icons to the footer.
5. **The AI Customer Engagement / Weyntech overlap** (§1.2) — a positioning decision,
   not a design one, but it determines whether that service block ships as-is.

---

## 8. Build order

1. `BaseLayout.astro` + design tokens in `global.css` (§3.1 palette/type as CSS custom
   properties) — get the look right in isolation before wiring content.
2. Header + Footer.
3. Home — build the `LifecycleLoop` SVG component first since it's the one signature
   piece of motion/identity on the site; everything else on Home is comparatively simple.
4. Services content collection (seven markdown files per §4.1) + `/services` page.
5. Portfolio content collection (two entries) + `/portfolio` page.
6. About, Contact.
7. Design checkpoint: review Home + Services together — these two pages carry the
   lifecycle motif and need to feel like one continuous idea, not two separately-designed
   pages.
8. Wire the contact form handling per §5.5, decide the WhatsApp-primary pattern.
9. SEO pass: carry over the existing meta descriptions/OG tags per route from the live
   site (all present in the fetched pages), updated to match new copy where it changed.
