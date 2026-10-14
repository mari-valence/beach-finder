import { SelectField } from "@beach-finder/ui";

const radius = [
  { value: "50", label: "50 km" },
  { value: "150", label: "150 km" },
  { value: "500", label: "500 km" },
  { value: "Infinity", label: "Anywhere" },
];
const vibes = [
  { value: "", label: "Any" },
  { value: "chill", label: "Chill" },
  { value: "surf", label: "Surf" },
  { value: "snorkel", label: "Snorkel" },
];
const sort = [
  { value: "best", label: "Best match" },
  { value: "distance", label: "Closest" },
  { value: "popularity", label: "Most popular" },
];

export const Default = () => <SelectField label="Within" options={radius} defaultValue="150" />;

export const FilterRow = () => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
    <SelectField label="Within" options={radius} defaultValue="150" />
    <SelectField label="Vibe" options={vibes} defaultValue="surf" />
    <SelectField label="Sort by" options={sort} defaultValue="best" />
  </div>
);
