---
category: Beaches
---
# BeachCard

One beach search result: name, "region · N km away", blurb, then a meta row (⭐ score, 🔥 popularity, 😎 cool/10, vibe `Pill`s, and a right-aligned "Directions →" link when `directionsHref` is set). Stack results in a list with a 12px gap; pass `onClick` to make the card interactive (e.g. focus a map).

```jsx
<BeachCard as="li" directionsHref="https://www.google.com/maps/dir/?api=1&destination=34.0353,-118.6776"
  beach={{ name: "Malibu Surfrider Beach", region: "Malibu, CA, USA", distance: 41, score: 84,
           popularity: 80, cool: 9, vibes: ["surf", "chill"], blurb: "Legendary point break with mellow, long rides." }} />
```
