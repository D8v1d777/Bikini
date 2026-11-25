import { Link } from 'react-router-dom';
import { BRAND_NAME, BRAND_TAGLINE, BRAND_DESCRIPTION } from '../data/brand.ts';

export function About() {
  return (
    <div className="min-h-screen bg-pearl-50">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center" aria-labelledby="about-heading">
        <div className="absolute inset-0" aria-hidden="true">
          <img
            src="/images/about/hero.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-abyss-950/80 via-abyss-950/20 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 pb-16 w-full z-10">
          <header className="max-w-3xl">
            <p className="font-mono text-sm tracking-widest uppercase text-pearl-100/70 mb-3">
              {BRAND_NAME}
            </p>
            <h1 id="about-heading" className="font-display text-5xl md:text-7xl font-medium text-pearl-50 tracking-tight mb-6">
              {BRAND_TAGLINE}
            </h1>
            <p className="text-sand-200 text-lg leading-relaxed max-w-2xl">
              {BRAND_DESCRIPTION}
            </p>
          </header>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 lg:py-28 px-6" aria-labelledby="story-heading">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <p className="font-mono text-sm tracking-widest uppercase text-sand-500 mb-3">ORIGINS</p>
              <h2 id="story-heading" className="font-display text-4xl md:text-5xl font-medium text-sand-900 tracking-tight mb-6">
                Carved from a single question
              </h2>
              <div className="space-y-6 text-sand-600 leading-relaxed text-lg">
                <p>
                  In 2023, a small team of architects, textile engineers, and pattern makers asked:
                  what if swimwear was engineered like architecture? Not decorated. Not draped.
                  <em>Engineered.</em>
                </p>
                <p>
                  The answer required rethinking every convention. Seams replaced by ultrasonic bonding.
                  Hardware eliminated by internal tension architecture. Foam removed in favor of
                  self-supporting folds. Every decision driven by a single constraint: the garment
                  must hold its form through structure alone.
                </p>
                <p>
                  The material had to match the ambition. Regenerative ECONYL® nylon — regenerated
                  from ocean waste, fishing nets, and industrial plastic — became our foundation.
                  It performs identically to virgin nylon but closes the loop on waste.
                </p>
                <p className="font-medium">
                  Three collections. One material philosophy. Zero compromise.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-sand-100">
              <img
                src="/images/about/workshop.jpg"
                alt="SOLUN workshop — architects and engineers collaborating on swimwear patterns"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28 bg-sand-950" aria-labelledby="values-heading">
        <div className="max-w-7xl mx-auto px-6">
          <header className="text-center max-w-2xl mx-auto mb-16">
            <p className="font-mono text-sm tracking-widest uppercase text-sand-400 mb-3">PRINCIPLES</p>
            <h2 id="values-heading" className="font-display text-4xl md:text-5xl font-medium text-pearl-50 tracking-tight">
              Three Principles
            </h2>
          </header>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'STRUCTURE AS ORNAMENT',
                description: 'No decorative hardware. No applied trim. Every visible element carries load. The architecture is the aesthetic.',
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" />
                    <line x1="12" y1="2" x2="12" y2="22" />
                    <line x1="2" y1="8.5" x2="12" y2="15.5" />
                    <line x1="22" y1="8.5" x2="12" y2="15.5" />
                  </svg>
                )
              },
              {
                title: 'REGENERATION BY DEFAULT',
                description: 'Every thread is ECONYL® regenerated nylon. No virgin petroleum. No seasonal waste. Made-to-order production eliminates overstock.',
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                    <path d="M16 16h5v5" />
                  </svg>
                )
              },
              {
                title: 'MADE TO ENDURE',
                description: 'Chlorine-resistant. UV-protective. Shape-retentive. Designed for seasons of wear, not a single summer. Repairable by design.',
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                )
              }
            ].map((value) => (
              <article key={value.title} className="text-center p-8">
                <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-sand-900/10 flex items-center justify-center text-sand-900">
                  {value.icon}
                </div>
                <h3 className="font-display text-xl font-medium text-sand-900 mb-3">{value.title}</h3>
                <p className="text-sand-600 leading-relaxed">{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Made In */}
      <section className="py-20 lg:py-28 px-6" aria-labelledby="madein-heading">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-sand-100">
              <img
                src="/images/about/atelier-portugal.jpg"
                alt="Portuguese atelier — skilled hands working on SOLUN swimwear"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <p className="font-mono text-sm tracking-widest uppercase text-sand-500 mb-3">MAKING</p>
              <h2 id="madein-heading" className="font-display text-4xl md:text-5xl font-medium text-sand-900 tracking-tight mb-6">
                Made in Portugal & Italy
              </h2>
              <div className="space-y-6 text-sand-600 leading-relaxed text-lg">
                <p>
                  Our pieces are crafted in family-run ateliers in Porto, Portugal and Como, Italy —
                  regions with generations of textile expertise. These workshops understand swimwear
                  as structural garment, not seasonal accessory.
                </p>
                <p>
                  Each piece passes through 23 pairs of hands. Pattern engineers who translate
                  architectural drawings into cutting markers. Bonding technicians who fuse seams
                  with ultrasonic precision. Quality controllers who stress-test every closure,
                  every fold, every edge.
                </p>
                <p>
                  We visit quarterly. We know every maker by name. This is not outsourcing —
                  it is partnership.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-sand-950" aria-labelledby="cta-heading">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="font-mono text-sm tracking-widest uppercase text-sand-400 mb-3">EXPERIENCE</p>
          <h2 id="cta-heading" className="font-display text-4xl md:text-5xl font-medium text-pearl-50 tracking-tight mb-6">
            Explore the Collections
          </h2>
          <p className="text-sand-400 text-lg leading-relaxed mb-8">
            Three architectural investigations. Nine silhouettes. One regenerative foundation.
          </p>
          <Link to="/collections">
            <button className="px-8 py-4 bg-sand-500 text-sand-950 font-medium text-lg rounded-md hover:bg-sand-400 transition-colors">
              View Collections
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}