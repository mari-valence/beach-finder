import { BeachCard } from "@beach-finder/ui";

const malibu = {
  name: "Malibu Surfrider Beach", region: "Malibu, CA, USA", distance: 41, score: 84,
  popularity: 80, cool: 9, vibes: ["surf", "chill"], blurb: "Legendary point break with mellow, long rides.",
};
const laJolla = {
  name: "La Jolla Cove", region: "San Diego, CA, USA", distance: 6.4, score: 91,
  popularity: 85, cool: 9, vibes: ["snorkel", "scenic", "wildlife"], blurb: "Sea lions, kayaking and crystal-clear snorkeling.",
};

export const Default = () => (
  <div style={{ maxWidth: 480 }}>
    <BeachCard beach={malibu} directionsHref="https://www.google.com/maps/dir/?api=1&destination=34.0353,-118.6776" />
  </div>
);

export const WithoutDirections = () => (
  <div style={{ maxWidth: 480 }}>
    <BeachCard beach={laJolla} />
  </div>
);

export const ResultsList = () => (
  <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12, maxWidth: 480 }}>
    <BeachCard as="li" beach={laJolla} directionsHref="#" onClick={() => {}} />
    <BeachCard as="li" beach={malibu} directionsHref="#" onClick={() => {}} />
  </ol>
);
