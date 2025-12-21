export { isValidLang, type Lang, languages, LANGS, dir, t } from "./i18n";

const isValidLang = (lang: unknown): lang is import("./i18n").Lang => {
  return typeof lang === "string" && (lang === "en" || lang === "ar");
};

export function assertLang(
  lang: string
): asserts lang is import("./i18n").Lang {
  if (!isValidLang(lang)) {
    throw new Error(`Invalid language: ${lang}`);
  }
}
