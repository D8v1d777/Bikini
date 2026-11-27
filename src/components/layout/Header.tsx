import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext.tsx';
import { useWishlist } from '../../context/WishlistContext.tsx';

const NAV_ITEMS = [
  { path: '/', label: 'HOME' },
  { path: '/collections', label: 'COLLECTIONS' },
  { path: '/journal', label: 'JOURNAL' },
  { path: '/about', label: 'ABOUT' }
];

export function Header() {
  const location = useLocation();
  const { state: cartState, toggleCart, totalItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-collection-surface/95 backdrop-blur-md border-b border-collection-border' : 'bg-transparent'
      }`}
      role="banner"
    >
      <nav className="max-w-7xl mx-auto px-6 py-4" aria-label="Main navigation">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="font-display text-2xl font-medium text-collection-text-primary tracking-tight hover:opacity-80 transition-opacity"
            aria-label="SOLUN - Home"
          >
            SOLUN
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {NAV_ITEMS.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium tracking-wider uppercase transition-colors ${
                  location.pathname === item.path
                    ? 'text-collection-text-primary'
                    : 'text-collection-text-secondary hover:text-collection-text-primary'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative p-2 text-collection-text-secondary hover:text-collection-text-primary transition-colors md:hidden"
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M3 12h18M3 6h18M3 18h18" />
                )}
              </svg>
            </button>

            <Link
              to="/wishlist"
              className="relative p-2 text-collection-text-secondary hover:text-collection-text-primary transition-colors"
              aria-label={`Wishlist, ${wishlistItems.length} items`}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-collection-accent text-collection-surface text-xs font-medium rounded-full flex items-center justify-center">
                  {wishlistItems.length > 9 ? '9+' : wishlistItems.length}
                </span>
              )}
            </Link>

            <button
              onClick={toggleCart}
              className="relative p-2 text-collection-text-secondary hover:text-collection-text-primary transition-colors"
              aria-label={`Shopping bag, ${totalItems} items`}
              aria-expanded={cartState.isOpen}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1 0 8" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-collection-text-primary text-collection-surface text-xs font-medium rounded-full flex items-center justify-center">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-6 pt-6 border-t border-collection-border animate-slide-down">
            <div className="flex flex-col gap-4">
              {NAV_ITEMS.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-base font-medium tracking-wider uppercase py-2 ${
                    location.pathname === item.path ? 'text-collection-text-primary' : 'text-collection-text-secondary'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}