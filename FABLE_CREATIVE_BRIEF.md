# Fable Creative Brief — Premium Swimwear Brand Experience

> Creative ownership: Claude Fable. Technical ownership: the project owner / designated engineering agent.
> Repository: https://github.com/D8v1d777/Bikini
> Deliverable: a visually complete, frontend-only fashion brand experience with simulated commerce.

## The assignment

Create an original, premium swimwear / bikini fashion brand experience from a blank creative canvas. The only fixed subject is **bikini swimwear**. Invent everything else: brand name, positioning, brand story, visual identity, collections, product names, campaign concepts, editorial voice, art direction, and the complete page experience.

Do not use “Bikini” as the consumer-facing brand name merely because it is the repository name. Invent a distinctive, ownable-sounding name. Do not copy an existing fashion label, campaign, website, logo, or visual identity.

The chosen creative direction is a **hybrid cinematic fashion experience**:
- Monolith / editorial brutalism as a starting sensibility, not a rigid template.
- High-fashion campaign storytelling.
- A genuinely usable premium storefront.
- Selective, purposeful 3D and motion graphics.
- Original AI-generated fashion campaign imagery.

The result should feel like a credible, desirable fashion label—not a developer portfolio, generic Shopify theme, template clone, or a collection of effects.

## Creative autonomy

Fable has broad creative freedom over all customer-facing creative decisions:
- Brand name, story, positioning, tone of voice and campaign concept.
- Art direction, palette, typography, layout, composition and visual hierarchy.
- Collection concepts, product names, product descriptions and merchandising.
- Campaign photography concepts, model casting direction, styling, locations, lighting and shot lists.
- Frontend page composition, visual interactions, animation choreography and responsive presentation.

Do not ask the owner to invent the brand for you. Make strong creative decisions, explain the central concept briefly, then execute it. Avoid endless ideation or approval loops.

## AI fashion campaign imagery — essential, not optional

A swimwear brand needs original campaign photography. Do not rely on public photos, influencer images, scraped campaign images, stock-photo placeholders, or generic product-only renders.

Create original, photorealistic **fictional adult women, unambiguously 21 years or older**, as fashion models wearing the fictional brand's swimwear. Models must be fictional and must not imitate identifiable real people.

Build a coherent campaign cast:
- Create a small, deliberately selected group of distinct adult models with varied appearances and body types.
- Keep each model's face, hair, proportions and identity consistent across the images in which she appears.
- Give each collection a coherent campaign environment, lighting language, styling and photographic treatment.
- Produce a useful range of shots: full-body campaign frames, medium editorial compositions, close-up fabric / stitching / hardware details, alternate angles, and product-focused imagery.
- Ensure the actual bikini design, colour, cut, straps, hardware and fabric remain consistent between campaign and product imagery.
- Use tasteful, professional swimwear advertising. No nudity, transparent garments, explicit sexualisation, or pornographic framing.
- Prioritise believable anatomy, hands, skin texture, garment construction, fabric tension, shadows and natural posing. Reject visibly malformed or inconsistent generations.
- Compose images for real layouts: wide hero crops, portrait campaign cards, square/near-square product images and mobile-safe crops.
- Do not present AI models or AI imagery as real people or documentary photography. The brand may be fictional, but the experience should not make deceptive claims about real customers, endorsements or provenance.

If image-generation capability is unavailable, do not silently substitute random internet photos. Create a precise asset manifest with prompts, intended aspect ratios, filenames and placement notes, and clearly report the missing assets.

## Experience to create

Design the complete customer-facing experience, not just a hero landing page. Use creative judgement to establish the exact information architecture, but consider these essential moments:

1. **Opening / hero** — a memorable first viewport, strong campaign image or purposeful 3D composition, distinctive brand typography, concise brand proposition and clear route into the collection.
2. **Editorial campaign storytelling** — a sequence of visually rich sections that makes the label feel like a real fashion house.
3. **Collection discovery** — a well-merchandised collection grid with strong photography, coherent product cards and useful filtering or sorting if it improves the experience.
4. **Product detail experience** — image gallery, product story, available colours, size selection, fit / care information, price, and clear add-to-bag interaction.
5. **Simulated commerce** — fully frontend-only interactions described below.
6. **Brand / craft section** — materials, construction, design philosophy, fit or care details, and other credible brand content.
7. **Footer and supporting navigation** — complete navigation, contact / social placeholders clearly marked as fictional if invented, newsletter interaction simulated locally if included.

Make the page feel authored and intentional from top to bottom. Avoid repeating the same card pattern in every section.

## Simulated shopping interactions

This is a showcase, not a live store. Implement convincing frontend interactions without real commerce infrastructure:
- Collection browsing and product selection.
- Product image gallery and thumbnail switching.
- Colour / variant selection where applicable.
- Size selection with clear selected and unavailable states.
- Add-to-bag feedback and a polished cart drawer or panel.
- Cart quantity changes, item removal, subtotal and total calculations.
- Wishlist toggle with visible feedback.
- Checkout preview with a simulated order review and clearly fictional confirmation state.
- Appropriate empty-cart, validation, loading / success and error states.
- Persist cart / wishlist locally only if the existing project conventions make that appropriate.

Never collect or transmit payment details, personal data, credentials or real customer information. No payment gateway, real order submission, authentication, backend, database, external checkout or API integration. Make the simulated nature clear at the final checkout / confirmation stage.

## Visual quality bar

Aim for the craft and ambition associated with the strongest Awwwards / FWA fashion, editorial, luxury commerce and immersive brand experiences. Study winning work for principles and techniques; do not copy its identity or layouts.

Useful reference research:
- Awwwards award-winning website index: https://www.awwwards.com/websites/
- Awwwards fashion category: https://www.awwwards.com/websites/fashion/
- Awwwards e-commerce category: https://www.awwwards.com/websites/e-commerce/
- Award-winning work and stack examples: https://teasertrack.cc/websites
- Recent award teardown / craft analysis: https://rickcreates.com/
- Naked City Films (industrial editorial + WebGL reference): https://www.nakedcityfilms.com/
- The Renaissance Edition (editorial commerce / generative visual storytelling reference): https://www.shopify.com/editions/winter2026
- Floema (immersive 3D product storytelling reference): use its Awwwards case study as a technique reference, not a design to reproduce.

Look for a distinctive signature idea: one memorable visual or interaction concept that belongs to this invented brand. Use motion to communicate the brand and guide attention—not as decoration on every element.

Potential craft ingredients, only where they genuinely serve the concept:
- Confident typographic scale and editorial grid-breaking.
- Strong art direction, deliberate negative space and image composition.
- Scroll choreography and carefully timed transitions.
- A restrained but memorable 3D object / environment / product moment.
- Shader, material, lighting, depth, parallax or WebGL details where they add meaning.
- Tactile hover, focus, selection and cart feedback.
- Thoughtful mobile adaptation rather than simply shrinking desktop layouts.

Do not equate “Awwwards-level” with maximal effects. The experience must remain legible, navigable, fast enough to use, and commercially believable.

## Strict responsibility boundary

Fable owns the **creative work and customer-facing frontend experience only**.

Fable must not:
- Choose, replace or redesign the project's technical architecture or technology stack.
- Make backend, server, database, API, authentication, payment, deployment or infrastructure decisions.
- Configure Render or other hosting.
- Change CI/CD, secrets, environment variables, package-manager strategy or unrelated project configuration.
- Install dependencies, upgrade frameworks, alter build tooling or rewrite project scaffolding without explicit authorization from the owner / technical engineer.
- Perform unrelated repository cleanup, refactoring or maintenance.
- invent a backend to make a frontend interaction appear real.
- hide technical failures or claim checks passed when they were not run.

Work within the existing frontend stack and established project conventions. If the repository has no frontend scaffold, no package manifest, or lacks a required capability, **stop before making architecture or dependency decisions**. Report exactly what is missing and what minimal technical setup is needed from the owner / technical engineer. You may still provide the creative direction, screen plan, component inventory, image asset plan and frontend implementation plan.

Do not modify files outside the agreed frontend scope. If a change appears to require touching configuration or infrastructure, explain the need and ask the owner / technical engineer rather than making the change.

## Quality and completion criteria

The work is not complete merely because a page renders. Review the whole experience:
- The opening viewport is distinctive and polished.
- The brand identity is coherent across every page / section.
- Campaign imagery is original, consistent and correctly art-directed.
- Product imagery accurately represents the listed garments.
- All visible controls have meaningful interactions; no dead buttons.
- Simulated cart and checkout flows work end-to-end in the browser.
- Desktop, tablet and mobile compositions are deliberately designed.
- Typography, spacing, image crops, transitions and loading states are consistent.
- Reduced-motion preferences and keyboard focus are considered.
- No obvious overflow, broken layout, placeholder copy, missing imagery or unfinished sections remain.

## Mandatory final frontend audit and report

At the end, inspect every frontend file you created or changed and run only the checks already available in the project. Do not install tooling or alter configuration to make checks possible.

Where the existing environment allows, inspect:
- Build / typecheck / lint output.
- Browser console errors and warnings.
- Failed network and asset requests.
- Broken links and navigation.
- Product selection, size / colour state, wishlist, cart, quantity updates and simulated checkout.
- Responsive layouts at mobile, tablet and desktop widths.
- Keyboard navigation, focus visibility and reduced-motion behaviour.
- 3D / animation fallbacks and obvious performance problems.

Produce a final **FRONTEND ERROR & DEBUG REPORT** with these sections:
1. Confirmed errors — exact message, file / component, line or location, reproduction steps, likely cause.
2. Suspected issues — evidence and why they need human inspection.
3. Warnings — distinguish harmless warnings from potentially important ones.
4. Checks passed — list the actual command / browser check and its observed result.
5. Checks not run — explain why they could not be run; never imply they passed.
6. Missing assets / creative gaps — exact filenames, intended use and status.
7. Out-of-scope technical blockers — list separately for the owner / technical engineer.

Do not silently fix unrelated technical issues. Do not conceal errors. Do not claim “zero errors” unless the relevant checks were actually performed. The report must be specific enough that the owner can reproduce and debug each issue.

## Final handoff

Provide:
- The invented brand name and concise creative rationale.
- A summary of the experience and signature visual idea.
- The list of frontend files changed.
- The list of AI-generated campaign assets created and their locations.
- The simulated commerce flows implemented.
- The frontend error & debug report.
- Any work intentionally left undone because it crossed the technical responsibility boundary.

**Success means:** the result feels like a distinctive premium swimwear brand, the frontend itself demonstrates exceptional craft, shopping interactions are convincing but safely simulated, and the owner receives an honest, actionable debugging report.


## Companion creative guidance

Read these two companion documents before beginning. They are deliberately open-ended: use them to widen your thinking and improve your process, not as a rigid visual specification.

- [Fable Work Method](docs/FABLE_WORK_METHOD.md) — a creative-studio approach to discovery, experimentation, browser-based critique, iterative refinement and honest final verification.
- [Creative Sparks](docs/CREATIVE_SPARKS.md) — unconventional territories, visual collisions and questions intended to provoke original brand ideas. They are prompts for imagination, not a checklist.

**Priority rule:** this brief defines the assignment and boundaries; the companion files encourage stronger creative thinking. Where a spark conflicts with the brief's frontend-only scope, safety requirements or simulated-commerce boundary, the brief takes precedence. Do not mechanically combine every idea. Choose an original direction and execute it with conviction.
