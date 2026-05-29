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
- Variants: 21

## Near-Duplicate Failure Rule

Anca rejected the initial `Payment 02-05` / `Topographic Price` cluster as not
meaningfully different designs. The titles promised different ideas, but the
implementation reused the same centered payment card, form hierarchy, payment
states, and canvas shell while changing mostly background color, accent color,
ambient pseudo-elements, or tiny decorative details.

That is not a valid set of review variants.

Active rule:

- a new payment-page variant must have a material delta: composition,
  hierarchy, interaction, motion mechanic, content model, state behavior, or
  source-mechanic fidelity;
- background/accent/ambient-only changes are a skin, not a separate design;
- if two variants intentionally share the same structural shell, keep at most
  two of them and explain the exact difference in `reviewFocus` /
  `designDelta`;
- if a fresh active payment-page variant fails UX, hierarchy, readability,
  source-fidelity, mobile, or material-difference QA, that failure starts a
  redesign loop. Do not count the variant as done and do not solve it by merely
  hiding it from the index. Diagnose the failure, redesign, rerun desktop/mobile
  QA, and repeat until it is adequate or explicitly abandoned with a written
  reason;
- Sonya must not send near-duplicate skins as separate review cards.

The following initial variants are hidden from the default gallery and Sonya
review until rebuilt with a real design argument: `garden-ledger`,
`noise-receipt`, `topographic-price`, `constellation-route`, `vault-access`,
`signal-lines`, `glitch-grid`, `case-mosaic`, and `terminal-orbit`.

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
- Inkfield review artifacts may keep the owned interaction mechanics, but visible reference labels must not leak into the page. Do not show `S.K.Y.ai`, `inkField`, source timecodes, frame counters, or raw debug labels; replace with AIM/payment-field language or remove the UI.
- `AIM Event Horizon` was the 2D canvas approximation after Anka's `7.5/10` feedback. It kept the mouse-dependent glow, but the user rejected it as still much weaker than the actual X26 source.
- `AIM Direct Particle` is the correction: a native Three.js direct port of the owned X26 `ParticleSystem.tsx` mechanics into this standalone payment page. The shader, particle count, strand count, bowl/dust formulas, additive blending, camera, and mouse smoothing are kept as close to the source as possible, then raised slightly in frame after user feedback.
- `AIM Mindset Morph` is a close sibling of `AIM Direct Particle`: it keeps the same source particle density and compact payment form, but uses a shader-side morph toward an AI/mindset/transformation field instead of a 1:1 source copy. It does not add new checkout text.
- `AIM Mindset Morph Contrast` is a separate copy of `AIM Mindset Morph` for comparison only. It keeps the same UX and particle engine, but darkens the form surface and raises placeholder/input/status contrast so the field group is readable over light particle haze. Do not overwrite the original while this copy is under review.
- `AIM Payment Gravity` and `AIM Vortex Checkout` remain archive candidates only after a clearly stronger replacement is user-approved.
- QA rule before sharing links: check active control contrast, no black text on dark backgrounds, no red CTA/active cards, no gradient-heavy active states, no invented payment copy, compact input typography, no horizontal overflow, no tariff selector in the payment form, cancel as no-op, and `Telegram: aim` + promo `ponchik` discount behavior.
- Input contrast rule for dark particle variants: if the background behind the form can become lighter than the panel, inputs and method buttons must use a local surface and placeholders must stay lower priority than method labels while still readable. Do not solve contrast by making the card opaque black; keep the card visibly translucent and tune input surface, text color, and haze together.
- General form hierarchy rule: primary/required fields, selected methods, and primary CTAs must visually outrank optional fields, helper text, placeholders, and secondary controls. Optional controls may be available and aligned, but they must not get stronger fill, border, contrast, type scale, or spacing priority than the primary action path.
- Selected-state rule: payment method buttons and any segmented/radio-like controls must have an explicit selected state. The selected option must differ from inactive options through fill and/or stroke plus text contrast; an `aria-pressed` value without visible hierarchy is a failed UI state.
- Control annotation rule: discounts, helper notes, error messages, and state labels must be spatially attached to the field/control they explain. A label must not float between unrelated controls, become a random card caption, or replace the actual button/control label.
- Payment-method discount rule: the 5% discount label belongs to the USDT method as a small attached badge/pseudo-label. It must not become part of the method button text (`USDT` stays the button label) and must not float as unrelated copy on the card.
- Validation/state rule: error, failed, invalid, and blocked states need a distinct negative treatment. They must not use the positive green accent, and they must not be so neutral that the required correction is easy to miss. Success, applied discounts, and active selections can use green.
- Field validation rule: missing required input should show negative text/line/required marker, but should not flood the entire input with a red background. Red fill is reserved for explicit alert surfaces, not normal form fields.
- Label/status hierarchy rule: label-to-control spacing must be tighter than label-to-neighbor-status spacing. Status copy should stay readable and contrast-tested; do not force tiny uppercase labels when sentence-case support text communicates better.
- Mobile QA must check viewport clipping, not only full-page screenshots. At minimum test `375x812` (iPhone 11 Pro CSS viewport), `375x667` (safe-height with browser chrome), and `414x896` (iPhone 11 CSS viewport). Pass condition: active card/content top and bottom are inside the viewport, review/debug UI is hidden in `clean=1`, and primary CTAs do not stretch into full-width review-tool bars unless that is an explicit design choice.
- Automated local check: `npm run qa:design-hierarchy` verifies the current payment-page review candidates for required-field negative treatment, optional/control hierarchy, attached USDT discount badge, and mobile viewport overflow.

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
- `../X26 workshop presentation/node_modules/three/build/three.module.min.js` -> `payment-page-design-lab/assets/vendor/three.module.min.js`
- `../X26 workshop presentation/node_modules/three/build/three.core.min.js` -> `payment-page-design-lab/assets/vendor/three.core.min.js`

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
