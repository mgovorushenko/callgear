# CallGear CRM Design Tokens

## Usage Rule

All app UI colors must come from design tokens. Do not use hardcoded hex,
rgba, named CSS colors, or ad hoc opacity colors in components.

If a needed color role is missing, add or request a token first, then use that
token in the UI.

All production and prototype screens must be assembled from shared components
and tokens. Do not duplicate component structure or create detached one-off
copies on screens.

If a screen needs a variation that is not covered by the component system,
add or request a component variant first, then use that variant on the screen.

Text styles must use typography tokens. Do not create arbitrary font sizes,
line heights, font weights, or letter spacing values on screens.

## Storybook

The local Storybook lives in the project root and is served as a static web app.

Page order:

1. Colors
2. Typography
3. Icons
4. One page per shared component

Component pages must show the component in its working state. Variant controls
may be placed below the component when needed. Do not add explanatory intro text
to component pages.

Application pages are separate from Storybook. They should render without the
Storybook sidebar and without fake device chrome. Mobile web pages may use a
mobile-width content container, but they should not imitate the iPhone status
bar or rounded device frame.

Client detail task rows must be derived from the same task data used by the
Tasks screen. A task belongs to a client through `clientId`; do not maintain a
separate hardcoded task list inside client detail data.

Form dropdowns must use the shared Glass Menu component with a hidden form
value input, not native `select` styling.

Current application pages:

| Route | Screen |
| --- | --- |
| `#/clients` | Clients |
| `#/clients/<id>` | Single client detail |
| `#/tasks` | Tasks |
| `#/task/<id>` | Single task detail |
| `#/new-task` | Create task |
| `#/edit-task/<id>` | Edit task |

Glass components should include both isolated and over-content variants, because
their material behavior depends on the content behind them.

Glass component implementation follows a web liquid-glass stack:

1. Filter layer: `backdrop-filter` plus SVG lens filter
2. Overlay layer: translucent light or brand tint
3. Specular layer: inset highlight
4. Content layer: label or icon

Do not recreate Figma's solid blend stack directly in CSS if it hides backdrop
content. Web glass must keep the overlay translucent enough for the filter layer
to remain visible.

References:

- https://codepen.io/wprod/pen/raVpwJL
- https://habr.com/ru/articles/974058/

Current component pages:

| Page | Component |
| --- | --- |
| Button | Liquid icon button from Figma node `64:1963` |
| Text Button | Liquid text button from Figma node `64:1963` |
| Content Button | Standard content button |
| Status Bar | iPhone status bar |
| Tab Bar | Liquid glass tab bar |
| Glass Menu | Liquid glass dropdown menu |
| Badge | Badge |
| Segmented Control | Segmented control |
| Field | Field / text field from Figma node `17:6043` |
| Form Row | Form row |
| Alert | Alert |
| Row | Row and row button |
| Task Card | Task card |
| List Item | List item, including photo variant |
| Section Title | Section title |
| Action Tile | Task action tile |
| Task Summary Card | Task detail summary card |
| Client Card | Task client card |
| Client Profile | Client detail profile header |
| Activity Item | Recent activity item |

Current temporary foundation variables used by Storybook:

| Group | Status |
| --- | --- |
| Spacing | Temporary CSS variables, needs approved Figma tokens |
| Radius | Temporary CSS variables, needs approved Figma tokens |
| Sizes | Temporary CSS variables, needs approved Figma tokens |

Missing tokens found while implementing components:

| Needed token | Reason |
| --- | --- |
| `effect.glass.blur` | Liquid glass background blur |
| `effect.glass.saturation` | Liquid glass saturation value |
| `effect.shadow.glass` | 0 8 40 shadow used by glass surfaces |
| `effect.shadow.glassPressed` | Pressed shadow used by glass surfaces |
| `effect.shadow.button` | 0 8 20 shadow used by Liquid buttons |
| `effect.shadow.buttonPressed` | Pressed shadow used by Liquid buttons |
| `color.surface.glass.light` | White translucent glass layer |
| `color.surface.glass.brand` | Brand translucent glass layer |
| `color.surface.glass.burn` | Color-burn layer used by light glass |
| `color.surface.glass.overlay` | Overlay layer used by brand glass |
| `color.glass.white65` | `rgba(255,255,255,.65)` white tint from Figma light glass button |
| `color.glass.burn` | `#DDD` color-burn layer from Figma light glass button |
| `color.glass.darken` | `#F7F7F7` darken layer from Figma light glass button |
| `color.glass.brandOverlay` | `#999` overlay layer from Figma glass button |
| `color.glass.white75` | `rgba(255,255,255,.75)` white tint from Figma glass button |
| `color.glass.effectClear` | `rgba(0,0,0,0)` transparent glass effect layer from Figma |
| `color.glass.overlayLight` | Web liquid-glass light overlay |
| `color.glass.overlayLightHover` | Web liquid-glass light hover overlay |
| `color.glass.overlayBrand` | Web liquid-glass brand overlay |
| `color.glass.overlayBrandHover` | Web liquid-glass brand hover overlay |
| `color.glass.menuDodge` | Adapted translucent color-dodge layer for web glass menu |
| `color.glass.menuFill` | Adapted light fill layer for web glass menu |
| `color.glass.menuReferenceBg` | Dark reference background used to inspect glass menu material |
| `effect.glass.menuBackdrop` | Strong backdrop blur used by web liquid-glass menus |
| `effect.glass.lens` | SVG lens filter used by web liquid-glass |
| `effect.glass.specular` | Inset highlight used by web liquid-glass |
| `color.fill.dangerSubtle` | Destructive bordered button fill from Figma |
| `color.background.canvas` | `#F7F7F7` phone screen background from Figma |
| `color.label.mutedStrong` | `#6D6D6D` task card price text from Figma |
| `color.accent.brandSubtle` | 10% brand tint used by detail components |
| `color.accent.greenSubtle` | 10% green tint used by activity icons |
| `color.accent.orangeSubtle` | 10% orange tint used by activity icons |
| `color.accent.purpleSubtle` | 10% purple tint used by activity icons |
| `typography.tabLabel` | 10px / 12px semibold tab bar label from Figma |
| `typography.bodyMedium` | 17px / 20px medium text field value from Figma |
| `radius.phoneScreen` | 44px iPhone screen preview radius from Figma |
| `radius.taskCard` | 24px task card radius from Figma |
| `radius.statusBattery` | 4px status bar battery radius |
| `radius.sheet.iphone.top` | 34px alert sheet corner radius from Figma |
| `radius.segment.selected` | 20px selected segment radius from Figma |
| `radius.badge.square` | 4px square badge radius from Figma |
| `radius.badge.rounded` | 22px rounded badge radius from Figma |
| `radius.formField` | 26px new task input and row group radius from Figma |
| `space.screen.x` | 16px phone screen horizontal content inset from Figma |
| `space.screen.contentGap` | 24px task screen vertical content gap from Figma |
| `space.screen.cardPadding` | 20px task card padding from Figma |
| `space.taskCard.gap` | 16px task card inner gap from Figma |
| `space.tabBar.x` | 20px tab bar horizontal screen inset from Figma |
| `space.tabBar.top` | 12px tab bar top padding from Figma |
| `space.tabBar.bottom` | 20px tab bar bottom padding from Figma |
| `space.status.gap` | 6px status bar layout gap from Figma |
| `space.status.levelGap` | 7px status bar level icon gap from Figma |
| `space.status.barY` | 11px status bar vertical padding from Figma |
| `space.alert.padding` | 14px alert inner padding from Figma |
| `space.alert.gap` | 10px alert content/action gap from Figma |
| `space.row.x` | 16px row horizontal padding from Figma |
| `space.row.trailingGap` | 16px gap between row trailing detail and disclosure from Figma |
| `space.row.dateGap` | 5px date pill internal gap from Figma |
| `space.row.dateX` | 11px date pill horizontal padding from Figma |
| `space.row.dateY` | 6px date pill vertical padding from Figma |
| `size.alert.width` | 300px alert width from Figma |
| `size.button.height` | 48px content button height from Figma |
| `size.form.rowHeight` | 52px new task form row height from Figma |
| `size.form.saveWidth` | 362px new task save button width from Figma |
| `size.form.saveBottom` | 24px new task save button bottom inset from Figma |
| `size.picker.height` | 336px iOS-style date/time picker sheet height |
| `size.picker.wheelHeight` | 140px iOS-style date/time picker wheel area |
| `size.avatar.md` | 44px list item photo/avatar size from Figma |
| `size.profile.avatarLg` | 100px client detail profile photo size from Figma |
| `size.profile.actionOverlap` | 36px client detail profile toolbar overlap from Figma |
| `size.list.photoRowHeight` | 68px list item photo row height from Figma |
| `size.phone.width` | 402px iPhone screen width from Figma |
| `size.phone.height` | 1039px task screen frame height from Figma |
| `size.screen.contentWidth` | 370px task screen content width from Figma |
| `size.statusBar.height` | 59px status bar height from Figma |
| `size.statusIsland.width` | 125px dynamic island width from Figma |
| `size.statusIsland.height` | 37px dynamic island height from Figma |
| `size.statusCellular.height` | 13px status cellular icon height |
| `size.statusCellular.barWidth` | 3px status cellular bar width |
| `size.statusWifi` | 11px simplified status wifi size |
| `size.statusBattery.width` | 27px status battery width from Figma |
| `size.statusBattery.height` | 13px status battery height from Figma |
| `size.tabBar.height` | 90px tab bar screen area height from Figma |
| `size.glassMenu.width` | 250px glass menu width from Figma |
| `size.glassMenu.itemHeight` | 40px glass menu item height from Figma |
| `size.taskCard.compactHeight` | 224px compact task card height from Figma |
| `size.taskCard.standardHeight` | 240px standard task card height from Figma |
| `size.taskCard.expandedHeight` | 262px expanded task card height from Figma |
| `size.row.width` | 300px row width from Figma |
| `size.row.regularHeight` | 52px regular row height from Figma |
| `size.row.tallHeight` | 68px tall/reverse row height from Figma |
| `size.row.copyTallHeight` | 60px row tall/reverse text stack height from Figma |
| `size.row.dateHeight` | 34px date pill height from Figma |
| `size.row.chevronWidth` | 8px row disclosure chevron width from Figma |
| `size.row.chevronHeight` | 24px row disclosure chevron height from Figma |
| `size.row.chevronVisual` | 10px CSS disclosure chevron visual size |
| `size.row.chevronStroke` | 2px CSS disclosure chevron stroke width |
| `size.sectionTitle.height` | 39px section title height from task detail screen |
| `size.actionTile.height` | 60px task action tile height from Figma |
| `size.clientCard.minHeight` | 246px task client card height from Figma |
| `size.activityIcon` | 44px recent activity icon container from Figma |
| `size.separator.hairline` | 1px separator stroke from Figma |
| `size.button.icon` | 48px icon-only button size |
| `size.icon.md` | 24px icon size |
| `radius.glass.icon` | 296px glass effect radius from Figma |

Asset note:

SVG icons currently contain hardcoded stroke colors. For production components,
icons should be exported with `currentColor` so component color can come from
tokens without CSS masks or per-file overrides.

Tab Bar currently renders SVG assets as images because CSS masks failed for the
multi-path icons. Active icon tint requires `currentColor` SVG exports or
separate active icon assets.

## Base Colors

These are primitive palette colors. They should not be used directly in
components unless there is no semantic token yet.

| Token | Value | Intended role |
| --- | --- | --- |
| `color.base.brand` | `#C44E8E` | Primary brand color |
| `color.base.blue` | `#3A7BD5` | Calls, links, informational accents |
| `color.base.green` | `#2F9E73` | Success, won deals, positive states |
| `color.base.red` | `#D94A4A` | Errors, lost deals, destructive states |
| `color.base.orange` | `#E58A2A` | Warnings, attention states |
| `color.base.yellow` | `#D6A21E` | Pending, waiting, follow-up states |
| `color.base.purple` | `#8B5FD3` | VIP, special, priority states |
| `color.base.cyan` | `#2797A8` | Messages, integrations, automation |

## Neutral Colors

Neutral colors are imported from `Mode 1.tokens.json` and form the default app
structure: backgrounds, surfaces, text, inputs, and muted states.

| Token | Value | Intended role |
| --- | --- | --- |
| `color.grays.black` | `#1A1A1A` | Primary text |
| `color.grays.white` | `#FFFFFF` | White surfaces |
| `color.grays.gray1` | `#8E8E93` | Secondary text |
| `color.grays.gray2` | `#C6C6C6` | Tertiary text and secondary badges |
| `color.grays.gray3` | `#E4E4E4` | Quaternary text and primary fills |
| `color.grays.gray4` | `#EEEEEE` | Secondary fills |
| `color.grays.gray5` | `#F7F7F7` | App background and tertiary fills |

## Semantic Color Roles

| Token | Value | Intended role |
| --- | --- | --- |
| `color.background.primary` | `color.grays.white` | Primary surfaces |
| `color.background.secondary` | `color.grays.gray5` | Secondary/app surfaces |
| `color.label.primary` | `color.grays.black` | Primary text |
| `color.label.secondary` | `color.grays.gray1` | Secondary text |
| `color.label.tertiary` | `color.grays.gray2` | Placeholder and muted text |
| `color.label.quaternary` | `color.grays.gray3` | Lowest-emphasis text |
| `color.label.invert` | `color.grays.white` | Text on dark/accent surfaces |
| `color.label.brand` | `color.accent.brand` | Brand text |
| `color.fill.primary` | `color.grays.gray3` | Primary fill |
| `color.fill.secondary` | `color.grays.gray4` | Secondary fill |
| `color.fill.tertiary` | `color.grays.gray5` | Tertiary fill |

## Typography

Typography tokens are based on the Figma typography styles in the CallGear CRM
App file, node `3:93`.

| Token | Family | Weight | Size | Line height | Letter spacing | Intended role |
| --- | --- | ---: | ---: | ---: | ---: | --- |
| `typography.title1` | `Inter` | `600` | `28` | `34` | `0` | Large screen titles |
| `typography.title2` | `Inter` | `600` | `22` | `28` | `0` | Section titles, prominent modal titles |
| `typography.title3` | `Inter` | `600` | `20` | `25` | `0` | Smaller titles, grouped headers |
| `typography.headline` | `Inter` | `600` | `17` | `22` | `0` | Primary emphasis inside rows and controls |
| `typography.body` | `Inter` | `400` | `17` | `22` | `0` | Default readable text |
| `typography.subheadline` | `Inter` | `400` | `15` | `20` | `0` | Secondary text and supporting labels |
| `typography.footnoteStrong` | `Inter` | `600` | `13` | `18` | `0` | Small emphasized labels |
| `typography.footnote` | `Inter` | `400` | `13` | `18` | `0` | Footnotes, metadata, compact helper text |
| `typography.caption` | `Inter` | `400` | `12` | `16` | `0` | Captions, timestamps, very compact labels |
