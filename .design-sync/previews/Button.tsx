import { Button } from "@beach-finder/ui";

export const Primary = () => <Button>Find beaches</Button>;

export const Secondary = () => <Button variant="secondary">📍 Use my location</Button>;

export const SearchActions = () => (
  <div style={{ display: "flex", gap: 8 }}>
    <Button type="submit">Find beaches</Button>
    <Button variant="secondary">📍 Use my location</Button>
  </div>
);

export const Disabled = () => <Button disabled>Find beaches</Button>;
