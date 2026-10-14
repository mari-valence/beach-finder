---
category: Layout
---
# Hero

Full-width page header with the sky-cyan to sand gradient, a large centred `title` and a dark-teal `tagline`. Put the page's primary search UI in `children` (search row, filter row, status line) — it renders centred below the tagline. Use at the top of a page, directly inside `BeachRoot`.

```jsx
<Hero title="🏖️ Beach Finder" tagline="Tell us where you are. We'll find the best beach for a day out.">
  <form style={{ display: "flex", gap: 8, justifyContent: "center" }}>…</form>
</Hero>
```
