import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button.tsx';
import { COLLECTIONS, getFeaturedProducts, BRAND_NAME, BRAND_TAGLINE } from '../data/brand.ts';
import type { Collection, Product } from '../types/index.ts';

const HERO_SLIDES = [
  {
    id: 'slide-1',
    image: '/images/campaign/solun/hero-pool-closeup.webp',
    alt: 'SOLUN Monolith collection — model in obsidian bikini against basalt formations',
    headline: 'CARVED FROM SHADOW',
    subtext: 'The Monolith Collection',
    cta: 'EXPLORE MONOLITH',
    href: '/collections/monolith'
  },
  {
    id: 'slide-2',
    image: '/images/campaign/solun/hero-coastal-green.webp',
    alt: 'SOLUN Lumen collection — model in pearlescent bikini at water\'s edge',
    headline: 'LIGHT AS STRUCTURE',
    subtext: 'The Lumen Collection',
    cta: 'EXPLORE LUMEN',
    href: '/collections/lumen'
  },
  {
    id: 'slide-3',
    image: '/images/campaign/solun/hero-campaign-grid.webp',
    alt: 'SOLUN Strata collection — model in layered terracotta bikini against sedimentary cliffs',
    headline: 'SEDIMENTARY LOGIC',
    subtext: 'The Strata Collection',
    cta: 'EXPLORE STRATA',
    href: '/collections/strata'
  }
];

const CAMPAIGN_STUDIES = [
  {
    image: '/images/campaign/solun/campaign-cast.webp',
    alt: 'SOLUN campaign cast in a considered studio portrait series',
    label: 'THE CAST',
    title: 'Many bodies, one language',
    text: 'A study in repetition, contrast, and the way architectural silhouettes shift across the body.'
  },
  {
    image: '/images/campaign/solun/campaign-study.webp',
    alt: 'SOLUN campaign contact sheet showing a range of sculptural swimwear silhouettes',
    label: 'THE STUDY',
    title: 'A season in fragments',
    text: 'A visual archive of the campaign — gathered as a sequence of gestures, surfaces, and sunlit edges.'
  }
];

export function Home() {
  const featuredProducts = getFeaturedProducts().slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Carousel */}
      <section className="relative h-screen min-h-[700px] flex items-center" aria-label="Hero carousel">
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          {HERO_SLIDES.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === 0 ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ zIndex: 3 - index }}
            >
              <img
                src={slide.image}
                alt=""
                className="w-full h-full object-cover"
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-abyss-950/60 via-transparent to-transparent" />
            </div>
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 w-full z-10">
          <div className="max-w-3xl">
            <p className="font-mono text-sm tracking-widest uppercase text-pearl-100/80 mb-4">
              {BRAND_NAME} — {BRAND_TAGLINE}
            </p>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-medium text-pearl-50 leading-[1.05] tracking-tight text-balance">
              {HERO_SLIDES[0].headline}
            </h1>
            <p className="text-pearl-200/90 text-lg md:text-xl mt-6 max-w-md leading-relaxed">
              {HERO_SLIDES[0].subtext}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to={HERO_SLIDES[0].href}>
                <Button size="lg">
                  {HERO_SLIDES[0].cta}
                </Button>
              </Link>
              <Link to="/collections" className="flex items-center gap-2 text-pearl-50 hover:text-pearl-200 transition-colors font-medium px-6 py-3 border border-pearl-50/30 rounded-md hover:border-pearl-50/50">
                View All Collections
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce-subtle" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-pearl-50/60">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 lg:py-28 bg-pearl-50" aria-labelledby="featured-heading">
        <div className="max-w-7xl mx-auto px-6">
          <header className="text-center max-w-2xl mx-auto mb-16">
            <p className="font-mono text-sm tracking-widest uppercase text-sand-500 mb-3">ARCHITECTURAL SIGNATURES</p>
            <h2 id="featured-heading" className="font-display text-4xl md:text-5xl font-medium text-sand-900 tracking-tight">
              Featured Silhouettes
            </h2>
            <p className="text-sand-600 mt-4 text-lg leading-relaxed">
              Three collections. Nine architectures. Each piece engineered as sculpture.
            </p>
          </header>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredProducts.map((product: Product, index: number) => (
              <article
                key={product.id}
                className="group bg-pearl-50 rounded-xl overflow-hidden border border-sand-200 hover:border-sand-300 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Link to={`/product/${product.id}`} className="block">
                  <div className="relative aspect-[3/4] overflow-hidden bg-sand-100">
                    <img
                      src={product.colors[0]?.images[0] || '/images/placeholder-product.jpg'}
                      alt={`${product.name} in ${product.colors[0]?.name}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    {product.newArrival && (
                      <span className="absolute top-4 left-4 px-3 py-1 bg-sand-900 text-pearl-50 text-xs font-medium tracking-wider uppercase rounded">
                        New
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <p className="font-mono text-xs tracking-wider uppercase text-sand-500 mb-1">
                      {product.collection.toUpperCase()}
                    </p>
                    <h3 className="font-display text-xl font-medium text-sand-900 mb-2 group-hover:text-sand-700 transition-colors">
                      {product.name}
                    </h3>
                    <p className="font-medium text-sand-900">$ {product.price.toLocaleString()}</p>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/collections">
              <Button variant="outline" size="lg">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Collections Overview */}
      <section className="py-20 lg:py-28 bg-sand-950" aria-labelledby="collections-heading">
        <div className="max-w-7xl mx-auto px-6">
          <header className="text-center max-w-2xl mx-auto mb-16">
            <p className="font-mono text-sm tracking-widest uppercase text-sand-400 mb-3">THE ARCHIVE</p>
            <h2 id="collections-heading" className="font-display text-4xl md:text-5xl font-medium text-pearl-50 tracking-tight">
              Three Collections
            </h2>
            <p className="text-sand-400 mt-4 text-lg leading-relaxed">
              Each collection is a distinct material investigation — unified by regenerative fabric and architectural intent.
            </p>
          </header>

          <div className="grid md:grid-cols-3 gap-6">
            {COLLECTIONS.map((collection: Collection, index: number) => (
              <article
                key={collection.id}
                className="group relative overflow-hidden rounded-xl"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Link to={`/collections/${collection.id}`} className="block">
                  <div className="relative aspect-[4/5] overflow-hidden bg-sand-900">
                    <img
                      src={collection.campaignImage}
                      alt={collection.campaignAlt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-abyss-950/80 via-transparent to-transparent" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <p className="font-mono text-xs tracking-widest uppercase text-pearl-100/70 mb-2">
                        COLLECTION
                      </p>
                      <h3 className="font-display text-3xl font-medium text-pearl-50 mb-2">
                        {collection.name}
                      </h3>
                      <p className="text-sand-300 text-sm leading-relaxed max-w-xs">
                        {collection.description}
                      </p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-transparent group-hover:bg-sand-500 transition-colors duration-300" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Campaign Studies */}
      <section className="py-20 lg:py-28 bg-pearl-100" aria-labelledby="campaign-heading">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="font-mono text-sm tracking-widest uppercase text-sand-500 mb-3">CAMPAIGN / 01</p>
              <h2 id="campaign-heading" className="font-display text-4xl md:text-5xl font-medium text-sand-900 tracking-tight">
                The campaign, considered
              </h2>
            </div>
            <p className="text-sand-600 text-lg leading-relaxed max-w-md">
              A visual language built from sun, water, and sculptural form — made to be read as a sequence, not a single image.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-6 items-start">
            {CAMPAIGN_STUDIES.map((study, index) => (
              <article key={study.label} className={`group ${index === 1 ? 'lg:mt-24' : ''}`}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-sand-200">
                  <img
                    src={study.image}
                    alt={study.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="pt-5 max-w-lg">
                  <p className="font-mono text-xs tracking-widest uppercase text-sand-500 mb-2">{study.label}</p>
                  <h3 className="font-display text-2xl font-medium text-sand-900 mb-2">{study.title}</h3>
                  <p className="text-sand-600 leading-relaxed">{study.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Philosophy */}
      <section className="py-20 lg:py-28 bg-pearl-50" aria-labelledby="philosophy-heading">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <p className="font-mono text-sm tracking-widest uppercase text-sand-500 mb-3">PHILOSOPHY</p>
              <h2 id="philosophy-heading" className="font-display text-4xl md:text-5xl font-medium text-sand-900 tracking-tight mb-6">
                Form follows regeneration
              </h2>
              <div className="space-y-6 text-sand-600 leading-relaxed text-lg">
                <p>
                  Every SOLUN piece begins with a material question: how can regenerative ECONYL® nylon —
                  regenerated from ocean waste and industrial plastic — be engineered into architecture
                  that holds its shape without hardware, foam, or compromise?
                </p>
                <p>
                  The answer is internal architecture. Bonded seams that replace stitching.
                  Self-forming straps that migrate from structure. Folded waistbands that create their own
                  tension. Hardware cast in brass and oxidized by hand — only where the design demands it.
                </p>
                <p>
                  Made in Portugal and Italy by ateliers that understand swimwear as structural garment,
                  not seasonal accessory. Each piece is chlorine-resistant, UV-protective, and built to
                  survive seasons — not trends.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-sand-100">
              <img
                src="/images/philosophy/atelier.jpg"
                alt="SOLUN atelier — hands working on swimwear construction"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 lg:py-28 bg-sand-950" aria-labelledby="newsletter-heading">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="font-mono text-sm tracking-widest uppercase text-sand-400 mb-3">STAY CONNECTED</p>
          <h2 id="newsletter-heading" className="font-display text-4xl md:text-5xl font-medium text-pearl-50 tracking-tight mb-6">
            Private Previews
          </h2>
          <p className="text-sand-400 text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            New collections, journal entries, and early access to limited editions. No spam — only architecture.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 px-6 py-4 bg-sand-900 border border-sand-800 text-pearl-100 placeholder:text-sand-500 rounded-md focus:outline-none focus:border-sand-500 focus:ring-1 focus:ring-sand-500 text-base"
              aria-label="Email address for newsletter"
              required
            />
            <Button type="submit" size="lg" className="whitespace-nowrap">
              Subscribe
            </Button>
          </form>
          <p className="text-sand-500 text-sm mt-4">By subscribing you agree to our <a href="/privacy" className="underline hover:text-pearl-50">Privacy Policy</a>.</p>
        </div>
      </section>
    </div>
  );
}
