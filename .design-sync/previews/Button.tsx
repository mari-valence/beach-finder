import { Button } from "@beach-finder/ui";

export const Primary = () => <Button>Get directions</Button>;

export const Secondary = () => <Button variant="secondary">Save beach</Button>;

export const Text = () => <Button variant="text">View on map</Button>;

export const ActionGroup = () => (
  <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
    <Button href="#">Get directions</Button>
    <Button variant="text">View on map</Button>
  </div>
);

export const Disabled = () => <Button disabled>Disabled</Button>;
