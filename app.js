const $ = (id) => document.getElementById(id);

const state = { origin: null, originLabel: "" };

// --- Map ---
const map = L.map("map").setView([25, -40], 2);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 18,
  attribution: "© OpenStreetMap contributors",
}).addTo(map);
const markers = L.layerGroup().addTo(map);

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

function formatKm(km) {
  return km < 10 ? `${km.toFixed(1)} km` : `${Math.round(km).toLocaleString()} km`;
}

function directionsUrl(beach) {
  const dest = `${beach.lat},${beach.lng}`;
  const origin = state.origin ? `&origin=${state.origin.lat},${state.origin.lng}` : "";
  return `https://www.google.com/maps/dir/?api=1&destination=${dest}${origin}`;
}

function setStatus(msg) {
  $("status").textContent = msg;
}

// --- Rendering ---
function cardHtml(b) {
  const pills = b.vibes.map((v) => `<span class="pill">${v}</span>`).join("");
  return `
    <h3>${b.name}</h3>
    <div class="region">${b.region} · ${formatKm(b.distance)} away</div>
    <p class="blurb">${b.blurb}</p>
    <div class="meta">
      <span class="stat">⭐ ${b.score}</span>
      <span>🔥 ${b.popularity} popular</span>
      <span>😎 ${b.cool}/10 cool</span>
      ${pills}
      <a class="directions" href="${directionsUrl(b)}" target="_blank" rel="noopener">Directions →</a>
    </div>`;
}

function render() {
  if (!state.origin) return;

  const radius = Number($("radius").value);
  const vibe = $("vibe").value;
  const sort = $("sort").value;

  const all = BEACHES.map((b) => {
    const withDist = { ...b, distance: distanceKm(state.origin, b) };
    return { ...withDist, score: score(withDist) };
  });

  let list = all.filter((b) => b.distance <= radius && (!vibe || b.vibes.includes(vibe)));
  let fallback = false;
  if (list.length === 0) {
    // Nothing nearby: show the closest beaches that match the vibe instead.
    fallback = true;
    list = all.filter((b) => !vibe || b.vibes.includes(vibe)).sort((a, b) => a.distance - b.distance).slice(0, 5);
  }

  const sorters = {
    best: (a, b) => b.score - a.score,
    distance: (a, b) => a.distance - b.distance,
    popularity: (a, b) => b.popularity - a.popularity,
    cool: (a, b) => b.cool - a.cool,
  };
  list.sort(sorters[sort]);

  // Top pick
  const pick = $("pick");
  const top = list[0];
  if (top) {
    pick.hidden = false;
    pick.innerHTML = `<div class="label">${fallback ? "Closest great beach" : "Today's pick"}</div>${cardHtml(top)}`;
  } else {
    pick.hidden = true;
  }

  // List
  const ol = $("results");
  ol.innerHTML = "";
  if (fallback) {
    const li = document.createElement("li");
    li.className = "empty";
    li.textContent = "No beaches in our list within that distance. Here are the closest ones instead.";
    ol.appendChild(li);
  }
  list.forEach((b) => {
    const li = document.createElement("li");
    li.className = "card";
    li.innerHTML = cardHtml(b);
    li.addEventListener("click", (e) => {
      if (e.target.closest("a")) return;
      map.setView([b.lat, b.lng], 12);
    });
    ol.appendChild(li);
  });

  // Map
  markers.clearLayers();
  const you = L.circleMarker([state.origin.lat, state.origin.lng], {
    radius: 8, color: "#f59e0b", fillColor: "#f59e0b", fillOpacity: 0.9,
  }).bindPopup("You are here");
  markers.addLayer(you);
  const points = [[state.origin.lat, state.origin.lng]];
  list.forEach((b, i) => {
    markers.addLayer(L.marker([b.lat, b.lng]).bindPopup(`<b>${i + 1}. ${b.name}</b><br>${formatKm(b.distance)} · ⭐ ${b.score}`));
    points.push([b.lat, b.lng]);
  });
  map.fitBounds(points, { padding: [40, 40], maxZoom: 11 });

  setStatus(`${list.length} beach${list.length === 1 ? "" : "es"} near ${state.originLabel}`);
}

function setOrigin(lat, lng, label) {
  state.origin = { lat, lng };
  state.originLabel = label;
  render();
}

// --- Inputs ---
$("search").addEventListener("submit", async (e) => {
  e.preventDefault();
  const q = $("place").value.trim();
  if (!q) return setStatus("Type a city or address first.");
  setStatus("Looking up that location…");
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(q)}`);
    const data = await res.json();
    if (!data.length) return setStatus(`Couldn't find "${q}". Try a different place name.`);
    const label = data[0].display_name.split(",").slice(0, 2).join(",");
    setOrigin(Number(data[0].lat), Number(data[0].lon), label);
  } catch {
    setStatus("Location lookup failed. Check your connection and try again.");
  }
});

$("geo").addEventListener("click", () => {
  if (!navigator.geolocation) return setStatus("Your browser doesn't support location.");
  setStatus("Getting your location…");
  navigator.geolocation.getCurrentPosition(
    (pos) => setOrigin(pos.coords.latitude, pos.coords.longitude, "your location"),
    () => setStatus("Couldn't get your location. Type a city instead."),
  );
});

["radius", "vibe", "sort"].forEach((id) => $(id).addEventListener("change", render));
