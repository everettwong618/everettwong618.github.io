# Everett Wong — Portfolio Rebuild Spec (Cursor Build Plan)

## Design thesis

> **Density from evidence, not from effects.**
> Keep the navy personal brand. Retire the decoration. The first screen should feel *full* because it is full of proof — a real screenshot, a real part, real numbers — not because it is full of grain, grids, glows, and a fake schematic.

This is a **hybrid**, and it is a deliberate correction to an earlier, more reductive plan. See §2 for why.

**Audience priority:** 1) internship recruiters & engineering hiring managers (MMET / manufacturing / process) 2) professor & campus credibility 3) occasional freelance — a light signal, never the homepage's story.

**Definition of done:** a hiring manager trusts Everett as an MMET student who builds real things. Not a WordPress odd-jobs freelancer. Not engineering costume.

---

## 1. Hard constraints — never violate

- **Never invent facts.** No tools, metrics, dates, employers, outcomes, or repos. Where a fact is missing, write a literal `TODO(everett):` placeholder and move on.
- **Attribution.** MMET 105 Buddy Chair *part drawings* are **Zaid Al-Abdali's**. Everett owned the assembly drawing, the exploded view + BOM, the nesting layout, and the assembly instructions. Do not claim the part drawings. **Do not build `case-mmet105.html` until Everett confirms his role.**
- **Skhedule** — correct spelling. It is a **finite-capacity staged event inviter**, not a student calendar. Live at `skhedule.vercel.app`. Do **not** add a GitHub repo link; the code is not public.
- **Chinese-American.** Not Filipino. No PHILSA.
- **Keep the a11y work:** skip link, `:focus-visible`, `prefers-reduced-motion`, alt text, JSON-LD, ≥44px tap targets.
- **Keep** the copy-email button and the Cmd/Ctrl+K palette.
- Static HTML/CSS/JS on GitHub Pages. No framework, no build step.
- Satellite pages (`faq.html`, `college-station-web-design.html`, `blog/`) **stay**. They just stop leaking freelance pricing onto the homepage.

---

## 2. Design direction — resolved

Two directions were in play. **Neither was right on its own.**

| | Direction A (live site) | Direction B (reductive) |
| --- | --- | --- |
| Palette | Navy / maroon / teal | Graphite, near-monochrome |
| Feel | Premium personal brand, atmospheric | Spec-sheet calm, documentation |
| Risk | Decoration outruns substance | First screen reads clinical and blank |

### The finding that settles it

The problem was **never the navy, and never "too much colour."** It was measured, not guessed:

```
#7A1E2C (maroon)      on #0B1120 (navy) →  1.84:1  FAIL
#9B2C3D (maroon-soft) on #0B1120        →  2.53:1  FAIL
#14B8A6 (teal)        on #0B1120        →  ≥3:1    PASS
```

**Maroon is physically illegible on Everett's navy.** Teal took over the site — every label, border, dot, link, hover, and mark — because it was the *only* brand colour that could actually be read on the background. That is a contrast failure nobody measured, not a taste failure.

So "delete teal, use maroon" (Direction B's instinct) would have broken the site's legibility. And "keep teal" keeps the single loudest tell that this is a template — **navy + teal + mono coloured eyebrows is the most-cloned developer-portfolio palette on the internet.**

The actual fix is a colour that did not exist in the system:

```
#B24455 (maroon-lift) on #0B1120        →  PASS (contrast + lightness band)
```

### The decision

**Keep the navy brand. Introduce `--accent-lift`. Retire teal. Earn the density back with evidence.**

- **Navy stays.** It is his brand, it is not the problem, and graphite would have traded a distinctive identity for a different cliché (the monochrome-restraint look).
- **Maroon becomes the only accent** — and now it can, because `--accent-lift` is legible. Maroon is the Texas A&M tie and it is *his*. This is what de-templates the site.
- **Teal is retired.** Not because teal is ugly, but because navy+teal is a fingerprint.
- **Atmosphere is kept — but it must be earned.** This is the whole thesis. The reason the hero got over-decorated is visible in the commit log: `"Compact the hero so name, tagline, and CTAs fit above the fold"` is immediately followed by `"Densify the hero with Skhedule proof and richer craft atmosphere."` He compacted it, it felt empty, so he refilled it — **with effects.** The instinct (don't be blank) was right. The material was wrong.

### How much atmosphere, concretely

| Keep | Cut |
| --- | --- |
| A **single** subtle background treatment (one faint grid **or** one glow — not both) | The other one |
| Real screenshots, large and uncropped | `.hero-grain`, `.hero-vignette`, `.hero-ticks` |
| Real CAD captures, real photographs, real charts | The fake schematic + its fake `TOL ±0.1 · REV B` |
| Hairline rules, spec tables, mono data labels | Both fake browser chromes (a window inside a window) |
| Hover states, one 300ms scroll-reveal | All 5 infinite animations (§5) |

**The schematic verdict:** the *motif* was right and the *prop* was fake. Drawing-sheet language — hairline rules, tick marks, mono callouts, spec tables — stays, and gets applied to **real artifacts**. Everett now has real Fusion 360 CAD, a real machined part, and a real cost model. He does not need to draw a fake one. `case-mmet281.html` is the reference implementation.

**First glance should feel:** a serious person's technical document, in his own colours, that happens to be beautifully set. Not clinical. Not costume.

---

## 3. Information architecture

> ⚠️ **Flagging a contradiction in the brief.** The brief lists `Hero → Projects → Experience → Skills → MMET → About → Contact` — About second-to-last. But Everett's direct feedback was: *"why is it formatted about last? thats weird. seems like your making it not a portfolio."* Both cannot hold. This resolves both:

**Final order:**

```
Hero
→ Identity strip        (a BAND, not a section — headshot + who he is + what MMET means)
→ Projects              (proof, moved up from 6th)
→ Experience
→ Skills                (real tool nouns)
→ About                 (fuller bio; absorbs the MMET explainer detail)
→ Contact
```

**Why the identity strip:** it settles the argument. A recruiter must know **what MMET stands for before they read a CNC/injection-moulding case study** — otherwise it reads as "some class thing" instead of "this is his field." And the headshot is the fastest trust signal on the page; burying it at position 6 wastes it. But a four-paragraph bio at position 2 is a real tax.

So: a **compact band** (~⅓ screen) directly under the hero — headshot, one sentence of who, one sentence defining MMET, the three stats. Projects then leads. The *long* About stays late, per the brief. Everyone's constraint is satisfied.

**Delete `#mmet` as a standalone section.** Its one-line definition moves to the identity strip; its six study-areas detail folds into the late About for anyone who wants depth. A full-height dark section with six hover-lifting cards is overweight for a definition.

**Delete `#credibility`** — three cards linking to Résumé / LinkedIn / Projects. It duplicates the nav, costs a full screen of scroll, and says nothing new. Move the résumé button into `#contact`.

**Delete `.statement-band`** — a 4.5rem band quoting his own footer tagline back at him.

Net: **six sections, down from eight**, and roughly 1.5 screens of scroll removed with zero information loss.

---

## 4. Colour & token layer (do this first; restyle nothing yet)

Replace the `:root` block in `styles.css`:

```css
:root {
  /* Surfaces — the navy brand, retained */
  --bg:              #0B1120;
  --bg-raised:       #161F2E;
  --text:            #E9ECEF;
  --text-mute:       #98A1AD;
  --hairline:        rgba(255,255,255,0.09);
  --hairline-strong: rgba(255,255,255,0.16);

  /* ONE accent: maroon.
     --accent measures 1.84:1 on --bg. It FAILS as text. Fills only.
     --accent-lift is validated PASS on --bg. Anything that must be READ uses this. */
  --accent:      #7A1E2C;   /* fills only: buttons, 2px rules, bars */
  --accent-lift: #B24455;   /* text, links, marks, active states, chart marks */

  /* Type scale — 1.25 ratio. Replaces ~20 ad-hoc sizes and 9 clamp ramps. */
  --fs-display: clamp(2.5rem, 4.5vw, 3.5rem);   /* HERO NAME ONLY */
  --fs-h2:      clamp(1.75rem, 2.6vw, 2.25rem);
  --fs-h3:      clamp(1.15rem, 1.5vw, 1.35rem);
  --fs-lead:    clamp(1.1rem, 1.3vw, 1.25rem);
  --fs-body:    1.0625rem;
  --fs-small:   0.9375rem;
  --fs-micro:   0.8125rem;

  /* Spacing rhythm — Projects gets the most air. */
  --space-section:    112px;
  --space-section-sm: 72px;
  --space-block:      48px;

  --font-sans: "Inter", system-ui, -apple-system, "Segoe UI", sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;

  --measure: 62ch;
  --max: 1080px;
}
```

**Delete `--teal`, `--amber`, `--cream`, `--font-display`.** Then sweep every `var(--teal)`:
- labels, eyebrows, marks, borders, dots → `var(--text-mute)`
- links, hovers, active states, focus rings → `var(--accent-lift)`

**Eyebrows (`// about_me`) become muted grey, not coloured.** A coloured mono eyebrow above every heading is the single loudest template tell. This one change buys more maturity than any other line in this file. Also drop the `//` and `< />` code-comment styling — it is dev-portfolio costume, and Everett is not applying for a dev job.

### Fix the inverted type hierarchy
`.hero-copy h1` currently maxes at `3.05rem` (styles.css:549) while `h2` maxes at `3rem` (styles.css:172). **At 1440px the name renders 48.8px and every section heading renders 48px — his name is the same size as "What is MMET?"** The global `h1` rule (styles.css:171) is dead code, overridden.

Delete the override. `h1` uses `--fs-display`; **nothing else on the page may.** Target: the name reads ~1.6–1.9× a section heading.

---

## 5. Delete: dead CSS + ambient motion

**Dead CSS (~400 lines, verified unused by every HTML file):**
`.mock-device`, `.mock-chrome`, `.mock-schedule`, `.mock-side`, `.mock-pill`, `.mock-line`, `.mock-cal*`, `.mock-mini-page`, `.mock-form`, `.mock-brand`, `.mock-cad`, `.identity-panel`, `.identity-mark`, `.identity-name`, `.identity-meta`, `.services-grid`, `.service-card`, `.project-thumb`, `.featured-thumb`, `.wf-label`, `.wf-caption`, `.case-block`, `.project-media`, `.project-shot*`
→ **Keep `.price`** (used by `faq.html` and `blog/`).

**Five animations currently loop forever.** Delete the keyframes and every call site:
`@keyframes blink` · `gridDrift` · `pulse` · `borderGlow` · `scrollDot` · `plotStroke` · `drawLine`

Also delete `.project.featured::before` — the pulsing gradient border is the strongest "AI-generated design" tell on the site.

- **`index.html`:** remove `.cursor-blink` from the header and footer logos.
- **`script.js`:** delete the magnetic-button block (~150–163) and the schematic parallax block (~103–127).

**Keep:** `.reveal` scroll fade (reduce to `opacity` + `translateY(8px)`, 300ms), hover states, and the Skhedule evidence stage-sync — that one is *functional*.

> Rule: motion must explain something. Ambient motion is noise.

---

## 6. Delete the fake schematic

The hero contains a fake browser chrome (`.hero-product-chrome`, "Live · Skhedule", traffic-light dots) with **a second fake window floating on top of it** (`.geo-chrome`, "DWG · LIVE", *another* set of dots). Inside that: a fictional engineering drawing — `SCHEMATIC_01`, `TOL ±0.1 · REV B`, and a hotspot that cycles revisions A→B→C.

A window inside a window is a craft error. Invented engineering shown to engineers is costume — and it undercuts exactly the credibility it reaches for. Everett has real CAD now.

- **`index.html`:** delete lines 164–200 — the whole `.geo-frame.geo-instrument` block.
- **`styles.css`:** delete `.geo-instrument`, `.geo-frame`, `.geo-layer`, `.geo-panel`, `.geo-card`, `.geo-chrome*`, `.hero-schematic`, `.schematic-*`.
- **`script.js`:** delete the hotspot handler (~129–148) and the `revisions` / `hotspotCopy` constants.
- Also remove `.hero-product-chrome` and `.hero-product-cap` — the hero screenshot gets a plain hairline border and a real `<figcaption>`.

---

## 7. Hero redesign

**Target: fits comfortably at 1280×800 with room to breathe.** Set `min-height: 88svh`, not `100svh`. Delete the `@media (max-height: 760px)` and `(max-height: 680px)` blocks (styles.css:952–965) — they exist only because the hero doesn't fit, and they hide content to paper over it. Fix the cause.

**Delete from the hero:** `.hero-grain`, `.hero-vignette`, `.hero-ticks` (+ its 4 spans), the `.hero-plot-line` SVG, `.scroll-hint`, the `blur()` in `.hero-enter`, and **either** `.hero-grid` **or** `.hero-glow` — keep one background treatment, not both.

### Copy (all facts real — use verbatim)

```html
<p class="eyebrow">MMET · Texas A&amp;M · College Station, TX</p>

<h1>Everett Wong</h1>

<p class="hero-sub">
  Manufacturing &amp; Mechanical Engineering Technology at Texas A&amp;M, graduating Fall 2028.
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

`.hero-ask` is the highest-value line on the site — the current hero never states what he wants. Style it so it cannot be missed: `--fs-lead`, full-opacity text, `--accent-lift` on the `<strong>`.

### Hero visual — this is where the density comes from

**One real visual, large and legible.** Currently `.hero-product-shot img` uses `object-fit: cover` clipped to `min(34vh, 280px)` — a cropped sliver of a dashboard, illegible, therefore functioning as *texture*. Set `object-fit: contain`, drop the max-height clamp, and let it be big.

**Asset priority — the hero visual must answer "what has he built?" for a *manufacturing* recruiter:**
1. `assets/img/case/pencil-holder.jpg` — the part he machined on a lathe and mill. **Best option.** A photograph of a part he personally made outperforms any render for this audience. `TODO(everett)`.
2. `assets/img/case/hinge-cad-callouts.png` — real Fusion 360 capture. `TODO(everett)`.
3. `assets/img/skhedule-event-dashboard.png` — **ship with this today.** It exists, it's good, it's live. Swap up the list as assets land.

**Delete `@media (max-width: 980px) { .hero-visual { display: none } }`.** On phones the entire visual currently vanishes — and a large share of recruiters arrive from a LinkedIn tap. Stack it under the copy instead.

---

## 8. Identity strip (new — a band, not a section)

Directly under the hero, ~⅓ screen. Hairline top and bottom, no card, no fill.

```
[headshot 96px]   I'm an MMET student at Texas A&M — Manufacturing & Mechanical
                  Engineering Technology: how products actually get designed, built,
                  tested, and improved under real constraints.

                  TAMU · MMET      College Station, TX      Open to internships
```

This answers "who is he?" and defines MMET **before** the projects, in five seconds, without a four-paragraph bio at position 2. Reuse the existing `.photo-frame` and `.stat-row` markup; drop the maroon offset block.

---

## 9. Projects — the section that gets him hired

### 9.1 Selected Work index
A scannable hairline table above the featured case. Mono for stack/year. No template has this; it reads as an engineering document.

| Project | Role | Stack | Year |
| --- | --- | --- | --- |
| Skhedule — staged-invite event app | Sole designer & builder | Next.js · TS · Postgres | 2025 |
| Process & Material Selection — hinge + eyewear | Sole author | Fusion 360 · DFM · MatWeb | 2026 |
| Buddy Chair — assembly docs, BOM, nesting | `TODO(everett)` — see §1 | Fusion 360 · DFM | 2025 |
| Local business landing page | Design & build | WordPress | 2024 |
| Contact form recovery | Debug & handoff | WordPress · PHP | 2024 |

### 9.2 Case pages
- **`case-mmet281.html` — BUILT.** Link it from the index and the project grid. It is also the visual reference for this whole redesign; its `<style>` block now uses the navy tokens above. It needs three assets (§12).
- **`case-mmet105.html` — BLOCKED.** Do not build. See §1 attribution.

### 9.3 Promote MMET 281 out of the card grid
It is currently a three-line text card tied for last in a 2×2 grid — and it is the **only** thing on the site proving he is an *engineering* candidate rather than a web kid. Everything else is software or soft skills. It becomes a featured case with its own page.

### 9.4 Tighten Skhedule
- `.evidence-step { min-height: 46vh }` × 4 = **~184vh of scroll for one project.** Reduce to `34vh`, trim the copy.
- The result line "Working MVP, end to end" is the weakest possible outcome statement. Needs a number: `TODO(everett): events created / invites sent / overbookings prevented`.
- Keep the sticky stage-sync. It is the best-built thing on the site.

---

## 10. Skills — replace poetry with tools

The section currently names **zero tools**. `◇ CAD / Engineering Graphics — "Drawings that show how to build"` is poetry. Recruiters and ATS scan for tool nouns. **This is the biggest credibility gap on the site.**

Every line below is evidenced by the MMET 281 report, the MMET 105 report, or Everett's stated lab work. **Use verbatim. Do not add to this list.**

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

**Delete `@media (max-width: 640px) { .skill-desc { display: none } }`** — mobile users currently lose every descriptor, leaving bare nouns. Now that the descriptors carry the tool evidence, they must show on mobile.

`TODO(everett):` the MMET 181 / 281 syllabi may confirm additional software (Excel, Minitab, MATLAB, GD&T coursework). Add **only** what the syllabi actually list.

---

## 11. Surfaces, cards, spacing, copy

**Stop the strobe.** Sections alternate cream → navy → alt → cream → navy → cream → navy 6+ times, with **four different grid overlays** (24px `.project-thumb`, 32px `.section-light`, 36px `.hero-grid`, 40px `.statement-band`).
- Commit to **one dominant surface: navy.**
- At most **one** light section, as a deliberate change of register.
- Delete `.section-alt` / `.section-quiet`. Differentiate with **type scale, spacing, and hairline rules** — not alternating paint.
- **One** grid overlay (32px), used in **at most one** place.

**Fewer boxes.** Everything is a bordered rounded rectangle (`.mmet-card`, `.skill-group`, `.project-card`, `.cred-card`, `.timeline-item`, `.contact-tips`). Convert to **hairline-ruled rows** — see the `table` and `.spec-table` patterns in `case-mmet281.html`.
**Reserve a real bordered card for exactly ONE thing: the featured project.** Scarcity is what makes emphasis work.

**Freelance containment.** Delete the `.services-compact` price list from the homepage ("Landing pages — from about $150 / WordPress fixes — from about $50"). A hiring manager for a manufacturing internship who reads *"$50 WordPress fixes"* reclassifies him from engineer to odd-jobs kid. Reduce to **one line** in `#contact`:
> "Outside school and internships, I occasionally take on small web and WordPress work — details in the [FAQ](faq.html)."

Remove **Services** from the primary nav. Pricing stays in `faq.html` / `college-station-web-design.html`. Those pages are not touched.

**Copy fixes:**
- About is **third person** ("Everett Wong is…", "His background blends…") while the hero and contact are first person. Rewrite in **first person**, cut to two paragraphs.
- **Delete "He is Chinese-American."** It is an orphan sentence mid-bio, connected to nothing around it, and does nothing for the hiring goal.
- **"What this taught me:"** appears on all three timeline entries in italic. Keep it on **one** (the referee entry). Delete the others.
- Footer `.trust-row`: delete "Clear Communicator" and "Work That Holds Up." Self-declared virtues erode trust. Keep the factual two.
- Delete `.easter` ("Built from scratch.").
- `.read-progress`: 1px hairline in `--text-mute`, or delete. A maroon→teal gradient progress bar is a blog affordance on a page this short.

---

## 12. Typography

Three families today: **Space Grotesk** (display), **Source Sans 3** (body), **JetBrains Mono**.
Space Grotesk's geometric quirks read "startup," which fights *mature, credible, engineered*. **Drop it.**

- **Inter** — headings *and* body. Weight and size do all the work.
- **JetBrains Mono** — **data only**: dates, tags, stack names, figures, table columns, spec keys.

> Rule: mono means "this is a value." If it isn't data, it isn't mono.

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
```

`.section-lead` is currently `1.05rem` vs body `1.0625rem` — **the lead is smaller than body text.** Set to `--fs-lead`, `color: var(--text-mute)`.

**Do the font swap LAST.** It touches everything.

---

## 13. Light theme

The dark theme is well-tuned; the light theme is visibly less finished (see the `[data-theme="light"]` overrides bolted on throughout). A half-finished second theme is a craft liability on a site whose entire argument is craft.

**Recommendation: ship dark-only.** Delete `.theme-toggle`, the `[data-theme="light"]` blocks, and the theme JS. If Everett wants to keep it, it needs a full polish pass — a separate project, not part of this one. **Decision required from Everett before executing this step.**

---

## 14. Execution order

Never leave the site broken between steps. Show a diff per step.

1. Token layer (§4) — navy retained, teal retired, `--accent-lift` added. Restyle nothing yet.
2. Delete dead CSS + ambient motion (§5). Verify the page still renders.
3. Delete the fake schematic — HTML **and** CSS **and** JS (§6).
4. Rebuild the hero (§7).
5. Delete `#credibility` + `.statement-band`; strip pricing from `#services`; delete standalone `#mmet` (§3, §11).
6. Add the identity strip (§8).
7. Reorder to `Hero → Identity → Projects → Experience → Skills → About → Contact`; update nav + the `commands` array in `script.js` (§3).
8. Unify surfaces; cards → hairline rows (§11).
9. Selected Work index; link `case-mmet281.html`; tighten Skhedule (§9).
10. Skills with real tools (§10); About into first person (§11).
11. Fix the type hierarchy + swap fonts (§4, §12).
12. Mobile: un-hide `.hero-visual` (<980px) and `.skill-desc` (<640px).
13. Light-theme decision (§13) — **wait for Everett.**

---

## 15. Assets Everett still owes

Leave `TODO(everett):` and the `onerror` placeholders in place until these land.

- `assets/img/case/pencil-holder.jpg` — **photo of the part he machined on the lathe and mill.** Highest-value image on the site; a real part beats every render for a manufacturing recruiter. Plain background, side lighting, show the turned surface.
- `assets/img/case/hinge-cad-callouts.png` — Fusion **Capture Image** (not a screen grab: the report screenshots contain the Fusion toolbar and the Windows taskbar). Grid + view cube off, 2×.
- `assets/img/case/glasses-cad-callouts.png` — same.
- `assets/docs/MMET-281-Process-Material-Selection-Everett-Wong.pdf`
- **Buddy Chair role confirmation** — unblocks `case-mmet105.html`.
- **Skhedule outcome metrics** — events / invites / overbookings prevented.
- MMET 181 / 281 syllabi — to confirm any additional software for §10.
