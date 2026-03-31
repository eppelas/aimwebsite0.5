# Task Verification Canvas

## User Requests

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
  Note: В `src/components/FooterLabsNavigatorBlock.tsx` переведены заголовок, табы, названия карточек, статусы и архивный экран; сами карточки уменьшены через `max-width`, padding и типографику, а после уточнения пользователя у внешнего контейнера дополнительно убраны обводка и тёплый фон; ждёт визуальной проверки пользователем.

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
  Status: requested
  Owner: user
  Last Checked: 2026-03-25
  Note: После пользовательского ревью задача снова открыта: expanded-grid местами выглядит сломанной, одна карточка стала слишком большой, стрелка не в нужном стиле; дополнительно пользователь попросил больше фото и подписи с местом работы

## Agent Self-Checks

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
