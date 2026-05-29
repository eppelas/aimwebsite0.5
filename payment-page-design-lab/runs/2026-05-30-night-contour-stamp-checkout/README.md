# Contour Stamp Checkout (payment, 4 states, review-only)

Date: `2026-05-30`

Path:
- `V3 Site Repo - aimwebsite0.5/payment-page-design-lab/runs/2026-05-30-night-contour-stamp-checkout/`

## Idea
A **light, paper-like checkout** where the main mechanic is a subtle **contour/stamp frame** that changes shape per state.

Goal: keep the payment surface minimal and readable while still feeling alive (AIM energy) without turning into debug/QA UI.

## Mechanics
- **Contour frame** (dashed path) morphs across states: form → redirect → paid → failed.
- **State feedback** is a compact progress + status card (no route scrubbers, no URL hints, no visible debug panel).
- Optional QA: `?debug=1` shows a tiny state switcher panel; by default it is hidden.

## Source fidelity
Copy/UX source:
- `V3 Site Repo - aimwebsite0.5/src/components/PricingPaymentPopupDatalineHeader.tsx`

Rules respected:
- Methods: `USDT`, `РУ-КАРТЫ`, `EU-КАРТЫ`.
- Discount QA: Telegram handle `aim` / `@aim` → `−20%`; promo `ponchik` → `−5%`.
- Required states shown: form (choose/pay), redirecting (bank redirect), failed, paid/join.
- Success CTA: Telegram bot only (`/присоединиться` label shown in hint).

Owned/local assets:
- `V3 Site Repo - aimwebsite0.5/public/assets/ai-mindset-logo-transparent.png`

## Avoid rules addressed
- Avoids the 0/10 payment failure: **no visible state scrubbers / debug panels** in the normal design.
- Avoids red CTA / red active cards; accents are neutral/green.
- Keeps inputs compact and readable.

## Self-rating (preflight)
Expected owner rating: **8.1 / 10**

## Validation notes
- Mobile: methods collapse to one column under 420px.
- No horizontal overflow expected.
- `prefers-reduced-motion`: no required animations.

## Local preview
Desktop/local:
- `http://127.0.0.1:5123/preview/v3-site-repo-aimwebsite0-5-payment-page-design-lab/runs/2026-05-30-night-contour-stamp-checkout/index.html`

Mobile/LAN:
- `http://192.168.1.71:5123/preview/v3-site-repo-aimwebsite0-5-payment-page-design-lab/runs/2026-05-30-night-contour-stamp-checkout/index.html`

If the preview server is not running, start/reuse it via `! AIM Payment.command` or `! AIM Homepage Design Lab.command`.
