# SOLUN Editorial Asset Handoff

Status: implementation brief only. No new generated campaign images are included in this commit.

## Direction

SOLUN is commercially wearable architectural luxury swimwear. Campaign imagery must look like premium real-world fashion photography, while all depicted models are fictional adults (25+). Cast across Black, East Asian, South Asian, Latina, Mediterranean and mixed-heritage appearances, with varied heights and body builds. Avoid one-face repetition, implausible anatomy, excessive retouching, plastic skin, and AI-looking hands or fabric.

Use tasteful swimwear advertising: confident editorial poses, natural body proportions, accurate garment coverage, non-explicit framing, natural daylight, real-feeling coastal/pool/architectural locations. No celebrity likenesses and no copied brand marks.

## Collection visual direction

- MONOLITH: basalt, charcoal, mineral black; sculptural seams, asymmetric but wearable straps, clean support, architectural poolside settings.
- LUMEN: pearl, chalk, sea-glass, refractive blue; refined bandeau and adjustable-strap options, subtle sheen, bright coastal light.
- STRATA: ochre, sienna, terracotta, sediment; textured or softly ruched fabric, layered but functional straps, warm stone settings.

## Product-design principles

Study competitors for principles, not replicas:
- Hunza G: recognisable textile identity and stretch behaviour.
- ERES: restraint, proportion and precise finishing.
- Monday Swimwear: fit options and bust-support thinking.
- Matteau: timeless, wearable silhouettes.
- Alaïa: sculptural shaping translated into practical construction.

Every proposed style must be original. Do not reproduce a competitor's exact cut, signature hardware, print, monogram, logo or trade dress. Treat support, coverage, lining, adjustability, grading and wet/dry opacity as design requirements—not afterthoughts. Do not claim technical fit validation without real fit testing.

## Brand identity

Replace the oversized star/AI-looking lockup with a restrained custom SOLUN wordmark:
- modest scale in the site header;
- deliberate letter spacing and refined typography;
- monochrome by default;
- optional small original abstract S mark for labels/hardware;
- no starburst, copied monogram, or imitation of Calvin Klein/Gucci logos.

## Asset production rules (mandatory)

1. Deliver individual images, never a contact sheet as a production website asset.
2. If generation produces a grid/contact sheet, slice it into separate files before commit.
3. Inspect every crop for grid seams, borders, clipped heads/limbs, distorted hands, broken garment construction, text/logo artifacts and repeated faces.
4. Never upscale a crop to disguise insufficient source resolution.
5. Export optimised WebP (keep a high-quality source only if useful); target roughly 1600 px on the long edge for hero/editorial and 900–1200 px for cards, quality 80–88.
6. Use descriptive names: `monolith-model-01.webp`, `lumen-editorial-01.webp`, `strata-model-01.webp`. Keep model/collection/shot identifiers stable.
7. Store production images under `public/images/campaign/solun/`. Do not overwrite existing files until the new replacement is reviewed.
8. Do not add a collage to the website. A contact sheet may be kept outside production assets for internal review only.
9. Verify file type, dimensions, byte size, and GitHub path after upload.
10. Do not commit images with accidental third-party logos, jewellery marks, watermarks or malformed SOLUN text. Prefer no text rendered into the photograph; implement the wordmark in HTML/CSS.

## Existing asset warning

The branch already contains earlier campaign files. Review them individually before reuse. In particular, do not assume `campaign-study.webp` is a usable hero: it is a multi-panel contact sheet. Some older images also contain prominent oversized star branding or third-party-looking monogram artifacts. Do not silently promote those to production.

## Acceptance checklist

- [ ] Distinct adult models across ethnicity and body-build range; no repeated face pretending to be multiple people.
- [ ] Realistic skin, hands, hair, fabric tension, seams, straps and closures.
- [ ] Swimwear remains tasteful and commercially appropriate.
- [ ] All assets are individual files, correctly cropped and reviewed.
- [ ] No celebrity likenesses, copied branding, watermarks or text artifacts.
- [ ] All three collections have coherent but distinct visual treatments.
- [ ] Responsive crops work at desktop and mobile aspect ratios.
- [ ] Website references only verified individual asset paths.
- [ ] No changes to `main`; no merge until visual review and checks pass.
