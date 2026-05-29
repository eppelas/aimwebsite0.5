# AIM Homepage — Cinema Reading Flow (2026-05-29)

Lane: `homepage / full`

## Idea

Readable light homepage concept where the “interesting” layer (logo motion video + subtle atmospheres) never competes with Russian body copy.

Two mechanics:

1. **Cinematic hero** using the owned `ai-mindset-logo-assembly-12s.mp4` as a calm ambient layer.
2. **Focus mode** (persisted) to remove visual noise and maximize reading contrast.

## Source fidelity

Content + labels are taken from the local snapshot:

- `V3 Site Repo - aimwebsite0.5/homepage-design-lab/source-snapshots/aimindset-org-2026-05-28.json`

Media assets are local:

- `V3 Site Repo - aimwebsite0.5/public/assets/logo-assembly/*`
- `V3 Site Repo - aimwebsite0.5/public/assets/cases/community-night/*`
- `V3 Site Repo - aimwebsite0.5/public/assets/speakers/*`

## Borrowed mechanics (not copied)

- Film-like hero atmosphere + “reading first” layout discipline.
- A single optional “focus” switch that reduces decoration and increases calm surfaces.

What was **not** copied: any external layouts, fonts, images, or text.

## Feedback response (2026-05-28 hard correction)

- Avoids beige/yellow grid/system-card shell and monospaced Russian body text.
- Keeps paragraphs on calm surfaces; no diagram noise behind copy.
- “Next step” is not a bland portal row (keeps real links but doesn’t make it the hero of the page).

## Self-rating (honest)

Expected: **8/10 candidate** if typography + spacing reads well on mobile screenshot. If mobile feels dense, treat as **failed exploration** and iterate.

## Validation notes

- Uses `prefers-reduced-motion` (video hidden).
- Sticky TOC is desktop-only (mobile uses normal flow).
- No horizontal overflow intended; links allow wrapping.

## Local preview links

- Desktop: `http://127.0.0.1:5123/preview/v3-site-repo-aimwebsite0-5-homepage-design-lab/runs/full/2026-05-29-night-cinema-reading-flow-homepage/index.html`
- Mobile/LAN: `http://192.168.1.71:5123/preview/v3-site-repo-aimwebsite0-5-homepage-design-lab/runs/full/2026-05-29-night-cinema-reading-flow-homepage/index.html`

