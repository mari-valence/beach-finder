import { BeachCard } from "@beach-finder/ui";

const porthcurno = {
  name: "Porthcurno", region: "West Penwith", distance: 58, score: 88, popularity: 76, cool: 6, chairRental: true,
  vibes: ["swimming", "chill"], blurb: "Fine shell sand below the cliffs, sheltered from the westerly wind.",
};
const fistral = {
  name: "Fistral", region: "Newquay", distance: 31, score: 84, popularity: 90, cool: 5, chairRental: true,
  vibes: ["surf", "lively"], blurb: "Consistent Atlantic swell along a long, open shore.",
};
const gwithian = {
  name: "Gwithian Towans", region: "St Ives Bay", distance: 37, score: 81, popularity: 60, cool: 8, chairRental: false,
  vibes: ["surf", "walks"], blurb: "Three miles of dunes with views across to the lighthouse.",
};

export const Default = () => (
  <div style={{ maxWidth: 380 }}>
    <BeachCard beach={porthcurno} rank={2} />
  </div>
);

export const WithDirections = () => (
  <div style={{ maxWidth: 380 }}>
    <BeachCard beach={fistral} rank={3} directionsHref="https://www.google.com/maps/dir/?api=1&destination=50.4153,-5.1003" />
  </div>
);

export const ResultsGrid = () => (
  <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "72px 40px", maxWidth: 1100 }}>
    <BeachCard as="li" rank={2} beach={porthcurno} onClick={() => {}} />
    <BeachCard as="li" rank={3} beach={fistral} onClick={() => {}} />
    <BeachCard as="li" rank={4} beach={gwithian} onClick={() => {}} />
  </ol>
);
