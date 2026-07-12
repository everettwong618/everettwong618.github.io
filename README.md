# Everett Wong — Personal Website

Custom-coded, free-to-host personal site built from the design masterplan (employer-first editorial site) with audit upgrades (SEO, FAQ, case studies, availability, local landing page).

## Stack

- HTML / CSS / JavaScript
- Host on **GitHub Pages** (or Netlify if you want native forms)

## Folder

```
website/
  index.html
  faq.html
  privacy.html
  404.html
  college-station-web-design.html
  styles.css
  script.js
  blog/
  assets/img/
```

## Run locally

```bash
cd website
npx --yes serve .
```

Then open the URL shown in the terminal.

## Before launch — fill these in

1. **Social URLs** — confirm LinkedIn and Fiverr links (email is set to `everettwong.studio@gmail.com`).
2. **Formspree** — create a free form at formspree.io and replace `YOUR_FORM_ID` in `index.html`.
3. **Headshot** — drop a WebP/JPG into `assets/img/` and swap the photo placeholder in About.
4. **Resume** — add `assets/img/Everett-Wong-Resume.pdf`, then point the Credibility Resume card back to that file (currently “request via email”).
5. **OG image** — export `assets/img/og-banner.svg` to a 1200×630 PNG named `og-banner.png` (Canva works), or point meta tags at the SVG if your host serves it.
6. **Availability** — in the browser console: `setAvailability('booked')` or `'open'`. Or edit `data-availability` in the HTML.
7. **Skheduel** — replace the CSS mockup with real screenshots when you have them; tweak case-study copy if needed.

## Audit items you still do outside the code

- Google Business Profile (Web Designer · College Station / Bryan)
- LinkedIn headline + Featured link to this site (https://everettwong618.github.io/)
- Google Search Console + sitemap after the site is live
- Optional custom domain later (e.g. everettwong.dev) → point DNS at GitHub Pages

## Design notes followed

- Dark-first palette (navy / maroon / teal)
- Section rhythm: dark ↔ light ↔ split ↔ statement band
- `EW_` monogram, mono section labels, blueprint hero grid
- Projects before services; credibility instead of fake reviews
- Reduced-motion respected; light theme toggle included
