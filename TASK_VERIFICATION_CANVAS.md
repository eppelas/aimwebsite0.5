# Task Verification Canvas

## User Requests

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

## Agent Self-Checks

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

## Approved / Closed
