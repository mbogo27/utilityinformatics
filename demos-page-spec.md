# Spec: Add a "Demos" page to utilityinformatics.mbogo.workers.dev

Status: draft for review
Scope: add a new top-level "Demos" section to the site, and publish the two existing interactive dashboards there.

## 1. Why this page exists

The site currently has two proof mechanisms:

- **Portfolio** — real, named clients (Duka Bee, Jamii Smiles Dental) with live URLs. Credibility comes from "this is a real business using a real thing we built for them."
- Nothing yet for capability that isn't tied to a named client.

**Demos** fills that gap: interactive work built to demonstrate what the Visualization and Insights stages of the data lifecycle actually produce, without requiring a client name attached. A visitor reading "Business Intelligence, Reporting & Visualization Platforms" on the Services page should be able to click through and use one.

This is distinct from Portfolio (real client, real outcome) and distinct from any future "Utility Data Lab" (open-ended experiments/range-showing content) — Demos is specifically pre-sale capability proof.

## 2. Navigation change

Current nav: `Services · Portfolio · About · Contact` + "Talk to us" button.

New nav: `Services · Portfolio · Demos · About · Contact` + "Talk to us" button.

Placement rationale: Demos sits immediately after Portfolio because the two are a pair — "here's proof with clients" followed by "here's proof without needing a client" — before the site moves into About/Contact. This keeps the persuasive pages grouped together ahead of the softer/company-info pages.

Applies to: the nav partial used across all pages (header on Home, Services, Portfolio, About, Contact all currently repeat the same nav — Demos needs to be inserted in that shared component, not just on one page).

## 3. New page: `/demos`

Mirror the existing Portfolio page pattern (light background, serif headline + one-line subhead, then a stacked list of white/bordered cards, ending in the same dark "Let's transform your business with data." CTA band and footer). No new visual language — reuse what's already there.

### 3.1 Page copy

Headline: **Demos**

Subhead (draft, matches the site's terse register — e.g. Portfolio's "A few of the systems we've built."):

> A few interactive tools we've built to show what's possible. Not tied to a client — but built the same way we'd build one for you.

This line is doing real work: it pre-empts the "wait, is this a real client?" question before it's asked.

### 3.2 Demo entries

Two entries at launch, same card shape as Portfolio's client cards (thumbnail/preview image, title, description paragraph, "Related services" line, action link) — with one substitution: instead of a client site URL, a **"Launch demo"** action that opens the interactive dashboard.

**Entry 1 — Whole-School Results Dashboard**
- Title: Whole-School Results Dashboard
- Description (draft): "An interactive results dashboard for a school — built to turn raw exam data into something a head teacher or board can actually read at a glance: trends across exams, subjects, and classes, filterable in real time."
- Related services: Business Intelligence, Reporting & Visualization Platforms
- Action: Launch demo → opens the dashboard

**Entry 2 — Nyeri Fuel Outlets Dashboard**
- Title: Nyeri Fuel Outlets Dashboard
- Description (draft): "A pricing and outlet dashboard for fuel stations across Nyeri — built to make period-over-period pricing and outlet-level data explorable instead of buried in a spreadsheet."
- Related services: Business Intelligence, Reporting & Visualization Platforms (add Research, Monitoring & Evaluation if the underlying data collection is part of the story you want to tell)
- Action: Launch demo → opens the dashboard

(Exact copy is a starting draft — adjust to match how you'd actually describe the underlying data/purpose of each, since I only have the files, not the brief behind them.)

### 3.3 Empty-state slot

Portfolio has a dashed-border "Your project could sit here → Talk to us" card to keep the page from feeling like a closed set. Demos should have the equivalent, phrased for the capability angle rather than the client angle, e.g.:

> Have data you'd want visualized like this? → Talk to us.

## 4. Technical/asset handling

The two files (`Whole-School-Results-Dashboard.html`, `Nyeri-Fuel-Outlets-Dashboard_revised_2.html`) are large, fully self-contained interactive documents (each ~1,300–1,600 lines, own `<title>`, own JS/state) — they are pages in their own right, not embeddable widgets.

**Recommendation: link out, don't iframe.** Serve each as its own standalone static page (e.g. `/demos/whole-school-results-dashboard/` and `/demos/nyeri-fuel-outlets-dashboard/`), opened in a new tab from the "Launch demo" action. Reasons:
- Each dashboard has its own header/interaction chrome that will look cramped or duplicated inside an iframe next to the site's own nav.
- Full-bleed viewport is how these were clearly designed to be used (dense tables/filters).
- Avoids iframe height/scroll/responsive headaches on the marketing page.

Open decision for you: if you'd rather keep visitors inside the main site chrome (embedded), flag it and this section gets revised — it's a real trade-off, not a default I'd insist on.

**Thumbnails needed:** Portfolio cards use a screenshot of the actual client site as the card image. Demos cards should do the same — a static preview image of each dashboard's default view. These don't exist yet and need to be generated (a screenshot of each dashboard at its default filter state, one per entry). Flagging this so it doesn't get missed — happy to generate these now from the two HTML files if useful, since it's a quick local-render job.

**File naming:** rename `Nyeri-Fuel-Outlets-Dashboard_revised_2.html` → drop the `_revised_2` before it goes live (avoid version cruft in a public path/filename).

## 5. Out of scope for this change

- No changes to Services or Portfolio content/structure.
- No "Utility Data Lab" page — that's a separate, later decision once there's enough non-sales-facing content to justify its own section.
- No CMS/admin for managing demo entries — this is a static addition of two entries; revisit if the list grows past a handful.

## 6. Acceptance checklist

- [ ] Nav updated site-wide to include Demos, positioned after Portfolio
- [ ] `/demos` page live, matching existing page patterns (typography, spacing, dark CTA band, footer)
- [ ] Both dashboards reachable as standalone pages, opening cleanly in a new tab
- [ ] Card copy finalized (descriptions above are drafts)
- [ ] Thumbnail image present for each entry
- [ ] Empty-state / "talk to us" card present at the bottom of the list
- [ ] Dashboard file renamed to drop version suffix before publishing
