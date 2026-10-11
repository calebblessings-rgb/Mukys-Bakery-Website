# Muks Bakery implementation plan

## Product direction
A polished, mobile-first storefront that turns “what are you celebrating?” into an easy path to browse, build a box, add to cart and send a WhatsApp-friendly order request. The first release stays intentionally lightweight: no payment integration, no account creation and no backend dependency.

## Design direction
- **Design movement:** editorial bakery modernism — warm hospitality, generous paper-like space and bold, appetising product moments.
- **Core principles:** quick to scan on a phone; joyful but not childish; every section leads toward an order; the logo palette is treated as the brand’s main visual asset.
- **Color philosophy:** chocolate brown carries trust and craft; bakery orange brings appetite, energy and the warmth of a fresh oven; cream creates a soft, premium canvas that lets product imagery and calls to action breathe.
- **Layout paradigm:** a story-led, offset composition rather than a rigid centered grid. The hero is split into an editorial copy column and a product collage; occasion cards and product shelves use horizontal rhythm and overlapping accents.
- **Signature elements:** orange “oven glow” pill labels, cream cards on a chocolate canvas, and small rolling-pin / whisk motifs in the section dividers.
- **Interaction philosophy:** reduce decision fatigue. Search and filters are immediate, occasion chips pre-filter the catalogue, cart feedback is visible, and order modals preserve context.
- **Animation:** restrained lift-on-hover, soft slide-in modal, floating oven-glow gradients and a short toast on cart additions. Respect reduced-motion preferences.
- **Typography:** DM Sans for clear UI, Cormorant Garamond for expressive bakery headlines. Display type is oversized, tight and sentence-case; controls remain compact and legible.
- **Brand essence:** “Freshly baked joy for everyday celebrations — made nearby, ordered simply.” Personality: generous, playful, dependable.
- **Brand voice:** warm, direct and appetite-led. Example lines: “Make today taste like a celebration.” / “Pick your treat, choose your moment, we’ll bake the rest.”
- **Wordmark & logo:** use the supplied round Muks Bakery emblem as the primary mark, paired with a simple uppercase text lockup in the navigation.
- **Signature brand color:** Muks Orange `#F7941D`.

## Implementation approach
- Vite + React using `.jsx`/`.js`, plain CSS and HTML only; no TypeScript in the application source.
- `src/App.jsx` owns the demo catalogue, filters, cart state, checkout state, custom cake flow and celebration box calculation.
- `src/styles.css` owns the responsive editorial layout, palette, modal/drawer states and accessible focus/hover states.
- `public/manus-routes.json` declares the single-page route for Preview tooling.
- Product images use stable remote image URLs for the prototype; the supplied logo is stored in managed project storage and used from `/manus-storage/Mukyslogo_26b76f88.jpeg`.
- Orders are represented as a clear confirmation in the MVP and can be handed off to WhatsApp without requiring payment or account infrastructure.
- The navigation and footer also expose the supplied Instagram and TikTok profiles, while a dedicated offers section showcases birthday, anniversary and wedding promotions with discount codes.
- Occasion discovery includes large 2-tier and 3-layer cakes in vanilla, chocolate mocha and red velvet, with KSh pricing and occasion-specific labels.
