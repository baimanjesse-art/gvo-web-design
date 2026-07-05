# GVO Web Design — Good Vibes Only

Single-page marketing site for **GVO Web Design**, built with React + Vite,
Tailwind CSS, and Framer Motion.

## Develop

```bash
npm install
npm run dev       # local dev server
npm run build     # production build → dist/
npm run preview   # serve the production build
```

## Structure

```
public/
  videos/gvo-logo-sweep.mp4    animated hero logo (light-sweep)
  images/logo/                 static logo PNG + SVG favicon
  images/team/                 headshots (drop jesse.jpg / elliott.jpg here)
src/
  components/                  one component per section
    Nav, Hero, About, Pricing, Booking, Order, Portfolio, Reviews, Footer
    ui/                        shared pieces (Logo, Reveal, SectionHeading)
  data/pricing.js              canonical tiers/add-ons/payment terms
```

## Placeholders to swap before launch

Search the code for `PLACEHOLDER` / `WIP` comments:

- **Calendly link** — `src/components/Booking.jsx` (`CALENDLY_URL`)
- **Team headshots** — add `public/images/team/jesse.jpg` and `elliott.jpg`
  (cards fall back to initial avatars until then)
- **PayPal / Venmo** — `src/components/Order.jsx` payment buttons are
  visual placeholders; wire up once business accounts exist
- **Contact email / phone + social links** — `src/components/Footer.jsx`
- **Industry intake forms** — only Landscaping is live
  (`src/components/Order.jsx`); other industries show a coming-soon note
- **Order submission** — logs to console; no backend yet

Portfolio mockups and testimonials are seeded content (see comments in
`Portfolio.jsx` / `Reviews.jsx`) — swap with real projects and reviews as
they come in.
