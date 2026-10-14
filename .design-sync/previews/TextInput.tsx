import { TextInput, Button } from "@beach-finder/ui";

export const Empty = () => <TextInput style={{ width: 340 }} placeholder="City or address, e.g. Los Angeles" aria-label="City or address" />;

export const Filled = () => <TextInput style={{ width: 340 }} defaultValue="San Diego, CA" aria-label="City or address" />;

export const SearchRow = () => (
  <form style={{ display: "flex", flexWrap: "wrap", gap: 8, maxWidth: 560 }} onSubmit={(e) => e.preventDefault()}>
    <TextInput style={{ flex: "1 1 220px" }} placeholder="City or address, e.g. Los Angeles" aria-label="City or address" />
    <Button type="submit">Find beaches</Button>
  </form>
);
