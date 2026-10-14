import { Hero, TextInput, Button, SelectField } from "@beach-finder/ui";

const nav = <><a href="#">Beaches</a><a href="#">Map</a></>;

export const TitleOnly = () => (
  <Hero eyebrow="Tuesday, 14 October · 17°C · Light westerly" title="Find the beach that suits the day." nav={nav} />
);

export const WithSearch = () => (
  <div style={{ paddingBottom: 60 }}>
    <Hero eyebrow="Tuesday, 14 October" title="Find the beach that suits the day." nav={nav}>
      <form
        style={{ display: "grid", gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr) minmax(0, 1fr) auto", gap: 28, alignItems: "end", padding: "20px 0 20px 28px", background: "var(--bf-paper)", borderRadius: 2, boxShadow: "var(--bf-shadow)" }}
        onSubmit={(e) => e.preventDefault()}
      >
        <TextInput label="Starting from" defaultValue="Truro, Cornwall" />
        <SelectField label="Within" defaultValue="150" options={[{ value: "50", label: "50 km" }, { value: "150", label: "150 km" }, { value: "500", label: "500 km" }]} />
        <SelectField label="Vibe" options={[{ value: "", label: "Any" }, { value: "surf", label: "Surf" }]} />
        <Button type="submit" style={{ alignSelf: "stretch", margin: "-20px 0" }}>Search</Button>
      </form>
    </Hero>
  </div>
);
