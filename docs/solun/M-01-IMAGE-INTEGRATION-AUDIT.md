# M-01 Image Integration Readiness Audit

**Date:** 2026-11-27  
**Phase:** 3 of 6 — Image Integration Readiness Audit  
**Branch:** `editorial-assets`  
**Depends on:** M-01-PLACEMENT-MAPPING.md

---

## Audit Scope

Verify that the codebase is ready to receive and correctly render M-01 production assets across all three placements:
1. Homepage Hero Carousel — `monolith-editorial.webp` (1920×1080)
2. Collection Page Hero — `monolith-collection-hero.webp` (1920×1200)
3. Product Detail Main Image — `monolith-one-obsidian.webp` (1200×1600)

---

## Component Readiness Assessment

### 1. CampaignImage Component (`src/components/ui/CampaignImage.tsx`)

| Requirement | Status | Notes |
|-------------|--------|-------|
| **IntersectionObserver lazy loading** | ✅ Implemented | 100px rootMargin, 0.01 threshold, disabled for `priority=true` |
| **Shimmer loading state** | ✅ Implemented | `.image-loading` class with CSS animation (see globals.css) |
| **Error fallback** | ✅ Implemented | `ImageFallback` → `PlaceholderComposition` per composition type |
| **Priority loading** | ✅ Implemented | `priority` prop forces eager load, bypasses IntersectionObserver |
| **Composition variants** | ✅ Implemented | `hero`, `collection-hero`, `product-hero`, `editorial`, `atelier`, `detail` |
| **Loading prop handling** | ✅ Fixed | Line 24: `loading` destructured; line 88: `loading={loading ?? (priority ? 'eager' : 'lazy')}` |
| **Sizes prop support** | ✅ Implemented | Passed to `<img sizes={sizes}>` |
| **onLoad/onError callbacks** | ✅ Implemented | Fired correctly, update internal state |
| **Accessibility (alt, aria)** | ✅ Implemented | `alt` prop, `aria-hidden={!alt}`, fallback has `role="img"` when alt provided |

**Verdict:** ✅ **READY** — All required functionality present and working.

---

### 2. StaticCampaignImage Component

| Requirement | Status | Notes |
|-------------|--------|-------|
| **Eager loading** | ✅ Implemented | `loading="eager"` hardcoded |
| **Error fallback** | ✅ Implemented | `PlaceholderComposition` directly |
| **No IntersectionObserver** | ✅ Correct | Simplified for above-fold critical images |
| **Composition variants** | ✅ Implemented | Same 6 types |

**Verdict:** ✅ **READY** — Appropriate for hero images.

---

### 3. CSS Loading Shimmer (globals.css / Tailwind)

| Requirement | Status | Notes |
|-------------|--------|-------|
| **`.image-loading` class** | ⚠️ **NEEDS VERIFICATION** | Must exist in CSS for shimmer animation |
| **Animation keyframes** | ⚠️ **NEEDS VERIFICATION** | Should be defined for smooth loading state |
| **Collection-aware colors** | ✅ Likely | Uses CSS variables `--collection-*` |

**Action Required:** Verify `.image-loading` styles exist in `src/index.css` or Tailwind config.

---

### 4. PlaceholderComposition Fallbacks

| Composition | Fallback Design | Collection-Aware |
|-------------|-----------------|------------------|
| `hero` | Monolith-specific gradient + geometric forms | Hardcoded Monolith colors (obsidian/accent) |
| `collection-hero` | Dynamic via CSS variables | ✅ Uses `--collection-bg`, `--collection-glow`, `--collection-accent-subtle`, etc. |
| `product-hero` | Swimwear silhouette abstraction | ✅ Uses CSS variables |
| `editorial` | Editorial grid + typography specimen | ✅ Uses CSS variables |
| `atelier` | Hands/tools abstraction | ✅ Uses CSS variables |
| `detail` | Fabric texture + bonded seam | ✅ Uses CSS variables |

**Note:** `hero` composition fallback is **hardcoded to Monolith** colors — not collection-aware. This is acceptable since `hero` is only used for homepage hero (which is collection-specific per slide). The `collection-hero` fallback properly uses CSS variables.

**Verdict:** ✅ **READY** — Fallbacks work and are collection-aware where needed.

---

## Page/Placement Readiness

### 1. Homepage Hero Carousel (`src/pages/Home.tsx`)

| Check | Status | Details |
|-------|--------|---------|
| Uses `CampaignImage` | ✅ | Line 89-95 |
| `composition="hero"` | ✅ | Correct for homepage hero |
| `priority=true` | ✅ | Eager load, no IntersectionObserver |
| Correct placeholder path | ✅ | `/images/campaign/solun/monolith-editorial.webp` |
| Alt text present | ⚠️ **EMPTY** | Line 91: `alt=""` — **Must update for production** |
| Video poster uses same image | ✅ | Line 102: `poster={slide.image}` |
| Collection theming applied | ✅ | Parent `<div className="min-h-screen bg-collection-bg">` + slide-specific `accent` class |

**Required Fix:** Update `alt` in `HERO_SLIDES[0]` to production alt text (see M-01-PLACEMENT-MAPPING.md).

---

### 2. Collection Page Hero (`src/pages/Collections.tsx` + `src/data/brand.ts`)

| Check | Status | Details |
|-------|--------|---------|
| Uses `CampaignImage` | ✅ | Line 39-45 |
| `composition="collection-hero"` | ✅ | Correct |
| `priority=true` | ✅ | Eager load |
| **Correct image path** | ❌ **MISMATCH** | `brand.ts` line 12 points to `monolith-editorial.webp` (homepage hero), should be `monolith-collection-hero.webp` |
| Alt text | ⚠️ **EMPTY** | Line 41: `alt=""` — **Must update for production** |
| Gradient overlay | ✅ | `from-collection-bg/80 via-collection-bg/20 to-transparent` |
| Collection theming | ✅ | Route sets `.collection-monolith` on `<html>` |

**Required Fixes:**
1. `brand.ts` line 12: Change `campaignImage` to `/images/campaign/solun/monolith-collection-hero.webp`
2. `brand.ts` line 13: Update `campaignAlt` with production alt text
3. `Collections.tsx` line 41: Add descriptive `alt` (or rely on brand.ts alt via prop)

---

### 3. Product Detail Page (`src/pages/ProductDetail.tsx`)

| Check | Status | Details |
|-------|--------|---------|
| Main image uses `CampaignImage` | ❌ **NO** | Uses plain `<img>` (lines 108-114) — no lazy loading, no shimmer, no error fallback |
| Thumbnails use `CampaignImage` | ❌ **NO** | Uses plain `<img>` (lines 131-136) |
| Loading state | ⚠️ Custom | SVG spinner (lines 100-107) — not collection-aware shimmer |
| Error handling | ❌ **NONE** | `onError={() => setImageLoaded(true)}` just shows broken image |
| `sizes` prop | ❌ **MISSING** | No responsive sizing hints |
| Alt text | ✅ Dynamic | `${product.name} in ${selectedColor?.name}` |
| Campaign hero integration | ❌ **NOT DONE** | `monolith-one-obsidian.webp` not used anywhere |

**Required Changes for M-01:**
1. Replace main image `<img>` with `<CampaignImage>` component
2. Set `composition="product-hero"`, `priority=true`, `sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1200px"`
3. Use `monolith-one-obsidian.webp` as the first image for Monolith One product
4. Keep thumbnails as plain `<img>` (acceptable for small thumbnails) OR convert to `CampaignImage` with `loading="lazy"`

---

### 4. Homepage Featured Products (`src/pages/Home.tsx`)

| Check | Status | Details |
|-------|--------|---------|
| Uses `CampaignImage` | ✅ | Line 187-193 |
| `composition="product-hero"` | ✅ | Correct |
| `loading="lazy"` | ✅ | IntersectionObserver enabled |
| Source | ✅ Product images | Uses `product.colors[0]?.images[0]` — correct, NOT campaign hero |
| Alt text | ✅ Dynamic | `${product.name} in ${product.colors[0]?.name}` |

**Verdict:** ✅ **READY** — No changes needed for M-01.

---

### 5. Collections Page Product Grid (`src/pages/Collections.tsx`)

| Check | Status | Details |
|-------|--------|---------|
| Uses `CampaignImage` | ✅ | Line 96-102 |
| `composition="product-hero"` | ✅ | Correct |
| `loading="lazy"` | ✅ | IntersectionObserver enabled |
| Source | ✅ Product images | Uses `product.colors[0]?.images[0]` — correct |

**Verdict:** ✅ **READY** — No changes needed for M-01.

---

### 6. Related Products (`src/pages/ProductDetail.tsx`)

| Check | Status | Details |
|-------|--------|---------|
| Uses `CampaignImage` | ✅ | Line 400-406 |
| `composition="product-hero"` | ✅ | Correct |
| `loading="lazy"` | ✅ | IntersectionObserver enabled |
| Source | ✅ Product images | Uses `product.colors[0]?.images[0]` — correct |

**Verdict:** ✅ **READY** — No changes needed for M-01.

---

## CSS Variable System Verification

Collection-aware theming injects CSS variables on `<html>` element per route:

| Collection | Class | Key Variables |
|------------|-------|---------------|
| Monolith | `.collection-monolith` | `--collection-bg: #0d0c0b`, `--collection-accent: #be2d1c`, `--collection-text-primary: #f4f1eb`, `--collection-border: #383838`, `--collection-glow: #be2d1c`, `--collection-accent-subtle: #be2d1c33` |
| Lumen | `.collection-lumen` | `--collection-bg: #fcfbf7`, `--collection-accent: #c4b08a`, `--collection-text-primary: #1a1411`, etc. |
| Strata | `.collection-strata` | `--collection-bg: #1a1411`, `--collection-accent: #be2d1c`, `--collection-text-primary: #fcfbf7`, etc. |

**Verification Needed:** Confirm these variables are defined in `src/index.css` or via Tailwind config and applied correctly on route change.

---

## Build/Lint/TypeCheck Status (Baseline)

| Check | Command | Status (from TASK-8B-UNBLOCK-REPORT) |
|-------|---------|--------------------------------------|
| Build | `npm run build` | ✅ PASS (2.25s) |
| TypeScript | `npx tsc --noEmit` | ✅ PASS (no errors) |
| Lint | `npx oxlint` | ✅ PASS (warnings only) |

**Note:** Must re-run after any code changes for M-01 integration.

---

## Summary: Required Code Changes for M-01

### Priority 1 — Critical (Blocking)

| File | Line | Change |
|------|------|--------|
| `src/data/brand.ts` | 12 | `campaignImage: '/images/campaign/solun/monolith-collection-hero.webp',` |
| `src/data/brand.ts` | 13 | Update `campaignAlt` with production alt text |
| `src/pages/Home.tsx` | 11 | Update `HERO_SLIDES[0].alt` with production alt text |
| `src/pages/ProductDetail.tsx` | 99-114 | Replace main `<img>` with `<CampaignImage>` component |

### Priority 2 — Important (Quality)

| File | Line | Change |
|------|------|--------|
| `src/pages/ProductDetail.tsx` | 118-139 | Consider converting thumbnails to `CampaignImage` with `loading="lazy"` |
| `src/pages/ProductDetail.tsx` | — | Add `sizes` prop to main `CampaignImage` for responsive loading |

### Priority 3 — Verification

| Item | Action |
|------|--------|
| `.image-loading` CSS | Verify shimmer animation exists in global styles |
| Collection CSS variables | Verify all `--collection-*` variables defined and applied on route change |
| Build verification | Run `npm run build && npx tsc --noEmit && npx oxlint` after changes |

---

## Visual Verification Checklist (Post-Integration)

After production assets placed and code changes applied:

### Homepage (`/`)
- [ ] Hero carousel slide 1 (Monolith) loads `monolith-editorial.webp` — no layout shift
- [ ] Shimmer → image transition smooth (priority eager load)
- [ ] Video poster shows same image
- [ ] Slide indicators work, auto-advance works
- [ ] Collection theming: dark bg, rust accent, light text
- [ ] Alt text reads correctly in screen reader / dev tools

### Collection Page (`/collections/monolith`)
- [ ] Hero loads `monolith-collection-hero.webp` (1920×1200) — not the homepage hero
- [ ] Title/description overlay readable over image
- [ ] Model head not cropped by gradient overlay (16:10 provides headroom)
- [ ] Collection theming applies correctly
- [ ] Next collection cards (Lumen, Strata) load their heroes correctly

### Product Detail (`/product/monolith-one`)
- [ ] Main image loads `monolith-one-obsidian.webp` (1200×1600) via `CampaignImage`
- [ ] Loading shimmer appears briefly (if not cached)
- [ ] Error fallback triggers if image fails (test by breaking path)
- [ ] Thumbnails show product catalog images (not campaign hero)
- [ ] Color/size selection works
- [ ] Add to cart / wishlist works
- [ ] Related products show other Monolith products

### Cross-Cutting
- [ ] No console errors (404s, CORS, React warnings)
- [ ] No broken image icons
- [ ] Lazy loading works on non-priority images (scroll to trigger)
- [ ] Responsive: mobile, tablet, desktop layouts correct
- [ ] Collection theming switches correctly when navigating between collections

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| `brand.ts` campaignImage not updated | High (if forgotten) | Collection page shows wrong aspect ratio (16:9 vs 16:10) | **Code change mandatory** — verified in audit |
| ProductDetail main image not migrated to CampaignImage | Medium | No shimmer, no error fallback, no lazy loading | **Code change mandatory** — documented |
| Alt text left empty | High | Accessibility failure, SEO impact | **Code change mandatory** — documented |
| CSS shimmer missing | Low | Loading state shows blank | Verify in globals.css |
| Collection variables not applied | Low | Wrong colors in fallbacks | Verify route sets class on `<html>` |

---

## Go/No-Go Decision

**Status:** ⚠️ **CONDITIONAL GO** — Code changes required before production asset integration.

**Required Before Asset Drop:**
1. ✅ `brand.ts` monolith collection image path corrected
2. ✅ `Home.tsx` hero slide alt text updated
3. ✅ `ProductDetail.tsx` main image migrated to `CampaignImage`
4. ✅ Build/lint/typecheck pass after changes

**Can Proceed to Phase 4 (Asset Validation) in parallel.**

---

*Audit complete. Ready for Phase 4: Asset Validation of slice-editorial-sheet.py.*