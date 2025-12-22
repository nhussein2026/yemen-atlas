import { defineCollection, z } from "astro:content";

const i18nString = z.object({
  en: z.string(),
  ar: z.string(),
});

export const collections = {
  cities: defineCollection({
    type: "content",
    schema: z.object({
      name: i18nString,
      description: i18nString,
      governorate: i18nString,
      summary: i18nString.optional(),
      population: z.number().optional(),
      coordinates: z.object({
        lat: z.number(),
        lng: z.number(),
      }),
      sources: z.array(z.string()).optional(),
    }),
  }),

  governorates: defineCollection({
    type: "content",
    schema: z.object({
      name: z.string(),
      description: z.string(),
    }),
  }),

  history: defineCollection({
    type: "content",
    schema: z.object({
      title: i18nString,
      period: i18nString,
      summary: i18nString,
      sources: z.array(z.string()).optional(),
    }),
  }),

  blog: defineCollection({
    type: "content",
    schema: z.object({
      title: i18nString,
      excerpt: i18nString,
      publishedAt: z.date(),
      tags: z.array(z.string()).optional(),
    }),
  }),
};
