// Curated beach list. popularity: 1-100 (how well-known / visited), cool: 1-10 (vibe score).
export const BEACHES = [
  // United States — West Coast
  { name: "Venice Beach", region: "Los Angeles, CA, USA", lat: 33.985, lng: -118.4695, popularity: 92, cool: 9, vibes: ["party", "people-watching", "skate"], blurb: "Boardwalk chaos, Muscle Beach, street performers and a skate park." },
  { name: "Santa Monica Beach", region: "Santa Monica, CA, USA", lat: 34.0094, lng: -118.4973, popularity: 95, cool: 8, vibes: ["family", "people-watching"], blurb: "Iconic pier, Ferris wheel and wide sand for a classic LA day." },
  { name: "Malibu Surfrider Beach", region: "Malibu, CA, USA", lat: 34.0353, lng: -118.6776, popularity: 80, cool: 9, vibes: ["surf", "chill"], blurb: "Legendary point break with mellow, long rides." },
  { name: "El Matador State Beach", region: "Malibu, CA, USA", lat: 34.0383, lng: -118.8746, popularity: 70, cool: 10, vibes: ["scenic", "chill"], blurb: "Sea stacks, caves and golden-hour photos." },
  { name: "La Jolla Cove", region: "San Diego, CA, USA", lat: 32.8504, lng: -117.2713, popularity: 85, cool: 9, vibes: ["snorkel", "scenic", "wildlife"], blurb: "Sea lions, kayaking and crystal-clear snorkeling." },
  { name: "Pacific Beach", region: "San Diego, CA, USA", lat: 32.7959, lng: -117.2556, popularity: 78, cool: 8, vibes: ["party", "surf"], blurb: "Beach bars, boardwalk cruising and a young crowd." },
  { name: "Huntington Beach", region: "Orange County, CA, USA", lat: 33.6553, lng: -117.9995, popularity: 84, cool: 8, vibes: ["surf", "family"], blurb: "Surf City USA — consistent waves and bonfire pits." },
  { name: "Laguna Beach (Main Beach)", region: "Laguna Beach, CA, USA", lat: 33.5422, lng: -117.7854, popularity: 80, cool: 9, vibes: ["scenic", "snorkel", "chill"], blurb: "Tide pools, coves and an artsy little downtown." },
  { name: "Pfeiffer Beach", region: "Big Sur, CA, USA", lat: 36.2381, lng: -121.8163, popularity: 60, cool: 10, vibes: ["scenic", "chill"], blurb: "Purple sand and the Keyhole Arch sunset." },
  { name: "Baker Beach", region: "San Francisco, CA, USA", lat: 37.7936, lng: -122.4837, popularity: 72, cool: 8, vibes: ["scenic", "chill"], blurb: "Golden Gate Bridge views right from the sand." },
  { name: "Cannon Beach", region: "Oregon, USA", lat: 45.8918, lng: -123.9615, popularity: 75, cool: 9, vibes: ["scenic", "family"], blurb: "Haystack Rock and moody Pacific Northwest vibes." },

  // United States — East Coast & Gulf
  { name: "South Beach", region: "Miami Beach, FL, USA", lat: 25.7826, lng: -80.1341, popularity: 98, cool: 9, vibes: ["party", "people-watching"], blurb: "Art Deco, turquoise water and nonstop nightlife." },
  { name: "Siesta Beach", region: "Sarasota, FL, USA", lat: 27.2655, lng: -82.5526, popularity: 82, cool: 8, vibes: ["family", "chill"], blurb: "Powder-soft quartz sand that stays cool underfoot." },
  { name: "Clearwater Beach", region: "Clearwater, FL, USA", lat: 27.9781, lng: -82.8276, popularity: 85, cool: 7, vibes: ["family", "party"], blurb: "Pier 60 sunset festival every night." },
  { name: "Bahia Honda State Park", region: "Florida Keys, USA", lat: 24.6563, lng: -81.2783, popularity: 65, cool: 9, vibes: ["snorkel", "chill"], blurb: "Calm, clear water in the middle of the Keys." },
  { name: "Myrtle Beach", region: "South Carolina, USA", lat: 33.6891, lng: -78.8867, popularity: 88, cool: 6, vibes: ["family", "party"], blurb: "Boardwalk, SkyWheel and 60 miles of coast." },
  { name: "Outer Banks (Nags Head)", region: "North Carolina, USA", lat: 35.9574, lng: -75.6241, popularity: 72, cool: 8, vibes: ["surf", "chill"], blurb: "Dunes, kite flying and uncrowded stretches." },
  { name: "Montauk (Ditch Plains)", region: "New York, USA", lat: 41.0396, lng: -71.9166, popularity: 74, cool: 9, vibes: ["surf", "chill"], blurb: "The End — surf shacks and laid-back cool." },
  { name: "Coney Island Beach", region: "Brooklyn, NY, USA", lat: 40.5724, lng: -73.9787, popularity: 86, cool: 7, vibes: ["people-watching", "family"], blurb: "Boardwalk, Cyclone coaster and Nathan's hot dogs." },
  { name: "Cape Cod (Race Point)", region: "Provincetown, MA, USA", lat: 42.0717, lng: -70.2385, popularity: 66, cool: 8, vibes: ["scenic", "wildlife"], blurb: "Whale and seal sightings off wild dunes." },

  // Hawaii
  { name: "Waikiki Beach", region: "Honolulu, HI, USA", lat: 21.2766, lng: -157.8278, popularity: 97, cool: 8, vibes: ["surf", "people-watching", "family"], blurb: "Beginner surf with Diamond Head in the background." },
  { name: "Lanikai Beach", region: "Oahu, HI, USA", lat: 21.3931, lng: -157.7149, popularity: 76, cool: 10, vibes: ["chill", "scenic"], blurb: "Powdery sand and the Mokulua islands offshore." },
  { name: "Ka'anapali Beach", region: "Maui, HI, USA", lat: 20.9258, lng: -156.6958, popularity: 80, cool: 8, vibes: ["snorkel", "family"], blurb: "Black Rock cliff diving and turtles." },

  // Caribbean & Latin America
  { name: "Grace Bay", region: "Turks and Caicos", lat: 21.7956, lng: -72.1735, popularity: 84, cool: 9, vibes: ["chill", "snorkel"], blurb: "Ridiculously turquoise and calm." },
  { name: "Seven Mile Beach", region: "Negril, Jamaica", lat: 18.2853, lng: -78.3445, popularity: 78, cool: 9, vibes: ["party", "chill"], blurb: "Reggae bars and Rick's Café sunsets nearby." },
  { name: "Playa Norte", region: "Isla Mujeres, Mexico", lat: 21.2617, lng: -86.7517, popularity: 74, cool: 9, vibes: ["chill", "snorkel"], blurb: "Shallow, glassy water with hammocks everywhere." },
  { name: "Tulum Beach", region: "Tulum, Mexico", lat: 20.2108, lng: -87.4646, popularity: 88, cool: 10, vibes: ["chill", "scenic", "party"], blurb: "Mayan ruins on the cliff, beach clubs below." },
  { name: "Copacabana", region: "Rio de Janeiro, Brazil", lat: -22.9711, lng: -43.1822, popularity: 96, cool: 9, vibes: ["party", "people-watching"], blurb: "Caipirinhas, volleyball and that wave-pattern promenade." },
  { name: "Ipanema", region: "Rio de Janeiro, Brazil", lat: -22.9868, lng: -43.2048, popularity: 93, cool: 10, vibes: ["people-watching", "surf"], blurb: "Applause for the sunset at Arpoador rock." },

  // Europe
  { name: "Playa de la Concha", region: "San Sebastián, Spain", lat: 43.3179, lng: -1.9862, popularity: 82, cool: 9, vibes: ["family", "scenic"], blurb: "A perfect shell-shaped bay plus pintxos after." },
  { name: "Barceloneta", region: "Barcelona, Spain", lat: 41.3784, lng: 2.1925, popularity: 90, cool: 8, vibes: ["party", "people-watching"], blurb: "City beach with chiringuitos and paella." },
  { name: "Praia da Marinha", region: "Algarve, Portugal", lat: 37.0898, lng: -8.4122, popularity: 78, cool: 10, vibes: ["scenic", "snorkel"], blurb: "Golden cliffs, arches and sea caves." },
  { name: "Navagio (Shipwreck Beach)", region: "Zakynthos, Greece", lat: 37.8592, lng: 20.6245, popularity: 85, cool: 10, vibes: ["scenic"], blurb: "A rusting shipwreck in a cove of electric blue." },
  { name: "Paradise Beach", region: "Mykonos, Greece", lat: 37.4112, lng: 25.3509, popularity: 80, cool: 9, vibes: ["party"], blurb: "Day-to-night beach parties." },
  { name: "Plage de Pampelonne", region: "Saint-Tropez, France", lat: 43.2306, lng: 6.6646, popularity: 79, cool: 9, vibes: ["party", "people-watching"], blurb: "Glamorous beach clubs and Riviera style." },
  { name: "Spiaggia dei Conigli", region: "Lampedusa, Italy", lat: 35.5133, lng: 12.5653, popularity: 70, cool: 10, vibes: ["snorkel", "wildlife", "chill"], blurb: "Sea turtle nesting site with Caribbean-clear water." },

  // Asia-Pacific & Africa
  { name: "Bondi Beach", region: "Sydney, Australia", lat: -33.8915, lng: 151.2767, popularity: 95, cool: 9, vibes: ["surf", "people-watching"], blurb: "Surf, Icebergs pool and the coastal walk." },
  { name: "Whitehaven Beach", region: "Whitsundays, Australia", lat: -20.2826, lng: 149.0389, popularity: 80, cool: 10, vibes: ["scenic", "chill"], blurb: "98% pure silica sand swirling into the sea." },
  { name: "Maya Bay", region: "Phi Phi Leh, Thailand", lat: 7.6779, lng: 98.7660, popularity: 86, cool: 10, vibes: ["scenic", "snorkel"], blurb: "Limestone cliffs straight out of The Beach." },
  { name: "Seminyak Beach", region: "Bali, Indonesia", lat: -8.6913, lng: 115.1574, popularity: 84, cool: 9, vibes: ["party", "surf"], blurb: "Beanbags, sunset cocktails and DJ sets." },
  { name: "Anse Source d'Argent", region: "La Digue, Seychelles", lat: -4.3709, lng: 55.8274, popularity: 72, cool: 10, vibes: ["scenic", "chill"], blurb: "Sculpted granite boulders and shallow lagoons." },
  { name: "Camps Bay", region: "Cape Town, South Africa", lat: -33.9510, lng: 18.3776, popularity: 80, cool: 9, vibes: ["people-watching", "scenic"], blurb: "Twelve Apostles backdrop and sundowners." },
  { name: "Ngapali Beach", region: "Myanmar", lat: 18.4053, lng: 94.3110, popularity: 50, cool: 8, vibes: ["chill"], blurb: "Quiet, palm-lined and wonderfully uncrowded." },
  { name: "Baía do Sancho", region: "Fernando de Noronha, Brazil", lat: -3.8545, lng: -32.4430, popularity: 68, cool: 10, vibes: ["snorkel", "wildlife", "scenic"], blurb: "Reached by a ladder through the cliffs." },
];
