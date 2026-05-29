# AIM Payment — Filmstrip Checkout (2026-05-29)

Lane: `payment / full run (4 states)`

## Idea

Materially different payment composition:

- A left **filmstrip route** that makes state progression obvious without extra narrative copy.
- A right **compact checkout surface** that keeps the existing payment UX and copy.

## Four required states

1. Choose/pay (`form`)
2. Bank redirect (`redirecting`)
3. Payment failed (`failed`)
4. Payment succeeded / join (`paid`)

Switch with:

- URL param: `?status=form|redirecting|paid|failed`
- Bottom arrows, filmstrip frames, or the scrubber slider.

## Source fidelity

Copy and UX constraints are aligned with the current payment popup prototype used in the lab (same labels, methods, and discount test note):

- `V3 Site Repo - aimwebsite0.5/payment-page-design-lab/manifest.json` (paymentUx)
- Existing run reference for strings: `V3 Site Repo - aimwebsite0.5/payment-page-design-lab/runs/2026-05-28-night-quiet-orbit/index.html`

No external assets or text were introduced.

## Feedback response

- Not a near-duplicate “same centered card + tiny background skin” cluster: layout is **split** (route + checkout), with a new state mechanic (filmstrip + scrubber).
- Avoids red CTAs; avoids black text on dark controls; keeps compact inputs.

## Self-rating (honest)

Expected: **8/10 candidate** if the split layout stays minimal on mobile (filmstrip collapses cleanly) and contrast stays safe.

## Local preview links

- Desktop: `http://127.0.0.1:5123/preview/v3-site-repo-aimwebsite0-5-payment-page-design-lab/runs/2026-05-29-night-filmstrip-checkout/index.html`
- Mobile/LAN: `http://192.168.1.71:5123/preview/v3-site-repo-aimwebsite0-5-payment-page-design-lab/runs/2026-05-29-night-filmstrip-checkout/index.html`

