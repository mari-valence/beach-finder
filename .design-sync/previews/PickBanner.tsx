import { PickBanner } from "@beach-finder/ui";

const kynance = {
  name: "Kynance Cove", region: "Lizard Peninsula", distance: 42, score: 92, popularity: 64, cool: 7, chairRental: true,
  vibes: ["swimming", "scenic"],
  blurb: "Turquoise water between serpentine stacks. Best at low tide, when the sand bars join the islands.",
};
const pedn = {
  name: "Pedn Vounder", region: "Treen", distance: 61, score: 79, popularity: 40, cool: 9, chairRental: false,
  vibes: ["scenic", "remote"], blurb: "A tidal sandbar reached by a steep cliff path.",
};

export const TodaysPick = () => <PickBanner beach={kynance} directionsHref="#" onViewMap={() => {}} />;

export const Feature = () => (
  <PickBanner layout="feature" beach={kynance} directionsHref="#" onViewMap={() => {}} style={{ maxWidth: 1312 }} />
);

export const ClosestFallback = () => <PickBanner beach={pedn} label="Closest great beach" directionsHref="#" />;
