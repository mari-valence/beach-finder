import { PickBanner } from "@beach-finder/ui";

const venice = {
  name: "Venice Beach", region: "Los Angeles, CA, USA", distance: 22, score: 89,
  popularity: 92, cool: 9, vibes: ["party", "people-watching", "skate"],
  blurb: "Boardwalk chaos, Muscle Beach, street performers and a skate park.",
};
const cannon = {
  name: "Cannon Beach", region: "Oregon, USA", distance: 1240, score: 71,
  popularity: 75, cool: 9, vibes: ["scenic", "family"], blurb: "Haystack Rock and moody Pacific Northwest vibes.",
};

export const TodaysPick = () => <PickBanner beach={venice} directionsHref="#" />;

export const ClosestFallback = () => <PickBanner beach={cannon} label="Closest great beach" directionsHref="#" />;
