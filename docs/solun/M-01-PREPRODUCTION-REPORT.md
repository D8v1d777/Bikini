# M-01 PREPRODUCTION REPORT

**Date:** 2026-11-27  
**Phase:** 6 of 6 — Checkpoint with Build/TS/Lint & Report  
**Branch:** `editorial-assets`  
**Commit:** `72d98a3` "Refresh Solun campaign imagery and hero film"  
**Status:** **CONDITIONAL GO** — Code fixes required before production asset integration

---

## Executive Summary

This report documents the completion of the 6-phase M-01 pre-production readiness assessment for the SOLUN Monolith One-Piece Hero (Obsidian) campaign imagery. The assessment covers placement mapping, integration readiness audit, asset validation, visual verification, and build health checks.

**Bottom Line:** The codebase infrastructure is **production-ready** for campaign imagery. Three critical code fixes are required before M-01 production assets can be properly integrated. Once these fixes are applied, the website will correctly render all three M-01 asset placements with proper loading states, error fallbacks, accessibility, and collection-aware theming.

---

## Phase Completion Status

| Phase | Task | Status | Artifact |
|-------|------|--------|----------|
| **1** | M-01 Placement Mapping | ✅ **COMPLETE** | `M-01-PLACEMENT-MAPPING.md` |
| **2** | Image Integration Readiness Audit | ✅ **COMPLETE** | `M-01-IMAGE-INTEGRATION-AUDIT.md` |
| **3** | Asset Validation (slice-editorial-sheet.py) | ✅ **COMPLETE** | `M-01-ASSET-VALIDATION.md` |
| **4** | Existing Visual Verification (Dev Server) | ✅ **COMPLETE** | `M-01-VISUAL-VERIFICATION.md` |
| **5** | Build/TS/Lint Checkpoint | ✅ **COMPLETE** | This report |
| **6** | Pre-production Report | ✅ **COMPLETE** | This report |

---

## M-01 Asset Specifications (from IMAGEGEN-PRODUCTION-BRIEFS.md)

| Output Role | Filename | Dimensions | Aspect | Format | Max Size | Placement |
|-------------|----------|------------|--------|--------|----------|-----------|
| **Homepage Hero** | `monolith-editorial.webp` | 1920×1080 | 16:9 | WebP 85 | 2 MB | `/` hero carousel slide 1 |
| **Collection Hero** | `monolith-collection-hero.webp` | 1920×1200 | 16:10 | WebP 85 | 2 MB | `/collections/monolith` hero |
| **Product Detail** | `monolith-one-obsidian.webp` | 1200×1600 | 3:4 | WebP 85 | 2 MB | `/product/monolith-one` main image |

**Source Requirement:** Single 3:4 vertical source (1200×1600 native) → cropped to 16:9 and 16:10.

---

## Critical Code Fixes Required (P0 — Blocking)

### Fix 1: brand.ts — Collection Hero Image Paths

**File:** `src/data/brand.ts`  
**Lines:** 12, 21, 30

```typescript
// CURRENT (lines 11-14) — WRONG: Uses homepage hero for collection hero
{
  id: 'monolith',
  name: 'MONOLITH',
  ...
  campaignImage: '/images/campaign/solun/monolith-editorial.webp',  // ← 16:9 homepage hero
  campaignAlt: 'Monolith collection campaign — model in volcanic sand bikini against basalt formations',
  ...
}

// REQUIRED — Use 16:10 collection hero
{
  id: 'monolith',
  name: 'MONOLITH',
  ...
  campaignImage: '/images/campaign/solun/monolith-collection-hero.webp',  // ← 16:10 collection hero
  campaignAlt: 'Monolith collection landing — model in obsidian Monolith One-Piece against volcanic basalt, hard directional sunlight revealing garment architecture and rock texture, continuous strap loop creates leading line across frame, 16:10 frame allows full figure with headroom for collection title overlay',
  ...
}
```

**Same fix needed for Lumen (line 21) and Strata (line 30).**

**Impact:** Without this fix, collection pages display the 16:9 homepage hero image in a 16:10 slot, causing the model's head to be cropped by the title overlay gradient.

---

### Fix 2: Home.tsx — Homepage Hero Alt Text

**File:** `src/pages/Home.tsx`  
**Lines:** 8-39 (`HERO_SLIDES` array)

```typescript
// CURRENT — Empty alt text
const HERO_SLIDES = [
  {
    id: 'monolith',
    image: '/images/campaign/solun/monolith-editorial.webp',
    alt: '',  // ← EMPTY — ACCESSIBILITY FAILURE
    ...
  },
  ...
];

// REQUIRED — Descriptive alt text per EDITORIAL-ASSET-HANDOFF.md
const HERO_SLIDES = [
  {
    id: 'monolith',
    image: '/images/campaign/solun/monolith-editorial.webp',
    alt: 'SOLUN Monolith One-Piece in obsidian — adult South Asian woman, late 20s, athletic build with visible muscle tone, natural breast shape and ribcage structure, standing in shallow dark pool against columnar basalt formations, hard 45° side-lighting from right, continuous loop strap architecture visible from center-front neck over shoulder to center-back, matte ECONYL fabric with zero sheen, volcanic basalt texture sharp in background',
    ...
  },
  ...
];
```

**Impact:** Empty alt text violates WCAG 2.1 SC 1.1.1, hurts SEO, and fails editorial asset handoff requirements.

---

### Fix 3: ProductDetail.tsx — Main Image Migration to CampaignImage

**File:** `src/pages/ProductDetail.tsx`  
**Lines:** 99-114 (main image) + thumbnails (118-139)

**CURRENT — Plain `<img>` with custom spinner:**
```tsx
<div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-collection-border mb-4">
  {!imageLoaded && (
    <div className="absolute inset-0 flex items-center justify-center bg-collection-border">
      <svg className="animate-spin h-10 w-10 text-collection-text-muted" viewBox="0 0 24 24" fill="none">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
    </div>
  )}
  <img
    src={currentImage}
    alt={`${product.name} in ${selectedColor?.name}`}
    className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
    onLoad={() => setImageLoaded(true)}
    onError={() => setImageLoaded(true)}
  />
</div>
```

**REQUIRED — Use CampaignImage component:**
```tsx
import { CampaignImage } from '../components/ui/CampaignImage.tsx';

// In component:
<div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-collection-border mb-4">
  <CampaignImage
    src={currentImage}
    alt={`${product.name} in ${selectedColor?.name}`}
    composition="product-hero"
    priority={true}
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1200px"
    onLoad={() => setImageLoaded(true)}  // Keep for thumbnail sync if needed
  />
</div>
```

**For M-01 specifically:** When `product.id === 'monolith-one'` and `selectedColor?.id === 'obsidian'`, the `currentImage` should be `/images/campaign/solun/monolith-one-obsidian.webp` (the campaign hero), not the product catalog image.

**Implementation Options:**

**Option A (Minimal):** Replace main image only, keep thumbnails as plain `<img>` — ✅ Recommended
**Option B (Full):** Migrate thumbnails to `CampaignImage` with `loading="lazy"` — Nice to have

**Impact:** Without this fix:
- No shimmer loading state (uses custom spinner instead)
- No error fallback (broken image shows directly)
- No IntersectionObserver lazy loading (though priority=true for main)
- No `sizes` prop for responsive loading
- Inconsistent UX with rest of site

---

## Important Fixes (P1 — Quality)

### Fix 4: brand.ts — Lumen & Strata Collection Hero Paths

Same as Fix 1 for all three collections:

| Collection | Current (Wrong) | Required (Correct) |
|------------|-----------------|-------------------|
| Monolith | `monolith-editorial.webp` | `monolith-collection-hero.webp` |
| Lumen | `lumen-coastal-blue.webp` | `lumen-collection-hero.webp` |
| Strata | `strata-pool-editorial.webp` | `strata-collection-hero.webp` |

### Fix 5: Home.tsx — Lumen & Strata Hero Alt Text

Same as Fix 2 for all three slides in `HERO_SLIDES`.

---

## Build Health Checkpoint

| Check | Command | Result | Duration |
|-------|---------|--------|----------|
| **Build** | `npm run build` | ✅ PASS | 1.94s |
| **TypeScript** | `npx tsc --noEmit` | ✅ PASS (no errors) | ~3s |
| **Lint (oxlint)** | `npx oxlint` | ✅ PASS (warnings only) | ~2s |

**Warnings (Non-blocking):**
- `Footer.tsx:49` — `Date` impure function in render
- `CartContext.tsx:173` — Fast refresh only exports components
- `WishlistContext.tsx:48` — Fast refresh only exports components
- `ProductDetail.tsx:25,38` — setState in useEffect (architectural)
- `useMediaQuery.ts:9` — setState in effect

---

## Infrastructure Readiness Summary

| System | Status | Notes |
|--------|--------|-------|
| **CampaignImage Component** | ✅ Ready | Lazy load, shimmer, fallback, priority, composition variants |
| **StaticCampaignImage** | ✅ Ready | Eager load for above-fold |
| **PlaceholderComposition** | ✅ Ready | 6 composition types, collection-aware (except hero) |
| **Image Loading Shimmer** | ✅ Ready | CSS variables, reduced motion support |
| **Error Fallback Chain** | ✅ Ready | CampaignImage → ImageFallback → PlaceholderComposition |
| **Collection-Aware Theming** | ✅ Ready | CSS variables on `<html>` via `useCollectionTheme` hook |
| **Route Coverage** | ✅ Ready | All 13 routes accessible, SPA shell loads |
| **Image Accessibility** | ✅ Ready | All 32+ placeholders HTTP 200, correct MIME types |
| **Responsive Design** | ✅ Ready | Mobile/Tablet/Desktop breakpoints work |
| **Accessibility (ARIA)** | ✅ Ready | Proper roles, labels, current states |

---

## M-01 Integration Checklist

### Pre-Integration (Code Fixes)
- [ ] **Fix 1:** Update `brand.ts` monolith `campaignImage` → `monolith-collection-hero.webp`
- [ ] **Fix 1b:** Update `brand.ts` monolith `campaignAlt` with production alt text
- [ ] **Fix 1c:** Update `brand.ts` lumen `campaignImage` → `lumen-collection-hero.webp`
- [ ] **Fix 1d:** Update `brand.ts` lumen `campaignAlt` with production alt text
- [ ] **Fix 1e:** Update `brand.ts` strata `campaignImage` → `strata-collection-hero.webp`
- [ ] **Fix 1f:** Update `brand.ts` strata `campaignAlt` with production alt text
- [ ] **Fix 2:** Update `Home.tsx` `HERO_SLIDES[0].alt` with production alt text
- [ ] **Fix 2b:** Update `Home.tsx` `HERO_SLIDES[1].alt` with production alt text
- [ ] **Fix 2c:** Update `Home.tsx` `HERO_SLIDES[2].alt` with production alt text
- [ ] **Fix 3:** Migrate `ProductDetail.tsx` main image to `CampaignImage` component
- [ ] **Fix 3b:** Add `sizes` prop to main `CampaignImage`
- [ ] **Fix 3c:** Ensure `monolith-one-obsidian.webp` used for Monolith One obsidian color
- [ ] **Verify:** `npm run build && npx tsc --noEmit && npx oxlint` all pass

### Asset Integration
- [ ] Receive M-01 production assets from ChatGPT ImageGen (3 files)
- [ ] Validate each against quality gates (brief checklist)
- [ ] Replace placeholders in `public/images/campaign/solun/`
- [ ] Update `CAMPAIGN-ASSET-MANIFEST.md` with production status

### Post-Integration Visual Verification
- [ ] Homepage hero carousel slide 1 loads correctly
- [ ] `/collections/monolith` hero loads correct 16:10 image, title readable
- [ ] `/product/monolith-one` main image loads via CampaignImage with shimmer
- [ ] Collection theming correct on all Monolith routes
- [ ] No console errors, no broken images
- [ ] Lazy loading works on non-priority images
- [ ] Error fallback triggers correctly (test with broken path)

### Documentation Updates
- [ ] Update `CAMPAIGN-ASSET-MANIFEST.md` — status → "Production", add file sizes, verification date
- [ ] Update `M-01-PLACEMENT-MAPPING.md` — mark fixes applied
- [ ] Commit all changes to `editorial-assets` branch

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Production assets don't match brief specs | Medium | High | Validate at 100% zoom against quality gates before acceptance |
| ChatGPT ImageGen delivers contact sheets not individual files | Low | Medium | `slice-editorial-sheet.py` validated and ready |
| Collection hero 16:10 crop cuts model's head | High (if Fix 1 not done) | High | **Fix 1 mandatory** — use correct 16:10 asset |
| Alt text quality insufficient for accessibility | Medium | Medium | Follow EDITORIAL-ASSET-HANDOFF.md template |
| Product detail campaign hero doesn't match product catalog images | Medium | Low | Acceptable — campaign hero is editorial, catalog is commercial |
| Build fails after code fixes | Low | High | Run build after each fix, revert if needed |

---

## Next Steps (Priority Order)

1. **Apply P0 Fixes (1-3)** — ~30 minutes
2. **Run build verification** — ~2 minutes
3. **Receive M-01 assets from ChatGPT ImageGen** — External
4. **Validate assets against brief quality gates** — ~15 minutes
5. **Replace placeholders** — ~5 minutes
6. **Run post-integration visual verification** — ~20 minutes
7. **Update documentation & commit** — ~10 minutes
8. **Proceed to M-02, L-01, L-02, S-01, S-02** — Sequential

---

## File Inventory (This Assessment)

| Artifact | Purpose |
|----------|---------|
| `M-01-PLACEMENT-MAPPING.md` | Exact mapping of production filename → placeholder → component → page → aspect ratio → object-position |
| `M-01-IMAGE-INTEGRATION-AUDIT.md` | Component readiness, page placement verification, required code changes |
| `M-01-ASSET-VALIDATION.md` | slice-editorial-sheet.py functional test, validation logic, WebP optimization, manifest quality |
| `M-01-VISUAL-VERIFICATION.md` | Dev server HTTP checks, route accessibility, component rendering, loading states, fallbacks, accessibility |
| `M-01-PREPRODUCTION-REPORT.md` | This report — executive summary, fix list, checklist, risk register |

---

## Sign-Off

**Assessment Complete:** ✅ All 6 phases executed and documented  
**Codebase Status:** ✅ Build/TS/Lint clean  
**Infrastructure Status:** ✅ Ready for production assets  
**Blockers:** 3 P0 code fixes required (documented above)  
**Recommendation:** Apply fixes, then proceed with M-01 asset integration

---

*Report generated 2026-11-27. Branch: editorial-assets. Commit: 72d98a3.*