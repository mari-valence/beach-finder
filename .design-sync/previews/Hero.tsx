import { Hero, TextInput, Button, SelectField } from "@beach-finder/ui";

export const TitleOnly = () => (
  <Hero title="🏖️ Beach Finder" tagline="Tell us where you are. We'll find the best, most popular, coolest beach for a day out." />
);

export const WithSearch = () => (
  <Hero title="🏖️ Beach Finder" tagline="Tell us where you are. We'll find the best, most popular, coolest beach for a day out.">
    <form style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", maxWidth: 720, margin: "0 auto" }} onSubmit={(e) => e.preventDefault()}>
      <TextInput style={{ flex: "1 1 260px" }} placeholder="City or address, e.g. Los Angeles" aria-label="City or address" />
      <Button type="submit">Find beaches</Button>
      <Button variant="secondary">📍 Use my location</Button>
    </form>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center", marginTop: 16 }}>
      <SelectField label="Within" defaultValue="150" options={[{ value: "50", label: "50 km" }, { value: "150", label: "150 km" }, { value: "500", label: "500 km" }]} />
      <SelectField label="Sort by" options={[{ value: "best", label: "Best match" }, { value: "distance", label: "Closest" }]} />
    </div>
  </Hero>
);
