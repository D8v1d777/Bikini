# SOLUN Campaign ImageGen Production Briefs

**Date:** 2026-11-27  
**Status:** Ready for ChatGPT ImageGen production  
**Source:** CAMPAIGN-GARMENT-DIRECTION.md + SWIMWEAR-DESIGN-RESEARCH.md  
**Image Generation:** ChatGPT ImageGen (external)  
**Integration:** Claude Code repository work

---

## Overview

Six priority campaign images — two per collection — designed for immediate website integration. Each brief specifies an original SOLUN garment, adult model direction, environment, lighting, composition, and exact website placement.

**No Kling AI. No paid dependencies. ChatGPT ImageGen only.**

---

## Brief Structure

Each brief contains:
- **Garment** — Original SOLUN design from CAMPAIGN-GARMENT-DIRECTION.md
- **Model** — Adult, diverse ethnicity/build, natural anatomy
- **Environment** — Architectural/mineral location per collection
- **Lighting** — Collection-specific direction
- **Composition** — Editorial framing with intentional negative space
- **Camera** — Focal length, angle, aspect ratio
- **Placement** — Exact website component and route
- **Technical** — Dimensions, format, file naming

---

## MONOLITH COLLECTION — Two Campaign Images

### M-01: Monolith One-Piece Hero
**Website Placement:** Homepage hero carousel slide 1 (`/images/campaign/solun/monolith-editorial.webp`)  
**Collection Page:** `/collections/monolith` hero (`/images/campaign/solun/monolith-collection-hero.webp`)

#### Garment: M1 — Monolith One-Piece (Obsidian)
- Single-piece regenerative ECONYL® construction
- Continuous loop strap: center-front neck → over shoulder → center-back → under bust → center-front
- Zero hardware — bonded channels only
- Internal powernet shelf bra (80g)
- High-cut French leg, bonded waistline
- Matte obsidian (#0d0c0b), zero sheen

#### Model Direction
- **Adult woman, 25–35** — clearly adult, not youthful
- **Ethnicity:** Open — diverse casting encouraged (e.g., South Asian, Black, Latina, Indigenous, mixed)
- **Build:** Athletic to soft-athletic — visible muscle tone, natural proportions
- **Anatomy:** Realistic — natural breast shape, visible ribcage structure, human skin texture (pores, subtle variation)
- **Expression:** Confident, direct gaze or contemplative side profile — not performative sexuality
- **Pose:** Standing in shallow water or on basalt; weight shifted, one hip dropped; strap architecture visible

#### Environment
- **Location:** Volcanic basalt formation — columnar jointing, dark rock textures
- **Water:** Still dark pool reflecting rock forms
- **Atmosphere:** Minimal — rock, water, garment, body
- **No:** Vegetation, sky clutter, man-made structures beyond geological

#### Lighting
- **Quality:** Hard directional sunlight — late morning / early afternoon
- **Direction:** 45° side-lighting from camera-right — reveals garment architecture and rock texture
- **Shadows:** Deep, graphic — cast shadows become compositional elements
- **Highlights:** Specular on wet skin and water surface only — fabric remains matte
- **Color Temp:** 5200K — neutral daylight, no warm grading

#### Composition
- **Frame:** Vertical 3:4 (portrait) for hero; 16:10 for collection hero
- **Negative Space:** 30% frame — dark rock/water field around figure
- **Rule of Thirds:** Figure placed on right third; strap loop creates leading line to left third
- **Focus:** Sharp on garment construction details (strap channel, bonded seam, leg opening)
- **Depth:** Shallow — background rock slightly soft, figure tack-sharp

#### Camera
- **Focal Length:** 85mm equivalent (portrait) / 50mm equivalent (collection hero wider)
- **Angle:** Slightly low (waist-level) — empowers figure, shows garment architecture
- **Aperture:** f/4–f/5.6 — subject sharp, context readable
- **Aspect Ratios:** 
  - Homepage hero: 16:9 (1920×1080) — crop from 3:4 source
  - Collection hero: 16:10 (1920×1200) — crop from 3:4 source
  - Product detail: 3:4 (1200×1600) — native

#### Technical Requirements
| Output | Filename | Dimensions | Format | Max Size |
|--------|----------|------------|--------|----------|
| Homepage hero | `monolith-editorial.webp` | 1920×1080 | WebP 85 | 2 MB |
| Collection hero | `monolith-collection-hero.webp` | 1920×1200 | WebP 85 | 2 MB |
| Product detail | `monolith-one-obsidian.webp` | 1200×1600 | WebP 85 | 2 MB |

#### Quality Gates (Must Pass)
- [ ] Garment strap loop continuous — no visible break/join
- [ ] No hardware visible — bonded channels only
- [ ] Fabric matte — zero sheen/specular on ECONYL
- [ ] Model adult, diverse, natural anatomy
- [ ] Basalt texture readable — columnar jointing visible
- [ ] No grid lines, contact sheet artifacts, borders
- [ ] No clipped face, hands, feet, garment edges
- [ ] No unintended text, logos, watermarks

---

### M-02: Monolith Asymmetrical Editorial
**Website Placement:** Homepage campaign studies (`/images/campaign/solun/campaign-cast.webp` — Monolith variant)  
**Product Page:** Monolith Three (`/images/campaign/solun/monolith-asym-charcharcoal.webp`)

#### Garment: M4 — Monolith Asymmetrical (Charcoal)
- Single continuous loop, asymmetrical path: left CF neck → over left shoulder → right CB → under bust → left CF
- Asymmetrical powernet shelf (heavier on strap side)
- High-cut French leg, bonded waist
- Matte charcoal (#1a1a1a)

#### Model Direction
- **Adult woman, 30–40** — mature confidence
- **Ethnicity:** Distinct from M-01 (e.g., if M-01 is South Asian, this is Black or Indigenous or East Asian)
- **Build:** Taller, longer torso — shows asymmetrical architecture clearly
- **Pose:** Walking away from camera on basalt — back architecture visible, strap migration clear
- **Expression:** Not visible (back view) or profile — focused on movement

#### Environment
- **Same location as M-01** — continuity of place
- **Different rock formation** — more vertical columns, deeper crevices

#### Lighting
- **Quality:** Hard sunlight, lower angle (late afternoon)
- **Direction:** Backlight/side-light — rim light on figure, strap architecture in highlight
- **Shadows:** Long, dramatic — figure casts graphic shadow on rock

#### Composition
- **Frame:** Horizontal 4:3 (1200×900)
- **Figure:** Off-center, moving from right to left
- **Negative Space:** Basalt texture field dominates
- **Focus:** Strap architecture at shoulder/back junction

#### Camera
- **Focal Length:** 70mm equivalent
- **Angle:** Waist-level, slightly behind
- **Aspect Ratio:** 4:3 (1200×900)

#### Technical
| Output | Filename | Dimensions | Format |
|--------|----------|------------|--------|
| Campaign study | `campaign-cast.webp` (Monolith variant) | 1200×900 | WebP 85 |
| Product detail | `monolith-asym-charcharcoal.webp` | 1200×1600 | WebP 85 |

---

## LUMEN COLLECTION — Two Campaign Images

### L-01: Lumen One-Piece Hero
**Website Placement:** Homepage hero carousel slide 2 (`/images/campaign/solun/lumen-coastal-blue.webp`)  
**Collection Page:** `/collections/lumen` hero (`/images/campaign/solun/lumen-collection-hero.webp`)

#### Garment: L1 — Lumen Refractive One-Piece (Pearl/Sea Glass)
- Double-layer: outer translucent refractive mesh (60g) / inner opaque ECONYL (120g)
- Layers bonded only at perimeter — inner layer floats free at body
- Square neck, slender rouleau straps with hidden slider channels at back
- Inner layer: structured shelf bra + powernet
- Moderate high-cut, bonded leg openings
- Outer: pearl translucent / Inner: pearl matte (#fcfbf7)
- Refractive blue (#7aa8c0) mesh catches light at edges

#### Model Direction
- **Adult woman, 25–35**
- **Ethnicity:** Distinct from Monolith models (e.g., East Asian, Latina, mixed)
- **Build:** Soft-athletic to soft — natural curves, not hyper-lean
- **Anatomy:** Realistic — inner layer visible as subtle silhouette through mesh; refractive play on skin
- **Expression:** Serene, eyes closed or soft gaze — meditative, light-focused
- **Pose:** Standing in ankle-deep water at water's edge; water calm, reflecting sky

#### Environment
- **Location:** White architectural pool or sea-glass beach — minimal, pale surfaces
- **Water:** Still, mirror-like — reflects figure and light
- **Surfaces:** White concrete pool edge / pale sand / smooth stone
- **Atmosphere:** Quiet, luminous, spacious
- **No:** Dark rocks, vegetation, clutter

#### Lighting
- **Quality:** Soft diffuse — overcast morning or open shade
- **Direction:** Wrap-around — minimal shadows, maximum refractive play
- **Highlights:** Spectral — mesh catches and splits light at edges (prismatic)
- **Water Reflection:** Perfect mirror — figure doubled
- **Color Temp:** 6000K — cool, crisp, "dawn on water"

#### Composition
- **Frame:** Vertical 3:4 (portrait) for hero; 16:10 for collection hero
- **Negative Space:** 40% — pale water/surface field
- **Refraction Focus:** Mesh edges at neckline, leg openings, strap junctions — where light bends
- **Symmetry:** Centered figure — architectural balance
- **Depth:** Very shallow — reflection creates infinite plane

#### Camera
- **Focal Length:** 85mm equivalent (portrait) / 50mm equivalent (collection)
- **Angle:** Slightly high (chest-level) — captures reflection fully
- **Aperture:** f/2.8–f/4 — subject sharp, water surface soft
- **Aspect Ratios:**
  - Homepage hero: 16:9 (1920×1080)
  - Collection hero: 16:10 (1920×1200)
  - Product detail: 3:4 (1200×1600)

#### Technical Requirements
| Output | Filename | Dimensions | Format | Max Size |
|--------|----------|------------|--------|----------|
| Homepage hero | `lumen-coastal-blue.webp` | 1920×1080 | WebP 85 | 2 MB |
| Collection hero | `lumen-collection-hero.webp` | 1920×1200 | WebP 85 | 2 MB |
| Product detail | `lumen-one-pearl.webp` | 1200×1600 | WebP 85 | 2 MB |

#### Quality Gates
- [ ] Double-layer visible — inner opaque silhouette through outer mesh
- [ ] Refractive mesh edges prismatic — not just "shiny"
- [ ] No visible hardware — hidden slider channels only
- [ ] Water reflection perfect — no distortion
- [ ] Model adult, diverse, natural anatomy
- [ ] Pale environment — no dark elements
- [ ] No grid lines, artifacts, clipped subjects

---

### L-02: Lumen Bandeau Detail
**Website Placement:** Product detail Lumen Two (`/images/campaign/solun/lumen-bandeau-chalk.webp`)  
**Homepage:** Campaign studies variant (`/images/campaign/solun/strata-detailsilhouette.webp` — Lumen variant)

#### Garment: L2 — Lumen Refractive Bandeau (Chalk/Pearl)
- Straight bandeau, double-layer, clean CF and CB edges
- Detachable rouleau straps with concealed buttonholes in inner layer
- Inner layer: bonded powernet panel + flexible side boning
- Outer mesh drapes free — no attachment points
- Chalk outer / Pearl inner

#### Model Direction
- **Adult woman, 25–35** — distinct from L-01
- **Ethnicity:** Different from other Lumen/Monolith models
- **Build:** Broader shoulders — shows bandeau architecture
- **Pose:** Three-quarter view, one strap attached, one detached (demonstrates convertibility)
- **Expression:** Direct gaze, slight smile — intelligent engagement

#### Environment
- **Studio** — seamless white cyclorama
- **Single prop:** White marble plinth at waist height
- **Lighting only environment**

#### Lighting
- **Quality:** Controlled studio — large softbox overhead + fill card below
- **Direction:** Top-down dominant — models bandeau architecture
- **Refractive Play:** Mesh edges catch light at neckline, underarm, strap junctions
- **No:** Harsh shadows, color casts

#### Composition
- **Frame:** Vertical 3:4 (1200×1600)
- **Crop:** Chest to hip — bandeau architecture fills frame
- **Detail Focus:** Strap buttonhole, mesh layer separation, boning channel
- **Negative Space:** Minimal — white field above/below

#### Camera
- **Focal Length:** 100mm macro equivalent
- **Angle:** Straight-on, slight three-quarter
- **Aperture:** f/8 — maximum depth of field for construction detail
- **Aspect Ratio:** 3:4 (1200×1600)

#### Technical
| Output | Filename | Dimensions | Format |
|--------|----------|------------|--------|
| Product detail | `lumen-bandeau-chalk.webp` | 1200×1600 | WebP 85 |
| Campaign study | `strata-detailsilhouette.webp` (Lumen variant) | 1200×900 | WebP 85 |

---

## STRATA COLLECTION — Two Campaign Images

### S-01: Strata One-Piece Hero
**Website Placement:** Homepage hero carousel slide 3 (`/images/campaign/solun/strata-pool-editorial.webp`)  
**Collection Page:** `/collections/strata` hero (`/images/campaign/solun/strata-collection-hero.webp`)

#### Garment: S1 — Strata Layered One-Piece (Terracotta/Sienna/Ochre)
- Three horizontal bands: upper chest (light rib 180g), mid-torso (medium rib 220g), lower (heavy rib 280g)
- Square neck, wide ribbed straps (heavy weight)
- Hand-oxidized brass slides at back straps
- Exposed brass bars at side seams join bands — visible "geological folding"
- Fold-waist heavy rib band, moderate high-cut
- Terracotta (#c45a3a) / Sienna (#a0522d) / Ochre (#cc7722) tonal progression

#### Model Direction
- **Adult woman, 30–45** — mature, grounded presence
- **Ethnicity:** Distinct from all previous (e.g., Indigenous, Middle Eastern, Black, mixed)
- **Build:** Substantial — curves, weight, presence — garment sits on body naturally
- **Anatomy:** Realistic — rib texture visible stretching over curves; brass hardware at stress points
- **Expression:** Confident, grounded — not decorative
- **Pose:** Seated on sandstone pool edge, one leg in water; bands and folds clearly visible

#### Environment
- **Location:** Sculptural concrete pool with sandstone/terracotta tile surround
- **Geology:** Visible sedimentary layering in pool walls — echoes garment bands
- **Water:** Still, reflecting terracotta tiles
- **Atmosphere:** Warm, tactile, geological time

#### Lighting
- **Quality:** Golden hour — warm, directional, texture-revealing
- **Direction:** Low side-light (camera-left) — rakes across rib texture, catches brass oxidation
- **Shadows:** Long, soft — emphasizes band depth and fold shadows
- **Brass Highlights:** Warm glints on oxidized brass — not polished, patinated
- **Color Temp:** 3500K — warm, amber, geological

#### Composition
- **Frame:** Vertical 3:4 (portrait) for hero; 16:10 for collection hero
- **Negative Space:** 25% — water and tile field
- **Layer Focus:** Three bands clearly distinguished by weight/tonal shift
- **Hardware Focus:** Brass bars at side seams, strap slides — visible construction
- **Rule of Thirds:** Figure on left third; sedimentary wall on right third

#### Camera
- **Focal Length:** 85mm equivalent (portrait) / 50mm equivalent (collection)
- **Angle:** Eye-level — peer relationship with figure
- **Aperture:** f/4 — subject sharp, context readable
- **Aspect Ratios:**
  - Homepage hero: 16:9 (1920×1080)
  - Collection hero: 16:10 (1920×1200)
  - Product detail: 3:4 (1200×1600)

#### Technical Requirements
| Output | Filename | Dimensions | Format | Max Size |
|--------|----------|------------|--------|----------|
| Homepage hero | `strata-pool-editorial.webp` | 1920×1080 | WebP 85 | 2 MB |
| Collection hero | `strata-collection-hero.webp` | 1920×1200 | WebP 85 | 2 MB |
| Product detail | `strata-one-terracotta.webp` | 1200×1600 | WebP 85 | 2 MB |

#### Quality Gates
- [ ] Three distinct rib weights visible — tonal progression clear
- [ ] Brass hardware oxidized (not shiny) — patinated, warm
- [ ] Band joins at side seams visible — "geological folding"
- [ ] Fold-waist architecture clear — self-tensioning
- [ ] Model adult, diverse, substantial build
- [ ] Sedimentary environment — layering echoes garment
- [ ] No grid lines, artifacts, clipped subjects

---

### S-02: Strata Bandeau + Fold-Waist Detail
**Website Placement:** Product detail Strata Two (`/images/campaign/solun/strata-top-sienna.webp`) + Strata Three (`/images/campaign/solun/strata-bottom-ochre.webp`)  
**Homepage:** Campaign studies (`/images/campaign/solun/campaign-cast.webp` — Strata variant)

#### Garments: S2 (Structured Top) + S3 (Fold-Waist Bottom)
- **S2:** Two-band cup (light rib upper / medium rib lower), square neck, brass center-front clasp, wide heavy-rib straps with brass slides
- **S3:** Fold-over waistband (heavy rib), self-tensioning, heavy rib leg bands, brass tacks at CF/CB

#### Model Direction
- **Adult woman, 30–45** — distinct from S-01
- **Ethnicity:** Different from all previous models
- **Build:** Athletic-muscular — shows hardware function under load
- **Pose:** Standing, arms raised adjusting strap slide — brass hardware in action
- **Expression:** Focused on adjustment — functional, not decorative

#### Environment
- **Studio** — warm terracotta seamless backdrop
- **Prop:** Sandstone block at hip height

#### Lighting
- **Quality:** Controlled — key light side, fill warm reflector
- **Direction:** Rakes across rib texture, catches brass oxidation
- **Focus:** Hardware function — strap slide movement, clasp closure

#### Composition
- **Frame:** Two images — top (1200×1600) + bottom (1200×1600)
- **Crop:** Top — neck to waist; Bottom — waist to mid-thigh
- **Detail:** Brass clasp, strap slide, fold-waist tension, leg band rib

#### Camera
- **Focal Length:** 85mm equivalent
- **Angle:** Straight-on, slight three-quarter
- **Aperture:** f/5.6–f/8

#### Technical
| Output | Filename | Dimensions | Format |
|--------|----------|------------|--------|
| Product top | `strata-top-sienna.webp` | 1200×1600 | WebP 85 |
| Product bottom | `strata-bottom-ochre.webp` | 1200×1600 | WebP 85 |
| Campaign study | `campaign-cast.webp` (Strata variant) | 1200×900 | WebP 85 |

---

## Asset Handoff Protocol

### Incoming Image Processing
When ChatGPT ImageGen delivers assets:

1. **If individual files:** Verify dimensions, format, quality gates → rename to manifest filenames → place in `public/images/campaign/solun/` → update manifest status to "Production"
2. **If contact sheet:** Run `python scripts/slice-editorial-sheet.py` with correct grid → inspect every crop → reject failures → optimize accepted → update manifest

### Directory Structure (Preserved)
```
public/images/campaign/solun/
├── monolith-editorial.webp           ← M-01 hero
├── monolith-collection-hero.webp     ← M-01 collection
├── monolith-one-obsidian.webp        ← M-01 product
├── monolith-asym-charcharcoal.webp   ← M-02 product
├── lumen-coastal-blue.webp           ← L-01 hero
├── lumen-collection-hero.webp        ← L-01 collection
├── lumen-one-pearl.webp              ← L-01 product
├── lumen-bandeau-chalk.webp          ← L-02 product
├── strata-pool-editorial.webp        ← S-01 hero
├── strata-collection-hero.webp       ← S-01 collection
├── strata-one-terracotta.webp        ← S-01 product
├── strata-top-sienna.webp            ← S-02 product top
├── strata-bottom-ochre.webp          ← S-02 product bottom
├── campaign-cast.webp                ← M-02 / L-02 / S-02 variants (3 versions needed)
├── strata-detailsilhouette.webp      ← L-02 / S-02 variant
├── collections-story.webp            ← Editorial (future)
├── atelier.webp                      ← Brand (future)
└── ... (journal, about, philosophy placeholders remain)
```

### Campaign-Cast Variants Needed
The single `campaign-cast.webp` placeholder serves three collection variants. Production requires **three distinct images** — one per collection — or a single image with all three models (preferred). Update manifest accordingly.

---

## Generation Instructions for ChatGPT ImageGen

### Prompting Approach
1. **Use one brief per generation** — do not combine collections
2. **Specify all constraints** — garment, model, environment, lighting, composition, camera
3. **Request 3:4 vertical source** — allows 16:9, 16:10, 3:4 crops
4. **Request WebP output** — or PNG for conversion
5. **Reject and re-prompt** if quality gates fail

### Critical Prohibitions (Enforce in Prompts)
- No celebrity likenesses
- No recognizable real-model identities
- No underage appearance
- No sexualized posing
- No plastic/AI-smooth skin
- No distorted hands, feet, limbs
- No floating straps, impossible tension
- No visible hardware on Monolith/Lumen
- No shiny brass on Strata (oxidized only)
- No grid lines, borders, watermarks, text

### Quality Validation (Post-Generation)
Before accepting any asset, verify at 100% zoom:
- Anatomy: hands (5 fingers, natural), feet, proportions
- Face: eyes aligned, natural skin texture, adult
- Garment: construction matches brief, straps continuous, hardware correct
- Environment: matches collection atmosphere
- Lighting: matches collection direction
- Technical: no artifacts, correct dimensions

---

## Next Steps

1. **Generate M-01** → validate → place → update manifest
2. **Generate M-02** → validate → place → update manifest  
3. **Generate L-01** → validate → place → update manifest
4. **Generate L-02** → validate → place → update manifest
5. **Generate S-01** → validate → place → update manifest
6. **Generate S-02** → validate → place → update manifest
7. **Run slice utility** if any contact sheets delivered
8. **Visual browser verification** — all pages, all collections
9. **Commit production assets** to editorial-assets branch

---

*Briefs complete. Ready for ChatGPT ImageGen production.*