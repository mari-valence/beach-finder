import { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BeachRoot, Hero, TextInput, Button, SelectField, PickBanner, BeachCard, EmptyState, formatKm,
} from "@beach-finder/ui";
import { BEACHES } from "./beaches.js";

// --- Helpers ---
function distanceKm(a, b) {
  const R = 6371;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

// Blend popularity, coolness and closeness into one 0–100 score.
function score(beach) {
  const closeness = 1 / (1 + beach.distance / 100);
  return Math.round(100 * (0.45 * (beach.popularity / 100) + 0.3 * (beach.cool / 10) + 0.25 * closeness));
}

function directionsUrl(beach, origin) {
  const dest = `${beach.lat},${beach.lng}`;
  const from = origin ? `&origin=${origin.lat},${origin.lng}` : "";
  return `https://www.google.com/maps/dir/?api=1&destination=${dest}${from}`;
}

const RADIUS_OPTIONS = [
  { value: "50", label: "50 km" },
  { value: "150", label: "150 km" },
  { value: "500", label: "500 km" },
  { value: "2000", label: "2,000 km" },
  { value: "Infinity", label: "Anywhere" },
];
const VIBE_OPTIONS = [
  { value: "", label: "Any" },
  ...["chill", "party", "surf", "snorkel", "scenic", "family", "people-watching", "wildlife"].map((v) => ({
    value: v, label: v[0].toUpperCase() + v.slice(1),
  })),
];
const SORT_OPTIONS = [
  { value: "best", label: "Best match" },
  { value: "distance", label: "Closest" },
  { value: "popularity", label: "Most popular" },
  { value: "cool", label: "Coolest" },
];
const sorters = {
  best: (a, b) => b.score - a.score,
  distance: (a, b) => a.distance - b.distance,
  popularity: (a, b) => b.popularity - a.popularity,
  cool: (a, b) => b.cool - a.cool,
};

function rank(origin, radius, vibe, sort) {
  const all = BEACHES.map((b) => {
    const withDist = { ...b, distance: distanceKm(origin, b) };
    return { ...withDist, score: score(withDist) };
  });
  let list = all.filter((b) => b.distance <= radius && (!vibe || b.vibes.includes(vibe)));
  let fallback = false;
  if (list.length === 0) {
    // Nothing nearby: show the closest beaches that match the vibe instead.
    fallback = true;
    list = all.filter((b) => !vibe || b.vibes.includes(vibe)).sort((a, b) => a.distance - b.distance).slice(0, 5);
  }
  return { list: list.sort(sorters[sort]), fallback };
}

// --- Map (Leaflet, loaded globally from the CDN) ---
function useBeachMap(origin, list) {
  const el = useRef(null);
  const map = useRef(null);
  const markers = useRef(null);

  useEffect(() => {
    map.current = L.map(el.current).setView([25, -40], 2);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: "© OpenStreetMap contributors",
    }).addTo(map.current);
    markers.current = L.layerGroup().addTo(map.current);
    return () => map.current.remove();
  }, []);

  useEffect(() => {
    if (!origin) return;
    markers.current.clearLayers();
    markers.current.addLayer(
      L.circleMarker([origin.lat, origin.lng], {
        radius: 8, color: "#f59e0b", fillColor: "#f59e0b", fillOpacity: 0.9,
      }).bindPopup("You are here"),
    );
    const points = [[origin.lat, origin.lng]];
    list.forEach((b, i) => {
      markers.current.addLayer(L.marker([b.lat, b.lng]).bindPopup(`<b>${i + 1}. ${b.name}</b><br>${formatKm(b.distance)} · ⭐ ${b.score}`));
      points.push([b.lat, b.lng]);
    });
    map.current.fitBounds(points, { padding: [40, 40], maxZoom: 11 });
  }, [origin, list]);

  return { el, focus: (b) => map.current.setView([b.lat, b.lng], 12) };
}

function App() {
  const [query, setQuery] = useState("");
  const [origin, setOrigin] = useState(null);
  const [originLabel, setOriginLabel] = useState("");
  const [status, setStatus] = useState("");
  const [radius, setRadius] = useState("150");
  const [vibe, setVibe] = useState("");
  const [sort, setSort] = useState("best");

  const { list, fallback } = useMemo(
    () => (origin ? rank(origin, Number(radius), vibe, sort) : { list: [], fallback: false }),
    [origin, radius, vibe, sort],
  );
  const { el: mapEl, focus } = useBeachMap(origin, list);

  useEffect(() => {
    if (origin) setStatus(`${list.length} beach${list.length === 1 ? "" : "es"} near ${originLabel}`);
  }, [origin, originLabel, list]);

  function setPlace(lat, lng, label) {
    setOrigin({ lat, lng });
    setOriginLabel(label);
  }

  async function onSearch(e) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return setStatus("Type a city or address first.");
    setStatus("Looking up that location…");
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(q)}`);
      const data = await res.json();
      if (!data.length) return setStatus(`Couldn't find "${q}". Try a different place name.`);
      setPlace(Number(data[0].lat), Number(data[0].lon), data[0].display_name.split(",").slice(0, 2).join(","));
    } catch {
      setStatus("Location lookup failed. Check your connection and try again.");
    }
  }

  function onGeo() {
    if (!navigator.geolocation) return setStatus("Your browser doesn't support location.");
    setStatus("Getting your location…");
    navigator.geolocation.getCurrentPosition(
      (pos) => setPlace(pos.coords.latitude, pos.coords.longitude, "your location"),
      () => setStatus("Couldn't get your location. Type a city instead."),
    );
  }

  const top = list[0];

  return (
    <BeachRoot>
      <Hero title="🏖️ Beach Finder" tagline="Tell us where you are. We'll find the best, most popular, coolest beach for a day out.">
        <form className="search" onSubmit={onSearch}>
          <TextInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="City or address, e.g. Los Angeles"
            aria-label="City or address"
            autoComplete="off"
          />
          <Button type="submit">Find beaches</Button>
          <Button variant="secondary" onClick={onGeo}>📍 Use my location</Button>
        </form>
        <div className="filters">
          <SelectField label="Within" options={RADIUS_OPTIONS} value={radius} onChange={(e) => setRadius(e.target.value)} />
          <SelectField label="Vibe" options={VIBE_OPTIONS} value={vibe} onChange={(e) => setVibe(e.target.value)} />
          <SelectField label="Sort by" options={SORT_OPTIONS} value={sort} onChange={(e) => setSort(e.target.value)} />
        </div>
        <p className="status" role="status">{status}</p>
      </Hero>

      <main className="layout">
        {top && (
          <PickBanner
            className="pick"
            beach={top}
            label={fallback ? "Closest great beach" : "Today's pick"}
            directionsHref={directionsUrl(top, origin)}
          />
        )}
        <div className="columns">
          <ol className="results">
            {fallback && (
              <EmptyState as="li">No beaches in our list within that distance. Here are the closest ones instead.</EmptyState>
            )}
            {list.map((b) => (
              <BeachCard
                key={b.name}
                as="li"
                beach={b}
                directionsHref={directionsUrl(b, origin)}
                onClick={(e) => { if (!e.target.closest("a")) focus(b); }}
              />
            ))}
          </ol>
          <div ref={mapEl} className="map" />
        </div>
      </main>

      <footer className="footer">
        Geocoding by <a href="https://nominatim.openstreetmap.org/" target="_blank" rel="noopener">OpenStreetMap Nominatim</a>. Map © OpenStreetMap contributors.
      </footer>
    </BeachRoot>
  );
}

createRoot(document.getElementById("root")).render(<App />);
