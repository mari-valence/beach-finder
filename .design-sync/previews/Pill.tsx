import { Pill } from "@beach-finder/ui";

export const Single = () => <Pill>surf</Pill>;

export const VibeRow = () => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
    {["chill", "surf", "snorkel", "scenic", "family", "people-watching"].map((v) => <Pill key={v}>{v}</Pill>)}
  </div>
);
