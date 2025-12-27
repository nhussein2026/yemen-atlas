# Professional Content Layout Guide

## Overview

This guide establishes a **unified, professional layout standard** for all content pages (About, Blog, History, Explore, etc.) across Yemen Atlas. The layout prioritizes readability, visual hierarchy, and responsive design with content centered and properly constrained on all screen sizes.

---

## Table of Contents

1. [Core Principles](#core-principles)
2. [Layout Architecture](#layout-architecture)
3. [Responsive Breakpoints](#responsive-breakpoints)
4. [Typography Standards](#typography-standards)
5. [Section Structure](#section-structure)
6. [Color & Visual Hierarchy](#color--visual-hierarchy)
7. [RTL/LTR Support](#rtlltr-support)
8. [Component Guidelines](#component-guidelines)
9. [Implementation Examples](#implementation-examples)

---

## Core Principles

1. **Centered Content**: All content is constrained to a maximum width and centered on the page
2. **Visual Hierarchy**: Clear distinction between titles, sections, and body text
3. **Breathing Room**: Adequate white space around sections for professional appearance
4. **Readability**: Line lengths optimized for comfortable reading (50-75 characters)
5. **Accessibility**: Semantic HTML with proper contrast and spacing
6. **Responsiveness**: Seamless experience across mobile, tablet, and desktop
7. **Consistency**: Identical layout patterns across all content pages

---

## Layout Architecture

### Master Container Structure

```
┌─────────────────────────────────────────────┐
│             Navigation (Full Width)         │
├─────────────────────────────────────────────┤
│                                             │
│    ┌──────────────────────────────────┐    │
│    │   Content Container (Centered)   │    │
│    │   - Max Width: 48rem (768px)     │    │
│    │   - Padding: 2rem on mobile      │    │
│    │   - Padding: 3rem on tablet+     │    │
│    │                                  │    │
│    │  ┌────────────────────────────┐  │    │
│    │  │  Hero/Header Section       │  │    │
│    │  │  (Max 4xl/5xl title)       │  │    │
│    │  └────────────────────────────┘  │    │
│    │                                  │    │
│    │  ┌────────────────────────────┐  │    │
│    │  │  Content Sections          │  │    │
│    │  │  (Separated by borders)    │  │    │
│    │  └────────────────────────────┘  │    │
│    │                                  │    │
│    └──────────────────────────────────┘    │
│                                             │
├─────────────────────────────────────────────┤
│             Footer (Full Width)             │
└─────────────────────────────────────────────┘
```

### Container CSS Classes

```css
/* Main content container - applies to wrapper div */
.content-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1rem;
  gap: var(--spacing-8); /* 2rem */
}

/* Content container - centers content with max-width */
.content-container {
  width: 100%;
  max-width: 48rem; /* 768px - optimal reading width */
  padding: 0;
}

/* Section spacing utilities */
.section-spacing {
  margin-bottom: 3rem; /* 48px */
  padding-bottom: 2rem; /* 32px */
  border-bottom: 1px solid var(--atlas-border);
}

.section-spacing:last-child {
  border-bottom: none;
  margin-bottom: 1rem;
}
```

---

## Responsive Breakpoints

| Breakpoint | Width | Container | Padding | Font Size |
|------------|-------|-----------|---------|-----------|
| Mobile | < 640px | Full width | 1rem | base (16px) |
| Mobile-L | 640px | Full width | 1.5rem | base (16px) |
| Tablet | 768px | 48rem centered | 2rem | lg (18px) |
| Laptop | 1024px | 48rem centered | 2rem | lg (18px) |
| Desktop | ≥ 1280px | 48rem centered | 3rem | lg (18px) |

### Responsive Classes Reference

```astro
<!-- Mobile-first approach with Tailwind -->
<div class="w-full max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
  <!-- Content -->
</div>

<!-- Equivalent manual CSS -->
<style>
  .responsive-container {
    width: 100%;
    max-width: 48rem; /* 3xl - 768px */
    margin: 0 auto;
    padding: 0 1rem;
  }

  @media (min-width: 768px) {
    .responsive-container {
      padding: 0 1.5rem;
    }
  }

  @media (min-width: 1024px) {
    .responsive-container {
      padding: 0 2rem;
    }
  }
</style>
```

---

## Typography Standards

### Heading Hierarchy

| Level | Mobile | Desktop | Color | Usage |
|-------|--------|---------|-------|-------|
| H1 (Page Title) | 2xl (24px) | 4xl-5xl (36-48px) | `--atlas-archive` | Page header, main title |
| H2 (Section) | xl (20px) | 3xl (30px) | `--atlas-terracotta` | Main sections |
| H3 (Subsection) | lg (18px) | xl (20px) | `--atlas-archive` | Subsections, card titles |
| Body Text | base (16px) | base (16px) | `--atlas-archive` | Regular paragraphs |
| Meta/Secondary | sm (14px) | sm (14px) | `--atlas-stone` | Dates, metadata, captions |

### Line Length & Spacing

```css
/* Body text for comfortable reading */
.body-text {
  line-height: 1.7; /* 1.8 for longer articles */
  max-width: 45ch; /* Approximately 50-75 chars per line */
  word-spacing: 0.2em;
}

/* Heading spacing */
h1 {
  margin-bottom: 1.5rem;
  margin-top: 0;
}

h2 {
  margin-top: 2rem;
  margin-bottom: 1rem;
}

h3 {
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}

p {
  margin: 0 0 1.5rem 0;
  text-align: justify; /* Consider for justified text in desktop view */
}
```

---

## Section Structure

### Standard Section Template

```astro
<section class="section-spacing">
  <h2 style="color: var(--atlas-terracotta);">
    {section.title}
  </h2>
  
  <p class="text-base leading-relaxed" style="color: var(--atlas-archive);">
    {section.content}
  </p>
  
  {/* Optional: subsections or lists */}
  {section.items && (
    <div class="mt-4 space-y-3">
      {section.items.map(item => (
        <div class="ml-4">
          <h3 style="color: var(--atlas-archive);">
            {item.title}
          </h3>
          <p style="color: var(--atlas-stone);">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  )}
</section>
```

### Section Spacing Utilities

```css
/* Between sections */
.section-spacing {
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--atlas-border);
}

/* Last section - no border */
.section-spacing:last-of-type {
  border-bottom: none;
  margin-bottom: 1rem;
}

/* Internal spacing */
.subsection {
  margin-top: 1.5rem;
  margin-bottom: 1rem;
}

.list-item {
  margin-bottom: 1rem;
}
```

---

## Color & Visual Hierarchy

### Color Palette

| Usage | CSS Variable | Hex | Purpose |
|-------|--------------|-----|---------|
| Main Text | `--atlas-archive` | #2C2420 | Body text, main headings |
| Section Titles | `--atlas-terracotta` | #A84325 | H2 headers, emphasis |
| Secondary Text | `--atlas-stone` | #5C5552 | Metadata, captions |
| Borders | `--atlas-border` | #E8E3D8 | Section separators |
| Cards/Containers | `--atlas-paper` | #F5F1E8 | Card backgrounds |
| Accents | `--atlas-sand` | #C8A882 | Links, highlights |

### Implementation Guidelines

```css
/* Page title */
h1 {
  color: var(--atlas-archive);
  font-weight: 700;
}

/* Section headers */
h2 {
  color: var(--atlas-terracotta);
  font-weight: 600;
}

/* Body text */
p, li {
  color: var(--atlas-archive);
}

/* Secondary text (meta, dates) */
.meta, time, .caption {
  color: var(--atlas-stone);
  font-size: 0.875rem;
}

/* Section dividers */
.section-spacing {
  border-bottom-color: var(--atlas-border);
}
```

---

## RTL/LTR Support

### Base Implementation

```astro
---
const isArabic = lang === "ar";
---

<div class={`${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
  {/* Content */}
</div>
```

### CSS Considerations for RTL

```css
/* Use logical properties where possible */
.content {
  padding-inline: 1rem; /* Works for both LTR and RTL */
  text-align: start; /* Aligns left for LTR, right for RTL */
  margin-inline-end: 1rem;
}

/* Or use CSS variables */
.rtl {
  --text-align: right;
  --float-direction: left;
}

.ltr {
  --text-align: left;
  --float-direction: right;
}

.content {
  text-align: var(--text-align);
}
```

### Translation & Language Files

Content sections should use translation keys:

```json
{
  "about": {
    "title": "About Yemen Atlas",
    "intro": "Yemen Atlas is...",
    "mission": {
      "title": "Our Mission",
      "content": "..."
    },
    "sections": [
      {
        "title": "Section Title",
        "content": "Section content..."
      }
    ]
  }
}
```

---

## Component Guidelines

### Page Component Template

```astro
---
import BaseLayout from "../../layouts/BaseLayout.astro";
import { assertLang } from "../../lib/lang";
import { t } from "../../lib/translations";

const { lang } = Astro.params;
assertLang(lang);

// Static paths for all languages
export async function getStaticPaths() {
  return [
    { params: { lang: "en" } },
    { params: { lang: "ar" } }
  ];
}

const pageData = t(lang, "page-key"); // Load from translations
const isArabic = lang === "ar";
---

<BaseLayout lang={lang} title={pageData.title}>
  <div class={`${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
    {/* Content */}
  </div>
</BaseLayout>
```

### Styling Pattern

```astro
<style>
  /* Container & Layout */
  .page-wrapper {
    width: 100%;
    max-width: 48rem;
    margin: 0 auto;
    padding: 0 1rem;
  }

  @media (min-width: 768px) {
    .page-wrapper {
      padding: 0 1.5rem;
    }
  }

  /* Sections */
  .section {
    margin-bottom: 3rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid var(--atlas-border);
  }

  .section:last-of-type {
    border-bottom: none;
  }

  /* Typography */
  h1 {
    color: var(--atlas-archive);
    font-size: clamp(1.875rem, 5vw, 3rem);
    margin-bottom: 1.5rem;
  }

  h2 {
    color: var(--atlas-terracotta);
    font-size: clamp(1.5rem, 4vw, 2rem);
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  p {
    color: var(--atlas-archive);
    line-height: 1.7;
    margin-bottom: 1.5rem;
  }
</style>
```

---

## Implementation Examples

### Example 1: About Page

```astro
<BaseLayout lang={lang} title={about.title}>
  <div class={`${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
    <div class="content-wrapper">
      <div class="content-container">
        
        {/* Hero Section */}
        <section>
          <h1 class="text-4xl md:text-5xl font-bold mb-6" 
              style="color: var(--atlas-archive);">
            {about.title}
          </h1>
          <p class="text-lg leading-relaxed" 
             style="color: var(--atlas-archive);">
            {about.intro}
          </p>
        </section>

        {/* Main Sections */}
        {Object.entries(about.sections || {}).map(([key, section]) => (
          <section class="section-spacing">
            <h2 style="color: var(--atlas-terracotta);">
              {section.title}
            </h2>
            <p class="text-base leading-relaxed" 
               style="color: var(--atlas-archive);">
              {section.content}
            </p>
          </section>
        ))}

      </div>
    </div>
  </div>
</BaseLayout>
```

### Example 2: Blog Article

```astro
<BaseLayout lang={lang} title={post.data.title[lang]}>
  <div class={`${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
    <article class="content-wrapper">
      <div class="content-container">
        
        {/* Header */}
        <header class="mb-8">
          <h1 class="text-4xl font-bold mb-4"
              style="color: var(--atlas-archive);">
            {post.data.title[lang]}
          </h1>
          <p class="text-lg text-gray-600" 
             style="color: var(--atlas-stone);">
            {post.data.excerpt[lang]}
          </p>
          
          {/* Metadata */}
          <div class="flex gap-4 mt-4 text-sm" 
               style="color: var(--atlas-stone);">
            {post.data.publishedAt && (
              <time>{post.data.publishedAt.toLocaleDateString()}</time>
            )}
            {post.data.readingTime && (
              <span>{post.data.readingTime} min read</span>
            )}
          </div>
        </header>

        {/* Content */}
        <div class="prose" style="color: var(--atlas-archive);">
          <Content />
        </div>

      </div>
    </article>
  </div>
</BaseLayout>
```

---

## Best Practices Checklist

- ✅ Use `max-width: 48rem` (768px) for content containers
- ✅ Apply `margin: 0 auto` to center content
- ✅ Use `padding: 1rem-3rem` based on viewport
- ✅ Maintain consistent `line-height: 1.7-1.8` for body text
- ✅ Use `section-spacing` class for section separation
- ✅ Apply RTL/LTR classes at page wrapper level
- ✅ Use CSS variables for colors from design system
- ✅ Test responsiveness at 320px, 640px, 768px, 1024px, 1280px
- ✅ Ensure heading hierarchy (H1 > H2 > H3)
- ✅ Include metadata and timestamps where appropriate
- ✅ Provide visual separation between major sections
- ✅ Ensure links have hover states and sufficient color contrast
- ✅ Use semantic HTML (`<article>`, `<section>`, `<header>`)

---

## Migration Checklist

When updating existing pages to follow this standard:

1. Wrap main content in `.content-wrapper` and `.content-container`
2. Add `dir` and RTL/LTR class to page root div
3. Convert all inline styles to use CSS variables
4. Apply `.section-spacing` to section dividers
5. Verify responsive design at all breakpoints
6. Test bilingual display (English & Arabic)
7. Validate heading hierarchy
8. Check color contrast (WCAG AA minimum)
9. Test on actual mobile devices
10. Document any deviations in page comments

---

## Future Enhancements

- [ ] Create reusable `.prose` component for article content
- [ ] Add support for light/dark mode themes
- [ ] Implement reading progress indicator
- [ ] Add table of contents for long-form content
- [ ] Create gallery/image display standards
- [ ] Define quotation styling
- [ ] Add code block styling guide
