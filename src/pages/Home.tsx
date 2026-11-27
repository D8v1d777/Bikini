import { Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { Button } from '../components/ui/Button.tsx';
import { CampaignImage } from '../components/ui/CampaignImage.tsx';
import { COLLECTIONS, getFeaturedProducts, BRAND_NAME, BRAND_TAGLINE } from '../data/brand.ts';
import type { Collection, Product } from '../types/index.ts';

const HERO_SLIDES = [
  {
    id: 'monolith',
    image: '/images/campaign/solun/monolith-editorial.webp',
    alt: 'SOLUN Monolith collection — model in obsidian bikini against basalt formations',
    headline: 'CARVED FROM SHADOW',
    subtext: 'The Monolith Collection — volcanic darkness, single-piece architecture',
    cta: 'EXPLORE MONOLITH',
    href: '/collections/monolith',
    accent: 'collection-monolith'
  },
  {
    id: 'lumen',
    image: '/images/campaign/solun/lumen-coastal-blue.webp',
    alt: 'SOLUN Lumen collection — model in pearlescent bikini at water\'s edge',
    headline: 'LIGHT AS STRUCTURE',
    subtext: 'The Lumen Collection — translucent layers, refractive edges, dawn light',
    cta: 'EXPLORE LUMEN',
    href: '/collections/lumen',
    accent: 'collection-lumen'
  },
  {
    id: 'strata',
    image: '/images/campaign/solun/strata-pool-editorial.webp',
    alt: 'SOLUN Strata collection — model in layered terracotta bikini against sedimentary cliffs',
    headline: 'SEDIMENTARY LOGIC',
    subtext: 'The Strata Collection — layered construction, tonal depth, geological time',
    cta: 'EXPLORE STRATA',
    href: '/collections/strata',
    accent: 'collection-strata'
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
    image: '/images/products/strata-one/terracotta-hero.jpg',
    alt: 'SOLUN Strata silhouette in layered terracotta swimwear against sedimentary stone',
    label: 'THE STUDY',
    title: 'A season in fragments',
    text: 'A visual archive of the campaign — gathered as a sequence of gestures, surfaces, and sunlit edges.'
  }
];

export function Home() {
  const featuredProducts = getFeaturedProducts().slice(0, 3);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        setCurrentSlide((prev: number) => (prev + 1) % HERO_SLIDES.length);
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [isAnimating]);

  const goToSlide = useCallback((index: number) => {
    if (index !== currentSlide && !isAnimating) {
      setIsAnimating(true);
      setCurrentSlide(index);
      setTimeout(() => setIsAnimating(false), 500);
    }
  }, [currentSlide, isAnimating]);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <div className="min-h-screen bg-collection-bg">
      {/* Hero Carousel */}
      <section className="relative h-screen min-h-[700px] flex items-center" aria-label="Hero carousel">
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <CampaignImage
            src={slide.image}
            alt={slide.alt}
            className="solun-hero-poster absolute inset-0 w-full h-full object-cover"
            priority
            composition="hero"
          />
          <video
            className="solun-hero-media absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            poster={slide.image}
            aria-label="SOLUN cinematic campaign film"
          >
            <source src="/images/campaign/solun/solun-background-film.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-collection-bg/60 via-transparent to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 w-full z-10">
          <div className="max-w-3xl">
            <p className="font-mono text-sm tracking-widest uppercase text-collection-text-secondary/80 mb-4">
              {BRAND_NAME} — {BRAND_TAGLINE}
            </p>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-medium text-collection-text-primary leading-[1.05] tracking-tight text-balance transition-collection duration-500">
              {slide.headline}
            </h1>
            <p className="text-collection-text-secondary/90 text-lg md:text-xl mt-6 max-w-md leading-relaxed transition-collection duration-500">
              {slide.subtext}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to={slide.href}>
                <Button size="lg" variant="primary">
                  {slide.cta}
                </Button>
              </Link>
              <Link to="/collections" className="flex items-center gap-2 text-collection-text-primary hover:text-collection-surface transition-colors font-medium px-6 py-3 border border-collection-border rounded-md hover:border-collection-accent">
                View All Collections
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-10" aria-label="Slide navigation">
          {HERO_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-collection-accent w-6'
                  : 'bg-collection-text-muted/40 hover:bg-collection-text-muted/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentSlide ? 'true' : 'false'}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce-subtle" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-collection-text-secondary/60">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* Featured Products — Asymmetric Grid */}
      <section className="py-20 lg:py-28 bg-collection-surface" aria-labelledby="featured-heading">
        <div className="max-w-7xl mx-auto px-6">
          <header className="text-center max-w-2xl mx-auto mb-16">
            <p className="font-mono text-sm tracking-widest uppercase text-collection-text-muted mb-3">ARCHITECTURAL SIGNATURES</p>
            <h2 id="featured-heading" className="font-display text-4xl md:text-5xl font-medium text-collection-text-primary tracking-tight">
              Featured Silhouettes
            </h2>
            <p className="text-collection-text-secondary mt-4 text-lg leading-relaxed">
              Three collections. Nine architectures. Each piece engineered as sculpture.
            </p>
          </header>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredProducts.map((product: Product, index: number) => (
              <article
                key={product.id}
                className={`group bg-collection-surface rounded-xl overflow-hidden border border-collection-border hover:border-collection-accent transition-all duration-300 ${
                  index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Link to={`/product/${product.id}`} className="block">
                  <div className="relative aspect-[3/4] overflow-hidden bg-collection-border">
                    <CampaignImage
                      src={product.colors[0]?.images[0] || '/images/placeholder-product.jpg'}
                      alt={`${product.name} in ${product.colors[0]?.name}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      composition="product-hero"
                      loading="lazy"
                    />
                    {product.newArrival && (
                      <span className="absolute top-4 left-4 px-3 py-1 bg-collection-accent text-collection-surface text-xs font-medium tracking-wider uppercase rounded">
                        New
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <p className="font-mono text-xs tracking-wider uppercase text-collection-text-muted mb-1">
                      {product.collection.toUpperCase()}
                    </p>
                    <h3 className="font-display text-xl font-medium text-collection-text-primary mb-2 group-hover:text-collection-accent transition-colors">
                      {product.name}
                    </h3>
                    <p className="font-medium text-collection-text-primary">$ {product.price.toLocaleString()}</p>
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

      {/* Collections Overview — Full-bleed Cards */}
      <section className="py-20 lg:py-28 bg-collection-bg" aria-labelledby="collections-heading">
        <div className="max-w-7xl mx-auto px-6">
          <header className="text-center max-w-2xl mx-auto mb-16">
            <p className="font-mono text-sm tracking-widest uppercase text-collection-text-muted mb-3">THE ARCHIVE</p>
            <h2 id="collections-heading" className="font-display text-4xl md:text-5xl font-medium text-collection-text-primary tracking-tight">
              Three Collections
            </h2>
            <p className="text-collection-text-secondary mt-4 text-lg leading-relaxed">
              Each collection is a distinct material investigation — unified by regenerative fabric and architectural intent.
            </p>
          </header>

          <div className="grid md:grid-cols-3 gap-6">
            {COLLECTIONS.map((collection: Collection, index: number) => (
              <article
                key={collection.id}
                className={`group relative overflow-hidden rounded-xl ${index === 0 && 'md:col-span-2'}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Link to={`/collections/${collection.id}`} className="block">
                  <div className="relative aspect-[4/5] overflow-hidden bg-collection-border">
                    <CampaignImage
                      src={collection.campaignImage}
                      alt={collection.campaignAlt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      composition="collection-hero"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-collection-bg/80 via-transparent to-transparent" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <p className="font-mono text-xs tracking-widest uppercase text-collection-text-secondary/70 mb-2">
                        COLLECTION
                      </p>
                      <h3 className="font-display text-3xl font-medium text-collection-text-primary mb-2">
                        {collection.name}
                      </h3>
                      <p className="text-collection-text-secondary text-sm leading-relaxed max-w-xs">
                        {collection.description}
                      </p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-transparent group-hover:bg-collection-accent transition-colors duration-300" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Campaign Studies */}
      <section className="py-20 lg:py-28 bg-collection-surface" aria-labelledby="campaign-heading">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="font-mono text-sm tracking-widest uppercase text-collection-text-muted mb-3">CAMPAIGN / 01</p>
              <h2 id="campaign-heading" className="font-display text-4xl md:text-5xl font-medium text-collection-text-primary tracking-tight">
                The campaign, considered
              </h2>
            </div>
            <p className="text-collection-text-secondary text-lg leading-relaxed max-w-md">
              A visual language built from sun, water, and sculptural form — made to be read as a sequence, not a single image.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-6 items-start">
            {CAMPAIGN_STUDIES.map((study, index) => (
              <article key={study.label} className={`group ${index === 1 ? 'lg:mt-24' : ''}`}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-collection-border">
                  <CampaignImage
                    src={study.image}
                    alt={study.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    composition="editorial"
                    loading="lazy"
                  />
                </div>
                <div className="pt-5 max-w-lg">
                  <p className="font-mono text-xs tracking-widest uppercase text-collection-text-muted mb-2">{study.label}</p>
                  <h3 className="font-display text-2xl font-medium text-collection-text-primary mb-2">{study.title}</h3>
                  <p className="text-collection-text-secondary leading-relaxed">{study.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Philosophy */}
      <section className="py-20 lg:py-28 bg-collection-bg" aria-labelledby="philosophy-heading">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <p className="font-mono text-sm tracking-widest uppercase text-collection-text-muted mb-3">PHILOSOPHY</p>
              <h2 id="philosophy-heading" className="font-display text-4xl md:text-5xl font-medium text-collection-text-primary tracking-tight mb-6">
                Form follows regeneration
              </h2>
              <div className="space-y-6 text-collection-text-secondary leading-relaxed text-lg">
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
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-collection-border">
              <CampaignImage
                src="/images/philosophy/atelier.jpg"
                alt="SOLUN atelier — hands working on swimwear construction"
                className="w-full h-full object-cover"
                composition="atelier"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 lg:py-28 bg-collection-surface" aria-labelledby="newsletter-heading">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="font-mono text-sm tracking-widest uppercase text-collection-text-muted mb-3">STAY CONNECTED</p>
          <h2 id="newsletter-heading" className="font-display text-4xl md:text-5xl font-medium text-collection-text-primary tracking-tight mb-6">
            Private Previews
          </h2>
          <p className="text-collection-text-secondary text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            New collections, journal entries, and early access to limited editions. No spam — only architecture.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 px-6 py-4 bg-collection-bg border border-collection-border text-collection-text-primary placeholder:text-collection-text-muted rounded-md focus:outline-none focus:border-collection-accent focus:ring-1 focus:ring-collection-accent text-base"
              aria-label="Email address for newsletter"
              required
            />
            <Button type="submit" size="lg" className="whitespace-nowrap">
              Subscribe
            </Button>
          </form>
          <p className="text-collection-text-muted text-sm mt-4">By subscribing you agree to our <a href="/privacy" className="underline hover:text-collection-accent">Privacy Policy</a>.</p>
        </div>
      </section>
    </div>
  );
}