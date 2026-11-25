const fs = require('fs');
const path = require('path');

const createPlaceholder = (width, height, text, bgColor = '#e8e2d8', textColor = '#85735a') => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" fill="none">
  <rect width="${width}" height="${height}" fill="${bgColor}"/>
  <text x="${width/2}" y="${height/2}" font-family="system-ui, sans-serif" font-size="${Math.min(width, height) * 0.05}" fill="${textColor}" text-anchor="middle" dominant-baseline="middle">${text}</text>
</svg>
`;

const directories = [
  'public/images/hero',
  'public/images/campaign',
  'public/images/products/monolith-one',
  'public/images/products/monolith-two',
  'public/images/products/monolith-three',
  'public/images/products/lumen-one',
  'public/images/products/lumen-two',
  'public/images/products/lumen-three',
  'public/images/products/strata-one',
  'public/images/products/strata-two',
  'public/images/products/strata-three',
  'public/images/philosophy',
  'public/images/editorial',
  'public/images/about',
  'public/images/journal'
];

directories.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Hero images
fs.writeFileSync('public/images/hero/hero-1.jpg', createPlaceholder(1920, 1080, 'HERO 1 - MONOLITH', '#28211c', '#f4f1eb'));
fs.writeFileSync('public/images/hero/hero-2.jpg', createPlaceholder(1920, 1080, 'HERO 2 - LUMEN', '#f4f1eb', '#4a3f36'));
fs.writeFileSync('public/images/hero/hero-3.jpg', createPlaceholder(1920, 1080, 'HERO 3 - STRATA', '#584d3f', '#f4f1eb'));

// Campaign images
fs.writeFileSync('public/images/campaign/monolith-hero.jpg', createPlaceholder(1200, 1500, 'CAMPAIGN - MONOLITH', '#28211c', '#f4f1eb'));
fs.writeFileSync('public/images/campaign/lumen-hero.jpg', createPlaceholder(1200, 1500, 'CAMPAIGN - LUMEN', '#f4f1eb', '#4a3f36'));
fs.writeFileSync('public/images/campaign/strata-hero.jpg', createPlaceholder(1200, 1500, 'CAMPAIGN - STRATA', '#584d3f', '#f4f1eb'));

// Product images for each product and color
const products = {
  'monolith-one': ['obsidian', 'basalt', 'ash'],
  'monolith-two': ['obsidian-2', 'basalt-2', 'ash-2'],
  'monolith-three': ['obsidian-3', 'basalt-3', 'ash-3'],
  'lumen-one': ['pearl', 'mist', 'frost'],
  'lumen-two': ['pearl-2', 'mist-2', 'frost-2'],
  'lumen-three': ['pearl-3', 'mist-3', 'frost-3'],
  'strata-one': ['terracotta', 'ochre', 'sienna'],
  'strata-two': ['terracotta-2', 'ochre-2', 'sienna-2'],
  'strata-three': ['terracotta-3', 'ochre-3', 'sienna-3']
};

const colorStyles = {
  obsidian: { bg: '#1e1e1e', text: '#faf9f6' },
  basalt: { bg: '#383838', text: '#faf9f6' },
  ash: { bg: '#585858', text: '#faf9f6' },
  'obsidian-2': { bg: '#1e1e1e', text: '#faf9f6' },
  'basalt-2': { bg: '#383838', text: '#faf9f6' },
  'ash-2': { bg: '#585858', text: '#faf9f6' },
  'obsidian-3': { bg: '#1e1e1e', text: '#faf9f6' },
  'basalt-3': { bg: '#383838', text: '#faf9f6' },
  'ash-3': { bg: '#585858', text: '#faf9f6' },
  pearl: { bg: '#fcfbf7', text: '#4a3f36' },
  mist: { bg: '#eee8dd', text: '#4a3f36' },
  frost: { bg: '#e0d8c9', text: '#4a3f36' },
  'pearl-2': { bg: '#fcfbf7', text: '#4a3f36' },
  'mist-2': { bg: '#eee8dd', text: '#4a3f36' },
  'frost-2': { bg: '#e0d8c9', text: '#4a3f36' },
  'pearl-3': { bg: '#fcfbf7', text: '#4a3f36' },
  'mist-3': { bg: '#eee8dd', text: '#4a3f36' },
  'frost-3': { bg: '#e0d8c9', text: '#4a3f36' },
  terracotta: { bg: '#9a281b', text: '#faf9f6' },
  ochre: { bg: '#be2d1c', text: '#faf9f6' },
  sienna: { bg: '#7d241a', text: '#faf9f6' },
  'terracotta-2': { bg: '#9a281b', text: '#faf9f6' },
  'ochre-2': { bg: '#be2d1c', text: '#faf9f6' },
  'sienna-2': { bg: '#7d241a', text: '#faf9f6' },
  'terracotta-3': { bg: '#9a281b', text: '#faf9f6' },
  'ochre-3': { bg: '#be2d1c', text: '#faf9f6' },
  'sienna-3': { bg: '#7d241a', text: '#faf9f6' }
};

Object.entries(products).forEach(([product, colors]) => {
  colors.forEach(color => {
    const style = colorStyles[color] || { bg: '#e8e2d8', text: '#85735a' };
    ['hero', 'back', 'detail', 'flat'].forEach(type => {
      const filename = `public/images/products/${product}/${color}-${type}.jpg`;
      const label = `${product.toUpperCase()} - ${color.toUpperCase()} - ${type.toUpperCase()}`;
      fs.writeFileSync(filename, createPlaceholder(800, 1000, label, style.bg, style.text));
    });
  });
});

// Other images
fs.writeFileSync('public/images/philosophy/atelier.jpg', createPlaceholder(800, 600, 'PHILOSOPHY - ATELIER', '#d5cbbd', '#4a3f36'));
fs.writeFileSync('public/images/editorial/collections-story.jpg', createPlaceholder(800, 600, 'EDITORIAL - COLLECTIONS', '#d5cbbd', '#4a3f36'));
fs.writeFileSync('public/images/about/hero.jpg', createPlaceholder(1920, 800, 'ABOUT HERO', '#28211c', '#f4f1eb'));
fs.writeFileSync('public/images/about/workshop.jpg', createPlaceholder(800, 600, 'ABOUT - WORKSHOP', '#d5cbbd', '#4a3f36'));
fs.writeFileSync('public/images/about/atelier-portugal.jpg', createPlaceholder(800, 600, 'ABOUT - PORTO ATELIER', '#d5cbbd', '#4a3f36'));

// Journal images
const journalImages = [
  'monolith-origin', 'lumen-light', 'strata-geology', 
  'econyl-journey', 'porto-atelier', 'care-guide'
];
journalImages.forEach(img => {
  fs.writeFileSync(`public/images/journal/${img}.jpg`, createPlaceholder(800, 600, `JOURNAL - ${img.toUpperCase()}`, '#d5cbbd', '#4a3f36'));
});

console.log('All placeholder images created!');
