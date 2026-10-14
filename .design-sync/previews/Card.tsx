import { Card, Pill } from "@beach-finder/ui";

export const Static = () => (
  <Card style={{ maxWidth: 360 }}>
    <h3 style={{ margin: "0 0 4px" }}>Saved search</h3>
    <p style={{ margin: 0, color: "var(--bf-muted)" }}>Surf beaches within 150 km of San Diego</p>
  </Card>
);

export const Interactive = () => (
  <Card interactive style={{ maxWidth: 360 }}>
    <h3 style={{ margin: "0 0 8px" }}>Weekend trip ideas</h3>
    <div style={{ display: "flex", gap: 6 }}>
      <Pill>scenic</Pill>
      <Pill>chill</Pill>
    </div>
  </Card>
);
