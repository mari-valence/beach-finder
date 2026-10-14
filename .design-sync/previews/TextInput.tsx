import { TextInput } from "@beach-finder/ui";

export const Empty = () => <TextInput style={{ width: 340 }} label="Starting from" placeholder="City or address" />;

export const Filled = () => <TextInput style={{ width: 340 }} label="Starting from" defaultValue="Truro, Cornwall" />;

export const NoLabel = () => <TextInput style={{ width: 340 }} placeholder="City or address" aria-label="City or address" />;
