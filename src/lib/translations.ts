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

// Category Translations
export const categoryTranslations: Record<string, { en: string; ar: string }> =
  {
    culture: { en: "Culture", ar: "ثقافة" },
    history: { en: "History", ar: "تاريخ" },
    geography: { en: "Geography", ar: "جغرافيا" },
    architecture: { en: "Architecture", ar: "عمارة" },
    society: { en: "Society", ar: "مجتمع" },
    economy: { en: "Economy", ar: "اقتصاد" },
    analysis: { en: "Analysis", ar: "تحليل" },
  };

export function translateCategory(
  category: string | undefined,
  lang: "en" | "ar"
): string {
  if (!category) return lang === "en" ? "Uncategorized" : "غير مصنف";
  return categoryTranslations[category]?.[lang] || category;
}
