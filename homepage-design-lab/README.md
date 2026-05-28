# AIM Page Design Lab

Review-only generated page design lab for AI Mindset.

This lab is separate from the live React app. It is a place for scheduled Codex automations to generate static HTML prototypes before any design is manually selected and ported into production.

## Source Policy

- Content source: `https://aimindset.org/`
- Structure source: `/Users/viola/All/Yandex.Disk.localized/3 Process/5 Work/AI Mindset/Website content/aim-homepage-about-structure-from-transcript.md`
- Visual references: AIM Site Hub, AIM OS, health/selfdev pages, Style Gallery, Blocks Lab, Creative Taste Bot generated animations, Art of Noise by Associate Studio / Cooper Hewitt.
- Art of Noise is a mechanics reference only: variable typography, disciplined interpretive labels, immersive large-scale type, density/repetition, spatial tension, and sound-to-visual-system logic.
- 2026-05-28 feedback: over-literal AIM OS / beige-grid / monospaced Russian homepage variants are rejected for readability. AIM OS can inform principles and mechanics, but homepage body copy needs readable proportional typography, calm surfaces under text, and desktop/mobile screenshot readability QA before handoff.
- External references are inspiration only. Do not copy assets, layouts, or distinctive visual work.

## Review Surface

The default `index.html` surface is a compact Style Gallery-like index for full-page directions with screenshot thumbnails. It should stay fast to scan: screenshot cards first, direct full-page links on demand, and compare mode as a secondary tool.

Use:

- `index.html?view=gallery&lane=pages` - full-page homepage directions plus payment page directions.
- `index.html?view=gallery&lane=homepage` - homepage-only directions.
- `index.html?view=gallery&lane=payment` - payment page directions.
- `index.html?view=gallery&lane=elements` - focused blocks/elements.
- `index.html?view=compare` - left/right comparison when a shortlist exists.

Payment page concepts remain sourced from `../payment-page-design-lab/`; this index only adds them as review cards so page designs can be scanned together.

Do not add payment popup compare variants here. `payment-popup-compare.html` is a separate technical compare surface, not a payment page design direction.

Cards also read `../../design-feedback-dashboard/data/design-feedback-registry.json`
through the local preview route and show the summed `Соня + Саша + Анка` rating
out of `30`. Hover or keyboard focus on the score badge reveals the individual
`0-10` ratings. Missing scores stay blank as `—`; the lab must not invent them.

Structure-only maps and wireframes must not appear in the default gallery as
design candidates. If a run is useful only as internal information architecture,
mark it with `status: rejected-structure-only` and `showInGallery: false`. It
can still be inspected manually with `?include=hidden`, but it is not a design
direction for review.

## Files

- `index.html` - Style Gallery-like index plus compare review UI.
- `manifest.json` - source of truth for all generated variants.
- `assets/previews/*.png` - generated screenshot thumbnails for homepage, payment, and element cards.
- `assets/previews/preview-index.json` - latest screenshot capture index.
- `scripts/capture-page-design-previews.mjs` - local thumbnail capture script.
- `runs/full/` - complete homepage prototypes.
- `runs/elements/` - focused homepage block or UI element prototypes.

## Screenshot Previews

After adding or updating page/element/payment variants, run:

```bash
node "V3 Site Repo - aimwebsite0.5/homepage-design-lab/scripts/capture-page-design-previews.mjs"
```

The script expects the local preview server at `http://127.0.0.1:5123` by default. Override with `AIM_PREVIEW_BASE` when needed.

## Review Policy

Generated variants are not production code. No automation may commit, push, deploy, or replace the homepage. A winning direction must be reviewed locally and ported in a separate task.
