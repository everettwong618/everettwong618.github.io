# Everett Wong — Portfolio Rebuild Spec (Cursor Build Plan)

**Design thesis:** *Engineering documentation, not engineering cosplay.*
The site should read like a well-set technical document — the calm authority of a spec sheet — not a drawing of a drawing. Restraint signals seniority. Evidence beats atmosphere.

**Audience priority:** 1) internship recruiters & engineering hiring managers 2) credibility 3) occasional freelance.

**This is a REDUCTIVE pass.** The job is to REMOVE. If you find yourself adding a visual element, stop.

**Hard constraints — never violate:**
- Do not invent tools, metrics, dates, employers, or credentials. Where a fact is missing, insert a literal `TODO(everett):` placeholder.
- Do not attribute teammates' work to Everett. See §8.2.
- Do not remove the accessibility work: skip link, `:focus-visible`, `prefers-reduced-motion`, alt text, JSON-LD, ≥44px tap targets.
- Do not make it a SaaS landing page, an animated designer portfolio, or a freelancer-first site.
- After every numbered step the site must still load and be navigable.

---

## 0. Files

| File | Action |
| --- | --- |
| `index.html` | 728 lines. Heavy restructure. |
| `styles.css` | 2,279 lines. ~400 dead. Add token layer, delete, rewrite. |
| `script.js` | 373 lines. Delete decorative motion; keep functional JS. |
| `case-mmet281.html` | **Already built.** Reference implementation of the new design system. Copy its tokens. |
| `case-mmet105.html` | **To create** (§8.2) — blocked on attribution confirmation. |
| `faq.html`, `college-station-web-design.html`, `blog/` | Freelance/SEO surfaces. Pricing lives HERE, not on the homepage. |

> **Read `case-mmet281.html` first.** Its `<style>` block is the target design system — tokens, eyebrow treatment, hairline tables, spec grid, figure/caption pattern. The homepage should end up looking like it belongs to the same document.

---

## 1. Token layer (do this first, restyle nothing yet)

Add to `styles.css` `:root`, replacing the existing block:

```css
:root {
  /* Surfaces & ink — graphite, not startup-navy */
  --bg:              #0C1017;
  --bg-raised:       #141922;
  --text:            #E9ECEF;
  --text-mute:       #98A1AD;
  --hairline:        rgba(255,255,255,0.09);
  --hairline-strong: rgba(255,255,255,0.16);

  /* ONE accent. Maroon. Both steps colour-validated against the surfaces. */
  --accent:      #7A1E2C;  /* FILLS ONLY — fails contrast as text on --bg */
  --accent-lift: #B24455;  /* text/links/marks on dark */

  /* Type scale — 1.25 ratio. Replaces ~20 ad-hoc sizes and 9 clamp ramps. */
  --fs-display: clamp(2.75rem, 5.5vw, 4.25rem);  /* HERO NAME ONLY */
  --fs-h2:      clamp(1.75rem, 2.6vw, 2.25rem);
  --fs-h3:      clamp(1.15rem, 1.5vw, 1.35rem);
  --fs-lead:    clamp(1.1rem, 1.3vw, 1.25rem);
  --fs-body:    1.0625rem;
  --fs-small:   0.9375rem;
  --fs-micro:   0.8125rem;

  /* Spacing rhythm — Projects gets the most air. */
  --space-section:    120px;
  --space-section-sm: 80px;
  --space-block:      48px;

  --font-sans: "Inter", system-ui, -apple-system, "Segoe UI", sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;

  --measure: 62ch;
  --max: 1080px;
}
```

**Delete `--teal`, `--amber`, `--cream`, `--deep-navy`, `--soft-navy`, `--font-display`.**
Then find/replace every `var(--teal)` → `var(--text-mute)` for labels/marks/borders, or `var(--accent-lift)` for links/active states.

**Hero name must render ~1.9× a section heading.** Currently `.hero-copy h1` maxes at 3.05rem and `h2` maxes at 3rem — the name is the same size as "What is MMET?". The global `h1` rule (styles.css:171) is dead code, overridden. Delete the override; `h1` uses `--fs-display` and nothing else on the page may.

---

## 2. Delete dead CSS (~400 lines, verified unused by every HTML file)

`.mock-device`, `.mock-chrome`, `.mock-schedule`, `.mock-side`, `.mock-pill`, `.mock-line`, `.mock-cal*`, `.mock-mini-page`, `.mock-form`, `.mock-brand`, `.mock-cad`, `.identity-panel`, `.identity-mark`, `.identity-name`, `.identity-meta`, `.services-grid`, `.service-card`, `.project-thumb`, `.featured-thumb`, `.wf-label`, `.wf-caption`, `.case-block`, `.project-media`, `.project-shot*`

**Keep `.price`** — used by `faq.html` and `blog/`.

---

## 3. Kill ambient motion

Five animations currently loop forever. Delete these keyframes and all their call sites:

`@keyframes blink` · `gridDrift` · `pulse` · `borderGlow` · `scrollDot` · `plotStroke` · `drawLine`

Also delete `.project.featured::before` entirely — the pulsing gradient border is the strongest "AI-generated design" tell on the site.

**In `index.html`:** remove `.cursor-blink` spans from the header logo and the footer logo.

**In `script.js`:** delete the magnetic-button block (~lines 150–163) and the schematic parallax block (~lines 103–127).

**Keep:** the `.reveal` scroll fade (reduce to `opacity` + `translateY(8px)`, 300ms), hover states, and the Skhedule evidence stage-sync (that one is functional).

> Rule going forward: motion must explain something. Ambient motion is noise.

---

## 4. Delete the fake schematic

The hero contains a fake browser chrome (`.hero-product-chrome`, "Live · Skhedule") with a **second fake window floating on top of it** (`.geo-chrome`, "DWG · LIVE"). The nested schematic is fictional engineering — `SCHEMATIC_01`, `TOL ±0.1 · REV B`, and a hotspot that cycles revisions A→B→C. Technical reviewers read invented engineering as costume; it undercuts the exact credibility it reaches for. Everett now has **real** CAD, so the prop has no excuse.

- **`index.html`:** delete lines 164–200 — the entire `.geo-frame.geo-instrument` block (panel, card, chrome, `.hero-schematic` SVG, `.schematic-hotspots`, `.schematic-callout`).
- **`styles.css`:** delete `.geo-instrument`, `.geo-frame`, `.geo-layer`, `.geo-panel`, `.geo-card`, `.geo-chrome*`, `.hero-schematic`, `.schematic-*`.
- **`script.js`:** delete the hotspot handler (~129–148) and the `revisions` / `hotspotCopy` constants.

Also delete the fake chrome from the hero screenshot: remove `.hero-product-chrome` (traffic-light dots) and `.hero-product-cap`. The screenshot gets a plain hairline border and a real `<figcaption>`.

**Keep the motif, lose the prop.** Hairline rules, mono callouts, spec tables, measured margins — applied to real artifacts. `case-mmet281.html` shows how.

---

## 5. Rebuild the hero

The hero currently stacks **14 decorative systems** in one viewport. Delete: `.hero-grain`, `.hero-vignette`, `.hero-ticks` (+ its 4 spans), `.hero-plot-line` SVG, `.scroll-hint`, the `blur()` in `.hero-enter`, and either `.hero-grid` or `.hero-glow` — **keep one background treatment, not both.**

Delete the `@media (max-height: 760px)` and `@media (max-height: 680px)` blocks (styles.css:952–965). They hide hero content because the hero doesn't fit. Fix the cause: `min-height: 88svh` and let it breathe. **Stop fighting for exactly 100svh** — a hero that slightly exceeds the fold invites scrolling.

### Hero content (all facts real — use verbatim)

```html
<p class="eyebrow">MMET · Texas A&amp;M · College Station, TX</p>

<h1>Everett Wong</h1>

<p class="hero-sub">
  Manufacturing &amp; Mechanical Engineering Technology, Texas A&amp;M — graduating Fall 2028.
  I machine parts, model them, and work out what they cost to build.
</p>

<p class="hero-ask">
  Seeking a <strong>Summer 2027 manufacturing / process engineering internship</strong>.
</p>

<div class="hero-actions">
  <a class="btn btn-primary" href="#projects">See my work</a>
  <a class="btn btn-ghost" href="assets/img/Everett-Wong-Resume.pdf" download>Résumé (PDF)</a>
</div>
```

`.hero-ask` is the single highest-value line on the site. Style it so it is impossible to miss — `--fs-lead`, full opacity, `--accent-lift` on the `<strong>`.

### Hero visual
One real, **uncropped** screenshot. Currently `.hero-product-shot img` uses `object-fit: cover` clipped to `min(34vh, 280px)` — a sliver of a dashboard, illegible, therefore decorative. Set `object-fit: contain`, remove the max-height clamp, let it show.

**And remove `@media (max-width: 980px) { .hero-visual { display: none } }`** — on phones the entire screenshot vanishes today, and a large share of recruiters arrive from a LinkedIn tap. Stack it under the copy instead.

---

## 6. Cut sections & reorder

**Delete outright:**
- `#credibility` — three cards linking to Résumé / LinkedIn / Projects. A duplicate of the nav. A full screen of scroll, zero new information. Move the résumé button into `#contact`.
- `.statement-band` — a 4.5rem band quoting Everett's own footer tagline back at him.

**Strip:** `#services` — delete the `.services-compact` price list ("Landing pages — from about $150 / WordPress fixes — from about $50"). A hiring manager for a manufacturing internship who reads "$50 WordPress fixes" reclassifies him from *engineer* to *odd-jobs kid*. Reduce the whole section to one line inside `#contact`:

> "Outside school and internships, I occasionally take on small web and WordPress work — details in the [FAQ](faq.html)."

Remove **Services** from the primary nav. Pricing already lives in `faq.html`; leave it there.

**Reorder `<main>`:**

`Hero → Projects → Experience → Skills → MMET → About → Contact`

Projects is currently 6th. Reviewers spend 30–60 seconds on a portfolio page; they may never reach it. Lead with the work.

Update the primary nav and the `commands` array in `script.js` to match the new order.

---

## 7. Surfaces, cards, spacing

**Stop the strobe.** Sections currently alternate cream → navy → alt → cream → navy → cream → navy 6+ times, with **four different grid overlays** (24px `.project-thumb`, 32px `.section-light`, 36px `.hero-grid`, 40px `.statement-band`).

- Commit to **one dominant surface: dark (`--bg`).**
- Allow **at most one** light section (About — the headshot needs it), as a deliberate change of register.
- Delete `.section-alt`, `.section-quiet`. Differentiate sections with **type scale, spacing, and hairline rules**, not alternating paint.
- Standardize on **one** grid overlay (32px) used in **at most one** place.

**Fewer boxes.** Everything is a bordered rounded rectangle today (`.mmet-card`, `.skill-group`, `.project-card`, `.cred-card`, `.timeline-item`, `.contact-tips`). Convert to **hairline-ruled rows** — see the `table` and `.spec-table` patterns in `case-mmet281.html`:

- `.mmet-card` → plain list, `border-top: 1px solid var(--hairline)` per row. No box, no hover-lift.
- `.skill-group` → keep the column, drop the border box; keep only the rule under the `h3`.
- `.timeline-item` → remove `background:#fff`, `box-shadow`, `border`. Keep the maroon rail + dot.
- `.contact-tips` → hairline block, no fill.

**Reserve a real bordered card for exactly ONE thing: the featured project.** Scarcity is what makes emphasis work.

---

## 8. Projects — the section that gets him hired

### 8.1 Add a Selected Work index
Above the featured case, a scannable hairline table (mono for stack/year). No template has this; it reads as an engineering document.

| Project | Role | Stack | Year |
| --- | --- | --- | --- |
| Skhedule — staged-invite event app | Sole designer & builder | Next.js · TS · Postgres | 2025 |
| Process & Material Selection — hinge + eyewear | Sole author | Fusion 360 · DFM · MatWeb | 2026 |
| Buddy Chair — design → drawings → BOM | `TODO(everett)` see §8.2 | Fusion 360 · DFM | 2025 |
| Local business landing page | Design & build | WordPress | 2024 |
| Contact form recovery | Debug & handoff | WordPress · PHP | 2024 |

Project names link to their case pages / anchors.

### 8.2 Case studies

**`case-mmet281.html` — DONE.** Link it from the index and the project grid. It still needs three assets Everett must supply; the page already has `onerror` placeholders naming them:
- `assets/img/case/hinge-cad-callouts.png`
- `assets/img/case/glasses-cad-callouts.png`
- `assets/docs/MMET-281-Process-Material-Selection-Everett-Wong.pdf`

**`case-mmet105.html` — BLOCKED. Do not build until Everett confirms his role.**

> ⚠️ **Attribution constraint.** In the MMET 105 Buddy Chair report, the individual part drawings (SEAT, ARM SUPPORT 1/3, LEG, BACK REST 1/2) carry the title block **"DRAWN: Zaid Al-Abdali."** The assembly drawing, the exploded view + BOM, and the assembly instructions carry **"DRAWN: Everett Wong."**
>
> **Cursor: do not generate any copy claiming the part drawings as Everett's work.** Build the page with `TODO(everett): confirm role` in the Role field and omit any figure whose authorship is unconfirmed. A truthful "I owned the assembly documentation, BOM, and sheet-nesting layout" is a strong, specific contribution — team projects are expected to be team projects; what recruiters check is whether the candidate is straight about their role.

When unblocked, the page should carry: the weighted design matrix (5 concepts × 6 criteria, Buddy Chair won 47/60), the hand-sketch → CAD → nesting-layout → exploded-BOM → assembly-instructions progression, and the sheet-nesting layout (real material-utilisation DFM, and the most interesting artifact in the document).

### 8.3 Tighten Skhedule
- `.evidence-step { min-height: 46vh }` × 4 = **~184vh of scroll for one project.** Reduce to `34vh` and trim the copy.
- Replace the result line. "Working MVP, end to end" is the weakest possible outcome statement. Needs one concrete number — `TODO(everett): events created / invites sent / overbookings prevented`.

### 8.4 Promote MMET 281 out of the card grid
It is currently a three-line text card tied for last in a 2×2 grid — and it is the strongest *engineering* evidence on the site. It becomes a featured case with its own page (§8.2). Everything else on the site is software or soft skills.

---

## 9. Skills — replace poetry with tools

The section currently names **zero tools**. "◇ CAD / Engineering Graphics — *Drawings that show how to build*" is poetry. Recruiters and ATS scan for tool nouns. This is the biggest credibility gap on the site.

Every line below is **evidenced** by Everett's MMET 281 report, MMET 105 report, or his stated lab work. Use verbatim. Do not add to this list.

```
Manufacturing & Process
  Manual lathe & mill — operated; machined a finished part (MMET 181 lab)
  Injection moulding — hands-on machine operation (MMET 281 lab)
  CNC process planning — milling, drilling, reaming, countersinking
  Design for manufacture (DFM) — process selection, defect prediction, gate placement

CAD & Technical Documentation
  Autodesk Fusion 360 — part modelling, assemblies, exploded views
  Engineering drawings — title blocks, dimensioning, general tolerance blocks (±.5 / ±.05 / ±.005)
  Bills of materials & vendor sourcing (McMaster-Carr, Home Depot)
  Sheet-nesting / material-utilisation layouts
  Technical writing — 10-page engineering reports

Analysis
  Material selection from published property data (MatWeb)
  Weighted decision matrices
  Manufacturing cost modelling — setup amortisation, machine-hour rates, tooling breakeven

Web & Digital
  HTML · CSS · JavaScript
  Next.js · TypeScript · Prisma · PostgreSQL
  WordPress · PHP
```

**Also: delete `@media (max-width: 640px) { .skill-desc { display: none } }`** — mobile users currently lose every descriptor, leaving bare nouns. Now that the descriptors carry the tool evidence, they must show on mobile.

`TODO(everett):` the MMET 181 / 281 syllabi may confirm additional software (Excel, Minitab, MATLAB, GD&T coursework). Add **only** what the syllabi actually list.

---

## 10. Copy fixes

- **About is third person** ("Everett Wong is…", "His background blends…") while the hero and contact are first person. Rewrite in **first person**, cut from four paragraphs to two.
- **Delete the sentence "He is Chinese-American."** It is an orphan mid-bio between web development and engineering systems, connected to nothing around it, and does nothing for the hiring goal.
- **"What this taught me:"** appears on all three timeline entries in italic. Keep it on **one** (the soccer referee entry — genuinely distinctive). Delete the other two.
- **Footer `.trust-row`:** delete "Clear Communicator" and "Work That Holds Up." Self-declared virtues erode trust. Keep "Texas A&M Student" and "College Station, TX."
- Delete `.easter` ("Built from scratch.").
- `.read-progress`: make it a 1px hairline in `--text-mute`, or delete it. A maroon→teal gradient progress bar is a blog affordance on a page this short.

---

## 11. Typography

Three families today: **Space Grotesk** (display), **Source Sans 3** (body), **JetBrains Mono**.

Space Grotesk's geometric quirks read "startup," which fights *mature, credible, engineered*. **Drop it.**

- **Inter** — headings *and* body. Weight and size do all the work.
- **JetBrains Mono** — **data only**: dates, tags, stack names, figures, table columns, spec keys.

> Rule: mono means "this is a value." If it isn't data, it isn't mono.

Update the Google Fonts `<link>` in `index.html` to match `case-mmet281.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
```

**Eyebrows (`// about_me`) become muted grey, not coloured.** A coloured eyebrow above every heading is the single loudest template tell. This one change buys more maturity than any other line in this file.

Also: `.section-lead` is currently `1.05rem` vs body `1.0625rem` — the lead is *smaller* than body text. Set it to `--fs-lead`, `color: var(--text-mute)`.

**Do the font swap LAST.** It touches everything.

---

## 12. Light theme — decide

The dark theme is well-tuned; the light theme is visibly less finished (see the `[data-theme="light"]` overrides bolted on throughout). A half-finished second theme is a craft liability on a site whose entire argument is craft.

**Recommendation: ship dark-only.** Delete the `.theme-toggle` button, the `[data-theme="light"]` blocks, and the theme JS. If Everett wants to keep it, it needs a full polish pass — but that is a separate project, not part of this one.

---

## 13. Execution order

Never leave the site broken between steps. Show a diff per step.

1. Token layer (§1). Restyle nothing yet.
2. Delete dead CSS (§2) + ambient motion (§3). Verify the page still renders.
3. Delete the fake schematic — HTML **and** CSS **and** JS (§4).
4. Rebuild the hero (§5).
5. Delete `#credibility` + `.statement-band`; strip pricing from `#services` (§6).
6. Reorder sections; update nav + `script.js` commands array (§6).
7. Unify surfaces; cards → hairline rows (§7).
8. Add the Selected Work index; link `case-mmet281.html`; tighten Skhedule (§8).
9. Rewrite Skills with real tools (§9); rewrite About in first person (§10).
10. Swap fonts (§11).
11. Mobile: un-hide `.hero-visual` (<980px) and `.skill-desc` (<640px).
12. Light theme decision (§12).

---

## 14. Assets Everett still owes

Cursor: leave the `onerror` placeholders in place until these land.

- `assets/img/case/hinge-cad-callouts.png` — Fusion **Capture Image** (not a screen grab; the current report screenshots include the Fusion toolbar and the Windows taskbar). Grid + view cube off, 2×.
- `assets/img/case/glasses-cad-callouts.png` — same.
- `assets/docs/MMET-281-Process-Material-Selection-Everett-Wong.pdf`
- `assets/img/case/pencil-holder.jpg` — **photo of the part he machined on the lathe and mill.** A real photograph of a part he personally made is worth more than every render on the site. Plain background, side lighting, show the turned surface.
- MMET 181 / 281 syllabi — to confirm any additional software for §9.
