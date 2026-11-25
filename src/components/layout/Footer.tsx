import { Link } from 'react-router-dom';

const FOOTER_LINKS = {
  CUSTOMER: [
    { label: 'Shipping & Returns', href: '/shipping-returns' },
    { label: 'Size Guide', href: '/size-guide' },
    { label: 'Care Instructions', href: '/care' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'FAQ', href: '/faq' }
  ],
  BRAND: [
    { label: 'Our Story', href: '/about' },
    { label: 'Sustainability', href: '/sustainability' },
    { label: 'Journal', href: '/journal' },
    { label: 'Stockists', href: '/stockists' },
    { label: 'Careers', href: '/careers' }
  ],
  LEGAL: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'Accessibility', href: '/accessibility' }
  ]
};

const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://instagram.com', icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="18" cy="6" r="1.5" />
    </svg>
  )},
  { label: 'Twitter', href: 'https://twitter.com', icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
    </svg>
  )},
  { label: 'Pinterest', href: 'https://pinterest.com', icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.31 4.69l-1.41 1.41" />
    </svg>
  )}
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-sand-950 text-pearl-100" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" className="font-display text-3xl font-medium tracking-tight mb-6 block">
              SOLUN
            </Link>
            <p className="text-sand-400 text-sm leading-relaxed mb-6 max-w-xs">
              Sculptural forms. Regenerative fabrics. The modern silhouette redefined.
            </p>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sand-400 hover:text-pearl-100 transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Customer service">
            <h3 className="font-medium text-pearl-100 uppercase tracking-wider text-sm mb-4">CUSTOMER</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.CUSTOMER.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sand-400 hover:text-pearl-100 transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Brand">
            <h3 className="font-medium text-pearl-100 uppercase tracking-wider text-sm mb-4">BRAND</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.BRAND.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sand-400 hover:text-pearl-100 transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Legal">
            <h3 className="font-medium text-pearl-100 uppercase tracking-wider text-sm mb-4">LEGAL</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.LEGAL.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sand-400 hover:text-pearl-100 transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-medium text-pearl-100 uppercase tracking-wider text-sm mb-4">NEWSLETTER</h3>
            <p className="text-sand-400 text-sm mb-4 leading-relaxed">
              New collections, journal entries, and private previews.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 px-4 py-3 bg-sand-900 border border-sand-800 text-pearl-100 placeholder:text-sand-500 rounded-md focus:outline-none focus:border-sand-500 focus:ring-1 focus:ring-sand-500 text-sm"
                aria-label="Email address for newsletter"
              />
              <button
                type="submit"
                className="px-4 py-3 bg-sand-500 text-sand-950 font-medium text-sm rounded-md hover:bg-sand-400 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-sand-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sand-500 text-sm">
            © {currentYear} SOLUN. All rights reserved.
          </p>
          <p className="text-sand-500 text-sm font-mono">
            Simulated commerce experience — no real transactions
          </p>
        </div>
      </div>
    </footer>
  );
}