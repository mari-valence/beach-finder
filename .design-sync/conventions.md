# Beach Finder UI — how to build with it

Sunny, sandy, sea-blue. Components are on `window.BeachFinderUI` (`BeachRoot`, `Hero`, `Button`, `TextInput`, `SelectField`, `Pill`, `Card`, `BeachCard`, `PickBanner`, `EmptyState`, plus the helper `formatKm(km)`).

## Wrap every screen in `BeachRoot`

`BeachRoot` applies the system font, ink text colour and the sand page background (`--bf-sand`). Without it, screens render on white in the browser default font. Put it at the root, then `Hero` first if the screen has a header.

```jsx
const { BeachRoot, Hero, Button } = window.BeachFinderUI;
<BeachRoot style={{ minHeight: "100vh" }}>
  <Hero title="🏖️ Beach Finder" tagline="Find the best beach for a day out." />
  …
</BeachRoot>
```

## Styling idiom: components + `--bf-*` tokens, no utility classes

There is no utility-class vocabulary. Use components for every control and surface, and use inline `style` with these tokens for your own layout glue (grids, gaps, headings). Don't invent `bf-*` class names — the only ones that exist are the components' internals.

| Token | Use |
|---|---|
| `--bf-sand` | page background |
| `--bf-sea` / `--bf-sea-dark` | primary actions, links / hover, pill text |
| `--bf-sea-tint` | pill & secondary-hover background |
| `--bf-sun` | featured/highlight accent (PickBanner border, "you are here") — use sparingly |
| `--bf-ink` / `--bf-muted` | body text / secondary text |
| `--bf-card` / `--bf-border` | surfaces / hairline borders |
| `--bf-radius-sm` 8 · `--bf-radius` 10 · `--bf-radius-lg` 12 · `--bf-radius-xl` 16 | corner radii |
| `--bf-font` | system-ui stack (no webfont) |

Spacing rhythm: 6px between pills, 8px in a search row, 12px between stacked cards, 16–20px between sections, page content max-width 1200px with 16px padding.

## Where the truth lives

Read `styles.css` (it `@import`s `_ds_bundle.css`, which defines every token and component style) before styling. Each component's `<Name>.prompt.md` has usage rules and an example; `<Name>.d.ts` is the prop contract. `BeachCard` and `PickBanner` take a `beach` object: `{ name, region, distance (km), blurb, score (0–100), popularity (1–100), cool (1–10), vibes: string[] }`.

## Patterns

- One `Button` (primary) per action group; alternatives use `variant="secondary"`.
- Results page: `PickBanner` once on top, then a list of `BeachCard as="li"` (12px gap) beside a map/panel in a two-column grid that collapses to one column under 800px.
- Filters are a centred, wrapping row of `SelectField`s with a 16px gap.
- Empty/fallback lists use `EmptyState`.

```jsx
const { BeachRoot, PickBanner, BeachCard, EmptyState } = window.BeachFinderUI;
<BeachRoot>
  <main style={{ maxWidth: 1200, margin: "0 auto", padding: 16 }}>
    <PickBanner beach={top} directionsHref={dirUrl(top)} style={{ marginBottom: 20 }} />
    <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
      {rest.map((b) => <BeachCard key={b.name} as="li" beach={b} directionsHref={dirUrl(b)} />)}
    </ol>
  </main>
</BeachRoot>
```
