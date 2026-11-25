import { Link } from 'react-router-dom';

const ARTICLES = [
  {
    id: 'monolith-origin',
    title: 'The Monolith Origin',
    excerpt: 'How a single architectural question — can a bikini hold its form without hardware? — became our inaugural collection.',
    category: 'DESIGN PROCESS',
    readTime: '8 min read',
    image: '/images/journal/monolith-origin.jpg',
    date: '2024.03.15',
    author: 'M. Andersson'
  },
  {
    id: 'lumen-light',
    title: 'Light as Structure: The Lumen Story',
    excerpt: 'Exploring refractive mesh as architectural material — where the body becomes part of the optical system.',
    category: 'MATERIAL RESEARCH',
    readTime: '6 min read',
    image: '/images/journal/lumen-light.jpg',
    date: '2024.06.22',
    author: 'S. Chen'
  },
  {
    id: 'strata-geology',
    title: 'Sedimentary Logic in Strata',
    excerpt: 'Three tonal bands. Hand-oxidized brass. How geological folding became wearable architecture.',
    category: 'COLLECTION DEVELOPMENT',
    readTime: '7 min read',
    image: '/images/journal/strata-geology.jpg',
    date: '2024.09.10',
    author: 'R. Silva'
  },
  {
    id: 'econyl-journey',
    title: 'From Ocean Waste to Architecture',
    excerpt: 'The journey of ECONYL® — from discarded fishing nets to regenerative nylon that performs identically to virgin material.',
    category: 'SUSTAINABILITY',
    readTime: '5 min read',
    image: '/images/journal/econyl-journey.jpg',
    date: '2024.01.28',
    author: 'L. Rossi'
  },
  {
    id: 'porto-atelier',
    title: 'Inside the Porto Atelier',
    excerpt: '23 pairs of hands. Ultrasonic bonding. Quarterly visits. Why making in Portugal matters.',
    category: 'MAKING',
    readTime: '9 min read',
    image: '/images/journal/porto-atelier.jpg',
    date: '2024.04.18',
    author: 'M. Andersson'
  },
  {
    id: 'care-guide',
    title: 'The SOLUN Care Ritual',
    excerpt: 'Cold rinse. Mild detergent. Flat dry in shade. How proper care honors the resources that created your garment.',
    category: 'GARMENT CARE',
    readTime: '4 min read',
    image: '/images/journal/care-guide.jpg',
    date: '2024.07.03',
    author: 'S. Chen'
  }
];

export function Journal() {
  return (
    <div className="min-h-screen bg-pearl-50">
      {/* Hero */}
      <section className="py-20 lg:py-28 relative" aria-labelledby="journal-heading">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="font-mono text-sm tracking-widest uppercase text-sand-500 mb-3">EDITORIAL</p>
          <h1 id="journal-heading" className="font-display text-5xl md:text-7xl font-medium text-sand-900 tracking-tight mb-6">
            Journal
          </h1>
          <p className="text-sand-600 text-lg leading-relaxed max-w-2xl mx-auto">
            Design process, material research, sustainability, and the stories behind each architectural investigation.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 lg:py-24 px-6" aria-labelledby="articles-heading">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ARTICLES.map((article, index) => (
              <article
                key={article.id}
                className="group bg-pearl-50 rounded-xl overflow-hidden border border-sand-200 hover:border-sand-300 transition-all duration-300"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <Link to={`/journal/${article.id}`} className="block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-sand-100">
                    <img
                      src={article.image}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      aria-hidden="true"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-xs">
                      <span className="font-mono tracking-wider uppercase text-sand-500">{article.category}</span>
                      <span className="text-sand-300">·</span>
                      <span className="text-sand-500">{article.readTime}</span>
                    </div>
                    <h2 className="font-display text-xl font-medium text-sand-900 group-hover:text-sand-700 transition-colors line-clamp-2">
                      {article.title}
                    </h2>
                    <p className="text-sand-600 text-sm leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-2 border-t border-sand-200">
                      <span className="text-sand-500 text-sm">{article.date}</span>
                      <span className="font-mono text-xs text-sand-500">{article.author}</span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          <div className="text-center mt-16">
            <button className="px-6 py-3 bg-sand-900 text-pearl-50 font-medium rounded-md hover:bg-sand-950 transition-colors">
              Load More Articles
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 lg:py-28 bg-sand-950" aria-labelledby="newsletter-heading">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="font-mono text-sm tracking-widest uppercase text-sand-400 mb-3">STAY CONNECTED</p>
          <h2 id="newsletter-heading" className="font-display text-4xl md:text-5xl font-medium text-pearl-50 tracking-tight mb-6">
            Journal Delivered
          </h2>
          <p className="text-sand-400 text-lg leading-relaxed mb-8">
            New articles, collection insights, and private previews. No spam — only architecture.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 px-6 py-4 bg-sand-900 border border-sand-800 text-pearl-100 placeholder:text-sand-500 rounded-md focus:outline-none focus:border-sand-500 focus:ring-1 focus:ring-sand-500 text-base"
              aria-label="Email address for newsletter"
              required
            />
            <button
              type="submit"
              className="px-8 py-4 bg-sand-500 text-sand-950 font-medium text-base rounded-md hover:bg-sand-400 transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}