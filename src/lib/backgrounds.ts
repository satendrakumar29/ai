export const backgrounds = [
  { id: "ink", en: "Ink", hi: "स्याही", swatch: "#0c0e10" },
  { id: "graphite", en: "Graphite", hi: "ग्रेफाइट", swatch: "#141618" },
  { id: "carbon", en: "Carbon", hi: "कार्बन", swatch: "#101010" },
  { id: "midnight", en: "Midnight", hi: "मध्यरात्रि", swatch: "#0d1218" },
  { id: "harbor", en: "Harbor", hi: "बंदरगाह", swatch: "#0c1416" },
  { id: "pine", en: "Pine", hi: "चीड़", swatch: "#0e1410" },
  { id: "cocoa", en: "Cocoa", hi: "कोको", swatch: "#14110e" },
  { id: "dusk", en: "Dusk", hi: "धुंधलका", swatch: "#10131a" },
  { id: "slate", en: "Slate", hi: "स्लेट", swatch: "#1c2128" },
  { id: "wine", en: "Wine", hi: "मदिरा", swatch: "#160f12" },
  { id: "ocean", en: "Ocean", hi: "सागर", swatch: "#0b1520" },
  { id: "paper", en: "Paper", hi: "कागज़", swatch: "#f4f1eb" },
  { id: "fog", en: "Fog", hi: "कोहरा", swatch: "#e7edf1" },
  { id: "sand", en: "Sand", hi: "रेत", swatch: "#f3ecdf" },
  { id: "snow", en: "Snow", hi: "हिम", swatch: "#f6f6f5" },
] as const;

export type BackgroundId = (typeof backgrounds)[number]["id"];

export function findBackground(id: string) {
  return backgrounds.find((item) => item.id === id) ?? backgrounds[0];
}
