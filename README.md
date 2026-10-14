# Beach Finder

Frontend-only site that recommends the best, most popular and coolest beach for a day out near a location you give it.

- Search by city/address (OpenStreetMap Nominatim) or use your browser location
- Filter by distance and vibe (chill, party, surf, snorkel, scenic, …)
- Ranks beaches by a blend of popularity, coolness and closeness, with a "Today's pick"
- Map view (Leaflet) and one-click Google Maps directions

## Run locally

Needs Node 18+. From this folder:

```bash
npm install
npm run build
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Layout

- `packages/ui` — `@beach-finder/ui`, the component library (tokens + React components). Synced to Claude Design via `/design-sync`.
- `src/main.jsx` — the app, built from those components. `src/beaches.js` holds the beach data; add entries there to expand coverage.
- `styles.css` — app-level layout only.
