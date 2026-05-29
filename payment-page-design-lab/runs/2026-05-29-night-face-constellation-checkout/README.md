# 2026-05-28 · Night run · Quiet Orbit (payment page, 4 states)

Review-only artifact: single static page that keeps the payment form compact and exposes state checks only through a small external review layer.

## Files

- `index.html` — centered compact payment card + subtle dark atmosphere + external review arrows.

## Sources (primary)

- Payment popup UX/copy reference: `V3 Site Repo - aimwebsite0.5/src/components/PricingPaymentPopupDatalineHeader.tsx`
- Visual/variant compare reference: `V3 Site Repo - aimwebsite0.5/payment-popup-compare.html`

## What this is trying to test

- Dark immersive checkout that stays **minimal + compact** and does not drift from the current popup’s structure/copy.
- A **single-card** layout where the background is atmospheric but non-competitive.
- One fixed order with no `MAIN LAB / ADVANCED / PREMIUM` selector inside the payment form.
- Four states only:
  - payment order
  - bank redirect
  - payment failed
  - payment received / open bot

## Borrowed mechanics (and what is NOT copied)

Borrowed (mechanics only):
- Same *core labels/copy* for the payment form (methods, placeholders, CTA labels).
- Same concept of “route/redirect” being a lightweight status screen; cancel is a no-op in this review prototype.
- Same demo discount triggers (`aim/@aim` for Alumni, `ponchik` for promo) as a **behavior anchor** only.

Not copied:
- No React / Motion implementation, no layout variants (“console/route/hybrid/...”) copied.
- No exact typography scale, spacing, or composition from existing popups/compare panes.
- No external brand assets, logos, or third‑party layouts.

## Sonya feedback response (Galaxy 5/10)

Applied constraints:
- No red CTA/active states (primary CTA stays green/neutral).
- No black text on dark controls (dark inputs + light text; black text only appears on light/green surfaces).
- Avoided gradient-heavy controls (controls are flat; gradients are background-only and low contrast).
- Compact inputs + minimal checkout structure.

## Copy notes (do-not-invent rule)

- Success + failed body text is kept aligned with current popup strings.
- Redirect state intentionally avoids “final production” narrative; it stays minimal and notes that acquiring/redirect copy is environment-dependent.

## Self-rating

- **8.2/10** for “minimal immersive checkout” with low-noise background and compact controls.
- Main risk: needs a quick real-device check for contrast + tap targets at ~360px width.

## Validation notes (expected)

- No horizontal overflow at common mobile widths (360–430px).
- External review arrows are keyboard-focusable and are not part of the payment form.
- No gradient-heavy controls; background orbs + grain are subtle.

## Links (fill-in)

- Desktop file: `V3 Site Repo - aimwebsite0.5/payment-page-design-lab/runs/2026-05-28-night-quiet-orbit/index.html`
- If serving via a local static server:
  - Desktop: `http://localhost:<PORT>/2026-05-28-night-quiet-orbit/index.html`
  - Mobile/LAN: `http://<LAN-IP>:<PORT>/2026-05-28-night-quiet-orbit/index.html`
