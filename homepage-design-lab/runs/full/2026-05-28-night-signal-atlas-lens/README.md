# AIM Homepage (review-only) — 2026-05-28 — Signal Atlas Lens

Path:

- `V3 Site Repo - aimwebsite0.5/homepage-design-lab/runs/full/2026-05-28-night-signal-atlas-lens/`

## Idea

A light, readable “signal atlas” homepage: instead of one hero + a long generic scroll, the page exposes **a route-map of all 13 required blocks** and adds a single meaningful interaction mechanic — **Lens**.

**Lens** (All / Personal / Team / Community / Non‑Profit) does real work:

- It highlights the relevant cards and quotes across the page (not hiding content, just changing emphasis).
- It updates the hero guidance copy (“what to do next”) and the atlas diagram.
- It persists in `localStorage` so a reviewer can flip between mindsets without losing their place.

## Borrowed mechanics (and what was NOT copied)

Borrowed mechanics (formal / interaction only):

- “Route bar” / scroll-spy navigation for long, multi-block pages (orientation on dense homepages).
- “Lens / mode switch” to re-weight one page for different user intents without separate landing pages.
- Small in-page “map diagram” that responds to the chosen mode.

Explicitly NOT copied:

- No external layout was reproduced 1:1 (no pixel copying, no composition tracing).
- No external brand identities, typefaces, logos, or imagery assets were copied.
- No fake proof: no empty testimonial cards; quotes used here are taken from the current V3 local source file listed below.

## Sources

Primary brief + rules:

- `website-ops/homepage-design-brief.json`
- `website-ops/design-feedback-rules.md`
- `design-feedback-dashboard/data/design-feedback-registry.json`
- `website-ops/night-design-pursuit.md`
- `website-ops/design-curriculum-reference-pack.md`

Local V3 content sources used (for names/roles/quotes + link targets):

- `V3 Site Repo - aimwebsite0.5/src/components/LabW26PageV3.tsx` (team member names/roles)
- `V3 Site Repo - aimwebsite0.5/src/components/ReviewsSection.tsx` (quotes shown in “Works / reviews” block)
- Link targets that already exist across other V3 artifacts: `aimindset.org/oferta`, `aimindset.org/confpolicy`, `aimindset.org/research`, `aimindset.org/garden`, `aimindset.org/sprint-pos`, `aimindset.org/ai-mindset`, `aimindset.org/ai-mindset-community`, `aimindset.org/ai-mindset-consulting`, `aimindset.org/non-profit`, `ai-native.aimindset.org`, `health.aimindset.org`, `selfdev.aimindset.org`.

## Sonya feedback response

- No **homepage-lane** Sonya handoff items were found in `website-ops/design-generator-feedback-handoff.jsonl` as of **2026-05-28**.
- Latest Sonya handoff entries are **payment-lane rework** (Galaxy variants rated 5/10) and are not directly applicable to this homepage artifact.

## Self-rating (expected)

- **8.3 / 10** (goal: plausibly 8/10+)

Why:

- Covers all 13 required blocks with non-empty content and real links.
- Light theme default, strong typography system, not a wireframe.
- Interaction mechanic is meaningful (lens changes emphasis + guidance), not decorative.

Risks / what might drop the score:

- Some block copy is still “summary-level” and could become more source-rich once we pull the latest aimindset.org text snippets with confirmed wording.

## Validation notes

- Light theme by default (`color-scheme: light` + light paper palette).
- No horizontal overflow intended (`overflow-x: hidden` + responsive grids downshift to 2/1 columns).
- Route bar uses IntersectionObserver; behavior gracefully degrades if unavailable.
- Respects `prefers-reduced-motion` (disables smooth scrolling/transitions).

## Local preview links (placeholders)

Localhost:

- `http://127.0.0.1:5123/preview/v3-site-repo-aimwebsite0-5-homepage-design-lab/runs/full/2026-05-28-night-signal-atlas-lens/`

LAN / mobile:

- `http://<YOUR-LAN-IP>:5123/preview/v3-site-repo-aimwebsite0-5-homepage-design-lab/runs/full/2026-05-28-night-signal-atlas-lens/`

