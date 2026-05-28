# AIM Payment Page Design Lab

Review-only dark payment-page canvas prototypes.

This lab does not replace the live site and does not change the React checkout flow. It exists to review a direction where the current payment popup becomes a whole payment page canvas while keeping the same payment labels, payment methods, validation, discount behavior, and status copy.

## Source Fidelity

- Payment copy and UX: `src/components/PricingPaymentPopupDatalineHeader.tsx`.
- Fixed review order: `€890`, from `src/components/LabW26PageV3.tsx`. The payment page prototype intentionally has no `MAIN LAB / ADVANCED / PREMIUM` selector inside the form.
- Current payment methods: `USDT`, `РУ-КАРТЫ`, `EU-КАРТЫ`.
- Alumni handles: `aim`, `@aim`.
- Promo code used by the current component: `ponchik`.
- States: `оплата заказа`, `переход к оплате`, `оплата получена / откройте бота`, `оплата не прошла`. `join` is not a separate page state here.
- External reviewer note, outside the form: `Для проверки скидок: в Telegram введите aim, в промокод — ponchik.`
- Reference text rule: do not copy visible words, slide titles, labels, or presentation copy from visual references into payment prototypes. References can drive mechanics, motion, composition, density, and rhythm only. Visible copy must come from the payment source or be directly relevant to AIM/payment review.

## Design Reasoning References

- Shared reference pack: `../../website-ops/design-curriculum-reference-pack.md`.
- Use it as internal design training for curation, project argumentation, visual codes, information design, accessibility, composition, storytelling, UI, and brand-system logic.
- Do not copy lesson text into this lab.

## Current Run

- `runs/2026-05-27-payment-canvas-10x/`
- Main review UI: `index.html`
- Variants: 19

## References

- X26 workshop presentation slide 9: rotating text-ring interaction is used as a mechanics reference only.
- Current AIM case/product imagery is copied locally from V3 assets into `assets/` for review context.
- `teamos-geo-animation.svg` is copied locally from current payment-popup assets for the route/status board.
- Anca Projects `hero-canvas` starfield is copied as mechanics for the `Anca Galaxy Form` variant: 1200 projected particles, red stars, mouse-reactive drift, and curved depth field.
- `Anca Galaxy Form` has a clean review mode: `index.html?variant=anca-galaxy-form&clean=1`. Composition rule: compact centered payment form, no tariff selector, no extra page entities, interactive galaxy as the page background.
- `Clean Galaxy Page` has a cleaner page-mode review URL: `index.html?variant=anca-galaxy-clean-page&clean=1`. Composition rule: no close/X control, no popup chrome, softer transparent glass, minimal borders, same payment labels and status copy.
- Both Galaxy variants are currently rated `5/10` by Anka and are sendable to Surikat Sonya review by explicit user override. They are weak/rework candidates, not approved style anchors.
- X26 Workshop Presentation references added 2026-05-28:
  - Slide 3 `Practice` / `ParticleSystem.tsx` -> `AIM Payment Gravity`.
  - Slide 4 `Stay` / `VortexSystem.tsx` -> `AIM Vortex Checkout`.
  - Slide 6 `Storm` / `StormSystem.tsx` -> `AIM Slow Storm`.
  - Slide 9 `Inkfield` / `InkFieldSlide.tsx` -> `AIM Dark Inkfield`.
  These variants adapt interaction mechanics, motion logic, and atmospheric composition only. Payment copy, states, labels, CTAs, discounts, and validation stay sourced from the current payment component.
- `AIM Event Horizon` is a new stronger candidate after Anka's `7.5/10` feedback on the previous two X26-derived directions. It reuses the X26 `ParticleSystem` bowl/strand formula more directly, adds pointer inertia and velocity wake, keeps the successful mouse-dependent glow, and removes visible reference text. `AIM Payment Gravity` and `AIM Vortex Checkout` are archive candidates only after a clearly stronger replacement is user-approved.
- QA rule before sharing links: check active control contrast, no black text on dark backgrounds, no red CTA/active cards, no gradient-heavy active states, no invented payment copy, compact input typography, no horizontal overflow, no tariff selector in the payment form, cancel as no-op, and `Telegram: aim` + promo `ponchik` discount behavior.

No external layouts, assets, typefaces, or page compositions are copied.

## File Operation Log

Copied assets:

- `public/assets/cases/community-night/team-os-darya-product.png` -> `payment-page-design-lab/assets/team-os-darya-product.png`
- `public/assets/cases/community-night/meeting-pipeline-natasha-product.png` -> `payment-page-design-lab/assets/meeting-pipeline-natasha-product.png`
- `public/assets/cases/community-night/agent-meditation-daniil-product.png` -> `payment-page-design-lab/assets/agent-meditation-daniil-product.png`
- `public/assets/cases/community-night/burnout-next-alexey-product.png` -> `payment-page-design-lab/assets/burnout-next-alexey-product.png`
- `public/assets/payment-popups/teamos-geo-animation.svg` -> `payment-page-design-lab/assets/teamos-geo-animation.svg`
- `public/assets/speakers/anna-lozitskaya.jpg` -> `payment-page-design-lab/assets/anna-lozitskaya.jpg`
- `public/assets/speakers/alexey-ivanov.jpg` -> `payment-page-design-lab/assets/alexey-ivanov.jpg`

Added files:

- `payment-page-design-lab/index.html`
- `payment-page-design-lab/manifest.json`
- `payment-page-design-lab/README.md`
- `payment-page-design-lab/runs/2026-05-27-payment-canvas-10x/index.html`
- `payment-page-design-lab/runs/2026-05-27-payment-canvas-10x/README.md`

Moved files: none.
Renamed files: none.
Deleted files: none.

Rollback path: move the added `payment-page-design-lab/` directory to Trash, then remove the `payment-page-design-lab` registry entry from `website-ops/tool-registry.json` and rerun `node local-preview/sync-tool-registry-summary.mjs`.
