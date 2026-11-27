import { Link } from 'react-router-dom';
import { CampaignImage } from '../components/ui/CampaignImage.tsx';
import { Button } from '../components/ui/Button.tsx';

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
    <div className="min-h-screen bg-collection-bg">
      {/* Hero */}
      <section className="py-20 lg:py-28 relative" aria-labelledby="journal-heading">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="font-mono text-sm tracking-widest uppercase text-collection-text-muted mb-3">EDITORIAL</p>
          <h1 id="journal-heading" className="font-display text-5xl md:text-7xl font-medium text-collection-text-primary tracking-tight mb-6">
            Journal
          </h1>
          <p className="text-collection-text-secondary text-lg leading-relaxed max-w-2xl mx-auto">
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
                className="group bg-collection-surface rounded-xl overflow-hidden border border-collection-border hover:border-collection-accent transition-all duration-300"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <Link to={`/journal/${article.id}`} className="block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-collection-border">
                    <CampaignImage
                      src={article.image}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      composition="editorial"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-xs">
                      <span className="font-mono tracking-wider uppercase text-collection-text-muted">{article.category}</span>
                      <span className="text-collection-text-muted/50">·</span>
                      <span className="text-collection-text-muted">{article.readTime}</span>
                    </div>
                    <h2 className="font-display text-xl font-medium text-collection-text-primary group-hover:text-collection-accent transition-colors line-clamp-2">
                      {article.title}
                    </h2>
                    <p className="text-collection-text-secondary text-sm leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-2 border-t border-collection-border">
                      <span className="text-collection-text-muted text-sm">{article.date}</span>
                      <span className="font-mono text-xs text-collection-text-muted">{article.author}</span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button variant="outline" size="lg">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 lg:py-28 bg-collection-surface-elevated" aria-labelledby="newsletter-heading">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="font-mono text-sm tracking-widest uppercase text-collection-text-muted mb-3">STAY CONNECTED</p>
          <h2 id="newsletter-heading" className="font-display text-4xl md:text-5xl font-medium text-collection-text-primary tracking-tight mb-6">
            Journal Delivered
          </h2>
          <p className="text-collection-text-secondary text-lg leading-relaxed mb-8">
            New articles, collection insights, and private previews. No spam — only architecture.
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
        </div>
      </section>
    </div>
  );
}