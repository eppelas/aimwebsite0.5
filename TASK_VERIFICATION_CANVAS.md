# Task Verification Canvas

Last cleaned: 2026-05-29
Active scope: current AIM Website design labs, payment-page review candidates, and generation automations only.
Archive: `TASK_VERIFICATION_CANVAS_ARCHIVE_2026-05-29.md` preserves the previous full canvas and is the rollback path.
Cleanup policy: superseded payment popup/payment-page micro-iterations, stale March/April implemented/requested items, and old local preview/port/repo-discovery tasks are not active work unless explicitly reopened by the user. Ephemeral tasks about ports, localhost/LAN preview links, old clones, `3023`, or GitHub-backed repo routing should be removed from the active canvas after the current review cycle and preserved only in archive when historical trace is needed.

## User Requests

- Task: Починить payment popup system consistency: mobile input zoom/focus не должен протекать в следующий popup, close icon должен быть одинаковым и не должен залезать на black board.
  Status: user-approved
  Owner: assistant
  Last Checked: 2026-05-29
  Note: Updated `src/components/PricingPaymentPopupDatalineHeader.tsx`: payment actions blur active inputs before state changes; mobile inputs keep `16px` computed font to prevent iOS zoom while placeholders stay visually smaller; close button is one shared transparent `28x28` control. Status popups use one compact system: mobile form `382x534`, mobile status panels `382x412`, desktop status panels `560x528`. `paid/handoff` now uses the same mobile middle slot as `failed/recovery` (`84px`) so the instruction no longer sits at the top with a large empty drop to the button; `failed/recovery` paragraph/card typography was tightened while preserving the same middle slot and action rail. Current validation: `npm run lint`, `npm run build`; Chrome mobile 390x667 checked form/redirecting/paid/failed: no internal scroll, status panel height delta `0`, close/black-board overlap `false`, close-to-board gap `8px`, paid/failed middle-to-action gap `30px`, action-to-panel-bottom `25px`. Chrome desktop 1280x900 checked all four states: no internal scroll, status action-to-panel-bottom `58px`, close/black-board overlap `false`, SVGs visible. User approved these four states as main v3 payment popup versions. Pushed commit `b53ea38` to `origin/main`; GitHub Pages run `26650546215` completed successfully; mobile GitHub Pages check confirmed all four direct state URLs open the expected popup with horizontal overflow `0`.

- Task: Clean stale canvas history and remove superseded payment popup/payment page micro-iterations from the active task list.
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-05-29
  Note: Archived the previous 234 KB canvas to `TASK_VERIFICATION_CANVAS_ARCHIVE_2026-05-29.md`; active canvas now keeps only current operational commitments. No task history was permanently deleted.

- Task: Auto-clean old cleanup/preview tasks for local ports, old clones, `3023`, and GitHub-backed repo discovery.
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-05-29
  Note: These tasks are now explicitly classified as ephemeral operational history, not active product/design work. They should not remain in the active canvas after the related preview/repo handoff is complete.

- Task: Keep AIM Page Design Lab payment lane strict and remove near-duplicate dark-grid/green-particle payment designs from active review.
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-05-29
  Note: Over-cleanup was corrected, then duplicate cleanup was tightened. `payment-page-design-lab/manifest.json` now exposes five restored review candidates: `AIM Mindset Morph`, `AIM Direct Particle`, `AIM Vortex Checkout`, `AIM Payment Gravity`, and `Quiet Orbit Checkout`. `Night Lunar Checkout` is hidden as a duplicate of the same centered dark checkout/orbit family; `AIM Dark Inkfield` is hidden until the source-port/performance repair is done. Restored run folders/previews were recovered from git, not permanently deleted. Playwright check: payment lane shows 5 cards, `Night Lunar Checkout` absent, `Quiet Orbit Checkout` present, overflow 0.

- Task: Make AIM Page Design Lab filters human-readable instead of exposing internal area tags.
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-05-29
  Note: `homepage-design-lab/index.html` now renders only the five primary category filters: `pages`, `homepage`, `payment`, `elements`, and `all`, plus the two sort controls. Internal manifest areas such as `homepage-portrait-relay`, `programs-ecosystem-element`, and `sonya-review-card-ui` are no longer rendered as top-level filter buttons. Card metadata was also cleaned: ISO timestamps, serial card numbers, internal run paths, and numeric `4 payment states` labels are removed from visible cards; paths remain only behind buttons/links. Desktop and mobile Playwright checks on payment/pages lanes showed no horizontal overflow and no visible ISO timestamps/internal paths/payment-state counters.

- Task: Rework failed `Signal Field Homepage` into a real homepage direction instead of an overlapping constellation mockup.
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-05-29
  Note: Gemini CLI critique was used; the run is now `Signal Instrument Homepage` with contained graphics, readable hero, real product/case structure, updated manifest, README, and preview thumbnail.

- Task: Remove ugly square logo-poster background from Product Portal Homepage.
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-05-29
  Note: Replaced `logo-assembly-poster.png` in the Product Portal nav/signal logo slots with `ai-mindset-logo-transparent.png`; regenerated the Product Portal preview thumbnail. Desktop/mobile QA: HTTP 200, no broken images, no horizontal overflow, and no `logo-assembly` image remains in logo slots.

- Task: Create a materially different immediate element for logo usage: transparent mark + pointer-reactive surface.
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-05-29
  Note: Added `homepage-design-lab/runs/elements/2026-05-29-transparent-logo-surface-kit/`, registered it in manifest and preview index, and generated `assets/previews/element-2026-05-29-transparent-logo-surface-kit.png`. Desktop/mobile QA: HTTP 200, no broken images, no horizontal overflow, nonblank stage, and no `logo-assembly` image in logo slots.

- Task: Create a materially different full homepage direction focused on typography rather than another card/grid background.
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-05-29
  Note: Added `homepage-design-lab/runs/full/2026-05-29-typographic-specimen-homepage/`, registered it in manifest and preview index, and generated `assets/previews/homepage-2026-05-29-typographic-specimen-homepage.png`. Desktop/mobile QA: HTTP 200, no broken images, no horizontal overflow, nonblank type stage, 3 real case screenshots, and Russian CTA present.

- Task: Create a materially different image-led full homepage direction with real case cinema in the first viewport.
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-05-29
  Note: Added `homepage-design-lab/runs/full/2026-05-29-case-cinema-homepage/`, registered it in manifest and preview index, and generated `assets/previews/homepage-2026-05-29-case-cinema-homepage.png`. Desktop/mobile QA: HTTP 200, no broken images after case switching, no horizontal overflow, nonblank cinema stage, 4 real case images, 3 real products, 3 people, and Russian CTA present.

- Task: Create a materially different program-format hierarchy element instead of equal product cards.
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-05-29
  Note: Added `homepage-design-lab/runs/elements/2026-05-29-format-route-theater/`, registered it in manifest and preview index, and generated `assets/previews/element-2026-05-29-format-route-theater.png`. Desktop/mobile QA: HTTP 200, no broken images, no horizontal overflow, nonblank stage, and route switching changes the active product from `AI Mindset {main lab}` to `AI-Native orgs`. Source-fidelity pass used `source-snapshots/aimindset-org-2026-05-28.json` for product names, statuses, descriptions, links, team track, and consulting.

- Task: Keep immediate AIM page/element generation running and reject filler variants that only change background, grid, glow, or particles.
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-05-29
  Note: Active cron `aim-page-and-element-design-generator-active-sprint` and heartbeat `aim-immediate-page-element-generation-heartbeat` were created/updated. Acceptance rule: new entries must differ materially in composition, interaction model, typography, visual language, and hierarchy. Latest accepted heartbeat artifacts: `Transparent Logo Surface Kit`, `Typographic Specimen Homepage`, `Case Cinema Homepage`, and `Format Route Theater`.

- Task: Continue improving homepage/page-design variants so the output is not worse than the current `aimindset.org` design.
  Status: implemented
  Owner: assistant
  Last Checked: 2026-05-29
  Note: Current feedback to preserve in future generation: use real AIM content/source fidelity; do not invent reference text; avoid flat input-looking CTAs; improve typography/variable-font work; include meaningful imagery/animation; compare cases/products against current site quality before indexing. Logo rule added: do not use square poster/assembly assets as a site logo; use transparent logo assets or inline SVG marks, with no visible cutout background.

- Task: Register only materially new homepage-design-lab candidates from the active sprint.
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-05-29
  Note: Added `Seminar Ledger Homepage` and `Context Doctrine Deck` only after validating they were not another route/stage/ribbon/card-grid duplicate. Desktop/mobile preview checks used the local preview server on `http://127.0.0.1:5123`; mobile dump-DOM reported `data-aim-overflow-px="0"` and `data-aim-non-blank="true"` for both artifacts. Review links: `http://127.0.0.1:5123/preview/v3-site-repo-aimwebsite0-5-homepage-design-lab/runs/full/2026-05-29-seminar-ledger-homepage/index.html` and `http://127.0.0.1:5123/preview/v3-site-repo-aimwebsite0-5-homepage-design-lab/runs/elements/2026-05-29-context-doctrine-deck/index.html`. Preview thumbnails were written to `homepage-design-lab/assets/previews/homepage-2026-05-29-seminar-ledger-homepage.png` and `homepage-design-lab/assets/previews/element-2026-05-29-context-doctrine-deck.png`, with `preview-index.json` updated manually after the capture script stalled mid-run. Gemini CLI scouting was attempted first per routing policy, but the run remains fallback-contaminated because Gemini failed on `sysctl.proc_translated` in the sandbox.

- Task: Add one materially different full-page homepage run for the active sprint without route/stage, collage, or accordion duplication.
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-05-29
  Note: Added `Portrait Relay Homepage` at `http://127.0.0.1:5123/preview/v3-site-repo-aimwebsite0-5-homepage-design-lab/runs/full/2026-05-29-portrait-relay-homepage/index.html` with README in `homepage-design-lab/runs/full/2026-05-29-portrait-relay-homepage/README.md`, manifest registration in `homepage-design-lab/manifest.json`, and preview thumbnail `homepage-design-lab/assets/previews/homepage-2026-05-29-portrait-relay-homepage.png` plus `preview-index.json` entry. Desktop validation: preview URL returned HTTP 200 and the regenerated preview screenshot is nonblank with rendered local portraits/cases after copying required AIM assets into the run-local `assets/` folder. Mobile review link prepared: `http://192.168.1.71:5123/preview/v3-site-repo-aimwebsite0-5-homepage-design-lab/runs/full/2026-05-29-portrait-relay-homepage/index.html`. Mobile automation attempt via Chrome headless and window-scoped browser capture was blocked by the sandbox/GUI environment, so mobile confidence comes from the explicit responsive layout gates in the page (`<=900px` single-column downshift, `<=640px` rail/nav stack, fluid media widths) rather than a captured browser artifact. Gemini CLI visual scouting was attempted first and again failed on `sysctl.proc_translated`, so this run is marked fallback-contaminated in the manifest.

- Task: Continue improving payment-page variants with correct payment UX and hierarchy.
  Status: implemented
  Owner: assistant
  Last Checked: 2026-05-29
  Note: Current rules: payment path has four user-facing states only; no route/state/debug panels; no fake plan selector; placeholders must be visually lower priority than method buttons; promo field must be available but de-emphasized; duplicate `итого к оплате` labels are not allowed; validation/error states must never inherit the green accent and must use a distinct negative treatment; status-card headings must share the same scale across matching states. Restored the accidentally removed good payment candidates and removed stale `RECHECK` from the 9/10 candidates. Follow-up hierarchy fix: `AIM Mindset Morph` restores the source label `итого к оплате`, removes the invented `что оплачиваете / доступ к...` copy, shows `AI Mindset {main lab}` only once as the order item, keeps contact placeholders smaller/lighter than payment-method buttons, keeps promo shorter/de-emphasized, and makes the CTA less oversized. Error-color fix: missing Telegram/phone now uses red/negative status text and red input line, while green remains only for applied discount/success/active selection. Status-card fix: `paid` and `failed` now compute to the same heading font-size/line-height/max-width on desktop and mobile; failed uses a red heartbeat/status accent instead of green. Mobile viewport fix: `AIM Mindset Morph` and `AIM Direct Particle` no longer rely on full-page screenshot review; clean mobile review hides debug/review controls, uses compact 3-column payment methods, compact non-stretched CTAs, and passes viewport clipping checks on `375x812`, `375x667`, and `414x896` for all four states. Follow-up USDT discount fix: restored the `скидка 5%` badge on the USDT method in the shared payment-page lab and Source Inkfield artifact; selecting USDT now shows `846 USDT` with old price `890 USDT` in the shared lab. Follow-up spacing/readability rule: promo label is now bound to its own input, not to the Telegram discount above it; on mobile `telegram=aim` + `promo=ponchik`, `label→input = 1px`, previous status→label = `10px`, promo status text is lowercase (`скидка alumni...`, `действует alumni...`), `text-transform: none`, and status contrast is increased. Follow-up contrast copy: added `AIM Mindset Morph Contrast` as a separate review variant at `payment-page-design-lab/index.html?variant=aim-ai-mindset-morph-contrast&clean=1` instead of overwriting the original; it uses the same particle engine/UX and a stronger but still translucent field/card treatment. Second-pass fix after review: promo width now matches the Telegram/e-mail input columns, input text/placeholder/order item readability is raised, the card is less opaque-black, `промокод` has wider tracking, and the USDT `скидка 5%` badge is attached inside the USDT method control instead of floating above it. The baseline contrast fix also covers the similar dark `AIM Direct Particle` field family. Latest status-layout fix: `paid` and `failed` no longer stretch copy/animation/button with an empty `1fr`; SVG animation and CTA are centered in one vertical flow, CTA no longer sits at the lower-right edge, and the status card must fit the exact desktop/`375x812`/`414x896` viewport. Success-handoff SVG fix: the paid-state arrow animation now uses the same green as the CTA (`#a7e348`) instead of a separate purple accent, so the animation reads as part of the button/action system. QA pass: direct page has no bad invented labels, one visible `итого к оплате`, one visible `AI Mindset {main lab}`, no horizontal overflow, no route/state panels, error state is red/negative and not green/neutral, success discount remains green, USDT badge visible after method selection on `AIM Mindset Morph`, `AIM Mindset Morph Contrast`, `AIM Direct Particle`, and `Source Inkfield`; desktop plus `375x812`, `375x667`, and `414x896` viewport checks pass for all four states on the three shared particle variants; `payment-aim-ai-mindset-morph`, `payment-aim-ai-mindset-morph-contrast`, `payment-aim-x26-practice-direct`, and `payment-source-inkfield-checkout` previews were regenerated.

- Task: Add a broad design-hierarchy QA gate so form regressions are caught before review links.
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-05-30
  Note: Added general hierarchy rules to `homepage-design-lab/README.md` and broader payment-specific examples to `payment-page-design-lab/README.md`: required/primary controls must outrank optional controls, selected/active controls must be visibly stronger than inactive siblings, helper/badge labels must be attached to the object they explain, error/failed/invalid states need distinct negative treatment without flooding normal input surfaces red, applied/success states need positive treatment, and buttons need stable padding/alignment. Added `scripts/verify-design-hierarchy.mjs` plus `npm run qa:design-hierarchy`; the check opens real preview pages, clicks pay without Telegram, verifies red/negative error text/input line/required marker, verifies the error input background is not red fill, verifies selected payment method fill/stroke/text hierarchy against inactive methods, verifies optional fields are not visually stronger than required fields, verifies the USDT discount badge is attached without changing the button label, verifies the badge has a visible container/background or stroke, enters `ponchik` and verifies the applied promo success status is green/positive, checks desktop/`375x812`/`414x896` overflow, opens `paid`/`failed` directly to assert status cards fit the real viewport, animation sits below copy, CTA stays visually attached to the animation, and animation/CTA are centered. Latest update adds a failed-state color-token guard: status label, heartbeat dot, and retry SVG must use the shared `--danger: #ff4f42` token, and legacy hard-coded reds are blocked. Latest run passed for `AIM Mindset Morph Contrast`, `AIM Mindset Morph`, and `AIM Direct Particle`.

- Task: Make the design generation workflow redesign failed candidates instead of hiding them as finished work.
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-05-29
  Note: Added `Generation Lifecycle Gate` to `homepage-design-lab/README.md` and mirrored the rule in `payment-page-design-lab/README.md`: a fresh active artifact that fails index/QA gates must enter a redesign loop, not be counted as delivered quantity. The loop is diagnose UX/data hierarchy/source/mobile/material-delta failure -> redesign -> rerun local desktop/mobile QA -> repeat until the candidate is adequate or explicitly abandoned with a written reason. `showInGallery: false` is now documented as valid only for archived rejected experiments, near-duplicate cleanup, or consciously abandoned directions, not as a substitute for completing the requested design task.

- Task: Apply the same payment hierarchy/error-color rules to `payment 05` / `Quiet Orbit Checkout`.
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-05-29
  Note: Updated `payment-page-design-lab/runs/2026-05-28-night-quiet-orbit/index.html`: contact placeholders are smaller/lighter than payment method buttons, promo is shorter/de-emphasized, duplicate top `итого к оплате` kicker removed, order context shows `AI Mindset {main lab}`, redirect copy uses `партнёрская ссылка оплаты открывается`, the redundant paid-state `откройте бота` tag was removed, validation errors use neutral status/input color instead of green, and failed state uses red status/particle accent instead of green. Follow-up spacing fix: promo label and underline are now one compact field group (`label -> input top` 1px, input height 24px). CTA alignment/system fix: paid/failed status buttons are centered in the card; `.primary`, `.ghost`, and payment method buttons now use the same `inline-flex` centering primitive with explicit height, padding, and `line-height: 1`, so labels do not jump vertically between states. QA center delta `0px` for both `paid` and `failed`, action buttons compute to `156x44`, method buttons to `123x40`, overflow `0`. QA: missing Telegram error color `rgba(246, 243, 234, 0.68)`, error input line `rgba(246, 243, 234, 0.58)`, `badGreen=false`; paid/failed headings both compute to desktop `52px / 48.88px`, mobile failed `34px`, overflow `0`; preview `payment-night-quiet-orbit` regenerated.

- Task: Repair `AIM Dark Inkfield` from the original X26 InkFieldSlide source without hanging the computer.
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-05-29
  Note: The old self-made `AIM Dark Inkfield` remains hidden. Added a new source-faithful review artifact `Source Inkfield Checkout` from `/Users/viola/Downloads/S.K.Y.ai (1)/inkField-green-interactive.html` at `payment-page-design-lab/runs/2026-05-29-source-inkfield-checkout/index.html`; the unmodified source copy is preserved next to it as `source-inkField-green-interactive.html`. It is registered in `payment-page-design-lab/manifest.json`, appears in Page Design Lab, and has preview `homepage-design-lab/assets/previews/payment-source-inkfield-checkout.png`. Follow-up copy fix restores `итого к оплате`, removes the invented `что оплачиваете / доступ к...` copy, and prevents duplicate `AI Mindset {main lab}` in the form. Follow-up reference-text cleanup replaced visible `S.K.Y.ai`, `inkField`, `Upcoming`, timecode/frame/interactive, and debug legend labels with AIM/payment-field language in the review artifact and direct Inkfield variant; the original source file remains untouched. QA: desktop/mobile form/redirecting/paid/failed states active correctly, no horizontal overflow, no route/debug panels, original ink canvas renders, pointer drag creates bbox/log rows and particles. Text QA on 1280x820 and 390x844: no visible `S.K.Y.ai`, `inkField`, `Upcoming`, `details soon`, `INTERACTIVE`, `velocity`, `pressure`, `move cursor`, `draw ink`, `hold to press`, or `release to lift`; previews regenerated for `payment-source-inkfield-checkout` and `payment-x26-inkfield-dark`. One browser console 404 remains for a missing favicon only.

- Task: Publish Payments20 / `AIM Mindset Morph` to GitHub when it is ready.
  Status: requested
  Owner: assistant
  Last Checked: 2026-05-29
  Note: Local artifact exists at `payment-page-design-lab/index.html?variant=aim-ai-mindset-morph&clean=1`. GitHub push is blocked by project rule until browser review acceptance and explicit push authorization are both present.

- Task: Fix `AIM Mindset Morph Contrast` promo-code hierarchy and USDT discount badge.
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-05-29
  Note: Promo code is again a low-priority field: no filled surface, softer label/input/placeholder than Telegram/e-mail, same column width as Telegram, and no horizontal overflow on desktop, `414x896`, or `375x812`. USDT button text is only `USDT`; `скидка 5%` is now a pseudo-label attached to the USDT method control via `data-discount-label`, so it no longer changes the button text or floats as random card copy. Mobile particle field was narrowed/tallened for the contrast variant so particles are visible above and below the card without layout overflow. Preview `payment-aim-ai-mindset-morph-contrast.png` regenerated.

## Agent Self-Checks

- Task: Full local-vs-GitHub payment popup QA after publishing main versions.
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-05-29
  Note: Playwright QA matrix covered 4 states (`form`, `redirecting`, `paid`, `failed`) across 2 origins (`local`, `GitHub Pages`) and 6 viewports (`iphone-se`, `iphone-12`, `iphone-pro-max`, `ipad-mini`, `desktop-1280`, `desktop-1440`). Results: 48 state checks, 24 local-vs-GitHub structural comparisons, 0 failing state checks, 0 failing comparisons, 0 close failures. Screenshots/contact sheets live in `test-results/payment-popup-main-qa-2026-05-29-r2/`.

- Task: Preserve rollback path for canvas cleanup.
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-05-29
  Note: Full pre-cleanup canvas is archived in `TASK_VERIFICATION_CANVAS_ARCHIVE_2026-05-29.md`; active file can be restored by copying entries back from the archive.

- Task: Verify active canvas still has required sections and valid statuses.
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-05-29
  Note: Active canvas keeps `User Requests` and `Agent Self-Checks`; every active item uses one of `requested`, `implemented`, `self-checked`, or `user-approved`.

- Task: Verify stale payment popup iteration entries are no longer active.
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-05-29
  Note: Old payment popup/payment-page micro-iterations are preserved in the archive, not in the active task queue.

- Task: Verify old local preview/port/repo-discovery tasks are no longer active.
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-05-29
  Note: Active canvas no longer carries historical `3023`, old clone, local preview launcher, or GitHub-backed repo routing tasks; those remain only in `TASK_VERIFICATION_CANVAS_ARCHIVE_2026-05-29.md`.

## Approved / Closed

No active-cycle items are moved here during this cleanup. Historical closed/implemented items live in `TASK_VERIFICATION_CANVAS_ARCHIVE_2026-05-29.md`.
