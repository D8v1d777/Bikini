import { Link } from 'react-router-dom';
import { COLLECTIONS, getProductsByCollection } from '../data/brand.ts';
import { CampaignImage } from '../components/ui/CampaignImage.tsx';
import { Button } from '../components/ui/Button.tsx';
import type { Collection, Product, ColorVariant } from '../types/index.ts';

interface CollectionsPageProps {
  collectionId?: string;
}

export function CollectionsPage({ collectionId }: CollectionsPageProps) {
  const collection = collectionId ? COLLECTIONS.find((c: Collection) => c.id === collectionId) : null;
  const products = collectionId ? getProductsByCollection(collectionId) : null;

  // Get current collection for theming
  const currentCollection = collection?.id || null;

  if (collectionId && !collection) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-collection-bg px-6">
        <div className="text-center">
          <h1 className="font-display text-4xl md:text-5xl font-medium text-collection-text-primary mb-4">Collection Not Found</h1>
          <p className="text-collection-text-secondary mb-8">The collection you're looking for doesn't exist.</p>
          <Link to="/collections">
            <Button variant="primary">View All Collections</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Collection Detail View
  if (collection && products) {
    return (
      <div className="min-h-screen bg-collection-bg">
        {/* Collection Hero — Collection-Specific Atmosphere */}
        <section className="relative min-h-[60vh] flex items-end" aria-labelledby="collection-title">
          <div className="absolute inset-0" aria-hidden="true">
            <CampaignImage
              src={collection.campaignImage}
              alt=""
              className="w-full h-full object-cover"
              priority
              composition="collection-hero"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-collection-bg/80 via-collection-bg/20 to-transparent" />
          </div>
          <div className="relative max-w-7xl mx-auto px-6 pb-16 w-full z-10">
            <Link
              to="/collections"
              className="inline-flex items-center gap-2 text-collection-text-secondary/80 hover:text-collection-text-primary transition-colors text-sm font-medium mb-8"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              All Collections
            </Link>
            <header className="max-w-3xl">
              <p className="font-mono text-sm tracking-widest uppercase text-collection-text-secondary/70 mb-3">
                COLLECTION
              </p>
              <h1 id="collection-title" className="font-display text-5xl md:text-7xl font-medium text-collection-text-primary tracking-tight mb-6">
                {collection.name}
              </h1>
              <p className="text-collection-text-secondary text-lg leading-relaxed max-w-2xl">
                {collection.description}
              </p>
            </header>
          </div>
        </section>

        {/* Product Grid — Collection-Specific Rhythm */}
        <section className="py-16 lg:py-24" aria-labelledby="products-heading">
          <div className="max-w-7xl mx-auto px-6">
            <header className="mb-12">
              <h2 id="products-heading" className="font-display text-3xl md:text-4xl font-medium text-collection-text-primary">
                {products.length} {products.length === 1 ? 'Silhouette' : 'Silhouettes'}
              </h2>
            </header>

            {/* Collection-specific grid layouts */}
            <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-8 ${
              currentCollection === 'monolith' ? 'gap-6' :
              currentCollection === 'lumen' ? 'gap-10' :
              'gap-8'
            }`}>
              {products.map((product: Product, index: number) => (
                <article
                  key={product.id}
                  className="group bg-collection-surface rounded-xl overflow-hidden border border-collection-border hover:border-collection-accent transition-all duration-300"
                  style={{ animationDelay: `${index * 80}ms` }}
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
                        {collection.name}
                      </p>
                      <h3 className="font-display text-xl font-medium text-collection-text-primary mb-2 group-hover:text-collection-accent transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="font-medium text-collection-text-primary">$ {product.price.toLocaleString()}</span>
                        <div className="flex gap-1" aria-label={`Available colors for ${product.name}`}>
                          {product.colors.slice(0, 4).map((color: ColorVariant) => (
                            <button
                              key={color.id}
                              className="w-5 h-5 rounded-full border border-collection-border transition-transform hover:scale-110"
                              style={{ backgroundColor: color.hex }}
                              aria-label={color.name}
                              disabled
                            />
                          ))}
                          {product.colors.length > 4 && (
                            <span className="w-5 h-5 rounded-full border border-collection-border flex items-center justify-center text-xs text-collection-text-muted">
                              +{product.colors.length - 4}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Next Collection — Full-bleed Cards with Collection-Specific Treatment */}
        {COLLECTIONS.length > 1 && (
          <section className="py-16 lg:py-24 bg-collection-surface" aria-label="Next collection">
            <div className="max-w-7xl mx-auto px-6">
              <p className="font-mono text-sm tracking-widest uppercase text-collection-text-muted mb-3 text-center">CONTINUE EXPLORING</p>
              <div className="grid md:grid-cols-2 gap-6">
                {COLLECTIONS.filter((c: Collection) => c.id !== collection.id).map((nextCollection: Collection, index: number) => (
                  <Link
                    key={nextCollection.id}
                    to={`/collections/${nextCollection.id}`}
                    className="relative aspect-[4/5] overflow-hidden rounded-xl group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CampaignImage
                      src={nextCollection.campaignImage}
                      alt={nextCollection.campaignAlt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      composition="collection-hero"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-collection-bg/80 via-transparent to-transparent" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <p className="font-mono text-xs tracking-widest uppercase text-collection-text-secondary/70 mb-2">
                        COLLECTION
                      </p>
                      <h3 className="font-display text-3xl font-medium text-collection-text-primary">
                        {nextCollection.name}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    );
  }

  // Collections Index View — Trilogy Layout
  return (
    <div className="min-h-screen bg-collection-bg">
      {/* Page Hero */}
      <section className="py-20 lg:py-28 relative" aria-labelledby="collections-index-heading">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="font-mono text-sm tracking-widest uppercase text-collection-text-muted mb-3">THE ARCHIVE</p>
          <h1 id="collections-index-heading" className="font-display text-5xl md:text-7xl font-medium text-collection-text-primary tracking-tight mb-6">
            Three Collections
          </h1>
          <p className="text-collection-text-secondary text-lg leading-relaxed max-w-2xl mx-auto">
            Each collection is a distinct material investigation — unified by regenerative fabric and architectural intent.
          </p>
        </div>
      </section>

      {/* Collections Grid — Full-bleed Panels Side by Side (Desktop) */}
      <section className="py-16 lg:py-24 px-6" aria-labelledby="collections-grid-heading">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {COLLECTIONS.map((collection: Collection, index: number) => (
              <article
                key={collection.id}
                className="group relative overflow-hidden rounded-xl"
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

      {/* Editorial Content */}
      <section className="py-20 lg:py-28 bg-collection-surface" aria-labelledby="editorial-heading">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-collection-border">
              <CampaignImage
                src="/images/editorial/collections-story.jpg"
                alt="Editorial spread showing all three collections"
                className="w-full h-full object-cover"
                composition="editorial"
                loading="lazy"
              />
            </div>
            <div>
              <p className="font-mono text-sm tracking-widest uppercase text-collection-text-muted mb-3">EDITORIAL</p>
              <h2 id="editorial-heading" className="font-display text-4xl md:text-5xl font-medium text-collection-text-primary tracking-tight mb-6">
                A trilogy of form
              </h2>
              <div className="space-y-6 text-collection-text-secondary leading-relaxed text-lg">
                <p>
                  Monolith emerged from the question of reduction — how much can be removed while
                  retaining structure? The answer: a single continuous loop of regenerative ECONYL®
                  that forms both bodice and strap. Zero hardware. Zero visible seams.
                </p>
                <p>
                  Lumen asks the opposite — what happens when light becomes the material? Double-layer
                  translucent mesh creates refractive depth without opacity. The body becomes part of
                  the optical system.
                </p>
                <p>
                  Strata introduces geological logic. Three tonal bands of ribbed fabric fold into each
                  other at different weights. Hand-oxidized brass hardware marks the stress points —
                  closures as geological folding.
                </p>
                <p className="font-medium">
                  Three distinct material investigations. One regenerative foundation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}