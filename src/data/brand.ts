import type { Product, Collection, ColorVariant, SizeVariant, ProductImage } from '../types/index.ts';

const CAMPAIGN_ASSETS = { obsidian: 'https://dnznrvs05pmza.cloudfront.net/gemini/gemini-3-pro-image/images/679cebb0-c605-483f-9e4d-24cd34103bf2/56bb253e-767a-42a6-9992-446c8c40bcde/Original_fictional_adult_Asian_woman_fashion_model__visibly_.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiMjZiZmQ3YTUyYzhkZmNhZiIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc5NTg1NzE4OX0.wfCUUCIh4OnonYApF2Ui9dMJ7xmLWOWwdwklvTLHvU', terracotta: 'https://dnznrvs05pmza.cloudfront.net/gemini/gemini-3-pro-image/images/e5331835-7149-491a-b29d-d3ccf901af4b/f5a2c0fa-da4d-4daf-bb90-edcddcce7ca5/Original_fictional_adult_Latina_woman_fashion_model__visibly.png?_jwt=eyJrZXlIYXNoIjoiNTc3YjY1NzhhOWMzYmMxNiIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc5NTgxMTg5Nn0.nuotvBDdnNZxF_qnjlotznq8EJI4wRmMjfR2XfuAYaU', pearl: 'https://dnznrvs05pmza.cloudfront.net/gemini/gemini-3-pro-image/images/0c32bd35-78de-41ee-b6e9-9dcfbf2ebd79/3666f0a9-4097-4a98-9f0f-5f945438b583/Original_fictional_adult_Black_American_woman_fashion_model_.png?_jwt=eyJrZXlIYXNoIjoiMGNhYTY5Nzc1MTliM2YzNiIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc5NTc3NDcxMX0.fIYh3zrtGtHzYVHYKpB1sjNRzfUnMCIWAxO1KScDWYU', cast: 'https://dnznrvs05pmza.cloudfront.net/gemini/gemini-3-pro-image/images/9e49a7b5-7f34-42f6-a4df-62207e64e668/74ecbeb9-50ca-4054-a7a5-3ae173779917/Original_fictional_fashion_campaign_cast_of_four_visibly_adu.png?_jwt=eyJrZXlIYXNoIjoiMTY3MjA1ZWVmNmQ3YWEwZiIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc5NTc3Nzc3NH0.6eqyF08WNrkCdptx916jchn-yd3vKFhg6CFeuIEOyeY' } as const;

export const BRAND_NAME = 'SOLUN';
export const BRAND_TAGLINE = 'Architectural Swimwear';
export const BRAND_DESCRIPTION = 'Sculptural forms. Regenerative fabrics. The modern silhouette redefined.';

export const COLLECTIONS: Collection[] = [
  {
    id: 'monolith',
    name: 'MONOLITH',
    description: 'Carved from shadow. The inaugural collection explores monolithic form — single-piece architecture, hardware-free closures, and a palette drawn from volcanic mineral.',
    campaignImage: CAMPAIGN_ASSETS.obsidian,
    campaignAlt: 'Monolith collection campaign — model in volcanic sand bikini against basalt formations',
    products: ['monolith-one', 'monolith-two', 'monolith-three'],
    color: '#4a3f36'
  },
  {
    id: 'lumen',
    name: 'LUMEN',
    description: 'Light as structure. Translucent layers, refractive edges, and a colour story of dawn on water. Fabric that catches and releases light with every movement.',
    campaignImage: CAMPAIGN_ASSETS.pearl,
    campaignAlt: 'Lumen collection campaign — model in pearlescent bikini at water\'s edge, morning light',
    products: ['lumen-one', 'lumen-two', 'lumen-three'],
    color: '#e8e2d8'
  },
  {
    id: 'strata',
    name: 'STRATA',
    description: 'Sedimentary logic. Layered construction, tonal depth, and hardware inspired by geological folding. The most technical collection — built for motion, shaped by time.',
    campaignImage: CAMPAIGN_ASSETS.terracotta,
    campaignAlt: 'Strata collection campaign — model in layered terracotta bikini against sedimentary cliffs',
    products: ['strata-one', 'strata-two', 'strata-three'],
    color: '#85735a'
  }
];

const SIZES: SizeVariant[] = [
  { id: 'XS', label: 'XS', inStock: true },
  { id: 'S', label: 'S', inStock: true },
  { id: 'M', label: 'M', inStock: true },
  { id: 'L', label: 'L', inStock: true },
  { id: 'XL', label: 'XL', inStock: false },
];

const MONOLITH_COLORS: ColorVariant[] = [
  { id: 'obsidian', name: 'Obsidian', hex: '#1e1e1e', images: [CAMPAIGN_ASSETS.obsidian, '/images/products/monolith-one/obsidian-back.jpg', '/images/products/monolith-one/obsidian-detail.jpg'], inStock: true },
  { id: 'basalt', name: 'Basalt', hex: '#383838', images: ['/images/products/monolith-one/basalt-hero.jpg', '/images/products/monolith-one/basalt-back.jpg', '/images/products/monolith-one/basalt-detail.jpg'], inStock: true },
  { id: 'ash', name: 'Volcanic Ash', hex: '#585858', images: ['/images/products/monolith-one/ash-hero.jpg', '/images/products/monolith-one/ash-back.jpg', '/images/products/monolith-one/ash-detail.jpg'], inStock: true },
];

const LUMEN_COLORS: ColorVariant[] = [
  { id: 'pearl', name: 'Pearl', hex: '#fcfbf7', images: [CAMPAIGN_ASSETS.pearl, '/images/products/lumen-one/pearl-back.jpg', '/images/products/lumen-one/pearl-detail.jpg'], inStock: true },
  { id: 'mist', name: 'Morning Mist', hex: '#eee8dd', images: ['/images/products/lumen-one/mist-hero.jpg', '/images/products/lumen-one/mist-back.jpg', '/images/products/lumen-one/mist-detail.jpg'], inStock: true },
  { id: 'frost', name: 'Sea Frost', hex: '#e0d8c9', images: ['/images/products/lumen-one/frost-hero.jpg', '/images/products/lumen-one/frost-back.jpg', '/images/products/lumen-one/frost-detail.jpg'], inStock: false },
];

const STRATA_COLORS: ColorVariant[] = [
  { id: 'terracotta', name: 'Terracotta', hex: '#9a281b', images: [CAMPAIGN_ASSETS.terracotta, '/images/products/strata-one/terracotta-back.jpg', '/images/products/strata-one/terracotta-detail.jpg'], inStock: true },
  { id: 'ochre', name: 'Raw Ochre', hex: '#be2d1c', images: ['/images/products/strata-one/ochre-hero.jpg', '/images/products/strata-one/ochre-back.jpg', '/images/products/strata-one/ochre-detail.jpg'], inStock: true },
  { id: 'sienna', name: 'Burnt Sienna', hex: '#7d241a', images: ['/images/products/strata-one/sienna-hero.jpg', '/images/products/strata-one/sienna-back.jpg', '/images/products/strata-one/sienna-detail.jpg'], inStock: true },
];

function createProductImages(colorId: string, basePath: string): ProductImage[] {
  return [
    { src: `${basePath}/${colorId}-hero.jpg`, alt: 'Front view on model', type: 'hero' },
    { src: `${basePath}/${colorId}-back.jpg`, alt: 'Back view on model', type: 'back' },
    { src: `${basePath}/${colorId}-detail.jpg`, alt: 'Fabric and construction detail', type: 'detail' },
    { src: `${basePath}/${colorId}-flat.jpg`, alt: 'Flat lay product shot', type: 'flat' },
  ];
}

export const PRODUCTS: Product[] = [
  // MONOLITH COLLECTION
  {
    id: 'monolith-one',
    name: 'Monolith One',
    collection: 'monolith',
    price: 385,
    colors: MONOLITH_COLORS,
    sizes: SIZES,
    description: 'The signature silhouette. Single-piece construction with internal architecture — no hardware, no visible seams. A continuous loop of regenerative ECONYL® that forms both structure and strap.',
    details: [
      'Single-piece regenerative ECONYL® construction',
      'Internal bonded architecture — zero hardware',
      'Self-forming strap architecture',
      'Medium coverage, sculptural fit',
      'Chlorine and UV resistant',
      'Made in Portugal'
    ],
    images: createProductImages('obsidian', '/images/products/monolith-one'),
    featured: true,
    newArrival: true
  },
  {
    id: 'monolith-two',
    name: 'Monolith Two',
    collection: 'monolith',
    price: 345,
    colors: MONOLITH_COLORS.map(c => ({ ...c, id: c.id.replace('obsidian', 'obsidian-2').replace('basalt', 'basalt-2').replace('ash', 'ash-2') })),
    sizes: SIZES,
    description: 'Asymmetric architecture. One-shoulder drape engineered from a single continuous panel. The strap migrates into the bodice — a study in tension and release.',
    details: [
      'Single-panel asymmetric construction',
      'Migrating strap architecture',
      'Internal shelf support',
      'Low-back silhouette',
      'Regenerative ECONYL®',
      'Made in Portugal'
    ],
    images: createProductImages('obsidian', '/images/products/monolith-two'),
    featured: false,
    newArrival: true
  },
  {
    id: 'monolith-three',
    name: 'Monolith Three',
    collection: 'monolith',
    price: 295,
    colors: MONOLITH_COLORS.map(c => ({ ...c, id: c.id.replace('obsidian', 'obsidian-3').replace('basalt', 'basalt-3').replace('ash', 'ash-3') })),
    sizes: SIZES,
    description: 'High-waist architecture. The brief rises to the natural waist with a folded waistband that creates its own structure. Pair with Monolith One or Two — or wear alone.',
    details: [
      'High-waist folded architecture',
      'Self-supporting waistband',
      'Full coverage',
      'Seamless leg opening',
      'Regenerative ECONYL®',
      'Made in Portugal'
    ],
    images: createProductImages('obsidian', '/images/products/monolith-three'),
    featured: false,
    newArrival: false
  },
  // LUMEN COLLECTION
  {
    id: 'lumen-one',
    name: 'Lumen One',
    collection: 'lumen',
    price: 425,
    colors: LUMEN_COLORS,
    sizes: SIZES,
    description: 'Refractive geometry. Two layers of translucent regenerative mesh create depth without opacity. Light passes through, bends, and exits transformed — the bikini as optical instrument.',
    details: [
      'Double-layer translucent regenerative mesh',
      'Refractive edge finishing',
      'No lining required — layer is the structure',
      'Minimal coverage, maximum dimension',
      'Regenerative ECONYL® mesh',
      'Made in Italy'
    ],
    images: createProductImages('pearl', '/images/products/lumen-one'),
    featured: true,
    newArrival: true
  },
  {
    id: 'lumen-two',
    name: 'Lumen Two',
    collection: 'lumen',
    price: 385,
    colors: LUMEN_COLORS.map(c => ({ ...c, id: c.id.replace('pearl', 'pearl-2').replace('mist', 'mist-2').replace('frost', 'frost-2') })),
    sizes: SIZES,
    description: 'The halter reimagined. A single band of refractive mesh wraps the neck and descends into the bodice — no ties, no adjusters. The body completes the circuit.',
    details: [
      'Continuous halter-to-bodice construction',
      'Refractive mesh throughout',
      'Self-anchoring neck band',
      'Open back architecture',
      'Regenerative ECONYL® mesh',
      'Made in Italy'
    ],
    images: createProductImages('pearl', '/images/products/lumen-two'),
    featured: false,
    newArrival: true
  },
  {
    id: 'lumen-three',
    name: 'Lumen Three',
    collection: 'lumen',
    price: 275,
    colors: LUMEN_COLORS.map(c => ({ ...c, id: c.id.replace('pearl', 'pearl-3').replace('mist', 'mist-3').replace('frost', 'frost-3') })),
    sizes: SIZES,
    description: 'High-leg brief in double-layer mesh. The leg cut is engineered for elongation — the refractive edge catches light at every threshold.',
    details: [
      'High-leg refractive architecture',
      'Double-layer mesh construction',
      'Light-catching edge finish',
      'Minimal coverage',
      'Regenerative ECONYL® mesh',
      'Made in Italy'
    ],
    images: createProductImages('pearl', '/images/products/lumen-three'),
    featured: false,
    newArrival: false
  },
  // STRATA COLLECTION
  {
    id: 'strata-one',
    name: 'Strata One',
    collection: 'strata',
    price: 455,
    colors: STRATA_COLORS,
    sizes: SIZES,
    description: 'Layered logic. Three tonal bands of regenerative ribbed fabric fold into each other — each layer a different weight, each fold a structural decision. The hardware is cast brass, oxidized by hand.',
    details: [
      'Three-layer tonal ribbed construction',
      'Hand-oxidized cast brass hardware',
      'Adjustable strap architecture',
      'Medium coverage, structured fit',
      'Regenerative ECONYL® rib',
      'Made in Portugal'
    ],
    images: createProductImages('terracotta', '/images/products/strata-one'),
    featured: true,
    newArrival: true
  },
  {
    id: 'strata-two',
    name: 'Strata Two',
    collection: 'strata',
    price: 395,
    colors: STRATA_COLORS.map(c => ({ ...c, id: c.id.replace('terracotta', 'terracotta-2').replace('ochre', 'ochre-2').replace('sienna', 'sienna-2') })),
    sizes: SIZES,
    description: 'The bandeau with architecture. Internal boning channels create structure without foam. The oxidized brass clasp at center front is both closure and gesture.',
    details: [
      'Internal boning channels — zero foam',
      'Hand-oxidized cast brass center clasp',
      'Removable strap option',
      'Strapless architecture',
      'Regenerative ECONYL® rib',
      'Made in Portugal'
    ],
    images: createProductImages('terracotta', '/images/products/strata-two'),
    featured: false,
    newArrival: true
  },
  {
    id: 'strata-three',
    name: 'Strata Three',
    collection: 'strata',
    price: 325,
    colors: STRATA_COLORS.map(c => ({ ...c, id: c.id.replace('terracotta', 'terracotta-3').replace('ochre', 'ochre-3').replace('sienna', 'sienna-3') })),
    sizes: SIZES,
    description: 'Mid-rise brief with folded waistband and side fold detail. The folds create shadow lines that shift with movement — sedimentary logic made wearable.',
    details: [
      'Folded waistband architecture',
      'Side fold shadow detail',
      'Medium rise, full coverage',
      'Seamless leg construction',
      'Regenerative ECONYL® rib',
      'Made in Portugal'
    ],
    images: createProductImages('terracotta', '/images/products/strata-three'),
    featured: false,
    newArrival: false
  }
];

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find(p => p.id === id);
}

export function getProductsByCollection(collectionId: string): Product[] {
  return PRODUCTS.filter(p => p.collection === collectionId);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter(p => p.featured);
}

export function getNewArrivals(): Product[] {
  return PRODUCTS.filter(p => p.newArrival);
}

export function getCollection(id: string): Collection | undefined {
  return COLLECTIONS.find(c => c.id === id);
}
