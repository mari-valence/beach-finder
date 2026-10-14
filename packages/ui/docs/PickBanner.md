---
category: Beaches
---
# PickBanner

The single top recommendation. Photo, a rosewood uppercase eyebrow (`label`, default "Today's pick"; use "Closest great beach" for fallback results), the beach name in Cormorant 300, "Region · N km away", the blurb, then a four-stat row (Score, Crowds from `popularity`, Cool factor, Chair rental Yes/No) between hairlines. Actions: `directionsHref` renders the primary "Get directions" button, and `onViewMap` adds a "View on map" text link.

`layout="card"` (default) is two equal columns on a paper card with a 48px title. `layout="feature"` is the large results-page version: a 7:5 grid with an 80px gap, a 4:3 photo and a 72px title, and it stacks under 1024px. Use it once per page.

```jsx
<PickBanner layout="feature" beach={top} directionsHref={directionsUrl(top)} onViewMap={() => focusPin(top)} />
```
