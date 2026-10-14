import { Pill } from "@beach-finder/ui";

export const Single = () => <Pill>Surf</Pill>;

export const Selected = () => <Pill selected>Swimming</Pill>;

export const VibeRow = () => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
    {["Chill", "Surf", "Snorkel", "Scenic", "Family"].map((v) => <Pill key={v}>{v}</Pill>)}
    <Pill selected>Swimming</Pill>
  </div>
);
