---
category: Layout
---
# Hero

Full-bleed photographic page header (up to 760px tall) with ivory text. A nav bar runs across the top (Cormorant `logo`, default "Beach Finder", plus uppercase `nav` links) above a 1px translucent rule. The uppercase `eyebrow` and the Cormorant 300 `title` (up to 96px) sit bottom-left. `children` is the search bar: it sits at the bottom and overlaps the next section by 44px, so give that section about 88px of top padding. Pass `image` for the photo; without one it falls back to a dark ink wash.

```jsx
<Hero image="/img/coast.jpg" eyebrow="Tuesday, 14 October" title="Find the beach that suits the day."
  nav={<><a href="#results">Beaches</a><a href="#map">Map</a></>}>
  <form className="search-bar">…</form>
</Hero>
```
