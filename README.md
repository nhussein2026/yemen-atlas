# Yemen Atlas

An evidence-based documentation platform on Yemen with comprehensive information about governorates, districts, history, and cultural content. Built with Astro, Tailwind CSS, and bilingual support (English & Arabic).

🌍 **Website**: https://yemenatlas.org

---

## 📋 Project Overview

Yemen Atlas is a static site generator project designed to showcase:
- **Governorates & Districts**: Complete geographical hierarchical structure
- **Historical Content**: Heritage and historical information
- **Blog Posts**: Educational articles and stories
- **Bilingual Support**: Full English & Arabic (RTL) support
- **Responsive Design**: Mobile-first Tailwind CSS styling

---

## 🏗️ Project Structure

```text
yemen-atlas/
├── public/                          # Static assets (images, icons, etc.)
├── src/
│   ├── components/                  # Reusable Astro components (currently empty)
│   ├── content/                     # Content collections (Astro Content Layer)
│   │   ├── config.ts               # Content schema definitions
│   │   ├── blog/                   # Blog post markdown files
│   │   │   └── yemen-introduction.md
│   │   ├── history/                # Historical content
│   │   │   └── saba-kingdom.md
│   │   └── [other collections]     # Future collections
│   ├── i18n/                       # Translation files
│   │   ├── ar.json                # Arabic translations
│   │   └── en.json                # English translations
│   ├── layouts/                    # Layout components
│   │   ├── BaseLayout.astro       # Main layout with navbar/footer
│   │   ├── Navbar.astro           # Navigation component
│   │   └── Footer.astro           # Footer component
│   ├── lib/                        # Utility functions
│   │   ├── data.ts                # Data fetching functions
│   │   ├── i18n.ts                # i18n helpers
│   │   ├── lang.ts                # Language validation
│   │   ├── seo.ts                 # SEO utilities
│   │   ├── schema.ts              # Type schemas
│   │   └── translations.ts        # Translation utilities
│   ├── middleware.ts              # Route middleware for i18n
│   ├── pages/                     # Page components (routes)
│   │   └── [lang]/                # Language-parameterized routes
│   │       ├── index.astro        # Homepage
│   │       ├── about.astro        # About page
│   │       ├── blog/              # Blog section
│   │       │   ├── index.astro   # Blog list
│   │       │   └── [slug].astro  # Individual blog post
│   │       ├── history/           # History section
│   │       │   ├── index.astro   # History list
│   │       │   └── [slug].astro  # Individual history item
│   │       ├── explore/           # **Explore section** (Main feature)
│   │       │   ├── index.astro               # Explore homepage
│   │       │   ├── governorates.astro       # Governorates list
│   │       │   ├── [slug].astro             # Individual governorate (OLD)
│   │       │   ├── governorates/
│   │       │   │   └── [slug].astro         # Individual governorate
│   │       │   └── districts/
│   │       │       └── [slug].astro         # Individual district with sub-districts
│   │       └── atlas-observatory/          # Observatory section
│   │           ├── index.astro
│   │           └── [slug].astro
│   ├── styles/
│   │   └── global.css             # Global CSS styles
│   └── types/                     # TypeScript type definitions
│       └── history.ts             # History-related types
├── data/
│   └── yemen-info.json            # Master data file with governorates/districts
├── astro.config.mjs               # Astro configuration
├── tsconfig.json                  # TypeScript configuration
├── package.json                   # Project dependencies
└── README.md                      # This file
```

---

## 📊 Data Structure: yemen-info.json

The main data source is `data/yemen-info.json`, which follows this structure:

```json
{
  "english_name": "Yemen",
  "arabic_name": "اليَمَن",
  "governorates": [
    {
      "id": 1,
      "name_en": "Amant Al-Asmah",
      "name_ar": "أمانة العاصمة",
      "name_ar_tashkeel": "أَمانَة العاصِمَةِ",
      "districts": [
        {
          "id": 101,
          "name_en": "Sana'a",
          "name_ar": "صنعاء",
          "uzaal": [
            {
              "name_en": "Sub-district name",
              "name_ar": "اسم العزلة",
              "villages": [
                {
                  "name_en": "Village name",
                  "name_ar": "اسم القرية"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

**Key Structure Levels:**
1. **Governorate** (محافظة) - Largest administrative division
2. **District** (مديرية) - Subdivision of governorate
3. **Sub-district/Uzlah** (عزلة) - Subdivision of district
4. **Village** (قرية) - Smallest subdivision

---

## 🎨 Content Collections Schema

### Blog Collection
```typescript
{
  title: { en: string, ar: string }
  excerpt: { en: string, ar: string }
  publishedAt: Date
  tags?: string[]
  relatedGovernorate?: number      // Governorate ID
  relatedDistrict?: number         // District ID
}
```

### History Collection
```typescript
{
  title: { en: string, ar: string }
  period: { en: string, ar: string }
  summary: { en: string, ar: string }
  sources?: string[]
  relatedGovernorate?: number      // Governorate ID
  relatedDistrict?: number         // District ID
}
```

---

## 🌐 Routing Architecture

### Language-First Routing
All routes are language-parameterized using `[lang]` parameter:

```
/en/                          # English home
/ar/                          # Arabic home

/en/explore/                  # Explore page (English)
/ar/explore/                  # Explore page (Arabic)

/en/explore/1                 # Governorate (ID: 1) in English
/ar/explore/1                 # Governorate (ID: 1) in Arabic

/en/explore/districts/101     # District (ID: 101) in English
/ar/explore/districts/101     # District (ID: 101) in Arabic

/en/blog/my-article           # Blog post slug (English)
/ar/blog/my-article           # Blog post slug (Arabic)
```

### Static Path Generation
Routes use `getStaticPaths()` for static generation:
```astro
export async function getStaticPaths() {
  const governorates = getGovernorates();
  
  return governorates.flatMap((gov) => [
    { params: { lang: "en", slug: gov.id.toString() } },
    { params: { lang: "ar", slug: gov.id.toString() } },
  ]);
}
```

---

## 📚 How to Organize the Explore Section

### Current Structure
- **Governorates**: List of all governorates with hierarchical data
- **Districts**: Individual pages showing sub-districts and villages
- **Related Content**: Blog posts and history linked to locations

### Adding Related Content

#### Step 1: Update Content Schema
Update `src/content/config.ts` to add location relationships:

```typescript
blog: defineCollection({
  type: "content",
  schema: z.object({
    title: i18nString,
    excerpt: i18nString,
    publishedAt: z.date(),
    tags: z.array(z.string()).optional(),
    relatedGovernorate: z.number().optional(),  // NEW
    relatedDistrict: z.number().optional(),     // NEW
  }),
}),
```

#### Step 2: Create Helper Functions
Add to `src/lib/data.ts`:

```typescript
import { getCollection } from "astro:content";

export async function getGovernorateContent(governorateId: number) {
  const blogs = await getCollection("blog");
  const history = await getCollection("history");
  
  return {
    blogs: blogs.filter(post => post.data.relatedGovernorate === governorateId),
    history: history.filter(item => item.data.relatedGovernorate === governorateId),
  };
}

export async function getDistrictContent(districtId: number) {
  const blogs = await getCollection("blog");
  const history = await getCollection("history");
  
  return {
    blogs: blogs.filter(post => post.data.relatedDistrict === districtId),
    history: history.filter(item => item.data.relatedDistrict === districtId),
  };
}
```

#### Step 3: Display Related Content
Update `src/pages/[lang]/explore/governorates/[slug].astro`:

```astro
---
import { getGovernorateContent } from "../../../../lib/data";
import { getCollection } from "astro:content";

// ... existing code ...

const { relatedBlogs, relatedHistory } = await getGovernorateContent(
  parseInt(slug)
);
---

<!-- In template: -->
{relatedBlogs.length > 0 && (
  <section class="mt-12 pt-8 border-t">
    <h2 class="text-2xl font-bold mb-6">
      {lang === "en" ? "Related Blog Posts" : "منشورات مرتبطة"}
    </h2>
    <ul class="space-y-4">
      {relatedBlogs.map(post => (
        <li>
          <a href={`/${lang}/blog/${post.slug}`}>
            {post.data.title[lang]}
          </a>
        </li>
      ))}
    </ul>
  </section>
)}
```

#### Step 4: Create Content Files
Create blog posts with location references:

```markdown
---
title:
  en: "Sanaa: The Heart of Yemen"
  ar: "صنعاء: قلب اليمن"
excerpt:
  en: "Exploring the history and culture of Yemen's capital"
  ar: "استكشاف تاريخ وثقافة عاصمة اليمن"
publishedAt: 2024-02-15
relatedGovernorate: 1
tags: ["Sanaa", "Capital", "Culture"]
---

Content here...
```

---

## 🔄 Bilingual Support (i18n)

### Language Utilities
Located in `src/lib/`:

**lang.ts**: Language validation
```typescript
export function assertLang(lang: unknown): asserts lang is Lang {
  if (!isValidLang(lang)) throw new Error("Invalid language");
}
```

**i18n.ts**: Helper functions
```typescript
export function dir(lang: Lang) {
  return lang === "ar" ? "rtl" : "ltr";  // Right-to-left for Arabic
}

export function t(lang: Lang, translations: Record<Lang, string>) {
  return translations[lang];
}
```

### Translation Pattern
All translatable content uses this pattern:

```typescript
// In frontmatter
title:
  en: "English Title"
  ar: "العنوان بالعربية"

// In components
const text = lang === "en" 
  ? "English text" 
  : "نص بالعربية";
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Yarn or npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd yemen-atlas

# Install dependencies
yarn install
# or
npm install
```

### Development

```bash
# Start development server
yarn dev

# Server runs at http://localhost:3000
# Access different languages:
# English: http://localhost:3000/en
# Arabic:  http://localhost:3000/ar
```

### Building

```bash
# Build for production
yarn build

# Preview production build
yarn preview
```

---

## 📝 Creating New Content

### Add a Blog Post

1. Create file: `src/content/blog/your-slug.md`

```markdown
---
title:
  en: "Your Title"
  ar: "عنوانك"
excerpt:
  en: "Brief description"
  ar: "وصف موجز"
publishedAt: 2024-12-23
relatedGovernorate: 1
tags: ["tag1", "tag2"]
---

# Your Content

Write your blog post here in English and Arabic sections.
```

2. Access at: `/en/blog/your-slug` and `/ar/blog/your-slug`

### Add a History Entry

1. Create file: `src/content/history/your-slug.md`

```markdown
---
title:
  en: "Historical Event"
  ar: "حدث تاريخي"
period:
  en: "1000 - 1500 CE"
  ar: "1000 - 1500 م"
summary:
  en: "Summary of the event"
  ar: "ملخص الحدث"
relatedGovernorate: 2
sources:
  - "Source URL"
---

Detailed history here...
```

2. Access at: `/en/history/your-slug` and `/ar/history/your-slug`

---

## 🔗 Linking Strategy

### Internal Links
```astro
<!-- Link to governorate -->
<a href={`/${lang}/explore/${governorateId}`}>
  {governorateName}
</a>

<!-- Link to district -->
<a href={`/${lang}/explore/districts/${districtId}`}>
  {districtName}
</a>

<!-- Link to blog -->
<a href={`/${lang}/blog/${slug}`}>
  {title}
</a>
```

---

## 🎯 Key Features

### ✅ Automatic URL Generation
- All paths are generated statically from data
- No manual route configuration needed
- Language variants created automatically

### ✅ Hierarchical Navigation
- Governorate → District → Sub-district → Village
- Each level has dedicated pages
- Easy navigation between levels

### ✅ Content Relationships
- Blog posts linked to locations
- Historical events tied to governorates
- Cross-referenced content discovery

### ✅ Bilingual First
- All content in English and Arabic
- Automatic RTL/LTR direction
- Language switching built-in

### ✅ SEO Optimized
- Language-specific meta tags
- Semantic HTML structure
- Descriptive URLs

---

## 📦 Dependencies

```json
{
  "astro": "^5.16.6",
  "tailwindcss": "^4.1.18",
  "@tailwindcss/vite": "^4.1.18"
}
```

- **Astro**: Static site generator
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Build tool

---

## 🔧 Configuration Files

### astro.config.mjs
```javascript
export default defineConfig({
  output: "static",                    // Static site generation
  site: "https://yemenatlas.org",     // Site URL
  trailingSlash: "never",             // Clean URLs
  vite: { plugins: [tailwindcss()] }  // Tailwind integration
});
```

### tsconfig.json
TypeScript configuration for type safety and IDE support.

### tailwind.config.js
(If exists) Tailwind configuration for styling customization.

---

## 📂 Content File Organization

### Recommended Structure for Scaling

```
src/content/
├── blog/
│   ├── politics/
│   │   ├── government-changes.md
│   │   └── regional-dynamics.md
│   ├── culture/
│   │   ├── traditional-crafts.md
│   │   └── yemeni-cuisine.md
│   └── featured/
│       └── yemen-introduction.md
│
├── history/
│   ├── kingdoms/
│   │   └── saba-kingdom.md
│   ├── periods/
│   │   └── ottoman-era.md
│   └── featured/
│       └── ancient-yemen.md
│
├── guides/
│   ├── travel/
│   │   └── visiting-sanaa.md
│   └── geography/
│       └── climate-regions.md
│
└── resources/
    ├── maps.md
    └── references.md
```

---

## 🚨 Important Notes

1. **Static Generation**: All pages are pre-generated at build time
2. **Data Source**: Governorates/Districts come from `data/yemen-info.json`
3. **Language Parameter**: Every route must include `[lang]` parameter
4. **Content IDs**: Use numeric IDs from yemen-info.json for relationships
5. **RTL Support**: Arabic pages automatically get `dir="rtl"`

---

## 🎓 Learning Resources

- [Astro Documentation](https://docs.astro.build)
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Tailwind CSS](https://tailwindcss.com)
- [Static Site Generation Best Practices](https://nextjs.org/learn/foundations/how-nextjs-works/rendering)

---

## 👥 Contributing

When adding content:
1. Follow the schema defined in `src/content/config.ts`
2. Include both English and Arabic translations
3. Link related governorates/districts using IDs
4. Test both language variants: `/en/...` and `/ar/...`
5. Ensure RTL layout works correctly in Arabic

---

## 📄 License

[Add your license here]

---

## 🙏 Credits

- **Yemen Atlas Contributors**
- Built with [Astro](https://astro.build)
- Funded by [nhussein.io](https://nhussein.io)
