# M-01 Monolith One-Piece Hero — Placement Mapping

**Date:** 2026-11-27  
**Status:** Mapping complete — ready for production asset integration  
**Branch:** `editorial-assets`  
**Brief Reference:** `IMAGEGEN-PRODUCTION-BRIEFS.md` → M-01

---

## M-01 Production Outputs (from Brief)

| Output Role | Filename | Dimensions | Aspect Ratio | Format | Max Size |
|-------------|----------|------------|--------------|--------|----------|
| **Homepage Hero** | `monolith-editorial.webp` | 1920×1080 | 16:9 | WebP 85 | 2 MB |
| **Collection Hero** | `monolith-collection-hero.webp` | 1920×1200 | 16:10 | WebP 85 | 2 MB |
| **Product Detail** | `monolith-one-obsidian.webp` | 1200×1600 | 3:4 (portrait) | WebP 85 | 2 MB |

**Source Requirement:** Single 3:4 vertical source (1200×1600 native) → cropped to 16:9 and 16:10 for hero/collection uses.

---

## Current Placeholder Status

| Filename | Dimensions | Size | Status | Location |
|----------|------------|------|--------|----------|
| `monolith-editorial.webp` | 1920×1080 | 18.1 KB | Placeholder (watermarked) | `public/images/campaign/solun/` |
| `monolith-collection-hero.webp` | 1920×1200 | 21.3 KB | Placeholder (watermarked) | `public/images/campaign/solun/` |
| `monolith-one-obsidian.webp` | 1200×1600 | 19.4 KB | Placeholder (watermarked) | `public/images/campaign/solun/` |

---

## Code Integration Mapping

### 1. Homepage Hero Carousel — **CORRECTLY MAPPED**

**File:** `src/pages/Home.tsx` (line 11)  
**Component:** `CampaignImage` with `composition="hero"`, `priority=true`  
**Current Path:** `/images/campaign/solun/monolith-editorial.webp`  
**Target Filename:** `monolith-editorial.webp` ✓ **MATCHES BRIEF**

```tsx
// HERO_SLIDES[0]
{
  id: 'monolith',
  image: '/images/campaign/solun/monolith-editorial.webp',  // ← Uses homepage hero file
  alt: 'SOLUN Monolith collection — model in obsidian bikini against basalt formations',
  ...
}
```

**Rendering:**
- Full-screen hero section (min-h-[700px], h-screen)
- `object-cover` on absolute inset container
- Video poster also uses this image
- Collection-aware theming via `.collection-monolith` on `<html>`

**Alt Text (Current):** `"SOLUN Monolith collection — model in obsidian bikini against basalt formations"`  
**Alt Text (Required for Production):** Must describe specific model, garment construction details, environment per EDITORIAL-ASSET-HANDOFF.md

---

### 2. Collection Page Hero (`/collections/monolith`) — **MISMATCH: CODE USES WRONG FILE**

**File:** `src/pages/Collections.tsx` (line 40) + `src/data/brand.ts` (line 12)  
**Component:** `CampaignImage` with `composition="collection-hero"`, `priority=true`  
**Current Path (brand.ts):** `/images/campaign/solun/monolith-editorial.webp` ← **HOMEPAGE HERO FILE**  
**Target Filename (Brief):** `monolith-collection-hero.webp` ← **DIFFERENT FILE (1920×1200)**

```tsx
// brand.ts line 12
campaignImage: '/images/campaign/solun/monolith-editorial.webp',  // ← WRONG FILE

// Collections.tsx line 39-40
<CampaignImage
  src={collection.campaignImage}  // ← Reads from brand.ts
  alt=""
  className="w-full h-full object-cover"
  priority
  composition="collection-hero"
/>
```

**Rendering:**
- Min-height 60vh section, anchored to bottom
- Gradient overlay `from-collection-bg/80 via-collection-bg/20 to-transparent`
- Collection title/description overlay

**Required Fix:** Update `brand.ts` line 12 to:
```ts
campaignImage: '/images/campaign/solun/monolith-collection-hero.webp',
campaignAlt: 'Monolith collection landing — model in obsidian one-piece against volcanic basalt, hard sunlight',
```

**Aspect Ratio Note:** Collection hero uses 16:10 (1920×1200) vs homepage 16:9 (1920×1080). The extra vertical space accommodates the collection title overlay without cropping the model's head.

---

### 3. Product Detail Page — **NOT USING CAMPAIGN IMAGE**

**File:** `src/pages/ProductDetail.tsx` (lines 99-114, 118-139)  
**Current Implementation:** Plain `<img>` tag (NOT `CampaignImage` component)  
**Current Source:** `product.colors[0]?.images[0]` → `/images/products/monolith-one/obsidian-hero.jpg` (from brand.ts)  
**Target Filename (Brief):** `monolith-one-obsidian.webp` (in `/images/campaign/solun/`) ← **DIFFERENT PATH & FORMAT**

```tsx
// ProductDetail.tsx line 108-114 — Main image (plain img, not CampaignImage)
<img
  src={currentImage}  // ← From selectedColor.images (product images, not campaign)
  alt={`${product.name} in ${selectedColor?.name}`}
  className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
  onLoad={() => setImageLoaded(true)}
  onError={() => setImageLoaded(true)}
/>

// Line 118-139 — Thumbnails (plain img tags)
{currentImages.map((img: string, index: number) => (
  <button ...>
    <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
  </button>
))}
```

**Product Images in brand.ts (lines 45-49, 90):**
```ts
const MONOLITH_COLORS: ColorVariant[] = [
  { id: 'obsidian', name: 'Obsidian', hex: '#1e1e1e', 
    images: [
      '/images/products/monolith-one/obsidian-hero.jpg',   // ← Product images
      '/images/products/monolith-one/obsidian-back.jpg',
      '/images/products/monolith-one/obsidian-detail.jpg'
    ], inStock: true },
  ...
];
```

**Gap Analysis:**
| Aspect | Current | Brief Target |
|--------|---------|--------------|
| **Component** | Plain `<img>` | Should use `CampaignImage` with `composition="product-hero"` |
| **Source Path** | `/images/products/monolith-one/...` | `/images/campaign/solun/monolith-one-obsidian.webp` |
| **Format** | JPEG | WebP |
| **Dimensions** | Unknown (product images) | 1200×1600 (3:4 portrait) |
| **Lazy Loading** | Native `loading="lazy"` on thumbnails only | `CampaignImage` handles IntersectionObserver |
| **Loading State** | Custom spinner SVG | `CampaignImage` shimmer + `ImageFallback` |
| **Error Fallback** | None (just shows broken) | `PlaceholderComposition` via `CampaignImage` |

**Recommendation:** The brief's `monolith-one-obsidian.webp` is a **campaign hero shot** for the product detail page — distinct from the product catalog images (front/back/detail). Two integration options:

**Option A — Replace Main Hero Only:**
- Use `monolith-one-obsidian.webp` as the primary product detail hero (first image)
- Keep product catalog images (front/back/detail) for thumbnails/gallery
- Update `ProductDetail.tsx` to use `CampaignImage` for main image with `priority=true`

**Option B — Full Campaign Gallery:**
- Replace all product images with campaign variants
- Requires 3 campaign images per product (hero, back, detail)
- Not in current brief scope

**Option A is recommended** for M-01 integration.

---

### 4. Homepage Featured Products — **USES PRODUCT IMAGES, NOT CAMPAIGN**

**File:** `src/pages/Home.tsx` (line 188)  
**Component:** `CampaignImage` with `composition="product-hero"`, `loading="lazy"`  
**Current Source:** `product.colors[0]?.images[0]` → `/images/products/monolith-one/obsidian-hero.jpg`  
**Note:** This is the product catalog image, NOT the campaign hero. The campaign hero (`monolith-one-obsidian.webp`) is NOT used here.

```tsx
// Home.tsx line 187-193
<CampaignImage
  src={product.colors[0]?.images[0] || '/images/placeholder-product.jpg'}  // ← Product image
  alt={`${product.name} in ${product.colors[0]?.name}`}
  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
  composition="product-hero"
  loading="lazy"
/>
```

**Verdict:** No change needed for M-01. This correctly uses product catalog images.

---

### 5. Collections Page Product Grid — **USES PRODUCT IMAGES**

**File:** `src/pages/Collections.tsx` (line 97)  
**Component:** `CampaignImage` with `composition="product-hero"`, `loading="lazy"`  
**Current Source:** `product.colors[0]?.images[0]` → product catalog images  
**Verdict:** No change needed for M-01.

---

### 6. ProductDetail Related Products — **USES PRODUCT IMAGES**

**File:** `src/pages/ProductDetail.tsx` (line 401)  
**Component:** `CampaignImage` with `composition="product-hero"`, `loading="lazy"`  
**Current Source:** `product.colors[0]?.images[0]` → product catalog images  
**Verdict:** No change needed for M-01.

---

## CampaignImage Component Behavior (Reference)

**File:** `src/components/ui/CampaignImage.tsx`

| Prop | Homepage Hero | Collection Hero | Product Hero (Featured) | Product Detail (Proposed) |
|------|---------------|-----------------|------------------------|---------------------------|
| `composition` | `"hero"` | `"collection-hero"` | `"product-hero"` | `"product-hero"` |
| `priority` | `true` | `true` | `false` | `true` (main image) |
| `loading` | `"eager"` (via priority) | `"eager"` (via priority) | `"lazy"` | `"eager"` (main) / `"lazy"` (thumbs) |
| `sizes` | Not set | Not set | Not set | `"100vw"` (or specific) |
| **Loading State** | Shimmer + `ImageFallback` overlay | Shimmer + `ImageFallback` overlay | Shimmer only (lazy) | Shimmer + `ImageFallback` |
| **Error Fallback** | `ImageFallback` (placeholder composition) | `ImageFallback` | `ImageFallback` | `ImageFallback` |
| **IntersectionObserver** | Disabled (priority) | Disabled (priority) | Enabled (100px rootMargin) | Disabled (priority for main) |

**PlaceholderComposition** (`src/components/ui/PlaceholderComposition.tsx`) renders collection-aware SVG placeholders per composition type:
- `hero` / `collection-hero`: Large architectural silhouette
- `product-hero`: Product card silhouette
- `editorial`: Editorial frame
- `atelier`: Hands/tools icon
- `detail`: Macro texture pattern

---

## Object-Position Requirements

| Placement | Composition | Object-Fit | Object-Position Notes |
|-----------|-------------|------------|----------------------|
| Homepage Hero | `hero` | `cover` | Model on right third (per brief), strap loop leads to left third. Safe area: center 60% vertically. |
| Collection Hero | `collection-hero` | `cover` | Model centered vertically; extra 120px height (16:10 vs 16:9) accommodates title overlay at bottom. Head must not be in bottom 20%. |
| Product Detail Main | `product-hero` | `cover` | Full garment visible (3:4 portrait). Model centered. Strap architecture readable. |
| Product Thumbnails | `product-hero` | `cover` | 80×80px crops — center-weighted, show garment recognition. |

---

## Alt Text Requirements (Per EDITORIAL-ASSET-HANDOFF.md)

Each production asset must have descriptive alt text written at integration time:

| Filename | Required Alt Text Pattern |
|----------|---------------------------|
| `monolith-editorial.webp` | `"SOLUN Monolith One-Piece in obsidian — [model description: ethnicity, build, age range] standing in shallow dark pool against columnar basalt formations, hard 45° side-lighting from right, continuous loop strap architecture visible from center-front neck over shoulder to center-back, matte ECONYL fabric with zero sheen, volcanic basalt texture sharp in background"` |
| `monolith-collection-hero.webp` | `"SOLUN Monolith collection landing — [model description] in obsidian Monolith One-Piece against volcanic basalt columns, hard directional sunlight revealing garment architecture and rock texture, continuous strap loop creates leading line across frame, 16:10 frame allows full figure with headroom for collection title overlay"` |
| `monolith-one-obsidian.webp` | `"SOLUN Monolith One-Piece obsidian front view — [model description] wearing single-piece regenerative ECONYL one-piece with continuous loop strap (center-front → shoulder → center-back → under-bust → center-front), high-cut French leg, bonded waistline, matte obsidian fabric, internal powernet shelf bra implied by structure, 3:4 portrait composition"` |

**Model Description Template:** `"adult [ethnicity] woman, [age range], [build description], natural anatomy"`  
Example: `"adult South Asian woman, late 20s, athletic build with visible muscle tone, natural breast shape and ribcage structure"`

---

## Integration Checklist for M-01

### Code Changes Required

- [ ] **brand.ts line 12:** Update `campaignImage` for monolith collection from `monolith-editorial.webp` → `monolith-collection-hero.webp`
- [ ] **brand.ts line 13:** Update `campaignAlt` for monolith collection with production-ready alt text
- [ ] **ProductDetail.tsx:** Refactor main image to use `CampaignImage` component with `composition="product-hero"`, `priority=true`
- [ ] **ProductDetail.tsx:** Add `sizes` prop for responsive loading (e.g., `sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1200px"`)
- [ ] **ProductDetail.tsx:** Ensure `monolith-one-obsidian.webp` is used as the first/main image for Monolith One product

### Asset Validation (Per Brief Quality Gates)

- [ ] Garment strap loop continuous — no visible break/join
- [ ] No hardware visible — bonded channels only
- [ ] Fabric matte — zero sheen/specular on ECONYL
- [ ] Model adult, diverse, natural anatomy
- [ ] Basalt texture readable — columnar jointing visible
- [ ] No grid lines, contact sheet artifacts, borders
- [ ] No clipped face, hands, feet, garment edges
- [ ] No unintended text, logos, watermarks
- [ ] Dimensions exact: 1920×1080, 1920×1200, 1200×1600
- [ ] Format: WebP, quality 85, ≤2 MB each
- [ ] Color space: sRGB
- [ ] Alt text written and descriptive

### Visual Verification (Browser)

- [ ] Homepage hero carousel slide 1 loads `monolith-editorial.webp` — no layout shift, shimmer → image transition smooth
- [ ] `/collections/monolith` hero loads `monolith-collection-hero.webp` — title overlay readable, model head not cropped
- [ ] `/product/monolith-one` main image loads `monolith-one-obsidian.webp` — `CampaignImage` loading state works, error fallback triggers correctly
- [ ] Collection-aware theming applies (`.collection-monolith` on `<html>`) — colors correct
- [ ] No console errors, no broken image icons
- [ ] Lazy loading works on non-priority images (featured products, related products)

---

## File Structure After Integration

```
public/images/campaign/solun/
├── monolith-editorial.webp           ← Homepage hero (1920×1080) ✓
├── monolith-collection-hero.webp     ← Collection hero (1920×1200) ✓
├── monolith-one-obsidian.webp        ← Product detail hero (1200×1600) ✓
├── monolith-bikini-obsidian.webp     ← M2 placeholder (unchanged)
├── monolith-asym-charcharcoal.webp   ← M4 placeholder (unchanged)
├── lumen-coastal-blue.webp           ← L-01 homepage hero (unchanged)
├── lumen-collection-hero.webp        ← L-01 collection hero (unchanged)
├── lumen-one-pearl.webp              ← L-01 product (unchanged)
├── ... (other placeholders unchanged)
```

---

## Dependencies on Other Briefs

- **M-02** uses `campaign-cast.webp` (Monolith variant) and `monolith-asym-charcharcoal.webp` — separate brief
- **L-01, L-02, S-01, S-02** — independent collections, no cross-dependencies
- **Shared:** `campaign-cast.webp` serves 3 collection variants — may need 3 distinct production files

---

## Next Steps

1. **Generate M-01 assets** via ChatGPT ImageGen using brief specifications
2. **Validate each asset** against quality gates at 100% zoom
3. **Replace placeholders** in `public/images/campaign/solun/` with production files
4. **Apply code changes** listed in Integration Checklist
5. **Run visual verification** in browser (all 3 placements)
6. **Update CAMPAIGN-ASSET-MANIFEST.md** with production status
7. **Commit to editorial-assets branch**

---

*Mapping complete. Ready for Phase 3: Image Integration Readiness Audit.*