# Spacing & Responsiveness Standards

## Overview

This document details the refined spacing system and responsive behavior implemented across all content pages in Yemen Atlas. All spacing follows a consistent scale that maintains visual harmony and proper element separation across all viewport sizes.

---

## Spacing Scale Reference

### Base Spacing Unit
**Base: 0.25rem (4px)** - All spacing values are multiples of this unit

### Spacing Values Used

| Value | Rem | Px | Usage |
|-------|-----|----|----|
| 0.375rem | 0.375 | 6px | Small gaps, padding adjustments |
| 0.625rem | 0.625 | 10px | Item gaps, tight spacing |
| 0.75rem | 0.75 | 12px | Small padding, list item margins |
| 1rem | 1 | 16px | Standard padding, basic margins |
| 1.25rem | 1.25 | 20px | Section headers, moderate spacing |
| 1.5rem | 1.5 | 24px | Paragraph spacing, section spacing |
| 1.75rem | 1.75 | 28px | Large paragraph gaps, major spacing |
| 2rem | 2 | 32px | Large sections, hero padding |
| 2.5rem | 2.5 | 40px | Section separators |
| 3rem | 3 | 48px | Major section breaks |
| 3.5rem | 3.5 | 56px | Desktop section spacing |
| 4rem | 4 | 64px | Content area margins |

---

## Container Layout System

### Main Content Container

```
┌─────────────────────────────────────────────────┐
│              Full Width (100%)                  │
│  Padding: 1rem (mobile) to 2rem (desktop)      │
│                                                 │
│    ┌─────────────────────────────────────┐    │
│    │  Constrained Content (max-width:    │    │
│    │  48rem/768px)                       │    │
│    │                                     │    │
│    │  ┌───────────────────────────────┐  │    │
│    │  │  Section Spacing: 2.5-3.5rem  │  │    │
│    │  │  (Mobile to Desktop)          │  │    │
│    │  └───────────────────────────────┘  │    │
│    │                                     │    │
│    └─────────────────────────────────────┘    │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Content Wrapper Padding

**Mobile (< 640px)**
- `padding: 0 1rem` (16px sides)
- Responsive to screen size changes

**Mobile-L (640px)**
- `padding: 0 1.25rem` (20px sides)

**Tablet (768px)**
- `padding: 0 1.5rem` (24px sides)

**Desktop (1024px+)**
- `padding: 0 2rem` (32px sides)

---

## Section Spacing

### Section Container Structure

```css
.section-spacing {
  margin-bottom: 2.5rem;      /* Mobile */
  padding-bottom: 2.5rem;     /* Mobile */
  border-bottom: 1px solid var(--atlas-border);
}

@media (min-width: 768px) {
  .section-spacing {
    margin-bottom: 3.5rem;    /* Tablet+ */
    padding-bottom: 3rem;     /* Tablet+ */
  }
}

.section-spacing:last-of-type {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}
```

### Hero/Header Section

**Mobile**
- `margin-bottom: 2rem`
- `padding-bottom: 2rem`

**Tablet+**
- `margin-bottom: 3.5rem`
- `padding-bottom: 3rem`

---

## Typography Spacing

### Heading Spacing

#### H1 (Page Title)

```css
.page-title {
  margin: 0 0 1.5rem 0;       /* Mobile: 24px bottom */
  font-size: clamp(2rem, 6vw, 3rem);
}

@media (min-width: 768px) {
  .page-title {
    margin-bottom: 1.75rem;   /* Tablet+: 28px bottom */
  }
}
```

#### H2 (Section Titles)

```css
h2 {
  margin-top: 2.5rem;         /* Space before section */
  margin-bottom: 1.25rem;     /* Space after title */
  padding-bottom: 0.75rem;    /* Border separation */
  border-bottom: 2px solid var(--atlas-border);
}

h2:first-child {
  margin-top: 0;              /* No top margin for first heading */
}
```

#### H3 (Subsection Titles)

```css
h3 {
  margin-top: 2rem;
  margin-bottom: 1rem;
  line-height: 1.3;
}
```

### Paragraph Spacing

```css
p {
  margin: 1.75rem 0;          /* 28px vertical spacing */
  line-height: 1.75;          /* Optimal readability */
  word-spacing: 0.1em;        /* Justified text support */
  letter-spacing: 0.3px;      /* Improved readability */
  text-align: justify;
}

p:first-child {
  margin-top: 0;
}

p:last-child {
  margin-bottom: 0;
}
```

### List Item Spacing

```css
li {
  margin: 0.625rem 0;         /* 10px between list items */
  line-height: 1.7;
}

ul, ol {
  margin: 1.75rem 0;          /* 28px around list blocks */
  padding-left: 2rem;         /* Indentation */
}
```

---

## Component-Specific Spacing

### ContentSection Component

#### Card Spacing (Items Grid)

**Mobile (1 column)**
- `gap: 1.25rem` (20px)

**Mobile-L (1 column)**
- `gap: 1.5rem` (24px)

**Tablet+ (2 columns)**
- `gap: 2rem` (32px)

#### Card Padding

```css
.item-card {
  padding: 1.5rem;            /* 24px internal padding */
  display: flex;
  flex-direction: column;
  gap: 0.75rem;               /* 12px between title & description */
}

@media (max-width: 640px) {
  .item-card {
    padding: 1.25rem;         /* 20px on small screens */
    gap: 0.5rem;              /* 8px on small screens */
  }
}
```

### Article Header

**Metadata Container**

```css
.article-metadata {
  gap: 1rem;                  /* Mobile: 16px gaps */
  margin-bottom: 1.5rem;
}

@media (min-width: 768px) {
  .article-metadata {
    gap: 1.5rem;              /* Tablet+: 24px gaps */
  }
}
```

### Article Content

#### Blockquotes

```css
blockquote {
  margin: 1.75rem 0;          /* 28px vertical spacing */
  padding-left: 1.25rem;      /* 20px indentation */
  border-left: 4px solid var(--atlas-terracotta);
  line-height: 1.7;
}
```

#### Code Blocks

```css
pre {
  margin: 1.75rem 0;          /* 28px vertical spacing */
  padding: 1.5rem;            /* 24px internal padding */
  border: 1px solid var(--atlas-border);
}
```

---

## Responsive Behavior

### Typography Scaling

All typography uses `clamp()` for smooth scaling:

```css
/* Pattern: clamp(mobile-size, viewport-scaling, max-size) */

h1 {
  font-size: clamp(2rem, 6vw, 3rem);
  /* Mobile: 32px, scales with viewport, max 48px */
}

h2 {
  font-size: clamp(1.375rem, 3.5vw, 1.875rem);
  /* Mobile: 22px, scales with viewport, max 30px */
}

body-text {
  font-size: clamp(0.9375rem, 1.5vw, 1rem);
  /* Mobile: 15px, scales with viewport, max 16px */
}
```

### Spacing Scale Behavior

**Mobile-first approach:**

1. **Mobile (< 640px)**: Tighter spacing
   - Smaller gaps between items
   - Reduced padding and margins
   - Optimized for touch interaction

2. **Mobile-L (640px)**: Slight increase
   - Gap increase: +0.25rem
   - Maintains readability

3. **Tablet (768px)**: Medium spacing
   - Gap increase: +0.5rem
   - Better use of available space
   - 2-column layouts activated

4. **Desktop (1024px+)**: Generous spacing
   - Maximum spacing values
   - Full container width padding
   - Optimal reading experience

---

## Breakpoints & Media Queries

### Standard Breakpoints Used

```css
@media (min-width: 640px) {
  /* Mobile-L adjustments */
  /* Minor spacing increases */
}

@media (min-width: 768px) {
  /* Tablet and larger */
  /* Significant layout and spacing changes */
  /* Grid layout activation (2 columns) */
}

@media (min-width: 1024px) {
  /* Desktop and larger */
  /* Maximum padding and spacing */
}

@media (max-width: 640px) {
  /* Small screen optimization */
  /* Reduced font sizes */
  /* Tighter spacing */
}
```

---

## Element Separation Guidelines

### Section Separators

**Horizontal Lines (Borders)**

```css
.section-spacing {
  border-bottom: 1px solid var(--atlas-border);
  /* Visual separator between major sections */
}
```

- **Color**: `var(--atlas-border)` (#E8E3D8)
- **Width**: 1px (thin, subtle)
- **Margin**: 2.5-3.5rem above and below

### Vertical Spacing Between Elements

| Element Type | Above | Below | Notes |
|--|--|--|--|
| H1 (Page Title) | 0 | 1.5-1.75rem | No space above first heading |
| H2 (Section) | 2.5rem | 1.25rem | Clear separation from previous |
| H3 (Subsection) | 2rem | 1rem | Grouped with H2 |
| Paragraph | 1.75rem | 1.75rem | Consistent line spacing |
| List | 1.75rem | 1.75rem | Block-level spacing |
| Blockquote | 1.75rem | 1.75rem | As block elements |
| Code block | 1.75rem | 1.75rem | As block elements |

### Padding in Containers

**Card Padding**
- `1.5rem` (24px) on tablet/desktop
- `1.25rem` (20px) on mobile
- Creates breathing room inside cards

**Section Padding**
- Bottom: `2.5-3rem` (40-48px)
- Creates clear visual sections
- Matches section spacing

---

## Special Cases & Transitions

### Hover States

```css
.item-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
  transition: all 300ms ease;
}
```

- Subtle lift effect (2px translation)
- Soft shadow appearance
- Smooth animation (300ms)

### RTL (Right-to-Left) Adaptation

All spacing automatically adapts:

```css
[dir="rtl"] .item-card {
  border-left: none;
  border-right: 4px solid var(--atlas-terracotta);
}

[dir="rtl"] blockquote {
  padding-left: 0;
  padding-right: 1.25rem;
}
```

- Borders flip sides
- Padding directions reverse
- Text alignment reverses
- No manual adjustments needed in HTML

---

## Implementation Checklist

When creating or updating pages:

✅ **Spacing**
- [ ] Container has proper max-width (48rem)
- [ ] Wrapper padding responsive (1rem → 2rem)
- [ ] Sections use section-spacing class
- [ ] Paragraphs have 1.75rem vertical spacing
- [ ] Headings follow spacing scale

✅ **Typography**
- [ ] Headings use clamp() for scaling
- [ ] Line-height is 1.7+ for body text
- [ ] Letter-spacing: 0.3px on justified text
- [ ] Font sizes responsive across breakpoints

✅ **Responsiveness**
- [ ] Tested at 320px (mobile)
- [ ] Tested at 640px (mobile-L)
- [ ] Tested at 768px (tablet)
- [ ] Tested at 1024px (desktop)
- [ ] Tested at 1280px+ (large desktop)

✅ **Visual Hierarchy**
- [ ] Clear margin differences between heading levels
- [ ] Sufficient spacing around major sections
- [ ] Borders/separators properly positioned
- [ ] Color contrast maintained

✅ **Bilingual**
- [ ] RTL/LTR classes applied
- [ ] Borders flip in RTL mode
- [ ] Text alignment adapts automatically
- [ ] Padding reversal works correctly

---

## Common Spacing Patterns

### Page Layout

```astro
<div class="content-wrapper">
  <div class="content-container">
    <!-- Hero Section -->
    <section class="hero-section">
      <!-- 2-3rem margin/padding -->
    </section>

    <!-- Main Sections -->
    <section class="section-spacing">
      <!-- 2.5-3.5rem margin/padding -->
    </section>

    <!-- Repeat sections -->
  </div>
</div>
```

### Section with Items

```astro
<section class="section-spacing">
  <h2>Title</h2>     <!-- 1.25rem below -->
  <p>Content</p>     <!-- 1.75rem below -->

  <div class="items-grid">  <!-- 1.75rem above -->
    <div class="item-card">  <!-- gap: 1.25-2rem -->
      <h3>Item</h3>   <!-- gap: 0.5-0.75rem -->
      <p>Desc</p>
    </div>
  </div>
</section>
```

### Article Content

```astro
<article>
  <header class="article-header">  <!-- 2.5-3rem margin/padding -->
    <h1>Title</h1>
    <p class="excerpt">Summary</p>
    <div class="metadata"></div>
  </header>

  <div class="article-content">    <!-- 3-4rem margin-bottom -->
    <p>Paragraph 1</p>   <!-- 1.75rem spacing -->
    <h2>Section</h2>     <!-- 2.5rem before, 1.25rem after -->
    <p>Paragraph 2</p>   <!-- 1.75rem spacing -->
  </div>
</article>
```

---

## Testing Responsive Spacing

### Mobile (320-480px)
```
✓ Readable text with proper line-height
✓ Lists and items easily scannable
✓ Touch-friendly spacing (min 44px tap target)
✓ No horizontal scroll
✓ Proper hierarchy visible
```

### Tablet (481-768px)
```
✓ 2-column layouts active
✓ Increased padding (1.5rem)
✓ Better use of horizontal space
✓ Comfortable reading width
✓ Section spacing increased
```

### Desktop (769px+)
```
✓ Max-width respected (48rem)
✓ Centered content on screen
✓ Maximum padding (2rem sides)
✓ Optimal line length (50-75 chars)
✓ Generous vertical spacing
```

---

## Notes & Best Practices

1. **Never break the spacing scale** - Use values from the standard scale
2. **Test on real devices** - Emulation ≠ real-world viewport
3. **Consider touch zones** - Minimum 44px for mobile tap targets
4. **Maintain hierarchy** - Spacing communicates content importance
5. **Be consistent** - Same content type = same spacing
6. **Test RTL** - Arabic/RTL content must be fully functional
7. **Performance** - Avoid excessive shadows/transforms
8. **Accessibility** - Spacing aids readability for all users

---

## Questions & Updates

This spacing system is designed to be:
- **Maintainable**: Clear, documented scales
- **Flexible**: Responsive across all sizes
- **Professional**: Careful attention to detail
- **Accessible**: Readable at all zoom levels
- **Consistent**: Applied uniformly across site

For updates or clarifications, refer to component files or the main layout guide.
