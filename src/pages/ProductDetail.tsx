import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.tsx';
import { useWishlist } from '../context/WishlistContext.tsx';
import { getProduct, getProductsByCollection, BRAND_NAME } from '../data/brand.ts';
import { Button } from '../components/ui/Button.tsx';
import type { Product, ColorVariant, SizeVariant } from '../types/index.ts';

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = id ? getProduct(id) : null;
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedColor, setSelectedColor] = useState<ColorVariant | null>(null);
  const [selectedSize, setSelectedSize] = useState<SizeVariant | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    if (product && product.colors.length > 0) {
      const firstInStock = product.colors.find((c: ColorVariant) => c.inStock) || product.colors[0];
      setSelectedColor(firstInStock);
      setSelectedImageIndex(0);
    }
    if (product && product.sizes.length > 0) {
      const firstInStock = product.sizes.find((s: SizeVariant) => s.inStock) || product.sizes[0];
      setSelectedSize(firstInStock);
    }
  }, [product]);

  useEffect(() => {
    if (selectedColor) {
      const colorImages = selectedColor.images;
      if (selectedImageIndex >= colorImages.length) {
        setSelectedImageIndex(0);
      }
    }
  }, [selectedColor, selectedImageIndex]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pearl-50 px-6">
        <div className="text-center">
          <h1 className="font-display text-4xl md:text-5xl font-medium text-sand-900 mb-4">Product Not Found</h1>
          <p className="text-sand-600 mb-8">The product you're looking for doesn't exist.</p>
          <Link to="/collections">
            <Button>View All Collections</Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentImages = selectedColor?.images || product.images.map((i: { src: string }) => i.src);
  const currentImage = currentImages[selectedImageIndex];
  const inStock = selectedColor?.inStock && selectedSize?.inStock;
  const wishlisted = selectedColor ? isInWishlist(product.id, selectedColor.id) : false;

  const handleAddToCart = () => {
    if (selectedColor && selectedSize && inStock) {
      addItem(product, selectedColor, selectedSize);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-pearl-50">
      {/* Breadcrumb */}
      <nav className="px-6 py-4 border-b border-sand-200" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm">
          <Link to="/" className="text-sand-500 hover:text-sand-900 transition-colors">{BRAND_NAME}</Link>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-sand-300 flex-shrink-0">
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <Link to="/collections" className="text-sand-500 hover:text-sand-900 transition-colors">Collections</Link>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-sand-300 flex-shrink-0">
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <Link to={`/collections/${product.collection}`} className="text-sand-500 hover:text-sand-900 transition-colors">
            {product.collection.toUpperCase()}
          </Link>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-sand-300 flex-shrink-0">
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <span className="text-sand-900 font-medium truncate max-w-[200px]">{product.name}</span>
        </div>
      </nav>

      {/* Product Gallery & Info */}
      <section className="py-12 lg:py-16 px-6" aria-labelledby="product-name">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Gallery */}
            <div className="relative">
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-sand-100 mb-4">
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-sand-100">
                    <svg className="animate-spin h-10 w-10 text-sand-300" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  </div>
                )}
                <img
                  src={currentImage}
                  alt={`${product.name} in ${selectedColor?.name}`}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageLoaded(true)}
                />
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 overflow-x-auto pb-2 -mx-2 px-2" role="group" aria-label="Product images">
                {currentImages.map((img: string, index: number) => (
                  <button
                    key={img}
                    onClick={() => { setSelectedImageIndex(index); setImageLoaded(false); }}
                    className={`relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${
                      index === selectedImageIndex
                        ? 'border-sand-900'
                        : 'border-transparent hover:border-sand-300'
                    }`}
                    aria-label={`View image ${index + 1}`}
                    aria-current={index === selectedImageIndex ? 'true' : 'false'}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:sticky lg:top-24 lg:pt-8 space-y-8">
              <div>
                <p className="font-mono text-xs tracking-widest uppercase text-sand-500 mb-2">
                  {product.collection.toUpperCase()} COLLECTION
                </p>
                <h1 id="product-name" className="font-display text-4xl md:text-5xl font-medium text-sand-900 tracking-tight mb-3">
                  {product.name}
                </h1>
                <p className="font-medium text-sand-900 text-2xl">${product.price.toLocaleString()}</p>
              </div>

              <div className="border-t border-sand-200 pt-8 space-y-6">
                {/* Color Selection */}
                <fieldset>
                  <legend className="font-mono text-xs tracking-widest uppercase text-sand-500 mb-4 block">COLOUR</legend>
                  <div className="flex flex-wrap gap-3" role="radiogroup" aria-label="Color options">
                    {product.colors.map((color: ColorVariant) => (
                      <label
                        key={color.id}
                        className={`relative cursor-pointer transition-all ${
                          !color.inStock ? 'opacity-40 cursor-not-allowed' : ''
                        }`}
                      >
                        <input
                          type="radio"
                          name="color"
                          value={color.id}
                          checked={selectedColor?.id === color.id}
                          onChange={() => { setSelectedColor(color); setSelectedImageIndex(0); setImageLoaded(false); }}
                          disabled={!color.inStock}
                          className="sr-only"
                          aria-label={color.name}
                        />
                        <div className={`w-12 h-12 rounded-full border-2 transition-all ${
                          selectedColor?.id === color.id
                            ? 'border-sand-900 scale-110'
                            : 'border-sand-200 hover:border-sand-400'
                        }`} style={{ backgroundColor: color.hex }}>
                          {selectedColor?.id === color.id && (
                            <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-pearl-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                        {!color.inStock && (
                          <span className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 text-xs text-coral-600 font-medium whitespace-nowrap">Sold Out</span>
                        )}
                      </label>
                    ))}
                  </div>
                  <p className="text-sm text-sand-500 mt-3" aria-live="polite">
                    Selected: <span className="font-medium text-sand-900">{selectedColor?.name}</span>
                  </p>
                </fieldset>

                {/* Size Selection */}
                <fieldset>
                  <legend className="font-mono text-xs tracking-widest uppercase text-sand-500 mb-4 block">SIZE</legend>
                  <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Size options">
                    {product.sizes.map((size: SizeVariant) => (
                      <label
                        key={size.id}
                        className={`relative cursor-pointer transition-all ${
                          !size.inStock ? 'opacity-40 cursor-not-allowed' : ''
                        }`}
                      >
                        <input
                          type="radio"
                          name="size"
                          value={size.id}
                          checked={selectedSize?.id === size.id}
                          onChange={() => setSelectedSize(size)}
                          disabled={!size.inStock}
                          className="sr-only"
                          aria-label={size.label}
                        />
                        <div className={`w-12 h-12 flex items-center justify-center rounded-md border-2 text-sm font-medium transition-all ${
                          selectedSize?.id === size.id
                            ? 'border-sand-900 bg-sand-900 text-pearl-50'
                            : 'border-sand-200 text-sand-900 hover:border-sand-400'
                        }`}>
                          {size.label}
                        </div>
                        {!size.inStock && (
                          <span className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 text-xs text-coral-600 font-medium whitespace-nowrap">Unavailable</span>
                        )}
                      </label>
                    ))}
                  </div>
                  <p className="text-sm text-sand-500 mt-3" aria-live="polite">
                    Selected: <span className="font-medium text-sand-900">{selectedSize?.label}</span>
                    {!selectedSize?.inStock && <span className="text-coral-600 ml-1">(Unavailable)</span>}
                  </p>
                </fieldset>

                {/* Wishlist */}
                <button
                  onClick={() => selectedColor && toggleWishlist(product.id, selectedColor.id)}
                  className={`flex items-center gap-3 w-full px-6 py-4 rounded-lg border transition-all ${
                    wishlisted
                      ? 'bg-sand-900 border-sand-900 text-pearl-50'
                      : 'bg-pearl-50 border-sand-200 text-sand-900 hover:border-sand-300'
                  }`}
                  aria-pressed={wishlisted}
                  aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill={wishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={wishlisted ? '0' : '1.5'} className="flex-shrink-0">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  <span className="font-medium">{wishlisted ? 'Saved to Wishlist' : 'Add to Wishlist'}</span>
                </button>

                {/* Add to Cart */}
                <Button
                  onClick={handleAddToCart}
                  disabled={!inStock || addedToCart}
                  className="w-full"
                  size="lg"
                  loading={addedToCart}
                >
                  {addedToCart ? 'Added to Bag' : inStock ? 'Add to Bag' : 'Sold Out'}
                </Button>

                {/* Shipping Info */}
                <div className="border-t border-sand-200 pt-6 space-y-3 text-sm text-sand-600">
                  <div className="flex items-center gap-3">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-sand-400 flex-shrink-0">
                      <path d="M22 16.17v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-3" />
                      <path d="M22 12H2" />
                      <path d="M6 12v-2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />
                    </svg>
                    <span>Complimentary shipping on orders over $500</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-sand-400 flex-shrink-0">
                      <path d="M21 12V7H5v5" />
                      <path d="M7 7l5 5 5-5" />
                      <path d="M17 17v5" />
                      <path d="M7 17v5" />
                    </svg>
                    <span>30-day returns, unworn with tags</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-16 lg:mt-24 border-t border-sand-200">
            <div className="max-w-4xl mx-auto">
              <ProductDetailsTabs product={product} />
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-12 lg:py-16 px-6 bg-sand-100" aria-labelledby="related-heading">
        <div className="max-w-7xl mx-auto">
          <header className="mb-12">
            <h2 id="related-heading" className="font-display text-3xl md:text-4xl font-medium text-sand-900">
              From the Same Collection
            </h2>
          </header>
          <RelatedProducts currentProductId={product.id} collectionId={product.collection} />
        </div>
      </section>
    </div>
  );
}

function ProductDetailsTabs({ product }: { product: Product }) {
  const [activeTab, setActiveTab] = useState<'details' | 'care' | 'shipping'>('details');

  return (
    <div>
      <div className="flex gap-8 border-b border-sand-200 mb-8" role="tablist">
        {[
          { id: 'details', label: 'DETAILS' },
          { id: 'care', label: 'CARE' },
          { id: 'shipping', label: 'SHIPPING' }
        ].map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`pb-4 font-medium text-sm tracking-wider uppercase transition-colors ${
              activeTab === tab.id
                ? 'text-sand-900 border-b-2 border-sand-900'
                : 'text-sand-500 hover:text-sand-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div role="tabpanel" id="panel-details" aria-labelledby="tab-details" hidden={activeTab !== 'details'}>
        <div className="prose prose-sand max-w-none">
          <p className="text-sand-600 leading-relaxed mb-6">{product.description}</p>
          <ul className="space-y-3 text-sand-600">
            {product.details.map((detail: string, index: number) => (
              <li key={index} className="flex items-start gap-3">
                <svg width="6" height="6" viewBox="0 0 6 6" className="mt-2.5 text-sand-400 flex-shrink-0">
                  <circle cx="3" cy="3" r="3" fill="currentColor" />
                </svg>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div role="tabpanel" id="panel-care" aria-labelledby="tab-care" hidden={activeTab !== 'care'} className="prose prose-sand max-w-none">
        <p className="text-sand-600 leading-relaxed mb-4">
          SOLUN swimwear is crafted from regenerative ECONYL® nylon. Proper care extends the life of your garment and honors the resources that created it.
        </p>
        <ul className="space-y-3 text-sand-600">
          <li className="flex items-start gap-3"><svg width="6" height="6" viewBox="0 0 6 6" className="mt-2.5 text-sand-400 flex-shrink-0"><circle cx="3" cy="3" r="3" fill="currentColor" /></svg><span>Rinse in cold water after each use — salt, chlorine, and sunscreen degrade fibers over time</span></li>
          <li className="flex items-start gap-3"><svg width="6" height="6" viewBox="0 0 6 6" className="mt-2.5 text-sand-400 flex-shrink-0"><circle cx="3" cy="3" r="3" fill="currentColor" /></svg><span>Hand wash in cool water with mild detergent — no bleach, no fabric softener</span></li>
          <li className="flex items-start gap-3"><svg width="6" height="6" viewBox="0 0 6 6" className="mt-2.5 text-sand-400 flex-shrink-0"><circle cx="3" cy="3" r="3" fill="currentColor" /></svg><span>Lay flat to dry in shade — never tumble dry, never wring</span></li>
          <li className="flex items-start gap-3"><svg width="6" height="6" viewBox="0 0 6 6" className="mt-2.5 text-sand-400 flex-shrink-0"><circle cx="3" cy="3" r="3" fill="currentColor" /></svg><span>Store flat or rolled — avoid hanging by straps which can stretch the architecture</span></li>
          <li className="flex items-start gap-3"><svg width="6" height="6" viewBox="0 0 6 6" className="mt-2.5 text-sand-400 flex-shrink-0"><circle cx="3" cy="3" r="3" fill="currentColor" /></svg><span>Avoid rough surfaces — the regenerative fabric is durable but not indestructible</span></li>
        </ul>
      </div>

      <div role="tabpanel" id="panel-shipping" aria-labelledby="tab-shipping" hidden={activeTab !== 'shipping'} className="prose prose-sand max-w-none">
        <p className="text-sand-600 leading-relaxed mb-4">
          Each SOLUN piece is made to order in Portugal or Italy. This means no excess inventory, no waste — and a slightly longer wait for something made precisely for you.
        </p>
        <ul className="space-y-3 text-sand-600">
          <li className="flex items-start gap-3"><svg width="6" height="6" viewBox="0 0 6 6" className="mt-2.5 text-sand-400 flex-shrink-0"><circle cx="3" cy="3" r="3" fill="currentColor" /></svg><span><strong>Production:</strong> 2–3 weeks from order confirmation</span></li>
          <li className="flex items-start gap-3"><svg width="6" height="6" viewBox="0 0 6 6" className="mt-2.5 text-sand-400 flex-shrink-0"><circle cx="3" cy="3" r="3" fill="currentColor" /></svg><span><strong>Shipping:</strong> 3–5 business days (US), 5–10 business days (International)</span></li>
          <li className="flex items-start gap-3"><svg width="6" height="6" viewBox="0 0 6 6" className="mt-2.5 text-sand-400 flex-shrink-0"><circle cx="3" cy="3" r="3" fill="currentColor" /></svg><span><strong>Tracking:</strong> Provided via email once shipped</span></li>
          <li className="flex items-start gap-3"><svg width="6" height="6" viewBox="0 0 6 6" className="mt-2.5 text-sand-400 flex-shrink-0"><circle cx="3" cy="3" r="3" fill="currentColor" /></svg><span><strong>Returns:</strong> 30 days, unworn with original tags and hygiene liner</span></li>
        </ul>
      </div>
    </div>
  );
}

function RelatedProducts({ currentProductId, collectionId }: { currentProductId: string; collectionId: string }) {
  const products = getProductsByCollection(collectionId).filter((p: Product) => p.id !== currentProductId).slice(0, 3);

  return (
    <div className="grid sm:grid-cols-3 gap-6">
      {products.map((product: Product, index: number) => (
        <article
          key={product.id}
          className="group bg-pearl-50 rounded-xl overflow-hidden border border-sand-200 hover:border-sand-300 transition-all duration-300"
          style={{ animationDelay: `${index * 80}ms` }}
        >
          <Link to={`/product/${product.id}`} className="block">
            <div className="relative aspect-[3/4] overflow-hidden bg-sand-100">
              <img
                src={product.colors[0]?.images[0] || '/images/placeholder-product.jpg'}
                alt={`${product.name} in ${product.colors[0]?.name}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="p-6">
              <p className="font-mono text-xs tracking-wider uppercase text-sand-500 mb-1">
                {collectionId.toUpperCase()}
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
  );
}