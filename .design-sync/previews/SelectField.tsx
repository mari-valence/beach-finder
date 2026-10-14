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

export const Default = () => (
  <div style={{ width: 280 }}>
    <SelectField label="Within" options={radius} defaultValue="150" />
  </div>
);

export const FormRow = () => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 32, maxWidth: 640 }}>
    <SelectField label="Within" options={radius} defaultValue="150" />
    <SelectField label="Vibe" options={vibes} defaultValue="surf" />
  </div>
);

export const InlineFilters = () => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 40 }}>
    <SelectField variant="inline" label="Sort" options={sort} defaultValue="best" />
    <SelectField variant="inline" label="Vibe" options={vibes} defaultValue="" />
    <SelectField variant="inline" label="Within" options={radius} defaultValue="150" />
  </div>
);
