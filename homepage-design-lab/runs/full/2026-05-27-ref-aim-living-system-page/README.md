# AIM Living System Page

Review-only full homepage prototype. Do not port into React, publish, commit, or use as final copy without human review.

## Why This Replaces The Previous Direction

The previous Collins-inspired variant was too abstract: it behaved like a typographic exercise, not a homepage. It also included fake proof/archive placeholders. This run replaces it in the active manifest with a source-rich homepage prototype.

## Sources

- `https://aimindset.org/` - primary copy, product labels, links, footer/legal links, public quote source.
- `https://wearecollins.com/case-studies/san-francisco-symphony?gallery=true` - motion/typography reference only.
- `https://www.associate.studio/artofnoise` - variable typography, labels, spatial rhythm, density/repetition, and sound-to-visible-system mechanics only.
- Local V3 source assets:
  - `public/assets/logo-assembly/ai-mindset-logo-assembly-poster.png`
  - `public/assets/philosophy-*-morph-*.svg`
  - `public/assets/cases/community-night/*.png`
  - `public/assets/speakers/*.jpg`
  - copied into this run under `assets/` so the local preview route and gallery iframe load media without escaping the run folder.
- Local structure source:
  - `/Users/viola/All/Yandex.Disk.localized/3 Process/5 Work/AI Mindset/Website content/aim-homepage-about-structure-from-transcript.md`

## Borrowed Formally

- From Collins/SF Symphony: living typography as rhythm, not layout; type that moves and breathes around content.
- From Associate Studio / Cooper Hewitt Art of Noise: sound-to-variable-typography logic, disciplined labels next to immersive type, density/repetition, and spatial tension.
- From AIM Site Hub / AIM OS: grid, mono labels, product-system feeling.
- From Creative Taste Bot direction: signal-field mechanics, orbit/pulse/morph drift.
- From current V3: actual case screenshots, speaker imagery, AIM logo assembly.

## Not Copied

- No COLLINS/SF Symphony layout, logo, copy, font, or imagery.
- No Art of Noise layout, typeface, exhibition identity, copy, or imagery.
- No fake testimonials.
- No empty old-project/archive card.
- No live-site route or React code changed.

## Source-Fidelity Notes

- Product labels and links are taken from `aimindset.org`: Main Lab, Personal Operational System, AI-Native Orgs, Space, Team Track, Non-Profit, Research, Garden, YouTube, Telegram, public offer, privacy policy.
- Numbers `15+ лабораторий`, `700+ участников`, `23+ страны` are from the current old homepage.
- The quote block is a shortened public quote from Екатерина Грачева as surfaced on `aimindset.org`; final production copy should recheck exact quote length and attribution.
- Case cards use local V3 source assets and titles from `LabW26PageV3.tsx`; they are marked as cases/proof, not generic reviews.
