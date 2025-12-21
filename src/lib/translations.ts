import type { Lang } from "./i18n";
import ar from "../i18n/ar.json";
import en from "../i18n/en.json";
const dictionaries: Record<Lang, any> = {
  ar,
  en,
};

export function t(lang: Lang, key: string): string {
  const keys = key.split(".");
  let value = dictionaries[lang];

  for (const k of keys) {
    value = value?.[k];
  }

  if (!value) {
    console.warn(`Missing translation: ${lang}.${key}`);
    return key;
  }

  return value;
}
