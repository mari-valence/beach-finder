---
category: Beaches
---
# BeachCard

One beach result in the editorial grid: a 4:5 photo (`beach.image`, or a warm tonal placeholder) with the two-digit `rank` bottom-right, then the name in Cormorant 32px with the score in rosewood, "Region · N km" in stone, the blurb, and an uppercase vibe line ("Surf · Chill"). No border or surface: lay cards out in a 3-column grid (40px column gap, 72px row gap). Pass `onClick` to make the whole card clickable (e.g. focus its map pin); `directionsHref` adds a small "Directions" text link.

```jsx
<ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "72px 40px" }}>
  <BeachCard as="li" rank={2} onClick={focusPin}
    beach={{ name: "Porthcurno", region: "West Penwith", distance: 58, score: 88, popularity: 74, cool: 6,
             chairRental: true, vibes: ["swimming", "chill"], blurb: "Fine shell sand below the cliffs, sheltered from the westerly wind." }} />
</ol>
```
