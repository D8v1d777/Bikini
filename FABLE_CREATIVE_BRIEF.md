# Fable Creative Brief — Premium Swimwear Brand Experience

> Creative ownership: Claude Fable. Technical ownership: the project owner / designated engineering agent.
> Repository: https://github.com/D8v1d777/Bikini
> Deliverable: a visually complete, frontend-only fashion brand experience with simulated commerce.

## The assignment

Create an original, premium swimwear / bikini fashion brand experience from a blank creative canvas. The only fixed subject is **bikini swimwear**. Invent everything else: brand name, positioning, brand story, visual identity, collections, product names, campaign concepts, editorial voice, art direction, and the complete page experience.

Do not use “Bikini” as the consumer-facing brand name merely because it is the repository name. Invent a distinctive, ownable-sounding name. Do not copy an existing fashion label, campaign, website, logo, or visual identity.

The agreed ambition is a **hybrid cinematic fashion experience**: a distinctive fashion world with the emotional impact of a campaign and the clarity and usefulness of a premium storefront. Treat “cinematic” as an ambition for image-making, pacing and atmosphere—not as a prescribed visual genre.

No specific aesthetic has been selected. Brutalism, minimalism, resort imagery, surrealism, colour, restraint, maximalism, 3D, or an entirely different direction are all possibilities, not requirements. Explore before committing. Do not let the repository name, these documents, a trend, or a reference site decide the brand's identity for you.

The result should feel like a credible, desirable fashion label—not a developer portfolio, generic commerce template, template clone, or a collection of effects.

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

## Experience outcomes

Create a complete, coherent customer-facing experience rather than a decorative landing page. The visitor should be able to understand the brand, become interested in its world, discover the swimwear, evaluate a product, and complete a convincing simulated shopping journey.

Those are outcomes, not a prescribed sitemap or section order. Decide what pages, scenes, transitions, navigation and content the concept actually needs. You may combine, reorder, reinterpret or omit conventional sections when the brand idea gives you a stronger solution.

The experience must make product discovery and product evaluation clear. Where relevant, visitors need useful product imagery, product information, variant and size selection, and a clear way to add an item to the bag. Include credible brand information and complete navigation in a form that belongs to the concept.

Do not build a generic sequence of “hero, cards, story, grid, footer” simply because it is familiar. Let the brand concept determine the structure while keeping the shopping journey understandable.

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

Look for a distinctive signature idea: a memorable visual, narrative, interaction or combination that belongs to this invented brand. It does not have to be 3D, technically elaborate, or even animated. Use motion only when it communicates the brand, improves understanding or guides attention.

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


## Companion guidance

Read [Fable Work Method](docs/FABLE_WORK_METHOD.md) and [Creative Sparks](docs/CREATIVE_SPARKS.md) before beginning. They describe a flexible way to explore, make, critique and improve the work. They are not a sitemap, moodboard, fixed art direction or checklist of visual ingredients.

The brief defines the assignment and responsibility boundaries. The companion documents are optional creative provocation. None of these documents should predetermine the brand's aesthetic. If a suggestion does not strengthen the concept, discard it.
