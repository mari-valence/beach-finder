import { Card, Pill } from "@beach-finder/ui";

export const Static = () => (
  <Card style={{ maxWidth: 420 }}>
    <div className="bf-label" style={{ marginBottom: 12 }}>Card</div>
    <p style={{ margin: 0 }}>A paper surface with a hairline border, for panels and grouped content. No shadow.</p>
  </Card>
);

export const Interactive = () => (
  <Card interactive style={{ maxWidth: 420 }}>
    <div className="bf-label" style={{ marginBottom: 12 }}>Saved search</div>
    <p style={{ margin: "0 0 16px" }}>Surf beaches within 150 km of Truro</p>
    <div style={{ display: "flex", gap: 8 }}>
      <Pill>Surf</Pill>
      <Pill>Walks</Pill>
    </div>
  </Card>
);
