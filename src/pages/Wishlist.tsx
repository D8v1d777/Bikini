import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext.tsx';
import { getProduct } from '../data/brand.ts';
import { Button } from '../components/ui/Button.tsx';
import { formatPrice } from '../utils/helpers.ts';
import type { Product, ColorVariant, WishlistItem } from '../types/index.ts';

export function Wishlist() {
  const { items, toggleWishlist } = useWishlist();

  const wishlistProducts = items.map((item: WishlistItem) => {
    const product = getProduct(item.productId);
    const color = product?.colors.find((c: ColorVariant) => c.id === item.colorId);
    return { product, color };
  }).filter((item): item is { product: Product; color: ColorVariant } =>
    item.product !== undefined && item.color !== undefined
  );

  return (
    <div className="min-h-screen bg-pearl-50">
      {/* Hero */}
      <section className="py-20 lg:py-28 relative" aria-labelledby="wishlist-heading">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="font-mono text-sm tracking-widest uppercase text-sand-500 mb-3">SAVED</p>
          <h1 id="wishlist-heading" className="font-display text-5xl md:text-7xl font-medium text-sand-900 tracking-tight mb-6">
            Wishlist
          </h1>
          <p className="text-sand-600 text-lg leading-relaxed max-w-2xl mx-auto">
            {wishlistProducts.length === 0
              ? 'Your curated edit awaits. Save silhouettes that speak to you.'
              : `${wishlistProducts.length} ${wishlistProducts.length === 1 ? 'silhouette saved' : 'silhouettes saved'} — ready when you are.`}
          </p>
        </div>
      </section>

      {/* Wishlist Grid */}
      <section className="py-16 lg:py-24 px-6" aria-labelledby="items-heading">
        <div className="max-w-7xl mx-auto">
          {wishlistProducts.length === 0 ? (
            <div className="text-center py-20">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-sand-300 mx-auto mb-6">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <h2 className="font-display text-3xl font-medium text-sand-900 mb-4">Your Wishlist is Empty</h2>
              <p className="text-sand-600 mb-8 max-w-md mx-auto">
                Browse our collections and save the architectures that resonate. They will be here waiting.
              </p>
              <Link to="/collections">
                <Button size="lg">Explore Collections</Button>
              </Link>
            </div>
          ) : (
            <>
              <header className="mb-12 flex items-center justify-between">
                <h2 id="items-heading" className="font-display text-3xl font-medium text-sand-900">
                  {wishlistProducts.length} {wishlistProducts.length === 1 ? 'Item' : 'Items'}
                </h2>
                <button
                  onClick={() => items.forEach((item) => toggleWishlist(item.productId, item.colorId))}
                  className="text-sm text-sand-500 hover:text-coral-600 transition-colors font-medium"
                >
                  Clear All
                </button>
              </header>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {wishlistProducts.map(({ product, color }: { product: Product; color: ColorVariant }, index: number) => (
                  <article
                    key={`${product.id}-${color.id}`}
                    className="group bg-pearl-50 rounded-xl overflow-hidden border border-sand-200 hover:border-sand-300 transition-all duration-300"
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    <Link to={`/product/${product.id}`} className="block">
                      <div className="relative aspect-[3/4] overflow-hidden bg-sand-100">
                        <img
                          src={color.images[0]}
                          alt={`${product.name} in ${color.name}`}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleWishlist(product.id, color.id);
                          }}
                          className="absolute top-4 right-4 p-2 bg-pearl-50/90 backdrop-blur-sm rounded-full text-sand-500 hover:text-coral-600 hover:bg-pearl-50 transition-colors"
                          aria-label={`Remove ${product.name} from wishlist`}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                          </svg>
                        </button>
                      </div>
                      <div className="p-6">
                        <p className="font-mono text-xs tracking-wider uppercase text-sand-500 mb-1">
                          {product.collection.toUpperCase()}
                        </p>
                        <h3 className="font-display text-xl font-medium text-sand-900 mb-2 group-hover:text-sand-700 transition-colors">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="font-medium text-sand-900">{formatPrice(product.price)}</span>
                          <div className="w-6 h-6 rounded-full border border-sand-200" style={{ backgroundColor: color.hex }} aria-label={color.name} />
                        </div>
                      </div>
                    </Link>
                    <div className="px-6 pb-6 pt-0">
                      <Link to={`/product/${product.id}`}>
                        <Button className="w-full" variant="primary">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}