---
category: Beaches
---
# PickBanner

The featured top recommendation: sun-orange 2px border, soft sun glow, an uppercase sun eyebrow (`label`, default "Today's pick") and a larger beach name, followed by the same content as `BeachCard`. Use once per page, above the results list. Use `label="Closest great beach"` for fallback results.

```jsx
<PickBanner beach={topBeach} directionsHref={directionsUrl(topBeach)} />
```
