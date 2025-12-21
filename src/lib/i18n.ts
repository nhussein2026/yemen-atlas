export const languages = ["en", "ar"] as const;
export type Lang = (typeof languages)[number];

export const DEFAULT_LANG: Lang = "ar";

export function isValidLang(lang: unknown): lang is Lang {
  return typeof lang === "string" && (lang === "en" || lang === "ar");
}

export function dir(lang: Lang) {
  return lang === "ar" ? "rtl" : "ltr";
}

export function t(lang: Lang, translations: Record<Lang, string>): string {
  return translations[lang];
}

export const LANGS: readonly Lang[] = languages;
