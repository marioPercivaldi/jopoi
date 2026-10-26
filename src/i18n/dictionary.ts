import "server-only";

import es from "@/i18n/es.json";

// The UI starts in Spanish only. New locales are added here as `<locale>.json` with the same keys.
const dictionaries = { es } as const;

export type Locale = keyof typeof dictionaries;
export type Dictionary = (typeof dictionaries)["es"];

export const DEFAULT_LOCALE: Locale = "es";

export function getDictionary(locale: Locale = DEFAULT_LOCALE): Dictionary {
  return dictionaries[locale];
}
