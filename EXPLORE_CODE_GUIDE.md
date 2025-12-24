# Yemen Atlas - Explore Section Code Implementation Guide

## 📋 Overview

This guide explains the code structure and implementation details of the revamped Explore section with bilingual support and Tailwind CSS styling.

---

## 🔧 Data Functions (`src/lib/data.ts`)

### New Functions Added

#### 1. `getYemenInfo()`
Extracts key Yemen information from the main data file.

```typescript
export function getYemenInfo() {
    return {
        english_name: yemenData.english_name,
        arabic_name: yemenData.arabic_name,
        emoji: yemenData.emoji,
        capital_english: yemenData.capital_english,
        capital_arabic: yemenData.capital_arabic,
        area_in_kilometer_square: yemenData.area_in_kilometer_square,
        currency: yemenData.currency,
        currency_name_en: yemenData.currency_name_en,
        currency_name_ar: yemenData.currency_name_ar,
        currency_symbol: yemenData.currency_symbol,
        region: yemenData.region,
        subregion: yemenData.subregion,
        phone_code: yemenData.phone_code,
        tld: yemenData.tld,
        latitude: yemenData.latitude,
        longitude: yemenData.longitude,
        timezones: yemenData.timezones,
    };
}
```

#### 2. `getGovernorateById(id: number)`
Retrieves a specific governorate by ID.

```typescript
export function getGovernorateById(id: number) {
    return yemenData.governorates.find(gov => gov.id === id);
}
```

#### 3. `getDistrictById(id: number)`
Retrieves a specific district by ID across all governorates.

```typescript
export function getDistrictById(id: number) {
    const allDistricts = getDistricts();
    return allDistricts.find(dist => dist.id === id);
}
```

---

## 🏠 Explore Home Page (`/[lang]/explore/index.astro`)

### Key Components

#### Hero Section
```astro
<div class="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl shadow-xl overflow-hidden">
  <div class="p-8 md:p-12">
    <div class={`flex items-center gap-4 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
      <span class="text-6xl">{yemen.emoji}</span>
      <h1 class="text-4xl md:text-5xl font-bold">
        {lang === "en" ? yemen.english_name : yemen.arabic_name}
      </h1>
    </div>
```

**Tailwind Classes Breakdown:**
- `bg-gradient-to-br` - Gradient background (bottom-right)
- `from-blue-600 to-indigo-700` - Color gradient
- `text-white` - White text
- `rounded-2xl` - Rounded corners
- `shadow-xl` - Large shadow effect
- `p-8 md:p-12` - Responsive padding
- `flex-row-reverse` - Conditional RTL support

#### Yemen Info Grid
```astro
<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-blue-400">
  <div class="text-center">
    <p class="text-blue-200 text-sm uppercase tracking-wide">Capital</p>
    <p class="text-2xl font-bold mt-2">{yemen.capital_english}</p>
  </div>
  <!-- More info cards... -->
</div>
```

**Grid System:**
- `grid-cols-2` - 2 columns on mobile
- `md:grid-cols-4` - 4 columns on medium+ screens
- `gap-4` - Spacing between items
- `text-center` - Centered text alignment

#### Governorates Card Grid
```astro
{
  governorates.map((governorate) => (
    <a
      href={`/${lang}/explore/${governorate.id}`}
      class="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white hover:scale-105"
    >
      <div class="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 group-hover:from-blue-100 group-hover:to-indigo-200 transition-colors"></div>
      <!-- Card content... -->
    </a>
  ))
}
```

**Hover Effects:**
- `hover:shadow-2xl` - Enhanced shadow on hover
- `hover:scale-105` - 105% zoom on hover
- `transition-all duration-300` - Smooth animation (300ms)
- `group-hover:*` - Group hover states

#### Statistics Cards
```astro
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
  <div class="bg-white p-6 rounded-lg shadow">
    <p class="text-gray-600 text-sm uppercase tracking-wide mb-2">
      Total Governorates
    </p>
    <p class="text-4xl font-bold text-blue-600">{governorates.length}</p>
  </div>
  <!-- More stat cards... -->
</div>
```

---

## 🏛️ Governorate Detail Page (`/[lang]/explore/[slug].astro`)

### Key Sections

#### Statistics Calculation
```astro
---
const districtCount = governorate.districts.length;
const subDistrictCount = governorate.districts.reduce(
  (sum, d) => sum + d.uzaal.length, 
  0
);
const villageCount = governorate.districts.reduce(
  (sum, d) => sum + d.uzaal.reduce((s, u) => s + u.villages.length, 0), 
  0
);
---
```

#### Districts Card Grid with Dynamic Content
```astro
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {
    governorate.districts.map((district, index) => (
      <a
        href={`/${lang}/explore/districts/${district.id}`}
        class="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white hover:scale-105"
      >
        <!-- District Badge -->
        <div class="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {district.districts.length} Districts
        </div>

        <!-- Districts Preview Tags -->
        <div class="flex flex-wrap gap-2">
          {district.uzaal.slice(0, 3).map((uzlah) => (
            <span class="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
              {lang === 'en' ? uzlah.name_en : uzlah.name_ar}
            </span>
          ))}
          {district.uzaal.length > 3 && (
            <span class="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
              +{district.uzaal.length - 3}
            </span>
          )}
        </div>
      </a>
    ))
  }
</div>
```

**Dynamic Rendering:**
- `.map()` - Loop through districts
- `.slice(0, 3)` - Show first 3, then "+more" badge
- Conditional rendering with `&&`
- Dynamic counting with `.length`

#### Detailed Accordion with Gradient Headers
```astro
<div class="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-6">
  <div class={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
    <div class="flex-shrink-0">
      <div class="flex items-center justify-center w-12 h-12 rounded-full bg-white/20">
        <span class="text-xl font-bold">{index + 1}</span>
      </div>
    </div>
    <div>
      <h3 class="text-2xl font-bold">{lang === 'en' ? district.name_en : district.name_ar}</h3>
      <p class="text-blue-100 text-sm mt-1">
        {district.uzaal.length} sub-districts
      </p>
    </div>
  </div>
</div>
```

**Gradient Styling:**
- `bg-gradient-to-r` - Left-to-right gradient
- `from-blue-500 to-indigo-500` - Color range
- `rounded-full` - Circular badge
- `bg-white/20` - Semi-transparent overlay

---

## 🗺️ District Detail Page (`/[lang]/explore/districts/[slug].astro`)

### Key Implementation Features

#### Breadcrumb Navigation
```astro
<nav class="mb-8 flex items-center gap-2 text-sm text-gray-600">
  <a href={`/${lang}/explore`} class="text-blue-600 hover:text-blue-800 hover:underline">
    {lang === "en" ? "Explore" : "استكشف"}
  </a>
  <span>/</span>
  {parentGovernorate && (
    <>
      <a href={`/${lang}/explore/${parentGovernorate.id}`} class="text-blue-600 hover:text-blue-800 hover:underline">
        {governorateName}
      </a>
      <span>/</span>
    </>
  )}
  <span class="text-gray-900 font-semibold">{name}</span>
</nav>
```

#### Safe Data Access with Optional Chaining
```astro
---
// Prevent undefined errors
const subDistrictCount = district?.uzaal?.length || 0;
const villageCount = district?.uzaal?.reduce((sum, u) => sum + (u?.villages?.length || 0), 0) || 0;
---

<!-- In template -->
{district.uzaal?.map((uzlah, index) => (...))}
{uzlah.villages?.map((village) => (...))}
```

#### Villages Grid with Icons
```astro
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {uzlah.villages?.map((village) => (
    <div class="group flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors border border-gray-200 hover:border-blue-300">
      <svg
        class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clip-rule="evenodd"
        />
      </svg>
      <span class="text-gray-800 font-medium group-hover:text-blue-700 transition-colors">
        {lang === "en" ? village.name_en : village.name_ar}
      </span>
    </div>
  ))}
</div>
```

**Interactive Features:**
- `group` + `group-hover:*` - Group-based hover effects
- `transition-transform` - Smooth icon scaling
- `hover:scale-110` - 110% zoom on hover
- `transition-colors` - Smooth color change
- SVG checkmark icon for visual hierarchy

---

## 🌐 Bilingual Pattern (EN/AR)

### Language Detection
```astro
---
import { assertLang } from "../../../lib/lang";

export async function getStaticPaths() {
  return [{ params: { lang: "en" } }, { params: { lang: "ar" } }];
}

const { lang } = Astro.params;
assertLang(lang);  // Validates lang is "en" or "ar"
const isRTL = lang === "ar";
---
```

### Text Switching Pattern
```astro
<h2>
  {lang === "en" ? "Districts" : "المديريات"}
</h2>

<!-- Multilingual field from data -->
<h3>{lang === "en" ? governorate.name_en : governorate.name_ar}</h3>
```

### RTL Layout Pattern
```astro
<!-- Conditional class -->
<div class={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
  <div>Content</div>
  <div>More Content</div>
</div>

<!-- Or with conditional div -->
<div dir={isRTL ? "rtl" : "ltr"}>
  Content automatically positioned
</div>
```

---

## 🎨 Tailwind CSS Utility Classes Used

### Spacing
- `p-4` to `p-12` - Padding
- `m-2` to `m-12` - Margin
- `gap-2` to `gap-6` - Gap between flex items
- `space-y-4` - Vertical spacing between children

### Colors
- `bg-blue-600`, `bg-indigo-700` - Background colors
- `text-white`, `text-gray-900` - Text colors
- `text-blue-600`, `text-indigo-700` - Accent colors
- `bg-white/20` - Semi-transparent overlay (20% opacity)

### Sizing
- `w-5`, `h-5` - Icon sizing
- `w-12`, `h-12` - Badge sizing
- `text-2xl` to `text-6xl` - Text scaling

### Layout
- `grid` - CSS Grid
- `grid-cols-1 md:grid-cols-3` - Responsive columns
- `flex` - Flexbox
- `flex-row-reverse` - RTL reversal
- `flex-shrink-0` - Prevent shrinking

### Effects
- `rounded-xl` - Large border radius
- `rounded-full` - Perfect circle
- `shadow-lg`, `hover:shadow-2xl` - Shadows
- `hover:scale-105` - Zoom effect
- `transition-all duration-300` - Smooth animation
- `group-hover:*` - Group hover states

### Responsive
- `md:` - Medium screen (768px+)
- `lg:` - Large screen (1024px+)
- `sm:grid-cols-2` - 2 columns on small+

---

## 📊 Data Structure Used

### Yemen Object
```typescript
interface Yemen {
  english_name: string;
  arabic_name: string;
  emoji: string;
  capital_english: string;
  capital_arabic: string;
  area_in_kilometer_square: string;
  currency_symbol: string;
  phone_code: string;
  tld: string;
  region: string;
  timezone: Array<{
    abbreviation: string;
    gmtOffsetName: string;
  }>;
}
```

### Governorate Object
```typescript
interface Governorate {
  id: number;
  name_en: string;
  name_ar: string;
  districts: Array<{
    id: number;
    name_en: string;
    name_ar: string;
    uzaal: Array<Uzlah>;
  }>;
}
```

### District → Uzlah → Village Hierarchy
```typescript
interface Uzlah {
  id: number;
  name_en: string;
  name_ar: string;
  villages: Array<{
    id: number;
    name_en: string;
    name_ar: string;
  }>;
}
```

---

## 🔍 Advanced Patterns

### Optional Chaining for Safety
```typescript
// Prevents "Cannot read property of undefined"
const count = district?.uzaal?.length || 0;
const villages = uzlah?.villages?.map(...) || [];
```

### Ternary for Bilingual Content
```astro
{
  lang === "en" 
    ? "English text" 
    : "النص العربي"
}
```

### Conditional CSS Classes
```astro
class={`flex ${isRTL ? 'flex-row-reverse' : ''} gap-4`}
```

### Dynamic Counting with Reduce
```typescript
const total = governorates.reduce(
  (sum, gov) => sum + gov.districts.length,
  0
);
```

### Slice + Badge Pattern
```astro
{items.slice(0, 3).map(item => (...))}
{items.length > 3 && (
  <span>+{items.length - 3} more</span>
)}
```

---

## 🚀 Performance Tips

1. **Static Generation**: All pages generated at build time
2. **No JavaScript**: Pure HTML/CSS output
3. **CSS-in-JS**: Tailwind provides optimized CSS
4. **Icon SVG**: Inline SVG (no HTTP requests)
5. **Responsive Images**: CSS media queries
6. **No External Dependencies**: Tailwind utility-first

---

## 🔗 File Dependencies

```
data/yemen-info.json
  ↓
src/lib/data.ts (export functions)
  ↓
src/pages/[lang]/explore/
  ├── index.astro (home, uses getYemenInfo(), getGovernorates())
  ├── [slug].astro (governorate detail)
  └── districts/[slug].astro (district detail, uses getGovernorates())
```

---

**This implementation demonstrates modern Astro + Tailwind practices with bilingual support! 🚀**
