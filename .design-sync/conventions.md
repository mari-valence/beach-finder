# Beach Finder UI — how to build with it

Warm, editorial, minimal: ivory pages, ink text, one muted rosewood accent, large photography, Cormorant Garamond display type over Hanken Grotesk. **No emoji and no decorative icons.** Components are on `window.BeachFinderUI` (`BeachRoot`, `Hero`, `Button`, `TextInput`, `SelectField`, `Pill`, `Card`, `BeachCard`, `PickBanner`, `EmptyState`, plus the helpers `formatKm(km)` and `crowdLevel(popularity)`).

## Wrap every screen in `BeachRoot`

`BeachRoot` applies Hanken Grotesk 15/1.6, ink text and the ivory page background (`--bf-ivory`). Without it, screens render on white in the browser default font. Put it at the root, then `Hero` first if the screen has a header.

```jsx
const { BeachRoot, Hero } = window.BeachFinderUI;
<BeachRoot style={{ minHeight: "100vh" }}>
  <Hero eyebrow="Tuesday, 14 October" title="Find the beach that suits the day." />
  …
</BeachRoot>
```

## Styling idiom: components + `--bf-*` tokens, no utility classes

Use components for every control and surface, and inline `style` with these tokens for your own layout glue. The only shared helper classes are `bf-label` (11px uppercase .18em stone) and `bf-eyebrow` (12px uppercase .22em). Don't invent other `bf-*` class names.

| Token | Use |
|---|---|
| `--bf-ivory` #F6F3ED | page background |
| `--bf-paper` #FBF9F5 | surfaces (Card, search bar, PickBanner card) |
| `--bf-ink` #1D1B18 | text, primary buttons |
| `--bf-stone` #6B655C | secondary text, labels |
| `--bf-rosewood` #8A4A3C | accent: eyebrows, scores, hover. Use sparingly |
| `--bf-hairline` #DDD6CA / `--bf-hairline-soft` #E4DDD1 | 1px rules and borders |
| `--bf-pill-border` #C9C1B4 · `--bf-disabled` #8B8478 | pill border · disabled text |
| `--bf-font` / `--bf-display` | Hanken Grotesk / Cormorant Garamond |
| `--bf-radius` 2px | the only radius |
| `--bf-shadow` | only on the floating search bar |

Type scale: display 96/300, titles 72 and 48/300, heading 32/400, stat 36, body 15/1.6 (lead 18/1.65), labels 11–12px uppercase with .18–.22em tracking. Headings use `var(--bf-display)` with `fontWeight: 300`.

Spacing: 64px page gutter (20px on mobile), 120–160px between sections, grid gaps 40 / 72 / 80px.

## Where the truth lives

Read `styles.css` (it `@import`s `_ds_bundle.css`, which defines every token and component style) before styling. Each component's `<Name>.prompt.md` has usage rules and an example; `<Name>.d.ts` is the prop contract. `BeachCard` and `PickBanner` take a `beach` object: `{ name, region, distance (km), blurb, score (0–100), popularity (1–100), cool (1–10), vibes: string[], chairRental: boolean, image?: string }`.

## Patterns

- One primary `Button` per action group. Alternatives use `variant="secondary"` or `variant="text"`.
- Results page: `Hero` with the search bar as children (paper, grid `2fr 1fr 1fr auto`: Starting from / Within / Vibe / Search). Then `PickBanner layout="feature"`. Then a section header ("Also within reach" eyebrow, Cormorant 48 title, inline `SelectField`s on the right, 1px rule below). Then a 3-column grid of `BeachCard`s, a 560px map and a hairline footer.
- Empty and fallback lists use `EmptyState` with a text-button action.

```jsx
const { BeachRoot, PickBanner, BeachCard, SelectField } = window.BeachFinderUI;
<BeachRoot>
  <main style={{ padding: "88px 64px 120px" }}>
    <PickBanner layout="feature" beach={top} directionsHref={dirUrl(top)} onViewMap={() => focus(top)} style={{ marginBottom: 120 }} />
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", paddingBottom: 28, borderBottom: "1px solid var(--bf-hairline)", marginBottom: 56 }}>
      <div>
        <div className="bf-eyebrow" style={{ color: "var(--bf-stone)", marginBottom: 12 }}>Also within reach</div>
        <h2 style={{ margin: 0, font: "300 48px/1 var(--bf-display)" }}>Six more beaches</h2>
      </div>
      <SelectField variant="inline" label="Sort" options={sortOptions} defaultValue="best" />
    </div>
    <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "72px 40px" }}>
      {rest.map((b, i) => <BeachCard key={b.name} as="li" rank={i + 2} beach={b} onClick={() => focus(b)} />)}
    </ol>
  </main>
</BeachRoot>
```
