# 2026-05-28 — Night Element Run — Formats Signal Triad

Focus area: **Homepage formats explainer** (lab / sprint / workshop).

This is a **review-only** standalone element prototype (not ported into React routes).

## Idea

Make the “Formats” block do one job: **help a person choose the right learning shape** without fake proof, stats, or over-selling.

Instead of a long text paragraph, the block acts like a small “format console”:

- 3-format selector (tabs).
- Each format has a short, honest explanation: *when it fits* + *how it runs*.
- A small “rhythm strip” acts as a *behavioral hint* (cadence / iteration pace), not a progress bar.

## Micro-interaction

- Switching tabs updates:
  - the moving tab indicator,
  - the “rhythm strip” runner behavior,
  - the content panel (cross-fade/slide).
- Keyboard support:
  - `1/2/3` switches formats,
  - `←/→` works on the tablist.

## Borrowed mechanics (not copied)

Borrowed at a principles/mechanics level from prior AIM prototypes:

- “Dense but readable” light surface with mono labels + big uppercase headers.
- A small kinetic indicator that reinforces meaning (rhythm), instead of decorative motion.

No external layouts/assets were copied.

## Sources / constraints

- AIM direction + constraints: `website-ops/night-design-pursuit.md`
- No-fake-proof + quality target: `website-ops/design-feedback-rules.md`
- Latest feedback memory: `design-feedback-dashboard/data/design-feedback-registry.json`
- Homepage block brief (formats block exists): `website-ops/homepage-design-brief.json`

## What was intentionally NOT included

- No testimonials, ratings, “X people joined”, or other proof blocks (source-thin / fake-proof risk).
- No concrete program promises, prices, or dates (would require strict source verification per product).
- No direct “Buy” flow (this block is for orientation, not checkout).

## Self-rating (expected)

**8/10** — strong element candidate: clear job, no fake proof, mobile-safe, tasteful micro-motion tied to meaning.

## Validation notes

- Mobile-safe responsive layout (stacks to 1 column).
- `overflow-x: hidden` + grid/flex `min-width: 0` patterns to avoid horizontal overflow.
- `prefers-reduced-motion` supported.

## Local preview

- File: `V3 Site Repo - aimwebsite0.5/homepage-design-lab/runs/elements/2026-05-28-night-formats-signal-triad/index.html`
- Preferred preview URL (AIM Local Preview): `http://127.0.0.1:5123/preview/v3-site-repo-aimwebsite0-5-homepage-design-lab/runs/elements/2026-05-28-night-formats-signal-triad/`
- Mobile/LAN URL (same, on your Wi‑Fi IP): `http://192.168.1.71:5123/preview/v3-site-repo-aimwebsite0-5-homepage-design-lab/runs/elements/2026-05-28-night-formats-signal-triad/`

If port `5123` is busy, the preview server auto-selects the next free port in its fallback range. In that case, run `! AIM Homepage Design Lab.command` and use the printed port.
