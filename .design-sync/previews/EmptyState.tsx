import { EmptyState, Button } from "@beach-finder/ui";

export const NoMatches = () => (
  <EmptyState title="No beaches match." action={<Button variant="text">Reset filters</Button>}>
    Try widening the distance or choosing a different vibe.
  </EmptyState>
);

export const NoSearchYet = () => (
  <EmptyState title="Start with a place." action={<Button variant="text">Use my location</Button>}>
    Type a town or address above and we'll rank the beaches within reach.
  </EmptyState>
);
