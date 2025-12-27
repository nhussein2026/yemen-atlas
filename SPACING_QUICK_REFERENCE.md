# Quick Spacing Reference - Copy & Paste Guide

## For Developers: Common Spacing Patterns

### New Page Template

```astro
---
import BaseLayout from "../../layouts/BaseLayout.astro";
import ContentSection from "../../components/ContentSection.astro";
import { assertLang } from "../../lib/lang";
import { t } from "../../lib/translations";

const { lang } = Astro.params;
assertLang(lang);

export async function getStaticPaths() {
  return [
    { params: { lang: "en" } },
    { params: { lang: "ar" } }
  ];
}

const pageData = t(lang, "page-key");
const isArabic = lang === "ar";
---

<BaseLayout lang={lang} title={pageData.title}>
  <div class={`${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
    <div class="content-wrapper">
      <div class="content-container">

        <!-- Hero Section -->
        <section class="hero-section">
          <h1 class="page-title">{pageData.title}</h1>
          <p class="hero-intro">{pageData.intro}</p>
        </section>

        <!-- Main Sections -->
        <ContentSection
          title={pageData.mission.title}
          content={pageData.mission.content}
          lang={lang}
        />

        <ContentSection
          title={pageData.features.title}
          items={pageData.features.items}
          lang={lang}
        />

        <ContentSection
          title={pageData.closing.title}
          content={pageData.closing.content}
          lang={lang}
          isBordered={false}
        />

      </div>
    </div>
  </div>

  <style>
    .content-wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 1rem;
    }

    .content-container {
      width: 100%;
      max-width: 48rem;
      padding: 0;
    }

    @media (min-width: 640px) {
      .content-wrapper {
        padding: 0 1.25rem;
      }
    }

    @media (min-width: 768px) {
      .content-wrapper {
        padding: 0 1.5rem;
      }
    }

    @media (min-width: 1024px) {
      .content-wrapper {
        padding: 0 2rem;
      }
    }

    .hero-section {
      margin-bottom: 2.5rem;
      padding-bottom: 2.5rem;
      border-bottom: 1px solid var(--atlas-border);
    }

    @media (min-width: 768px) {
      .hero-section {
        margin-bottom: 3.5rem;
        padding-bottom: 3rem;
      }
    }

    .page-title {
      font-size: clamp(2rem, 6vw, 3rem);
      font-weight: 700;
      margin: 0 0 1.5rem 0;
      color: var(--atlas-archive);
      line-height: 1.2;
      letter-spacing: -0.5px;
    }

    .hero-intro {
      font-size: clamp(0.9375rem, 2vw, 1rem);
      line-height: 1.75;
      color: var(--atlas-archive);
      margin: 0;
      text-align: justify;
      word-spacing: 0.1em;
      letter-spacing: 0.3px;
    }

    @media (max-width: 640px) {
      .page-title {
        margin-bottom: 1.25rem;
      }
    }
  </style>
</BaseLayout>
```

---

## ContentSection Component Usage

### Simple Section with Text

```astro
<ContentSection
  title="Section Title"
  content="Your paragraph content here. This will be justified with proper spacing."
  lang={lang}
/>
```

### Section with Grid Items

```astro
<ContentSection
  title="Features or Principles"
  items={[
    {
      title: "Feature One",
      description: "Description of the first feature..."
    },
    {
      title: "Feature Two",
      description: "Description of the second feature..."
    },
    {
      title: "Feature Three",
      description: "Description of the third feature..."
    }
  ]}
  lang={lang}
/>
```

### Last Section (No Border)

```astro
<ContentSection
  title="Final Section"
  content="Last section content - no border below it"
  lang={lang}
  isBordered={false}
/>
```

---

## Spacing Cheat Sheet

### Container/Layout

| Class | Mobile | Desktop | Use For |
|-------|--------|---------|---------|
| `.content-wrapper` | `padding: 0 1rem` | `padding: 0 2rem` | Main wrapper |
| `.content-container` | `max-width: 48rem` | `max-width: 48rem` | Content constraint |
| `.hero-section` | `mb: 2.5rem` | `mb: 3.5rem` | Page intro |
| `.section-spacing` | `mb: 2.5rem` | `mb: 3.5rem` | Main sections |

### Typography

| Element | Size | Margin-Bottom | Notes |
|---------|------|---|---|
| H1 | `clamp(2rem, 6vw, 3rem)` | `1.5-1.75rem` | Page title |
| H2 | `clamp(1.375rem, 3.5vw, 1.875rem)` | `1.25rem` | Section header |
| H3 | `clamp(1.125rem, 2.5vw, 1.375rem)` | `1rem` | Subsection |
| Body | `clamp(0.9375rem, 1.5vw, 1rem)` | `1.75rem` | Paragraph |

### Spacing Values

```
Standard Margins/Padding:
0.375rem = 6px    - tiny adjustments
0.625rem = 10px   - item gaps
0.75rem = 12px    - small padding
1rem = 16px       - standard
1.25rem = 20px    - section headers
1.5rem = 24px     - moderate
1.75rem = 28px    - paragraph spacing
2rem = 32px       - large
2.5rem = 40px     - section break
3rem = 48px       - major break
3.5rem = 56px     - desktop major break
```

---

## Common CSS Snippets

### Justified Text Block

```css
p {
  text-align: justify;
  word-spacing: 0.1em;
  letter-spacing: 0.3px;
  line-height: 1.75;
  margin: 1.75rem 0;
}
```

### Responsive Container

```css
.responsive-container {
  width: 100%;
  max-width: 48rem;
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
```

### Section Separator

```css
.section {
  margin-bottom: 2.5rem;
  padding-bottom: 2.5rem;
  border-bottom: 1px solid var(--atlas-border);
}

@media (min-width: 768px) {
  .section {
    margin-bottom: 3.5rem;
    padding-bottom: 3rem;
  }
}

.section:last-of-type {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}
```

### Responsive Grid

```css
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
  margin-top: 1.75rem;
}

@media (min-width: 640px) {
  .grid {
    gap: 1.5rem;
  }
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    margin-top: 2rem;
  }
}
```

### Heading Spacing

```css
h2 {
  margin-top: 2.5rem;
  margin-bottom: 1.25rem;
  font-size: clamp(1.375rem, 3.5vw, 1.875rem);
  font-weight: 600;
  color: var(--atlas-terracotta);
  border-bottom: 2px solid var(--atlas-border);
  padding-bottom: 0.75rem;
  line-height: 1.3;
}

h2:first-child {
  margin-top: 0;
}
```

### Card Styling

```css
.card {
  padding: 1.5rem;
  background-color: var(--atlas-paper);
  border-left: 4px solid var(--atlas-terracotta);
  border-radius: 0.375rem;
  transition: all 300ms ease;
}

[dir="rtl"] .card {
  border-left: none;
  border-right: 4px solid var(--atlas-terracotta);
}

.card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}
```

---

## Responsive Breakpoints

```scss
// Mobile
// No media query needed (mobile-first)
padding: 0 1rem;

// Mobile-L (640px)
@media (min-width: 640px) {
  padding: 0 1.25rem;
}

// Tablet (768px)
@media (min-width: 768px) {
  padding: 0 1.5rem;
  // Activate 2-column layouts
  grid-template-columns: repeat(2, 1fr);
}

// Desktop (1024px)
@media (min-width: 1024px) {
  padding: 0 2rem;
}

// Large Desktop (1280px+)
@media (min-width: 1280px) {
  // Usually not needed - max-width handles it
}
```

---

## Color Palette Reference

```css
/* Text Colors */
--atlas-archive: #2C2420;      /* Main text, headings */
--atlas-stone: #5C5552;        /* Secondary text, meta */

/* Accent Colors */
--atlas-terracotta: #A84325;   /* Section titles, borders */
--atlas-sand: #C8A882;         /* Links, highlights */

/* Background Colors */
--atlas-paper: #F5F1E8;        /* Card backgrounds */
--atlas-border: #E8E3D8;       /* Borders, separators */
```

---

## Typography Scale

```
H1 (Page Title):    clamp(2rem, 6vw, 3rem)       32-48px
H2 (Section):       clamp(1.375rem, 3.5vw, 1.875rem) 22-30px
H3 (Subsection):    clamp(1.125rem, 2.5vw, 1.375rem) 18-22px
Body Text:          clamp(0.9375rem, 1.5vw, 1rem)    15-16px
Small/Meta:         0.875rem                          14px
Tiny:               0.8125rem                         13px
```

---

## RTL Implementation

```astro
<!-- Add to page root -->
<div class={`${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
  {/* All content */}
</div>
```

```css
/* Borders flip automatically */
[dir="rtl"] .card {
  border-left: none;
  border-right: 4px solid var(--atlas-terracotta);
}

/* Padding reverses automatically */
[dir="rtl"] .blockquote {
  padding-left: 0;
  padding-right: 1.25rem;
}

/* Margin reverses automatically */
[dir="rtl"] .list {
  padding-left: 0;
  padding-right: 2rem;
}
```

---

## Mobile-First Workflow

1. **Write CSS for mobile first** (no media query)
2. **Test at 320px** - Make sure it works
3. **Add 640px breakpoint** - Minor adjustments
4. **Add 768px breakpoint** - Major layout changes (2-column grids)
5. **Add 1024px breakpoint** - Maximum padding, spacing
6. **Test at 1280px+** - Ensure max-width constraint works

---

## Testing Checklist

```
□ Mobile (320px)     - All content visible, readable
□ Mobile-L (480px)   - Proper spacing maintained
□ Tablet (768px)     - 2-column grids active, spacing increased
□ Desktop (1024px)   - Full padding, optimal spacing
□ Wide (1280px+)     - Content constrained, centered

□ English (LTR)      - Text aligns left, normal layout
□ Arabic (RTL)       - Text aligns right, borders flip
□ Typography         - Sizes scale smoothly
□ Spacing            - Consistent throughout
□ Borders            - Visible and properly positioned
□ Colors             - Contrast adequate, identity maintained
```

---

## Copy-Paste: Common Patterns

### Page with Hero + Sections

```astro
<section class="hero-section">
  <h1 class="page-title">{title}</h1>
  <p class="hero-intro">{intro}</p>
</section>

<ContentSection title={section1.title} content={section1.content} lang={lang} />
<ContentSection title={section2.title} items={section2.items} lang={lang} />
<ContentSection title={section3.title} content={section3.content} lang={lang} isBordered={false} />
```

### Article with Header + Content

```astro
<header class="article-header">
  <h1 class="article-title">{title}</h1>
  <p class="article-excerpt">{excerpt}</p>
  <div class="article-metadata">
    <time>{date}</time>
    <div class="tags">{tags}</div>
  </div>
</header>

<div class="article-content">
  <Content />
</div>
```

### Grid of Cards

```astro
<div class="items-grid">
  {items.map(item => (
    <div class="item-card">
      <h3 class="item-title">{item.title}</h3>
      <p class="item-description">{item.description}</p>
    </div>
  ))}
</div>
```

---

## Resources

- **Full Guide**: See [PROFESSIONAL_CONTENT_LAYOUT_GUIDE.md](PROFESSIONAL_CONTENT_LAYOUT_GUIDE.md)
- **Spacing Details**: See [SPACING_RESPONSIVENESS_GUIDE.md](SPACING_RESPONSIVENESS_GUIDE.md)
- **Visual Reference**: See [SPACING_VISUAL_SUMMARY.md](SPACING_VISUAL_SUMMARY.md)
- **Component**: See `src/components/ContentSection.astro`

---

## Need Help?

Check these files in the following order:
1. This file (quick answers)
2. SPACING_RESPONSIVENESS_GUIDE.md (detailed spacing rules)
3. SPACING_VISUAL_SUMMARY.md (visual examples)
4. PROFESSIONAL_CONTENT_LAYOUT_GUIDE.md (comprehensive guide)
5. Source files (about.astro, blog/[slug].astro, history/[slug].astro)

---

**Last Updated:** December 27, 2025
**Version:** 2.0 - Enhanced Spacing & Responsiveness
