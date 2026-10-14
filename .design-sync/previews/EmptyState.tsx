import { EmptyState } from "@beach-finder/ui";

export const NoNearbyBeaches = () => (
  <EmptyState>No beaches in our list within that distance. Here are the closest ones instead.</EmptyState>
);

export const NoSearchYet = () => <EmptyState>Search for a city to see beaches near you.</EmptyState>;
