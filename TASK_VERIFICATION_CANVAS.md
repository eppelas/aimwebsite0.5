# Task Verification Canvas

## User Requests

- Task: Починить пропавшие case screenshots на GitHub Pages после payment deploy.
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-05-25
  Note: На live case detail вместо product screenshot показывался broken image. Причина: `LabW26PageV3.tsx` уже ссылался на `public/assets/cases/community-night/*.png`, но папка `public/assets/cases/community-night/` осталась untracked и не попала в предыдущий push. Добавлены только три реально используемых PNG: `team-os-darya-product.png`, `meeting-pipeline-natasha-product.png`, `agent-meditation-daniil-product.png`; JPG-дубликаты не тронуты. Запланирован push в `main`, чтобы GitHub Pages пересобрался.

- Task: Поменять местами Telegram и e-mail в v7 и сделать v7 основной версией оплаты на сайте.
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-05-25
  Note: В `PricingPaymentPopupDatalineHeader.tsx` порядок contact fields изменён: Telegram теперь слева, e-mail справа. В `LabW26PageV3.tsx` default payment popup без query-параметра переключён на v7 (`PricingPaymentPopupDatalineHeader` с `presentation="v7"`). Старый dataline v3 сохранён через `?payment=v3#pricing`, а compare route обновлён так, чтобы tab `v3 dataline` больше не ссылался на default. Follow-up before push: верхний gap перед `промокод` чуть уменьшен, чтобы нижний gap до action buttons стал больше. Проверено Playwright на обычном `/#pricing`: defaultIsV7=true, left-to-right field order `@user или телефон`, `mail@mail.com`, screenshot `/tmp/aim-payment-v7-main-default-swapped.png`. `npm run lint`, `npm run build`; после микро-правки rerun `npm run lint`. GitHub push authorized by user 2026-05-25.

- Task: Сделать в payment popup compare независимый desktop/mobile переключатель для левой и правой панели.
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-05-25
  Note: Глобальный `desktop/mobile` switch заменён на два pane-level переключателя внутри toolbar: `leftDevice` и `rightDevice` хранятся в URL отдельно. Теперь можно сравнивать `v7 desktop` слева с `v7 mobile` справа, либо `v7 mobile` слева с `github dark desktop` справа. Desktop-панель сохраняет полный список вариантов, mobile-панель ограничивает tabs до `v7 compact` и `github dark`; старый query `device=mobile` сохранён как fallback для старых ссылок. Mobile viewport остаётся нативным iframe около `390px`, без transform/zoom. Проверено Playwright: forward case `left=v7/right=v7/leftDevice=desktop/rightDevice=mobile` и reverse case `leftDevice=mobile/rightDevice=desktop`, оба popup открываются, ширины iframe корректные (`720/390`, `390/712`). `npm run lint`, `npm run build`.

- Task: Добавить в payment popup compare переключатель desktop/mobile и мобильное сравнение v7 с исходной чёрной GitHub-версией.
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-05-25
  Note: В `payment-popup-compare.html` добавлен global device switch `desktop/mobile`. Desktop mode сохраняет все варианты, mobile mode ограничивает табы до `v7 compact` и `github dark`, чтобы сравнивать только нужные мобильные версии. Mobile mode рендерит live iframe как настоящий узкий viewport около `390px`, без transform/zoom, поэтому responsive сайта включается нативно. Исходная чёрная версия берётся из уже восстановленного `PricingPaymentPopupDark.tsx` на базе `origin/main`; v7 mobile использует текущий responsive v7. Compare теперь auto-dismisses cookie notice внутри iframe, чтобы оно не перекрывало dark popup. Проверено Playwright: оба active iframe имеют mobile viewport, оба payment popup открываются, tabs ограничены до двух вариантов, screenshot `/tmp/payment-compare-mobile-mode-cookie-recheck.png`; `npm run lint`, `npm run build`.

- Task: Добавить v7 payment popup на базе v6: без зелёной разделительной линии, шире/компактнее, без подписи `MAIN LAB X26 · ADVANCED TRACK`.
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-05-25
  Note: Добавлен URL-switch `?payment=v7#pricing` и compare-tab `v7 compact`. V7 использует тот же компонент, что v6, но отдельную presentation-настройку: desktop panel шире (`560px`) и высотой `640px`, верхняя зелёная program-line скрыта, зелёный divider между price-box и способами оплаты убран. Внутри сохранены скидочные demo-состояния: Telegram `aim`/`@aim` → Alumni 20%, промокод `ponchik` → 5%, вместе показывается только максимальная скидка Alumni. Статусы Telegram/промокода зарезервированы фиксированной высотой, поэтому CTA не двигается при `ищу скидку`, applied/not applied и max-discount сообщении. Follow-up: промокодный статус укорочен до `действует Alumni 20%` и выровнен по ширине promo field, обязательная `*` Telegram стала inline-required маркером рядом с label, крестик v7 выровнен по центру заголовка `ОПЛАТА ЗАКАЗА` с measured diff ~1.5px, price block зафиксирован по высоте, а `отмена` и `оплатить` имеют одинаковые `12px / 900 / 2.4px`, `46px` height и одинаковый top. Latest follow-up: gap между `*` и `TELEGRAM` уменьшен до `3px`, promo input привязан к ширине email input (`~239px` vs `241px`), вертикальный интервал между contact row и promo увеличен, `отмена` сужена и придвинута ближе к CTA (`8px` gap). Additional spacing follow-ups: дважды увеличен отступ между `ОПЛАТА ЗАКАЗА` и grey price-box, а также между payment method buttons и `e-mail/telegram`; v7 height увеличена до `640px`, чтобы нижние buttons не обрезались после добавления воздуха. Mobile check: iframe width 388px, no horizontal overflow. Проверено Playwright screenshots/metrics, `npm run lint`, `npm run build`.

- Task: Добавить ещё один payment popup вариант с изменённой верхушкой по референсу `DS aligned`.
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-05-25
  Note: Добавлен live-компонент `PricingPaymentPopupDatalineHeader.tsx`, URL-switch `?payment=v6#pricing` и compare-tab `v6 header`. Вариант основан на v5/4light, но верхушка изменена по референсу: крупный заголовок, зелёная строка `MAIN LAB X26 · ADVANCED TRACK`, close в светлом квадрате, сумма в отдельном сером boxed-блоке с `итого к оплате:`, зелёная разделительная линия перед способами оплаты. Follow-up: скидочный бейдж USDT опущен ниже и частично перекрывает кнопку, email placeholder заменён на `mail@mail.com`, `связаться с нами` заменено на `отмена`, обязательная `*` Telegram вынесена над label, валюты нормализованы: euro `€590`, USDT `561 USDT`, ruble `59 000 ₽`. Добавлено demo-состояние проверки Telegram: test handle `aim`/`@aim` даёт Alumni 20% (`скидка Alumni 20% применена`) и пересчитывает цену `€590 -> €472`; остальные ники показывают `скидка не применена`. Добавлено demo-состояние промокода: `ponchik` даёт `промокод ponchik · -5%` и цену `€561`; неверный промокод показывает `промокод не применён`. Follow-up: `отмена` перенесена ближе к CTA `оплатить` в правый action cluster. Follow-up max-discount: Telegram/Alumni и промокод больше не суммируются; UI показывает только максимальную скидку, поэтому `aim + ponchik` оставляет цену `€472`, а под промокодом пишет `промокод найден · действует Alumni 20%`. Follow-up stability: checking copy заменён на `ищу скидку`, статусные зоны Telegram/промокода зарезервированы по высоте, чтобы CTA не прыгал; над discounted price появляется маленькая зачёркнутая исходная цена. Проверено Playwright direct popup + compare screenshot; `npm run lint`, `npm run build`; после stability fix Playwright подтвердил `buttonShiftAim: 0`, `buttonShiftBoth: 0`.

- Task: Добавить в payment popup compare двигаемый разделитель между левым и правым окном.
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-05-25
  Note: `payment-popup-compare.html` получил центральный draggable splitter между панелями. Split можно тянуть мышью/трекпадом, сбрасывать двойным кликом, двигать с клавиатуры при фокусе на разделителе (`←/→`, Shift для крупного шага, Home/End, Enter/Space reset). Позиция сохраняется в URL как `split=...`. Исправлен баг парсинга, при отсутствии `split` страница теперь стартует 50/50, а не 22/78. Follow-up: убран искусственный zoom/transform-scale; live iframe теперь занимает реальную ширину панели `100%`, а responsive поведение остаётся нативным. Webp reference держит натуральные `500px` и уменьшается только если панель физически уже. Проверено Playwright drag pass: `transform: none`, iframe изменился с 720px до 980px при split drag, URL обновился до `split=68`.

- Task: Добавить 5-й payment popup вариант на базе `4light webp`, но жирнее, воздушнее и структурнее.
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-05-25
  Note: Добавлен live-компонент `PricingPaymentPopupDatalineBold.tsx` и URL-switch `?payment=v5#pricing`; compare получил вариант `v5 structured`. После пользовательского фидбэка v5 возвращён к композиции именно `4light webp`, а не усиленного v3: `MAIN LAB X26 · ADVANCED TRACK`, зелёная CTA, `СКИДКА 5%` над USDT, `промокод` вместо комментария, мягкие input-поля, чёрная active `EU-КАРТЫ` с белым текстом, Telegram с обязательной зелёной `*`, цена `590 €` с неразрывным пробелом перед евро. Проверено визуально через Playwright на паре `left=v5&right=ref-4light`: popup помещается без внутреннего overflow (`scrollHeight == clientHeight`). Проверено: `npm run lint`, `npm run build`.

- Task: Сделать payment popup compare как систему для любых двух вариантов: слева/справа один и тот же фон, попапы ближе к центру, переключение кнопками и клавиатурой, добавить webp-референс из Downloads.
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-05-25
  Note: `payment-popup-compare.html` переделан из статичной пары iframe в compare-инструмент с независимыми left/right tabs, кнопками назад/вперёд и клавиатурой (`A/D` для левой панели, `←/→` для правой). После пользовательского фидбэка о поломке переключения страница переведена на предзагруженные слои: все варианты монтируются один раз, переключение только меняет active layer и больше не пересоздаёт iframe/страницу. Live iframe рендерится с внутренней шириной `1024px` и масштабируется в колонку, чтобы обе половины оставались в desktop-режиме и попапы были по центру. Webp-референс скопирован из `/Users/viola/Downloads/4light-v2-aim-os-desktop-01-payment-selection-500x642.webp` в `public/assets/payment-popups/`; copy log: `public/assets/payment-popups/COPY_LOG_2026-05-25-payment-popup-reference.md`. Проверено: `npm run lint`, `npm run build`, Playwright click/keyboard pass на `1440x900`.

- Task: Открыть side-by-side сравнение payment popup v3 и v2.
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-05-25
  Note: Добавлена локальная compare-страница `payment-popup-compare.html` с двумя iframe: слева v3 dataline, справа v2 light. Страница сама скроллит к pricing и открывает payment popup в каждой колонке. Проверено в in-app browser с wide viewport `1440x900`.

- Task: В side-by-side compare заменить правый v2 light на тёмный исходный checkout-вариант.
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-05-25
  Note: Предыдущая ручная dark-реконструкция отклонена пользователем как неверная. `PricingPaymentPopupDark.tsx` заменён исходным тёмным neon checkout из `origin/main:src/components/PricingPaymentPopupNeon.tsx` с минимальной заменой имени компонента; `payment-popup-compare.html` теперь показывает слева v3 dataline, справа GitHub dark. V2 light сохранён и доступен через `?payment=v2#pricing`. Проверено: `npm run lint`, `npm run build`, in-app browser compare на `1440x900`; справа виден чёрный neon popup с зелёной ценой, зелёной active-рамкой, зелёным CTA и `СКИДКА 5%`.

- Task: Сделать payment popup v3 для основного сайта в dataline/AIM OS стиле из текущего Pencil-документа, сохранив предыдущую payment-версию для сравнения.
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-05-23
  Note: Создана локальная ветка `experiment/payment-form-v3-dataline`; предыдущий код `PricingPaymentPopupNeon.tsx` сохранён без удаления/переименования. Новый компонент `PricingPaymentPopupDataline.tsx` скопирован из v2 и переведён в стиль выбранного Pencil frame `LIGHT v2 AIM OS / desktop / 01 payment selection / 500x642`: square white panel, black 1px border, mono dataline labels, large black price, black/white payment method buttons, EU-карты label. `LabW26PageV3.tsx` временно подключает dataline v3. Copy/rollback log: `pencil/payment-popup-current/MOVE_COPY_LOG_2026-05-23-payment-v3.md`. Проверено: `npm run lint`, `npm run build`, desktop preview через in-app browser (`500x642`, no internal overflow), mobile viewport `390x844` через isolated Playwright/Chromium check (`374x808.5`, no horizontal overflow, CTA visible, overlay z-index above mobile header). User approval still pending.

- Task: Дать быстрый способ открыть payment v2 рядом с payment v3 для сравнения.
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-05-23
  Note: Добавлен URL-switch без смены ветки: обычный `#pricing` открывает v3, а `?payment=v2#pricing` подключает сохранённый `PricingPaymentPopupNeon` v2. Проверено через локальный browser: v3 содержит `[PAY] CHECKOUT_POPUP`, v2 содержит старый `ai mindset / checkout` и label `ЗАРУБЕЖНЫЕ КАРТЫ`.

- Task: Почистить бессмысленные подписи и неправильную иерархию в payment v2/v3.
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-05-23
  Note: Убраны service labels `checkout`/`[PAY]`, фраза `формат фиксируется после подтверждения`, `(@)` и обязательная звёздочка из Telegram, дублирование `MAIN LAB · MAIN LAB X26`, а также смешанные хвосты `-5%`/`₽`/`€` внутри кнопок способов оплаты. Способы оплаты теперь одного уровня: `USDT`, `РУ-КАРТЫ`, `EU-КАРТЫ`; скидка USDT остаётся только в расчёте цены. Проверено: `npm run lint`, `npm run build`, local browser text scan for v2/v3 found none of the removed bad strings and confirmed the three method labels.

- Task: Проверить, к чему подключён `AIM Payment.app`, и создать новый Pencil-файл с редактируемыми desktop/mobile состояниями payment popup из текущей ветки.
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-05-23
  Note: `AIM Payment.app` открывает `! AIM Payment.command`; launcher указывает на `V3 Site Repo - aimwebsite0.5`, ветку `experiment/payment-form-v2`, порт `3001`, URL `http://127.0.0.1:3001/#pricing`. First Pencil pass was rejected because it was manually reinterpreted instead of exact browser-faithful. Recovery pass completed in `pencil/payment-popup-current/ai-mindset-payment-popups-current-editable-2026-05-23.pen`: new root `cRm2N` / `EXACT BROWSER TRACE / 2026-05-23 / source screenshots + editable vectors` contains live browser screenshots next to editable vector traces for 5 desktop and 5 mobile states captured from the current site. Reference screenshots/DOM JSON: `pencil/payment-popup-current/live-reference-exact-2026-05-23/`; review export: `pencil/payment-popup-current/exports-exact-browser-2026-05-23/cRm2N.png`. Saved via Pencil backup with rollback copy; final `.pen` sha256 `52d77cdfb5d5061c9f4b3014bc2c9edf482f58824b437d1e8ecca751199c26b3`. User approval still pending.

- Task: Сделать 12-секундное видео/гифку с анимированным AI Mindset split-logo человеком: сборка из мелких деталей плюс разные движения деталей от scroll.
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-05-22
  Note: Follow-up implemented after user approved the initial start: top label changed to `aim.web` in large mono style, live canvas animation now adds two stronger post-assembly scroll-like burst phases with vertical up/down particle movement, partial breakdown, and re-assembly. Latest user request handled: label moved close to the visible logo start, targeting about 20px in the assembled/exported frame; MP4/GIF rerendered from `scripts/render_logo_assembly.py`; local desktop/mobile preview screenshots and extracted MP4 frame were visually checked. `npm run lint` passed; full production build intentionally not rerun for this small spacing-only follow-up after an already running local preview.

- Task: Добавить первые три кейса из Community Night markdown в секцию `Cases` сайта.
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-05-22
  Note: Источник: `/Users/viola/Downloads/{space}_{cases}_Community_Night_—_Личные_решения_для_продуктивности.md`. После пользовательского фидбэка о рассинхроне старые placeholder-кейсы вроде `AI SUMMARY` убраны из active cases array; видимый набор теперь состоит из 6 кейсов этого markdown: Дарья / Team Operation System, Наташа / Конвейер встреч, Даниил / Медитация агента, Алексей / Кнопка Next, Михаил / Personal OS Майо, Дмитрий / Стратегия + Тактика. Для detail-modal первых трёх кейсов добавлены аккуратно обрезанные product screenshots из релевантных demo-фрагментов YouTube: лишние black side fields, верхние browser/system bars и dock убраны, speaker video tile сохранён как inset. Desktop: слева static screenshot + inline YouTube-fragment player; mobile: screenshot остаётся выше текста, inline player уходит ниже текстовых секций. Follow-up: label `ВИЗУАЛ` убран, product screenshot больше не открывается ни через кнопку, ни по клику на картинку, карточки cases выровнены по высоте, а tools в карточках ограничены одним рядом из 3 featured-инструментов; полный список инструментов остался в detail-modal. Follow-up video: YouTube fragment больше не открывает новую вкладку; play-кнопка внутри preview заменяет блок на lazy iframe с нужным `start` timestamp. Follow-up modal bug: case-modal и all-cases overlay больше не используют `md:left-[18%]`, чтобы слева не оставался кусок страницы вместо нормального затемнения. Follow-up tags: теги внутри кейса теперь используют те же role-filter ids, что и верхние `Кем сделано`, кликаются как фильтры и подсвечиваются синхронно с верхней кнопкой. Follow-up layout: левая колонка detail-modal переведена в `flex`/`overflow-y-auto`, media занимает доступную высоту, а нижние теги больше не обрезаются под границей попапа. Follow-up source fidelity: восстановлены полные роли из markdown для Дарьи (`Data analyst · разработчик · team lead (2 команды)`) и Наташи (`Backend developer · архитектор · портфельный менеджер (30 активных проектов)`) после обнаруженного непредупреждённого сокращения. Follow-up image quality: первые три product screenshots пересобраны из лучшего доступного YouTube video stream `1080p`, сохранены как PNG и подключены вместо старых low-res JPG. Проверено в in-app browser на desktop и mobile viewport; `npm run lint` прошёл после follow-up, предыдущий `npm run build` проходил до точечных UI-правок.

- Task: В отдельной ветке `experiment/payment-form-v2` сделать новую версию формы оплаты в светлой стилистике основного сайта, используя принципы из Pencil design-system.
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-05-22
  Note: Компонент `PricingPaymentPopupNeon.tsx` переведён с тёмного neon checkout на светлый site-system: `#F9F9F7` overlay, white panel, тонкие black/alpha borders, radius 4/6, IBM Plex Mono labels, Inter inputs, зелёный только как акцент. Использованы переменные и структура из `pencil/site-design-system/ai-mindset-main-site-design-system.pen`: `site-bg`, `site-panel`, `site-ink`, `site-border`, `site-green`, `radius-card`, `radius-tight`. `npm run lint` и `npm run build` прошли; in-app preview проверен на desktop states: initial, card input, card success, USDT QR, USDT success; mobile viewport check подтвердил, что modal panel помещается внутри overlay без горизонтального вылета.

- Task: Почистить код сайта от лишних локальных версий, неиспользуемых компонентов, старых ассетов, AI Studio/Gemini-заготовок и левых ссылок.
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-05-21
  Note: Удаление сделано move-only через Trash; файлы перенесены в `/Users/viola/.Trash/aimwebsite_code_cleanup_2026-05-21_19-05`, лог сохранён в `AIM Website/CODE_CLEANUP_LOG_2026-05-21.md`. Убраны старые dev-скрипты/зависимости, мёртвые компоненты и ассеты, AI Studio/Gemini config, `.DS_Store`, опасный `clean`-скрипт и битые/Pages-опасные ссылки меню. `npm run lint`, `npm run build`, `npm audit --audit-level=moderate`, `npm ls --depth=0 --json`, `.DS_Store` scan и targeted stale-reference scan прошли.

- Task: Переделать Pencil дизайн-систему по фактической версии сайта через live DOM/code audit, убрать абстрактные повторы, добавить реальные атомы/ассеты/компонентные specs и разделить payment popup на отдельные exact-size frames для desktop/mobile.
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-05-22
  Note: В том же файле `pencil/site-design-system/ai-mindset-main-site-design-system.pen` создан новый root `AI Mindset design system v3 - audited source of truth`; V2 и старый абстрактный draft оставлены внутри как выключенные архивы. V3 построена по live DOM audit (`pencil/site-design-system/audit-v3/live-dom-summary.json`), code review `LabW26PageV3.tsx`/`PricingPaymentPopupNeon.tsx` и GitHub-framework подходу design-extract / extract-design-system / DTCG tokens / Style Dictionary / Primer primitives. Добавлены секции: method/source, primitive colors, computed typography scale, spacing/radius/shadow/motion tokens, individual asset inventory from `public/assets`, real component specs with live screenshots, exact payment modal frames, and responsive mobile source screenshots. Follow-up от 2026-05-22: в цветовые токены добавлены видимые hex/alpha values, в typography добавлена usage map по живым компонентам, мобильные source screenshots пересняты с локального сайта в `pencil/site-design-system/reference-v4/mobile/` и добавлены отдельным разделом `07 Responsive mobile source screenshots`. Payment popup разделён на отдельные frames по фактическим размерам: desktop `500x642`, `500x621`, `500x637`, `500x537`, `500x582`; mobile `374x536`, `374x528`, `374x522`, `374x464`, `374x509`. `snapshot_layout` по root `FnllM` вернул `No layout problems`; контрольные PNG-экспорты V3 лежат в `pencil/site-design-system/exports-v3/`. После ручного `File > Save` файл изменился на диске до 840980 bytes, hash `ba2bcfa0302c4f8ec4c0c32305c6ac19b81f1bd05025d623bc24f92524791e03`.

- Task: Заново вернуть в Pencil все варианты платёжного попапа для desktop и mobile.
  Status: implemented
  Owner: assistant
  Last Checked: 2026-05-22
  Note: Reopened after user rejection on 2026-05-22. The screenshot-fill version was not acceptable because it was not properly editable, and the generic checkout/wizard redesign was visually worse than the original. New pass created in `pencil/payment-popup-editable/ai-mindset-payment-popup-editable.pen` as `REDESIGN v2 premium`: 5 desktop and 5 mobile top-level frames, built as editable Pencil layers, preserving the original modal's large dark premium baseline, big price, calm hierarchy, and green accent while improving method cards, QR/card/success states, and mobile fit. `snapshot_layout` returned `No layout problems`; review PNG exports are in `pencil/payment-popup-editable/exports-redesign-v2-premium/`. User requested one more pass using the poor-outcome recovery skill; v2 remains for comparison and must not be treated as approved.

- Task: Сделать дополнительный Pencil-вариант payment popup через `poor-outcome-recovery` pass и проверить, почему skill не сработал автоматически на «очень плохо».
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-05-22
  Note: `poor-outcome-recovery` was loaded and followed. Local skill `/Users/viola/.codex/skills/poor-outcome-recovery/SKILL.md` exists and explicitly lists «очень плохо» as a trigger phrase; `/Users/viola/.codex/skills/poor-outcome-recovery/agents/openai.yaml` has `allow_implicit_invocation: true`, so the previous non-use was an agent workflow miss, not a missing installation. Created `RECOVERY v3 / site-faithful` as 10 separate editable top-level Pencil frames: desktop IDs `x41Vb`, `EHrdX`, `HPowy`, `p2lHzK`, `nJK1G`; mobile IDs `o0MYFN`, `awSVO`, `L1iSQ`, `rTIOC`, `JL8Ln`. Frame sizes match the captured black 1.1 CSS modal dimensions: desktop `500x642`, `500x622`, `500x582`, `500x638`, `500x538`; mobile `374x536`, `374x528`, `374x509`, `374x522`, `374x464`. Export PNGs are in `pencil/payment-popup-editable/exports-recovery-v3-site-faithful/`. `snapshot_layout` returned `No layout problems` on checked frames. Manual Cmd+S via AppleScript was blocked by macOS Accessibility, so persistence used Pencil autosave backup `~/.pencil/backup/cc1ccc75da70717ca69902b778a609d45eb391a7`; rollback copy is `pencil/payment-popup-editable/rollback/ai-mindset-payment-popup-editable.before-recovery-v3.2026-05-22-2239.pen`. Saved `.pen` hash is `28b775f099644136052d58d83f83af898a51affbc32867ff5abfa90c14faa4bb`, size `619720` bytes.

- Task: Создать новый Pencil-файл в папке сайта AIM Website и положить туда один редактируемый попап оплаты для работы.
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-05-21
  Note: Создан и сохранён файл `pencil/payment-popup-editable/ai-mindset-payment-popup-editable.pen`; внутри один editable desktop state `AI Mindset payment popup - one editable desktop state`. После Save As файл на диске изменился с пустого шаблона до сохранённого `.pen`, повторно открыт через Pencil MCP, `snapshot_layout` вернул `No layout problems`. PNG-контроль лежит в `pencil/payment-popup-editable/exports/mQ3Sw.png`.

- Task: На mobile в блоке `Cases` сделать карточки одинакового размера и починить визуал (сейчас они все белые, без картинок), чтобы они максимально походили на десктопные.
  Status: implemented
  Owner: assistant
  Last Checked: 2026-04-07
  Note: После phone-specific follow-up `Cases` на mobile переведены на единый visual render-path для main-card и popup: обе ветки используют один `renderCaseMediaPanel`, а phone-gate для `Cases` упрощён до width-based `'(max-width: 767px)'`, чтобы реальный телефон и узкий Arc больше не расходились по логике. На mobile visual-shell сведён к тупому чёрному panel + прямому SVG image без blend-магии; desktop `Cases` не тронуты. `npm run build` прошёл, но живая проверка именно на телефоне ещё нужна.

- Task: В разделе "Философия" (Mindset) на desktop чуть-чуть опустить вниз круглые кнопки навигации (влево-вправо), чтобы они не налезали на текст. Только для desktop, на mobile оставить как есть. Сохранить логику фиксации кнопок.
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-04-07
  Note: В `LabW26PageV3.tsx` уменьшены значения `bottom` для контейнера кнопок на desktop (`md:bottom-8 -> md:bottom-6`, `lg:bottom-9 -> lg:bottom-7`), что опустило их ниже примерно на 8-10 пикселей. Mobile-значение `bottom-[4.25rem]` не менялось. Проверка в браузере подтвердила отсутствие наезда на текст при сохранении фиксированной позиции.

- Task: На mobile в первом блоке `Программа` разложить `Недельный ритм` в две строки, убрать зазоры между ячейками и выровнять размеры дней так, чтобы кроме `ЧТ` и `ВС` они были одинаковыми
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-04-07
  Note: После скриншотного фидбэка mobile `wrap` убран полностью. Вместо него сделаны две явные строки с немного более широкими ячейками и переносом `ПТ` во второй ряд: `ПН ВТ СР ЧТ` и `ПТ СБ ВС`. Внутренний рендер ячейки унифицирован с desktop-версией через общий helper, так что логика нижней посадки текста и типографика теперь одинаковые; внешнего box вокруг всего ритма нет, border остаётся только у самих ячеек.
- Task: Убрать новый бежевый blank-screen после refresh на live-странице, когда сайт на секунду появляется, а потом пропадает
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-04-07
  Note: Причина найдена и исправлена в `DesktopTechUiV5`: приложение падало в рантайме на `TypeError: Cannot read properties of null (reading 'rafId')` внутри новой scroll-lock логики, после чего `DevErrorBoundary` гасил весь React tree и оставлял только фоновую подложку. Null-bug в `clearAutoScrollLock` исправлен, `main.tsx` усилен так, чтобы dev-overlay теперь показывал и React render errors, а не только `window error`. После фикса `npm run build` прошёл, а headless-check на `http://127.0.0.1:3001/#hero` и `http://127.0.0.1:3001/lab-w26/v3#hero` больше не видит пропажи `main/#hero`.

- Task: На mobile убрать лаги и белые экраны при `Смотреть детали` и переходе из меню в `Философию`
  Status: implemented
  Owner: assistant
  Last Checked: 2026-04-07
  Note: После дополнительного прохода визуальный rollback снят: boxer в hero и анимированная `Философия` возвращены. Технические mobile-фиксы сохранены: touch-mobile переходы идут через `auto`, scroll-driven hash-sync отключён именно для touch-mobile, `Смотреть детали` больше не делает delayed mobile scroll и не анимирует height на touch-mobile, mobile menu сначала закрывается и только потом скроллит к секции, boxer-canvas ставит на паузу RAF вне viewport/background tab, тяжёлые блоки ниже первого экрана подгружаются ближе к viewport, а новый lock-path больше не трогает `document.documentElement.style.overflow` и работает только через `body` с восстановлением предыдущего значения. `npm run lint` и `npm run build` прошли; живая проверка в Arc/на телефоне ещё нужна.

- Task: На mobile повторно добить правый горизонтальный скролл и жёлтую пустую полосу справа после неудачного прошлого прохода
  Status: user-approved
  Owner: assistant
  Last Checked: 2026-04-07
  Note: Пользователь подтвердил 2026-04-07, что горизонтального скролла больше нет. После возврата boxer/анимаций сохранены именно технические overflow-фиксы: mobile-only x-clamp на корне, bounded mobile layout, безопасная ширина cookie popup и отсутствие лишнего CSS-hidden case-хвоста на touch-mobile.

- Task: На больших desktop-экранах ограничить максимальную ширину `Недельного ритма`, чтобы блок не расползался шире нужного
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-04-07
  Note: В `LabW26PageV3` максимальная ширина desktop-календаря снижена ещё примерно на 5 процентов: `max-w-[668px] -> max-w-[636px]`. Внутренние пропорции дней и сужение `ЧТ/ВС` не менялись; изменён только верхний предел общей ширины, чтобы на больших экранах блок не выглядел растянутым.

- Task: В desktop `Программе` сделать переключение недель дискретным: короткий scroll должен двигать только на одну неделю, а клик по неделе не должен прогонять blur-переходы через промежуточные недели
  Status: implemented
  Owner: assistant
  Last Checked: 2026-04-07
  Note: После нового пользовательского фидбэка задача переоткрыта. В текущем follow-up desktop `Program` упрощён ещё раз: клик по неделе больше не вызывает `window.scrollTo` и меняет только active week/content, а wheel-navigation на pinned-секции переведён с delta-накопления на жестовую блокировку, чтобы один wheel-gesture давал максимум один переход по неделям независимо от силы scroll. `npm run build` прошёл; нужна живая desktop-проверка в Arc.

- Task: В desktop `Философии` увеличить три pillar-анимации ещё примерно на 10 процентов и выровнять их визуально по центру, особенно опустив `Практику` и немного `Персонализацию`
  Status: implemented
  Owner: assistant
  Last Checked: 2026-04-07
  Note: Последний проход переведён на per-image alignment вместо shell-alignment: общий desktop art-slot снова увеличен примерно на 10%, shell почти нейтрализован, а `Практика` и `Персонализация` опускаются уже внутри общего слота через image-level `translate-y`, чтобы визуальный центр самих анимаций совпал с `Сообществом`. `npm run lint` и `npm run build` прошли; нужна живая desktop-проверка в Arc.

- Task: В desktop-блоке `Философия / Mindset` чуть развести вертикально верхний текст, большую цитату и нижние стрелки, чтобы элементы перестали наезжать друг на друга
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-04-07
  Note: В `LabW26PageV3` divider между `Философией` и `Mindset` слегка увеличен (`py-2 -> py-3/4`), секции `mindset` добавлен небольшой верхний отступ, высота quote-area на desktop увеличена на `1rem`, а нижний control-row со стрелками опущен чуть ниже (`md:bottom-10 -> md:bottom-8`, `lg:bottom-9`). Правка намеренно минимальная, только чтобы снять налезание без изменения общей композиции.

- Task: В desktop `Программе` сделать hover/active-поле недельного rail менее скруглённым и заметно шире, а сам main-card пододвинуть ближе к неделям без лишнего зазора
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-04-07
  Note: В `LabW26PageV3` у week-rail радиус hover-плашки снижен до `2px`, сама rail-колонка расширена (`120 -> 146`), hit-area недели вытянута вправо через `pr-5`, а gap до основного белого полотна уменьшен до `6px`. Одновременно `FINAL DEMO DAY` приведён к тому же радиусу, а max-width main-card слегка расширен (`940 -> 960`), чтобы на узких desktop-экранах контентное полотно начиналось ближе к rail и занимало больше полезной ширины. Нужна живая desktop-проверка по фактическому ощущению расстояния и плотности.

- Task: В desktop `Cases` убрать задержку первого hover-цикла, чтобы SVG сразу становился белым и анимация начиналась мгновенно и плавно с первого кадра
  Status: implemented
  Owner: assistant
  Last Checked: 2026-04-07
  Note: После нового пользовательского фидбэка поведение разделено: статичный SVG снова остаётся в исходных цветах, а animated desktop-hover markup переводится в `currentColor`, поэтому на hover должен снова становиться белым без постоянного tint в покое. Одновременно visual-state карточки теперь завязан на тот же `shouldAnimate`, что и сам hover-animation, чтобы уменьшить баг с двумя зелёными карточками при быстром переходе мышью. Сборка прошла; нужна живая desktop-проверка в Arc.

- Task: На mobile payment popup по кнопке `присоединиться` не должен обрезаться сверху при открытом системном нижнем меню iPhone, а верхний mobile header нужно уменьшить ещё примерно на 10 процентов
  Status: implemented
  Owner: assistant
  Last Checked: 2026-04-07
  Note: В `PricingPaymentPopupNeon` mobile overlay переведён с вертикального центрирования на нижнюю посадку с safe-area (`items-end`, `pb-[calc(env(safe-area-inset-bottom)+32px)]`), а высота самого popup ограничена через `max-h: calc(100dvh - safe-area - 1.5rem)`, чтобы верхушка не обрезалась при системной панели iPhone. После нового пользовательского фидбэка popup дополнительно поднят ещё на `20px` относительно прошлого варианта. В `LabW26PageV3` mobile header дополнительно ужат с `py-[0.85rem]` до `py-[0.75rem]`; desktop-ветки не менялись.

- Task: На mobile уменьшить примерно вдвое разрыв между большим mindset-цитатным блоком и тарифами, а в `Отзывы` поднять слишком мелкий текст до нормального мобильного кегля
  Status: implemented
  Owner: assistant
  Last Checked: 2026-04-06
  Note: В `LabW26PageV3` mobile-gap между `mindset` и `pricing` уменьшен через `pb-20 -> pb-10` у mindset и `py-20 -> pt-10 pb-20` у pricing, без изменений desktop. В `ReviewsSection` мобильный кегль отзыва поднят до `13px` и role-line до `11px`, чтобы текст не падал ниже комфортного диапазона для телефонов.

- Task: На mobile `Cases` сделать карточки заметно шире, ближе к ширине экрана, и вернуть визуальному блоку кейса вес desktop-версии: SVG, тёмный media-shell и общую читаемость
  Status: implemented
  Owner: assistant
  Last Checked: 2026-04-07
  Note: Mobile follow-up переоткрыт и переведён с asset/data-uri экспериментов на более тупый path: на телефоне main `Cases` и popup теперь делят один общий mobile panel с прямой подачей SVG как обычного image-файла и чёрным media-shell, чтобы исключить разъезд между main-card и popup. Width-only mobile gate тоже синхронизирован с этим path. `npm run build` прошёл; нужна живая phone-проверка.

- Task: В mobile footer сделать полупрозрачную надпись `AI MINDSET` заметно прозрачнее и опустить/увеличить её так, чтобы она сильнее жила внизу и немного заходила на зону `ОФЕРТА / ПОЛИТИКА`
  Status: implemented
  Owner: assistant
  Last Checked: 2026-04-06
  Note: В `LabW26PageV3` фоновая footer-надпись переведена на mobile-only lower placement: контейнер теперь выравнивается к низу, opacity снижена с `0.09` до `0.07`, а сама надпись увеличена на mobile и сдвинута вниз через `translate-y-[1.2rem]`, чтобы она мягче перекрывала нижнюю инфо-зону. Desktop-вид оставлен прежним через `md:*`.

- Task: На mobile в `Недельном ритме` выровнять подписи мероприятий, чтобы текст не прыгал, не вылезал и не обрезался, и сделать `ЧТ` и `ВС` примерно вдвое уже остальных дней
  Status: implemented
  Owner: assistant
  Last Checked: 2026-04-07
  Note: После нового фидбэка mobile `ProgramIntegratedTimeline` локально возвращён именно к состоянию из `5c7ceef`, где секция `Program` ещё работала вместе с full-height desktop right panel. Спорный split-layout снят, forced-open логика сохранена. `npm run lint` прошёл, но mobile календарь всё ещё требует живой визуальной проверки.

- Task: Убрать оставшийся mobile горизонтальный скролл с бежевой полосой справа и в блоке `Философия` сильно приблизить анимации к тексту
  Status: requested
  Owner: assistant
  Last Checked: 2026-04-07
  Note: Пользователь сообщил 2026-04-07, что правый вылет и жёлтая полоса всё ещё есть, значит предыдущий `overflow-x-hidden`-проход нельзя считать закрытым. Исторический пункт оставлен открытым; актуальный follow-up зафиксирован отдельной задачей выше.

- Task: На mobile в блоке `Cases` активная карточка должна вести себя почти как desktop hover: выделяться зелёным, переводить SVG в белое animated-состояние и переключаться по карточке, которая ближе всего к середине экрана
  Status: requested
  Owner: assistant
  Last Checked: 2026-04-07
  Note: Пользователь 2026-04-07 явно снял эту механику с текущего прохода и хочет делать `Cases` отдельным агентом. Исторический пункт оставлен в canvas как отложенный, но из активной очереди текущего прохода исключён.

- Task: Убрать тёплый/yellow background вокруг секции `Cases`, который всплывает на mobile при попытке скроллить вверх/вниз около контейнера кейсов
  Status: implemented
  Owner: assistant
  Last Checked: 2026-04-07
  Note: Первичная гипотеза про внешний фон секции оказалась неверной и пользователь её отклонил; follow-up переведён в техническую плоскость. На mobile `Cases` убран разъезд main/popup render-path, а visual-shell сведён к чёрному panel + обычному SVG image без data-uri и без тяжёлого inline SVG DOM. Это должно уменьшить repaint/jank именно на телефонах, не трогая desktop.

- Task: На mobile убрать зазор между верхним header и бегущей строкой, уменьшить высоту header примерно на 15 процентов и устранить горизонтальный скролл с бежевым фоном
  Status: implemented
  Owner: assistant
  Last Checked: 2026-04-06
  Note: В `LabW26PageV3` mobile header сдвинут вплотную к ticker через `top-[18px]`, вертикальный padding уменьшен до `py-[0.85rem]`, а горизонтальный overflow убран у источника: header переведён в `box-border`, чтобы `w-full + px-4` больше не раздували ширину шире viewport и не открывали боковой бежевый фон. Нужна мобильная визуальная проверка.

- Task: На mobile fixed-кнопка `/хочу на лабу` должна появляться только после того, как пользователь реально доскроллил до исходной hero-кнопки, и не дублироваться, пока она ещё видна
  Status: implemented
  Owner: assistant
  Last Checked: 2026-04-07
  Note: После нового фидбэка отдельная mobile fixed-кнопка снята. Вместо неё сам hero CTA на mobile сделан шире и переведён в sticky-вариант внутри секции `hero`: это та же кнопка того же дизайна, которая прилипает к нижнему safe-area во время scroll внутри hero и исчезает вместе с выходом из секции. Desktop-поведение не менялось.

- Task: Довести desktop-блок `программа` на живой странице до реально видимого состояния: правый full-height black panel с glow-art и двумя glass-карточками, плюс заметно более узкие `ЧТ` и `ВС`
  Status: implemented
  Owner: assistant
  Last Checked: 2026-04-07
  Note: По новому desktop-фидбэку от 2026-04-07 белый хвост под `Program` всё ещё считался открытым. В текущем follow-up лишняя высота desktop scroll-shell дополнительно схлопнута (`h-[200vh] -> h-[calc(100vh+420px)]`), чтобы под карточкой не оставался длинный прокручиваемый белый хвост. `npm run build` прошёл; нужна живая desktop-проверка в Arc по фактической высоте хвоста.

- Task: В live FAQ убрать двойную линию под вопросом и увеличить расстояние между верхним label блока, названием раздела и первым `q:`
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-04-06
  Note: В `FooterFaqBlock` live-mode возвращена линия под строкой `question`, а акцент перенесён на верхнюю линию открытого блока через более заметный `border-b` у раскрытой категории. Gap между `q:` и текстом вопроса уменьшен. `npm run build` прошёл, preview на `:3001` отвечает `HTTP 200`.

- Task: В live-отзывах убрать кривой перенос ролей и висячие закрывающие скобки, чтобы длинные роли занимали нормальную ширину карточки
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-04-06
  Note: В `ReviewsSection` live-expanded footer переведён на full-width role layout: роль занимает всю ширину карточки, центрируется между скобками и переносится через `wbr` вокруг `|` и `/`, чтобы не было висячих закрывающих скобок. `ТГ` возвращён к зелёному текстовому виду без постоянного фона; подсветка появляется только на hover карточки. `npm run build` прошёл, preview на `:3001` отвечает `HTTP 200`.

- Task: Синхронизировать anchors текущей страницы в mobile и desktop меню с реальными блоками сайта и визуально отделить page navigation от menu сайта
  Status: implemented
  Owner: assistant
  Last Checked: 2026-04-06
  Note: `LabW26PageV3` переведён на единый список `PAGE_SECTION_LINKS` для mobile и desktop; после нового фидбэка в список возвращён и первый раздел `HERO BLOG`, чтобы anchors снова совпадали с реальными блоками сайта. На mobile блок сохранён на старом месте, а desktop page-nav теперь читается заметнее: минимум `10px`, выше контраст, одна точка вместо троеточия и активный раздел отмечается левым маркером.

- Task: В блоке `Философия` увеличить три morph-анимации примерно на 30 процентов
  Status: implemented
  Owner: assistant
  Last Checked: 2026-04-06
  Note: Увеличен размер контейнера для трёх philosophy SVG в live `LabW26PageV3`; дополнительно ряд философии опущен ниже заголовка, а контейнеры анимаций переведены на общее выравнивание по нижнему краю, чтобы узкие SVG не подпрыгивали вверх относительно соседних. Нужна быстрая проверка в браузере по фактическому визуальному ритму.

- Task: В `Cases` убрать с live четыре чужеродных dark-signal SVG, перенести их в experimental blocks и оставить на live только hover-only SVG в общей стилистике
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-04-06
  Note: В `LabW26PageV3` live-мэппинг возвращён на основной набор `case-0..9.svg`; четыре dark-signal SVG сняты с live-страницы. Вне hover в DOM теперь монтируется статичный SVG без `<animate>`, а живой animated markup подгружается только на hover, поэтому анимация не должна крутиться постоянно.

- Task: На мобильной версии `Cases` оставить на главной только первые 4 карточки, а остальные открывать через кнопку `Посмотреть все`
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-04-06
  Note: В `LabW26PageV3` для основной mobile-сетки `Cases` карточки с 5-й по 8-ю скрыты только на `< md`, при этом desktop-раскладка и существующий overlay `Посмотреть все` не менялись. Ждёт визуальной проверки пользователя.

- Task: В `Cases` не анимировать все карточки подряд и зафиксировать одинаковую высоту всех карточек без скачков
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-04-06
  Note: Последняя попытка с отдельным hover-мэппингом для нижней четвёрки была отклонена пользователем как визуально тупая подмена предмета. Текущий проход заменил сами базовые visual-ассеты у карточек `4..7` на уже существующие animated SVG из верхнего ряда, так что у них теперь один и тот же visual до hover и на hover. Выравнивание по высоте по-прежнему делается только через `description`-зону. Ждёт пользовательской проверки.

- Task: Перенести снятые с live dark-signal кейсы в `experimental blogs`, чтобы смотреть их отдельно от live-сайта
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-04-06
  Note: В repo `AIM Website/Elements Research/ai-mindset-blocks` добавлен отдельный review-вариант `cases-v7` (`DesktopCasesMovedDarkReview`) с четырьмя снятыми dark-signal visual. Asset copy log: `AI Mindset/public/assets/cases/case-coaching-dark.svg -> ai-mindset-blocks/public/assets/cases/case-coaching-dark.svg`, `case-vision-dark.svg -> case-vision-dark.svg`, `case-automation-dark.svg -> case-automation-dark.svg`, `case-research-dark.svg -> case-research-dark.svg`.

- Task: В первом блоке `программа` сделать ячейки `ЧТ` и `ВС` в `недельном ритме` намеренно уже и на полуэкранной ширине
  Status: implemented
  Owner: assistant
  Last Checked: 2026-04-06
  Note: Логика `недельного ритма` переведена с гибких `fr` на фиксированные безопасные desktop-ширины, чтобы текст не обрезался. Уже остаются только `ЧТ` и `ВС`, а остальные дни держат нормальную ширину. Нужна визуальная проверка пользователя, не выглядит ли блок теперь слишком жёстким по общей ширине.

- Task: В первом блоке `программа` сделать правую advanced-колонку полной чёрной высоты и заменить старую мини-карточку на две полупрозрачные карточки поверх зелёного glow-арта
  Status: implemented
  Owner: assistant
  Last Checked: 2026-04-06
  Note: В `DesktopTechUiV5` правая колонка expanded-программы переведена в full-height чёрный модуль с green glow-art и двумя event-card; `speaker/slot` убраны, вместо них оставлены только `инструменты`. Нужна визуальная проверка пользователя, что карточки действительно совпадают по логике с нужным референсом, а не выглядят как новая интерпретация.

- Task: Починить desktop-scroll в блоке `Программа`, чтобы pinned section не залипала, не глотала wheel без перехода и не перескакивала недели
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-04-07
  Note: В `DesktopTechUiV5` wheel-trap переписан: `preventDefault` больше не вызывается в lock-state, lock сокращён и сбрасывается при смене направления. Логика недели переведена с rounded-progress на явные snap-step позиции, завязанные на реальную высоту sticky-panel, а клик по левой rail теперь идёт через тот же navigation path, что и wheel. `npm run build` в этой среде не вернул финальный stdout, но локальный preview на `:3001` продолжает отвечать `HTTP 200`; требуется ручная desktop-проверка реальным touchpad.

- Task: Заменить CTA `хочу на лабораторию` на `/хочу на лабу` и привести pricing CTA `присоединиться` к той же стилистике без лишней жирности и разрядки
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-04-06
  Note: На live-экране `LabW26PageV3` hero/sidebar CTA заменены на `/хочу на лабу`, pricing CTA переведён на отдельный `PRICING_CTA_BUTTON_CLASS` с той же mono-типографикой, но без лишней жирности и разрядки; альтернативный `v4` возвращён без этих правок. `npm run build` прошёл, local preview на `:3001` отдаёт `HTTP 200`.

- Task: В раскрытых отзывах на живом экране убрать белые карточки, уменьшить паддинги, исправить перенос роли без одиноких скобок и выделить `ТГ` как кликабельный элемент
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-04-06
  Note: В `ReviewsSection` добавлен режим `mode=\"live\"`, который подключён только в `LabW26PageV3`: в раскрытом состоянии карточки прозрачные до hover, padding уменьшен, роль собрана в 3-колоночный bracket-layout без висячих `[`/`]`, а `ТГ ↗` оформлен как явная ссылка. `npm run build` прошёл, preview доступен на `:3001`.

- Task: В live FAQ укоротить линию до ширины текста, облегчить типографику раскрытого текста и увеличить расстояние между ответом и следующим вопросом
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-04-06
  Note: В `FooterFaqBlock` добавлен режим `mode=\"live\"`, подключённый только в `LabW26PageV3`: категория теперь получает underline только по ширине текста, раскрытый `q/a` уменьшен до масштаба внешних разделов, текст ответа ослаблен по цвету и кеглю, line-height увеличен, а расстояние между следующими вопросами расширено. `npm run build` прошёл, local preview на `:3001` отвечает корректно.

- Task: Убрать блок `другие лаборатории` с главной страницы live-сайта и перенести его в соседний research-проект `ai-mindset-blocks` как experimental block `Ready for review`
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-04-06
  Note: Блок снят с `LabW26PageV3` и добавлен в `/Users/viola/All/Yandex.Disk.localized/3 Process/8 Vibe Coding/AIM Website/Elements Research/ai-mindset-blocks` как новый `navigator-v6` (`DesktopLabsNavigatorReadyForReview.tsx`). Сборка `AI Mindset` и `ai-mindset-blocks` прошла; локальные preview отвечают на `:3001` и `:5173/ai-mindset-blocks/`.

- Task: На мобильной версии главной страницы опустить cookie-форму почти к нижнему краю экрана
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-04-03
  Note: В `src/components/LabW26PageV3.tsx` mobile `bottom-24` у cookie-баннера снижен до `bottom-4` при сохранении `md:bottom-6`; сборка `npm run build` прошла, а mobile headless screenshot на pricing-переходе показал баннер у нижнего края экрана.

- Task: На мобильной версии hero визуально выровнять воксель-логотип строго по центру
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-04-03
  Note: У mobile-wrapper hero добавлен `flex justify-center`, а прежний ручной сдвиг у `InvertedVoxelLogoFace` уже снят; mobile screenshot с live `:3001/` подтверждает симметричный wrapper и центрированную композицию.

- Task: Найти полный face-logo в чёрном прозрачном исполнении и перевести на него статический логотип в mobile и desktop header
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-04-03
  Note: Отдельный полный чёрный transparent-ассет в рабочем проекте не найден; вместо этого статический full-face `assets/ai-mindset-logo.png` переведён в чёрный вариант через `invert` в mobile/desktop header, без замены hero-вокселя и без изменения размеров layout.

- Task: На мобильном header исправить wordmark рядом с логотипом, чтобы `AI` не терялся и не выглядел как случайная полоска
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-04-03
  Note: Mobile-header переведён с `MINDSET` + разделитель на явный `AI MINDSET` рядом с full-face знаком; live mobile screenshot подтверждает читаемый wordmark без ложной «палочки» вместо `AI`.

- Task: После клика по `хочу на лабораторию` временно подсвечивать приземление в блоке тарифов небольшой иконкой
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-04-03
  Note: В `LabW26PageV3` добавлен transient-state `showPricingCue`, CTA `хочу на лабораторию` теперь идёт через `scrollToPricingWithCue`, а у `EditorialSectionHeader` секции `Тарифы` показывается краткий зелёный `ChevronDown`; build прошёл, DOM/headless проверка после hero-CTA подтвердила `cueFound: true` и `opacity: 1`.

- Task: Добавить на mobile внизу ненавязчивую кнопку `Связаться с нами`, ведущую в уже существующую форму связи
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-04-03
  Note: Добавлена mobile-only fixed-кнопка `Связаться с нами`, ведущая на уже используемую contact/waitlist форму `https://join.aimindset.org/waitlist`; headless DOM-проверка подтвердила fixed anchor и корректный `href`.

- Task: Провести аудит дизайн-системы страницы `/lab-w26/v3` (шрифты, цвета, отступы), предложить объединение стилей и перевести дубликат страницы `LabW26PageV4` на 8-пиксельную 12-колоночную сетку
  Status: requested
  Owner: assistant
  Last Checked: 2026-04-03
  Note: Запрошено создание копии, разработка 8px-grid / столбцовки, привязка всех размеров к сетке и объединение стилей через artifact. План работ выставлен на ревью.

- Task: Ужать карточки `Cases` на живом сайте, убрать из них описательный текст, сделать `Посмотреть все` тем же самым карточным шаблоном и уместить overlay плотнее в два ряда
  Status: self-checked
  Owner: user
  Last Checked: 2026-04-02
  Note: После пользовательской коррекции в `src/components/LabW26PageV3.tsx` основной grid и overlay оставлены на едином компактном case-card шаблоне, карточкам возвращён `description`, author/role снова собраны в одну строку, лишние номер/дополнительные теги сняты, visual-shell поджат ближе к верхней рамке, из opened case-popup убран дублирующий `desc`, затем на основном сайте показ расширен до двух рядов (`8` кейсов), `description` ослаблен до regular и чуть увеличен; позже карточка разделена на два режима: на главной `description` раскрыт до `3` строк и tool-теги оставлены внутри карточек, при этом filter-row `Инструменты` снят с основной страницы, а в overlay tool-теги и filter-row `Инструменты` сохранены, усилены по читаемости на hover, сам набор кейсов расширен сверх исходных `10`, и клики по пустому фону внутри большого overlay теперь тоже закрывают его, тогда как клики по карточкам и filter-tags — нет; `npm run build` прошёл, ждёт визуальной проверки пользователя.

- Task: При обычном скролле синхронизировать URL hash с текущим блоком страницы, чтобы refresh не возвращал к старому anchor
  Status: self-checked
  Owner: user
  Last Checked: 2026-04-02
  Note: В `src/components/LabW26PageV3.tsx` добавлена scroll-based синхронизация hash с текущей секцией (`hero/program/cases/speakers/philosophy/pricing/reviews/faq/labs`) и убран плавный initial jump на reload; `npm run build` прошёл, ждёт пользовательской проверки поведения.

- Task: Перенести на живой сайт новый облегчённый FAQ-вариант из experimental, убрать массивность закрытого состояния, сузить колонку открытого текста и выделить ключевые слова в ответах
  Status: self-checked
  Owner: user
  Last Checked: 2026-04-02
  Note: В `src/components/FooterFaqBlock.tsx` live FAQ переведён на flat-state без белых плашек, плюсик перенесён ближе к тексту, открытые ответы ограничены по ширине адаптивно (`lg ~74% / xl ~70% / 2xl ~66%`), внутри ответов добавлены точечные bold-акценты на ключевых фразах, мягкая выключка по ширине включается только на `xl+` с поджатым `word-spacing`, а для строки вопроса внутри ответа сейчас показан A/B-preview: в первой раскрывашке мягкий зелёный прямоугольник, во второй — тонкий чёрный stroke; `npm run build` прошёл.

- Task: В desktop-блоке `Спикеры` на живом сайте запретить карточкам увеличиваться при изменении ширины экрана: они могут только уменьшаться или перестраиваться по колонкам
  Status: self-checked
  Owner: user
  Last Checked: 2026-04-02
  Note: В `src/components/LabW26PageV3.tsx` desktop-grid переведён на центрирование с `max-w-[286px]` у каждой карточки и промежуточным `lg:grid-cols-3`, чтобы карточки не растягивались на широких ячейках; `npm run build` прошёл.

- Task: На живом сайте `/lab-w26/v3` заменить desktop-блок `Спикеры` на layout из экспериментального `Speakers V5`, сохранив текущие live-данные и мобильное поведение
  Status: self-checked
  Owner: user
  Last Checked: 2026-04-02
  Note: В `src/components/LabW26PageV3.tsx` desktop speakers-section переведена на портретную композицию с угловыми рамками по мотивам `DesktopSpeakersV5`, при этом live-тексты, изображения и mobile-логика сохранены.

- Task: На живом сайте `/lab-w26/v3` починить anchor-ссылки на блоки, чтобы URL hash не терялся и прямые ссылки работали как ссылки на конкретные секции
  Status: self-checked
  Owner: user
  Last Checked: 2026-04-02
  Note: `scrollTo` теперь синхронизирует URL hash через `history.replaceState`, на mount/hashchange добавлен прямой scroll к hash-цели, и вокруг `reviews` / `faq` / `labs` / `speakers` добавлены явные anchor-обёртки.

- Task: В FAQ-блоке на странице `/lab-w26/v3` убрать внешний background и border, а верхнюю чёрную линию сделать тоньше
  Status: implemented
  Owner: user
  Last Checked: 2026-03-31
  Note: Первый вариант с удалением внешнего `bg/border/shadow` был сделан, но затем пользователь уточнил новый референс для полной замены шапки FAQ.

- Task: В FAQ-блоке на странице `/lab-w26/v3` заменить текущую шапку на вариант в стилистике cocktail/reviews header, сохранив зелёную надпись `[f.a.q. module]`
  Status: self-checked
  Owner: user
  Last Checked: 2026-03-31
  Note: В `src/components/FooterFaqBlock.tsx` удалён старый header `вопросы и ответы / sys_ready`; зелёная надпись сохранена, ниже добавлен новый header с серым `FAQ_LOG`, тонкой линией и большим названием блока справа; ждёт визуальной проверки пользователем.

- Task: В карточках `Тарифы` на `/lab-w26/v3` убрать слишком большой разрыв между текстом блока `программа` и линией перед `что получаешь`
  Status: self-checked
  Owner: user
  Last Checked: 2026-03-31
  Note: В `src/components/LabW26PageV3.tsx` уменьшен desktop `min-height` у верхнего feature-блока тарифа, чтобы divider поднимался ближе к контенту без перестройки всей карточки; ждёт визуальной проверки пользователем.

- Task: В блоке `Labs Navigator` на `/lab-w26/v3` перевести весь интерфейс на русский и уменьшить карточки примерно на 20 процентов
  Status: self-checked
  Owner: user
  Last Checked: 2026-03-31
  Note: После уточнения пользователя блок донастроен: шапка заменена на `другие лаборатории:`, длинная горизонтальная линия убрана, в табах оставлены только `текущие / будущие / архив`, английские названия четырёх лабораторий возвращены, статусные теги сняты полностью; после нового фидбэка карточки переведены с растянутого grid на обычный left-aligned flex-ряд с фиксированной шириной и маленьким gap, чтобы они стояли значительно ближе друг к другу, а свободное место оставалось справа.

- Task: Между блоками `FAQ` и `Labs Navigator` на `/lab-w26/v3` сделать более заметный разрыв в духе slash-divider референса
  Status: self-checked
  Owner: user
  Last Checked: 2026-03-31
  Note: В `src/components/LabW26PageV3.tsx` увеличен вертикальный интервал внутри общей секции и между `FooterFaqBlock` и `FooterLabsNavigatorBlock` вставлен отдельный `SlashDivider`; ждёт визуальной проверки пользователем.

- Task: Восстановить дизайн блока "Cases", добавив 10 уникальных SVG-анимаций (со смещением левее, увеличением в 1.15х и 2 glow-версиями)
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-03-31
  Note: Исходные SVG пересозданы (+15% масштаб, сдвиг влево на 15%, удалено 20% линий для плавности, для 2 кейсов применён tech-стиль с утолщением и opacity glow); старые файлы в public перезаписаны через loopback-мост; локальный vite config восстановлен; ждёт ревью пользователя.

- Task: Поднять локально и дать отдельные URL для `LabW26PageV3`, `LabW26PageV3Alt`, `LabW26PageV3Switcher` и `LabW26PageV4`
  Status: self-checked
  Owner: user
  Last Checked: 2026-03-31
  Note: В `src/App.tsx` добавлены отдельные маршруты `/lab-w26/v3`, `/lab-w26/v3-alt`, `/lab-w26/v3-switcher` и `/lab-w26/v4`; локальный dev server поднят с LAN-доступом для desktop/mobile проверки; ждёт пользовательского подтверждения

- Task: В живом git-backed `/v3` центрировать второй desktop-ряд `Спикеры`, если карточек там меньше, чем в первом ряду
  Status: self-checked
  Owner: user
  Last Checked: 2026-03-30
  Note: Выполнено в `src/components/LabW26PageV3.tsx` через split `4 + rest` и отдельный центрированный второй ряд для `lg+`; mobile-ветка не менялась, `npm run build` прошёл, `curl http://localhost:3001/v3` вернул `200 OK`; ждёт пользовательского подтверждения

- Task: В живом git-backed `/v3` добавить прозрачную morph SVG-анимацию справа от секции `Спикеры`, чтобы заполнить пустоту на широком desktop
  Status: self-checked
  Owner: user
  Last Checked: 2026-03-30
  Note: SVG добавлен в `public/assets/speakers-morph-animation-8.svg` и подключён справа от desktop-layout в `LabW26PageV3.tsx`; `curl http://localhost:3001/assets/speakers-morph-animation-8.svg` вернул `200 OK`; ждёт пользовательского визуального подтверждения

- Task: Зафиксировать, что правки `Спикеры` были сделаны в старой версии страницы, а актуальная страница для правок ещё не найдена
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-03-31
  Note: Подтверждено пользователем: `aimwebsite0.5` (`/Users/viola/.../Vibe Coding/AI Mindset`, `LabW26PageV3.tsx`) содержит мои правки, но это не актуальная страница. Требуется определить текущий “канон” (GitHub Pages URL или repo/ветку) и перенести правки туда.

- Task: В hero block уменьшить количество вокселей примерно в 2 раза, сделать их плотнее, сохранить правильную форму правой половины лица по референсу и убрать лаги анимации
  Status: requested
  Owner: user
  Last Checked: 2026-03-29
  Note: Предыдущий pass ушёл в неправильный dotted-hero и не совпал с реальным визуальным ориентиром пользователя; сначала нужно вернуть правильный grid-вариант страницы, затем уже уменьшать плотность и лаги на нём

- Task: Сделать cleanup-only проход для GitHub Pages entry layer: новый `title`, меньше путаницы в роутинге и без изменения основной страницы `v3`
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-03-29
  Note: `index.html` переведён на `AI Mindset`; из `App.tsx` убраны legacy/experimental aliases, `ai-mindset-lab-x26` и wildcard теперь канонизируются на `/`; `LabW26PageV3.tsx` локально не менялся; `npm run build` прошёл; untracked времянки и экспериментальные файлы вынесены в local shelf `/Users/viola/All/Yandex.Disk.localized/3 Process/8 Vibe Coding/_cleanup_shelf/AI Mindset/2026-03-29`

- Task: Убрать `test-page` и `variants` из текущей репы `AI Mindset` и перенести их в `AIM Website/Elements Research`
  Status: implemented
  Owner: assistant
  Last Checked: 2026-03-29
  Note: `ProgramShowcasePage.tsx` и `ProgramVariantsPage.tsx` перемещены в `Elements Research`, а маршруты удалены из текущего `App.tsx`

- Task: Убрать `library` из текущей репы `AI Mindset`, перенести её в `Visual Elements Library` и завести там отдельный git repo
  Status: implemented
  Owner: assistant
  Last Checked: 2026-03-29
  Note: `StyleLibraryPage/StyleCard/StyleLibrary/StyleGenerator/generativeStyles` перемещены в `Visual Elements Library`, а в папке инициализирован локальный git repo

- Task: Удалить `public/ostrich.html` из текущей репы
  Status: implemented
  Owner: assistant
  Last Checked: 2026-03-29
  Note: Файл удалён по явному запросу пользователя

- Task: Дать локально посмотреть `DesktopTechUiV5.tsx` и `ProgramShowcaseAccordionCleanV2Page.tsx`
  Status: implemented
  Owner: assistant
  Last Checked: 2026-03-29
  Note: Для просмотра были временно добавлены маршруты; после проверки установлено, что копии этих экранов уже существуют в соседних repos внутри `Vibe Coding`, поэтому временные маршруты затем удалены из текущей репы

- Task: На основной странице `/v3` сделать карточки `Тарифы` шире, убрать раскрывашку, всегда показать весь контент, заменить кружочки на маленькие зелёные стрелки, перевести `base` в `База` и сделать mobile-раскладку вертикальной
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-03-27
  Note: В `LabW26PageV3.tsx` pricing переведён на постоянную раскрытую версию, списки теперь с маленькими зелёными `›`, CTA переименован в `записаться`, mobile идёт одной колонкой, а desktop-сетка сужена по gap для более широких карточек

- Task: Аккуратно поменять местами `cases` между основным `/v3` и последним экспериментальным cases block
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-03-27
  Note: На основном `/v3` текущая секция `cases` заменена на компактный experimental-style блок с первыми 4 кейсами и общим `ещё`, а в `ai-mindset-blocks` добавлен relocated-вариант `CURRENT LIVE SITE / RELOCATED`

- Task: На mobile в блоке `программа` сделать ячейки `недельный ритм` чуть выше, чтобы все слова помещались
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-03-27
  Note: В `LabW26PageV3.tsx` mobile-высота ячеек поднята с `44px` до `54px`, а нижняя текстовая зона увеличена; `npm run build` прошёл, мобильный screenshot `#program` снят через `npx playwright screenshot`

- Task: В секции `Спикеры` на основном сайте оставить новый desktop-вариант с открытым текстом, но на mobile вернуть прежнюю версию со стрелкой и раскрывающимся описанием
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-03-27
  Note: В `LabW26PageV3.tsx` секция `team` разделена на две ветки: `md:hidden` снова использует двухколоночные карточки со стрелкой и row-based раскрытием, а `md+` сохраняет новый always-open desktop-layout; `npm run build` прошёл, мобильный screenshot `#team` снят и просмотрен

- Task: Перенести новый воксель-логотип из research на основной сайт `v3`, инвертировать его под белый фон и сделать левую половину чёрной вместо белой
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-03-27
  Note: Старый hero-canvas заменён на новый `InvertedVoxelLogoFace`: прозрачный фон, чёрная левая половина, правая половина собрана чёрными вокселями по форме оригинального PNG; локальный скриншот `:3023` просмотрен после правки

- Task: Сместить белый gap глаза вправо и убрать чёрный пиксел-сосед: сдвинуть ошибочный пиксель на два столбца влево, чтобы форма глаза совпала с референсом
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-03-31
  Note: Обновлён `isInsideEyeZone` в `InvertedVoxelLogoFace.tsx` так, чтобы вырез глаз расширялся влево, покрывая лишний чёрный пиксель; `npm run build` прошёл, готов к визуальной сверке

- Task: Перенести блок `вопросы и ответы` с `ai-mindset-blocks` в живую страницу `/aimwebsite0.5/v3` и поставить его в самом конце перед футером
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-03-26
  Note: Блок портирован в локальный компонент `FooterFaqBlock`, смонтирован в `LabW26PageV3.tsx` перед футером, затем подогнан по ширине и ритму под текущий `v3`; сборка прошла, и headless DOM-проверка на `:3023` подтвердила одно вхождение `вопросы и ответы`

- Task: Перенести блок `LABS NAVIGATOR` с `ai-mindset-blocks` в живую страницу `/aimwebsite0.5/v3` и поставить его рядом внизу страницы
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-03-26
  Note: Третий вариант навигатора портирован в локальный компонент `FooterLabsNavigatorBlock`, добавлен под FAQ-блоком перед футером, затем расширен до общей ширины секции, получил более крупные описания и фикс для двухстрочного `AI-NATIVE ORGS`; сборка прошла, и headless DOM-проверка на `:3023` подтвердила одно вхождение `LABS NAVIGATOR`

- Task: В desktop-блоке `program` на `/aimwebsite0.5/v3` сделать новый, более спокойный и компактный FAQ-like вариант вместо тяжёлого текущего вида
  Status: implemented
  Owner: assistant
  Last Checked: 2026-03-26
  Note: Текущий desktop `DesktopTechUiV5` заменён на новый `ProgramDesktopFaqCalm`: компактный stack-accordion с мягкой графикой, меньшими отступами и спокойной подачей main/advanced content

- Task: Уменьшить расстояние между тремя карточками философии и блоком с цитатой `После лабы я понял:` примерно в 2 раза, ориентир около 100px
  Status: implemented
  Owner: assistant
  Last Checked: 2026-03-19
  Note: После уточнения пользователя дополнительно уменьшен только мобильный зазор между текстом цитаты и нижним блоком примерно на 20px; высота секции и desktop-отступы не менялись

- Task: В блоке `программа` сделать ячейки `недельный ритм` шире и ниже, убрать нежелательные переносы, дать `четвергу` и `воскресенью` лёгкий серый фон и выровнять все названия событий по нижнему краю
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-03-19
  Note: Desktop-календарь встроен в основной файл и локально перепроверен после правки: ячейки сделаны ниже и шире, `СР` получил сплошной серый тон, `ЧТ/ВС` — тот же тон с пониженной прозрачностью; в mobile-аккордеоне тем же проходом скорректированы серые фоны и нижний внутренний отступ текста

- Task: В мобильной версии блока `программа` перенести из дубликата в оригинал только типографику раскрывающихся карточек недель
  Status: implemented
  Owner: assistant
  Last Checked: 2026-03-19
  Note: Перенесены только текстовые размеры/вес/межстрочный интервал внутри раскрывающихся недельных карточек и блока `Advanced Track`; выравнивание текста по сторонам не менялось

- Task: Восстановить рабочую локальную ссылку предпросмотра для страницы `/v3`
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-03-19
  Note: `npm run dev:v4` запущен, Vite поднят на `http://192.168.1.158:8888/`

- Task: В мобильной версии блока `Спикеры` убрать разделительную линию и подпись над описанием, а сам текст сделать одной широкой колонкой вместо двух
  Status: implemented
  Owner: assistant
  Last Checked: 2026-03-19
  Note: В мобильном раскрытии спикера удалены `border-t/b`, скрыта подпись `о спикере`, текст описания переведён в один широкий блок, а вертикальный зазор между карточкой и текстом дополнительно уменьшен примерно вдвое

- Task: В мобильной версии секции `Философия` сделать анимацию крупнее, большую цитату ближе к анимации и стрелки ближе к тексту
  Status: implemented
  Owner: assistant
  Last Checked: 2026-03-19
  Note: Для mobile анимация дополнительно опущена ниже примерно на 40px через `translate-y-10`, чтобы визуально сильнее сократить разрыв до большой цитаты

- Task: Подтвердить, что обновлённый глаз в `InvertedVoxelLogoFace` продолжает собираться без ошибок после смещения зон в маске
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-03-31
  Note: Запуск `npm run build` завершился без ошибок после увеличения области `isInsideEyeZone`, поэтому можно вручную проверить визуал на порту `:3023` перед окончательным обзором

- Task: На мобильной уменьшить расстояние между философской цитатой/стрелками и началом секции `программа`
  Status: implemented
  Owner: assistant
  Last Checked: 2026-03-19
  Note: Мобильный переход поджат через уменьшение `pb` у `mindset` и `pt` у `program`

- Task: На мобильной ещё немного уменьшить расстояние между карточкой спикера и раскрытым описанием
  Status: implemented
  Owner: assistant
  Last Checked: 2026-03-19
  Note: Мобильный раскрывающийся блок спикера дополнительно поджат через `mt-0.5` и уменьшенные верхний/нижний padding

- Task: На мобильной переделать тарифы в горизонтальный свайп, сделать карточки компактнее по высоте и ширине, убрать лишние вертикальные дыры и увеличить line-height у текстов
  Status: implemented
  Owner: assistant
  Last Checked: 2026-03-19
  Note: На mobile тарифы переведены в горизонтальный scroll/snap, карточки стали уже и компактнее, убраны фиксированные высоты и лишние зазоры, увеличен line-height у feature/more-текстов; у `Advanced` удалён дубль `+4 занятия`, выровнены зоны title/price/offer/buttons и зафиксирована высота кнопок

- Task: Переделать мобильное меню под иерархию `labs` с тремя вложенными страницами, убрать лишнюю подпись/линию и проверить работу якорей разделов страницы
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-03-19
  Note: Убрана пустая секция `меню`, первый блок разделов подписан `меню`, подпись `labs` оставлена только над вложенными lab-страницами, размеры трёх вложенных ссылок уменьшены; якорь `Философия` переведён на реальный `#philosophy`

- Task: Встроить desktop-блок `программа` прямо в `LabW26PageV3.tsx` вместо отдельного компонента и уже там починить desktop-календарь
  Status: implemented
  Owner: assistant
  Last Checked: 2026-03-19
  Note: Desktop-блок `программа` больше не тянется из отдельного `DesktopTechUiV5.tsx`: компонент продублирован и теперь живёт прямо внутри `LabW26PageV3.tsx`

- Task: Вернуть desktop-описание спикеров ближе к прежнему виду: левое выравнивание, шире текстовый блок и более безопасная адаптация размера для длинных описаний
  Status: implemented
  Owner: assistant
  Last Checked: 2026-03-19
  Note: В desktop-overlay спикеров возвращены `items-start` и `text-left`, текстовый блок сделан шире, а размер переведён на `clamp(...)` для более мягкого ужатия длинных описаний

- Task: Добавить блок `Отзывы` в страницу на desktop и mobile и включить его в anchor-меню
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-03-19
  Note: `Отзывы` добавлены в anchor-меню, переставлены после `Тарифов` и перед финальной цитатой `Мы не учим кодить...`; порядок локально перепроверен по рендеру

- Task: Make the project monospace text render more consistently across computers
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-03-24
  Note: `font-mono` now resolves to `IBM Plex Mono` project-wide so monospace text renders consistently across machines

- Task: Tighten the desktop hero text styling so the left title block, right description block, and `Следующий поток` row line up like before
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-03-25
  Note: Hero block returned to a simpler two-column composition: the title is back to a three-line layout, the extra green `подать заявку` CTA was removed, `Следующий поток` replaced with `19 января — 16 февраля · 4 недели`, and the top row was re-tuned through font size and line-height rather than a fake container-height hack

- Task: Переставить блоки `Философия` и большую цитату после `Спикеров` и перед `Тарифами`
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-03-25
  Note: Порядок секций перестроен на `program -> cases -> team -> philosophy -> mindset -> pricing`

- Task: Переделать блок `Спикеры`: 4 карточки в ряд на desktop, раскрытие описания по клику на стрелку и затемнение неактивных карточек
  Status: implemented
  Owner: assistant
  Last Checked: 2026-03-25
  Note: После нового пользовательского фидбэка статус понижен обратно: найден реальный дефект desktop-сетки, из-за которого последний ряд рисовался в 3 колонки и карточки выглядели разного размера; текущий проход фиксирует жёсткие 4 колонки, квадратность карточек, ограничение описания первыми тремя колонками, отсутствие линии/повтора имени и убирает прыжок следующей строки за счёт общей высоты detail-area по самому длинному описанию в активном ряду

- Task: Перенести neon glassmorphic popups оплаты из локального V2-референса в git-backed страницу `/v3` этого репозитория, открывая их по кнопке `выбрать` в блоке `Тарифы`
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-03-25
  Note: Ошибочная первая попытка ушла в untracked snapshot-дубликат; затем правка перенесена в боевой repo `eppelas/aimwebsite0.5` и подключена к реальному `/v3`

- Task: Доработать перенесённый popup оплаты после пользовательского ревью: убрать чёрный текст на чёрном фоне, вернуть более красивую success-анимацию из исходного V2 и выровнять регистр/шрифт CTA-кнопок
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-03-25
  Note: Второй проход завершён: overlay теперь центрируется внутри правого тёмного полотна (`md:left-[18%]`), close button поднята выше, контраст текстов и меток усилен ещё раз, зелёные CTA в popup приведены к общему стилю через shared button tokens, локальный build прошёл, свежий preview поднят на `http://192.168.1.180:3023/aimwebsite0.5/v3`; финальная success-анимация всё ещё может быть заменена после нового пользовательского референса

- Task: Свести CTA-кнопки на странице `/v3` и в popup к одной локальной дизайн-системе: одинаковые цвета, скругления, шрифты и casing
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-03-25
  Note: Вынесены shared styles в `src/components/ctaButtonStyles.ts`; к ним подключены sidebar/mobile `хочу на лабораторию`, cookie `понятно`, popup-кнопки `оплатить`, `я оплатил`, `закрыть`, а также tariff CTA `выбрать`; дополнительно method-selector кнопки оплаты (`USDT`, `РУ-КАРТЫ`, `ЗАРУБЕЖНЫЕ КАРТЫ` и внутренние submethods) приведены к одному secondary-variant

- Task: Перепроверить git-backed `/v3` после переноса popups оплаты через локальную сборку и dev server
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-03-25
  Note: `/v3` боевого repo отвечает локально по `http://192.168.1.180:3001/v3`; общий `lint/build` всё ещё падает из-за старого синтаксического дефекта в `src/components/ConsultingPage.tsx`, не связанного с попапом
  Owner: user
  Last Checked: —
  Note: User wants the hero adjusted through text style and line-height changes first; background height reduction should wait until spacing naturally settles

- Task: Subdue the desktop `Недельный ритм` block so it reads lighter and thinner
  Status: requested
  Owner: user
  Last Checked: —
  Note: User wants the schedule grid, labels, and typography to feel less heavy without changing the section concept

- Task: Cleanup репозитория отдельно от `Speakers Bloсл`: убрать из git уже удалённые `LabW26Page*` и вывести `.vite` кэш из индекса через `.gitignore`
  Status: implemented
  Owner: assistant
  Last Checked: 2026-03-25
  Note: Cleanup идёт отдельным коммитом; безопасный первый слой ограничен файлами, которых уже нет на диске, и generated `.vite`-кэшем без удаления его локальной папки

- Task: Переделать desktop-блок `программа` на реальном локальном сайте `http://192.168.1.180:3023/aimwebsite0.5/v3`, чтобы он визуально совпадал с предоставленным референсом, но сохранил рабочую mobile-структуру
  Status: implemented
  Owner: user
  Last Checked: 2026-03-26
  Note: Пользовательский ревью открыл задачу заново: предыдущая интеграция не дала нужного sticky-scroll и оставляла слишком большой белый хвост. В текущих проходах сохранены общие данные и исходная `motion/useScroll` логика из `4007`; overlap под sticky убран, root `overflow-x-hidden` снят, а после нового пользовательского фидбэка проблема локализована в соседнем элементе, а не только в shell. Последняя правка подтягивает desktop-подпись `* основная программа...` вверх в пустую зону под карточкой через локальный layout offset, без изменений mobile и логики недель; `npm run build` прошёл, ожидание user-approved

- Task: В секции `Отзывы` убрать `1 / 2` и заменить это на стрелку вниз, которая по клику раскрывает сразу все отзывы большой разноразмерной плиткой
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-04-06
  Note: Пагинация `1 / 2` снята, внизу секции оставлена кнопка-стрелка `открыть все отзывы / свернуть отзывы`, expanded-flow работает через единую masonry/grid раскладку. Дополнительно live-версия уже отдельно доточена по белому фону, `tg ->` и логике скобок, поэтому историческую задачу больше не держим в `requested`.

## Agent Self-Checks
- Task: Проверить cleanup-проход сайта после удаления лишних компонентов, ассетов, зависимостей и ссылок.
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-05-21
  Note: `npm run lint` и `npm run build` прошли. Targeted scan не нашёл старых версий/маршрутов, AI Studio/Gemini-хвостов, удалённых ассетов, `href="#"` или destructive `rm -rf`. `.DS_Store` scan пустой, `npm audit --audit-level=moderate` даёт 0 уязвимостей, `npm ls --depth=0 --json` без extraneous пакетов. Осталась только визуальная user-review на локальном preview.

- Task: Проверить, что mobile-правка `Недельного ритма` в `Программе` не ломает сборку и доступна на локальном preview
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-04-07
  Note: После правки mobile-раскладки в `ProgramIntegratedTimeline` прошли `npm run lint` и `npm run build`; локальный dev preview на `http://127.0.0.1:3001/#program` отвечает `HTTP 200`. Headless mobile screenshot в этой среде не завершился штатно, поэтому финальная визуальная проверка остаётся за пользователем на живом preview.

- Task: Проверить, что реальный `aimwebsite0.5` собирается после mobile stability-pass и что локальный preview идёт из правильного репо
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-04-07
  Note: Реальный репозиторий `/Users/viola/All/Yandex.Disk.localized/3 Process/8 Vibe Coding/AI Mindset` собран через `npm run build` без ошибок; `localhost:3001` подтверждён как dev-server именно из этого каталога. Живая browser-check в Arc остаётся на user-review, потому что OS-level desktop screenshots остановлены по запросу пользователя.

- Task: Подтвердить, что refresh больше не уводит live-страницу в бежевый blank-screen
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-04-07
  Note: После фикса null-crash в `DesktopTechUiV5` прогнаны `npm run build`, `npm run lint`, `curl` на `/` и `/lab-w26/v3` (`HTTP 200`), а также headless refresh-check на `http://127.0.0.1:3001/#hero` и `http://127.0.0.1:3001/lab-w26/v3#hero`: `main` и `#hero` остаются в DOM, runtime overlay пустой, мгновенного провала в фон больше не наблюдается.

- 2026-04-06: `DesktopTechUiV5` self-check rerun. Fixed desktop overlap by giving the left program column a hard minimum width and reducing the right panel to `320px`; normalized empty-day weekly-rhythm fill back to neutral gray; tightened and enlarged the `разделы страницы` marker so it lives inside the same row with the label. Build passed and both `localhost:3001` and LAN preview returned `HTTP 200`.

- Task: Подтвердить, что правки блока `Спикеры` внесены именно в GitHub-backed repo `eppelas/aimwebsite0.5`, а не в старый локальный клон
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-03-30
  Note: Подтверждено, что `origin` у `/Users/viola/All/Yandex.Disk.localized/3 Process/8 Vibe Coding/AI Mindset` указывает на `https://github.com/eppelas/aimwebsite0.5.git`, `/` и `/v3` в `src/App.tsx` ведут на `LabW26PageV3`, а старый каталог `/Users/viola/All/Yandex.Disk.localized/3 Process/5 Work/AI Mindset/main-aimwebsite0.5` удалён

- Task: Проверить локальный preview и сборку после переноса правок `Спикеры` в GitHub-backed repo
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-03-30
  Note: `npm run dev` поднялся на `http://localhost:3001/` и `http://192.168.1.180:3001/`, `curl` на `/v3` и `assets/speakers-morph-animation-8.svg` вернул `200 OK`, `npm run build` завершился успешно

- Task: Перепроверить новый hero voxel face на живом `/v3` после снижения плотности и упрощения анимации
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-03-29
  Note: `npm run build` прошёл, `curl` на `http://localhost:3001/v3` вернул `200 OK`, а desktop screenshot `http://localhost:3001/v3` снят через Playwright и просмотрен

- Task: Заменить старый hero `VoxelLogoFace` в `LabW26PageV3.tsx` на новую инвертированную воксельную версию и проверить рендер на живом локальном `:3023`
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-03-27
  Note: Добавлен новый компонент `src/components/InvertedVoxelLogoFace.tsx`, старый встроенный canvas удалён из `LabW26PageV3.tsx`, `npm run build` прошёл, Playwright-скриншот главного hero на `http://localhost:3023/aimwebsite0.5/v3` снят и просмотрен

- Task: Проверить, что нижние блоки `вопросы и ответы` и `LABS NAVIGATOR` реально появились на живой странице `:3023` и не ломают сборку
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-03-26
  Note: `npm run build` прошёл, `localhost` и LAN `curl` вернули `200 OK`, а headless Puppeteer-проверка нашла по одному вхождению `вопросы и ответы` и `LABS NAVIGATOR` на `/aimwebsite0.5/v3`

- Task: Проверить, что новый спокойный desktop-вариант `program` в `v3` собирается без ошибок и работает на живом проекте за `:3023`
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-03-26
  Note: `LabW26PageV3.tsx` переключён на `ProgramDesktopFaqCalm`, старый `DesktopTechUiV5` удалён из файла, production build прошёл, порт `3023` уже слушает тот же проект

- Task: Найти конкретные классы, которые создают лишний вертикальный зазор между секциями `philosophy-cards` и `mindset`
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-03-19

- Task: После правки проверить, что `LabW26PageV3.tsx` собирается без ошибок
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-03-19
  Note: `npm run build` завершился успешно после переноса desktop-программы внутрь `LabW26PageV3.tsx`, перестановки блока `Отзывы` и дополнительной правки mobile pricing/calendar/menu

- Task: Update the project monospace stack to a consistent named font and verify the CSS override
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-03-24
  Note: CSS override is in place and build verification already passed

- Task: Найти фактический локальный проект, который обслуживает `http://192.168.1.180:3023/aimwebsite0.5/v3`, перед повторной правкой блока `программа`
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-03-25
  Note: Подтверждено, что страницу на `3023` обслуживает `/Users/viola/All/Yandex.Disk.localized/3 Process/8 Vibe Coding/AI Mindset`

- Task: Повторно внедрить desktop-стили и scroll-driven поведение блока `программа` именно в реальном проекте на `3023`, не ломая mobile
  Status: self-checked
  Owner: assistant
  Last Checked: 2026-03-26
  Note: После отрицательного пользовательского ревью самопроверка перезапущена: desktop-ветка `DesktopTechUiV5` оставлена на общих `PROGRAM_TRACKS/PROGRAM_WEEK_COPY`, а вокруг неё перенесён scroll-shell, ближе к оригиналу `4007`; дополнительно лишняя высота shell схлопнута в потоке страницы, `npm run build` прошёл успешно

- Task: Переделать `ReviewsSection` без пагинации `1 / 2`, добавив кнопку-стрелку вниз и раскрытие всей отзывной сетки по клику
  Status: implemented
  Owner: assistant
  Last Checked: 2026-03-25
  Note: `src/components/ReviewsSection.tsx` переписан под preview + expand-all flow; build verification сейчас зависает в `vite build`, поэтому визуальное подтверждение остаётся за пользователем

## Approved / Closed
