# Content Display Standards Guide

This guide establishes a consistent design and code standard for displaying content across Yemen Atlas. All future content pages must follow these patterns to maintain visual consistency, accessibility, and user experience.

## Table of Contents
1. [Standard Components](#standard-components)
2. [Page Structure](#page-structure)
3. [Color Palette](#color-palette)
4. [Typography](#typography)
5. [Responsive Design](#responsive-design)
6. [Bilingual/RTL Support](#bilingual-rtl-support)
7. [Component Implementation](#component-implementation)

---

## Standard Components

### 1. ContentPageHeader Component

Used as the header for all main content pages (About, Blog, History, Observatory, etc.).

**File:** `src/components/ContentPageHeader.astro`

**Props:**
- `title` (string, required): Page title
- `description` (string, optional): Introductory description
- `lang` ("en" | "ar", required): Current language

**Usage:**
```astro
<ContentPageHeader 
  title="Blog"
  description="Insights and analysis on Yemen..."
  lang={lang}
/>
```

**Features:**
- Large, bold title (4xl on mobile, 5xl on desktop)
- Optional description paragraph
- Bottom border separator
- RTL/LTR support
- Uses Archive Ink for title color

---

### 2. ContentCard Component

Used to display individual content items (blog posts, history entries, observatory items).

**File:** `src/components/ContentCard.astro`

**Props:**
- `title` (string, required): Content item title
- `excerpt` (string, required): Content summary/preview
- `href` (string, required): Link to full content
- `date` (string, optional): Publication date or period
- `tags` (string[], optional): Array of tag labels
- `category` (string, optional): Content category label
- `lang` ("en" | "ar", required): Current language

**Usage:**
```astro
<ContentCard
  title="Yemen Overview"
  excerpt="An introduction to Yemen..."
  href="/en/blog/yemen-overview"
  date="January 15, 2024"
  tags={["Yemen", "History"]}
  category="Blog"
  lang="en"
/>
```

**Features:**
- Responsive grid layout (1 col mobile, 2 cols tablet, 3 cols desktop)
- Category badge with light stone background
- Title with hover effects
- Date display (optional)
- Excerpt text
- Tag display (optional, hash-prefixed)
- "Read More" link with language-specific text
- Hover animation (subtle lift effect)
- Uses theme colors throughout

---

## Page Structure

All content list pages must follow this structure:

```astro
---
import BaseLayout from "../../../layouts/BaseLayout.astro";
import ContentPageHeader from "../../../components/ContentPageHeader.astro";
import ContentCard from "../../../components/ContentCard.astro";

export async function getStaticPaths() {
  return [
    { params: { lang: "en" } },
    { params: { lang: "ar" } }
  ];
}

const { lang } = Astro.params;
// ... get content collection
---

<BaseLayout lang={lang} title={pageTitle}>
  <ContentPageHeader 
    title={pageTitle}
    description={pageDescription}
    lang={lang}
  />

  <div class={`${lang === "ar" ? "rtl" : "ltr"}`} dir={lang === "ar" ? "rtl" : "ltr"}>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* ContentCard items go here */}
    </div>

    {/* Empty state message */}
  </div>
</BaseLayout>
```

---

## Color Palette

All content pages use the standardized Yemen Atlas color palette:

| Name | Hex | Usage |
|------|-----|-------|
| **Archive Ink** | #1B2430 | Primary text, headings, brand elements |
| **Aged Paper** | #F6F4EF | Page background, card backgrounds |
| **Light Stone** | #E9E6DF | Borders, dividers, secondary backgrounds |
| **Yemeni Earth** | #8B6F47 | Accents, active states, secondary headings |
| **Critical Oxide** | #6A2E2A | Alerts, warnings, emphasis (use sparingly) |
| **Text Dark** | #222222 | Body text, primary content |
| **Text Light** | #E6E6E6 | Light mode text, labels |

**Implementation:**
Use CSS custom properties defined in `src/styles/global.css`:
```css
--color-archive-ink: #1B2430;
--color-aged-paper: #F6F4EF;
--color-light-stone: #E9E6DF;
--color-yemeni-earth: #8B6F47;
--color-critical-oxide: #6A2E2A;
--color-text-dark: #222222;
--color-text-light: #E6E6E6;
```

---

## Typography

### Heading Hierarchy

| Level | Size | Weight | Color |
|-------|------|--------|-------|
| **H1 (Page Title)** | text-4xl / text-5xl | bold | Archive Ink |
| **H2 (Section Title)** | text-2xl | bold | Yemeni Earth |
| **H3 (Card Title)** | text-xl / text-2xl | bold | Archive Ink |
| **Body Text** | text-base | regular | Text Dark |
| **Small Text** | text-sm | regular | Text Dark |
| **Date/Meta** | text-sm | regular | Yemeni Earth |

### Font Recommendations
- **Primary:** System fonts (sans-serif)
- **Line height:** 1.5-1.75 for body text
- **Letter spacing:** Tight for headers, normal for body

---

## Responsive Design

All content pages must be responsive:

### Grid Breakpoints
```
Mobile:  grid-cols-1
Tablet:  md:grid-cols-2
Desktop: lg:grid-cols-3
```

### Padding/Margins
```
Mobile:  px-4 py-6
Tablet:  px-6 py-8
Desktop: px-8 py-12
```

### Cards
- Always maintain 1.5rem (6px) gap between items
- Cards should be full width on mobile
- Cards must maintain aspect ratio and overflow hidden

---

## Bilingual/RTL Support

### Implementation Pattern

1. **Wrapper div with direction class:**
```astro
<div 
  class={`${lang === "ar" ? "rtl" : "ltr"}`} 
  dir={lang === "ar" ? "rtl" : "ltr"}
>
  {/* Content */}
</div>
```

2. **Language-specific text:**
```astro
{lang === "en" ? "English Text" : "النص العربي"}
```

3. **Language-specific formatting:**
- Use `toLocaleDateString(lang === "ar" ? "ar-SA" : "en-US")` for dates
- Adjust text alignment in CSS for RTL
- Swap margin/padding directions as needed

### Best Practices
- Always include both language variants in i18n files
- Test both directions in browser
- Ensure images and icons work in both directions
- Use flexbox/grid for flexible layouts

---

## Component Implementation

### Creating a New Content Page

1. **Choose the appropriate layout:**
   - List page: Use `ContentPageHeader` + grid of `ContentCard` components
   - Detail page: Create custom detail template (see blog/[slug].astro)

2. **Implement static path generation:**
```astro
export async function getStaticPaths() {
  return [
    { params: { lang: "en" } },
    { params: { lang: "ar" } }
  ];
}
```

3. **Add proper i18n content:**
   - Use `t(lang, "key")` helper for translations
   - Ensure all UI text is bilingual
   - Use appropriate date/time formatting

4. **Apply color palette:**
```astro
style="color: var(--color-archive-ink);"
style="background-color: var(--color-aged-paper);"
```

5. **Test responsiveness:**
   - Mobile (320px - 640px)
   - Tablet (641px - 1024px)
   - Desktop (1025px+)

---

## Consistency Checklist

When creating new content pages, ensure:

- [ ] Uses `ContentPageHeader` for page intro
- [ ] Uses `ContentCard` for individual items (where applicable)
- [ ] Color palette uses CSS variables
- [ ] Bilingual support with proper RTL handling
- [ ] Responsive grid layout (1/2/3 columns)
- [ ] Empty state message when no content
- [ ] Proper heading hierarchy (H1 → H2 → H3)
- [ ] Date formatting uses locale-aware functions
- [ ] Links use proper hover states
- [ ] Tested on mobile, tablet, and desktop
- [ ] Validated bilingual display (EN and AR)
- [ ] Accessibility checks (alt text, semantic HTML)

---

## Examples

### Blog Page
- File: `src/pages/[lang]/blog/index.astro`
- Uses: ContentPageHeader + ContentCard (grid)
- Features: Tags, publication date, sorted by date

### History Page
- File: `src/pages/[lang]/history/index.astro`
- Uses: ContentPageHeader + ContentCard (grid)
- Features: Historical period display, category badges

### Observatory Page
- File: `src/pages/[lang]/atlas-observatory/index.astro`
- Uses: ContentPageHeader + placeholder for future content
- Features: Empty state messaging, ready for expansion

### About Page
- File: `src/pages/[lang]/about.astro`
- Uses: ContentPageHeader + custom sections
- Features: Mission, principles, principles grid, custom layout

---

## Future Enhancements

Potential improvements to standardize further:

1. **Search/Filter components** for content pages
2. **Pagination component** for large content lists
3. **Breadcrumb navigation** for detail pages
4. **Related content** suggestions
5. **Share buttons** with language-specific text
6. **Comment system** with moderation
7. **Table of contents** generator for long-form content
8. **Code block styling** for technical content

---

## Questions or Updates?

To update this standard:
1. Document the change here
2. Update affected components
3. Update all using pages
4. Test bilingual/responsive behavior
5. Update this document with the new pattern

**Last Updated:** December 23, 2025
**Version:** 1.0
