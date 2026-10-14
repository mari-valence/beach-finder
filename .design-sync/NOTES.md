# design-sync notes — beach-finder

- The DS is `packages/ui` (`@beach-finder/ui`), extracted from the original vanilla app on 2026-10-14 specifically so it could be synced. The app (`src/main.jsx`) consumes it.
- Build before syncing: `npm install && npm run build:ui` from the repo root. Converter flags: `--node-modules ./node_modules --entry ./packages/ui/dist/index.js` (react is hoisted to the root).
- Node: none was installed system-wide on this Mac; the first sync used a local Node 22 at `~/.local/node/bin` (prepend to PATH).
- Render check / capture: no Playwright browser cache. `playwright` is installed in `.ds-sync` with `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1` and pointed at system Chrome: `DS_CHROMIUM_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"`. Run scripts with `NODE_PATH=$PWD/.ds-sync/node_modules` so they resolve it.
- `BeachRoot` is the provider (`cfg.provider`) and excluded as a component; `BeachCardBody` is an internal building block, excluded via `componentSrcMap`.
- Auto `.d.ts` extraction drops inherited DOM props (onClick, disabled, value, onChange, placeholder…) and leaves `Beach`/`SelectOption` as unresolved names, so Button, TextInput, SelectField, Card, BeachCard, PickBanner use hand-written `dtsPropsFor`.
- Groups come from `category` frontmatter in `packages/ui/docs/<Name>.md` (auto-detected docsDir). `guidelinesGlob` is pointed at a non-existent `guides/` on purpose: the default `docs/*.md` would duplicate the component docs into `guidelines/` (the build logs a harmless `! guidelinesGlob: guides not found`).

## Known render warns
- none

## Re-sync risks
- `dtsPropsFor` is hand-maintained: any prop added to Button/TextInput/SelectField/Card/BeachCard/PickBanner (or a change to the `Beach` shape) must be mirrored in `.design-sync/config.json`, or the design agent won't see it.
- Previews' sample beach data is inlined in `.design-sync/previews/*.tsx`, not imported from `src/beaches.js`; it won't track data edits (fine — it's illustrative).
- Render verification used system Chrome, not a pinned Playwright Chromium; a Chrome update could shift screenshots slightly.
