#!/usr/bin/env python3
"""
Create placeholder campaign images for SOLUN.

Generates minimal WebP placeholders with collection-appropriate colors
for development/testing until real campaign images are produced.
"""

from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
import sys


COLLECTION_COLORS = {
    'monolith': {
        'bg': '#0d0c0b',
        'accent': '#be2d1c',
        'text': '#ffffff',
    },
    'lumen': {
        'bg': '#fcfbf7',
        'accent': '#c4b08a',
        'text': '#1a1411',
    },
    'strata': {
        'bg': '#1a1411',
        'accent': '#be2d1c',
        'text': '#fcfbf7',
    },
}

PLACEHOLDERS = [
    # (collection, filename, width, height, label)
    # MON# MONhero
    ('monolith', 'monolith-hero.webp', 1920, 1080, 'MONOLITH — HERO'),
    ('lumen', 'lumen-hero.webp', 1920, 1080, 'LUMEN — HERO'),
    ('strata', 'strata-hero.webp', 1920, 1080, 'STRATA — HERO'),

    # Collection hero (collection pages)
    ('monolith', 'monolith-collection-hero.webp', 1920, 1200, 'MONOLITH — COLLECTION'),
    ('lumen', 'lumen-collection-hero.webp', 1920, 1200, 'LUMEN — COLLECTION'),
    ('strata', 'strata-collection-hero.webp', 1920, 1200, 'STRATA — COLLECTION'),

    # Campaign images (homepage hero carousel)
    ('monolith', 'monolith-editorial.webp', 1920, 1080, 'MONOLITH — EDITORIAL'),
    ('lumen', 'lumen-coastal-blue.webp', 1920, 1080, 'LUMEN — COASTAL'),
    ('strata', 'strata-pool-editorial.webp', 1920, 1080, 'STRATA — POOL'),

    # Campaign studies (homepage)
    ('monolith', 'campaign-cast.webp', 1200, 900, 'CAMPAIGN — CAST'),
    ('strata', 'strata-detailsilhouette.webp', 1200, 900, 'STRATA — SILHOUETTE'),

    # Product hero images (for product pages)
    ('monolith', 'monolith-one-obsidian.webp', 1200, 1600, 'MONOLITH ONE — OBSIDIAN'),
    ('monolith', 'monolith-bikini-obsidian.webp', 1200, 1600, 'MONOLITH BIKINI — OBSIDIAN'),
    ('monolith', 'monolith-asym-charcharcoal.webp', 1200, 1600, 'MONOLITH ASYMMETRICAL — CHARCOAL'),
    ('lumen', 'lumen-one-pearl.webp', 1200, 1600, 'LUMEN ONE — PEARL'),
    ('lumen', 'lumen-bandeau-chalk.webp', 1200, 1600, 'LUMEN BANDEAU — CHALK'),
    ('lumen', 'lumen-tritriangleangle-blue.webp', 1200, 1600, 'LUMEN TRIANGLE — BLUE'),
    ('strata', 'strata-one-terracotta.webp', 1200, 1600, 'STRATA ONE — TERRACOTTA'),
    ('strata', 'strata-top-sienna.webp', 1200, 1600, 'STRATA TOP — SIENNA'),
    ('strata', 'strata-bottom-ochre.webp', 1200, 1600, 'STRATA BOTTOM — OCHRE'),

    # Editorial/brand images
    ('monolith', 'collections-story.webp', 1600, 1200, 'COLLECTIONS — STORY'),
    ('monolith', 'atelier.jpg', 1200, 900, 'ATELIER — WORKSHOP'),

    # Journal images
    ('monolith', 'monolith-origin.jpg', 800, 600, 'JOURNAL — MONOLITH ORIGIN'),
    ('lumen', 'lumen-light.jpg', 800, 600, 'JOURNAL — LUMEN LIGHT'),
    ('strata', 'strata-geology.jpg', 800, 600, 'JOURNAL — STRATA GEOLOGY'),
    ('monolith', 'econyl-journey.jpg', 800, 600, 'JOURNAL — ECONYL'),
    ('monolith', 'porto-atelier.jpg', 800, 600, 'JOURNAL — PORTO'),
    ('lumen', 'care-guide.jpg', 800, 600, 'JOURNAL — CARE'),

    # About images
    ('monolith', 'about/hero.jpg', 1920, 1080, 'ABOUT — HERO'),
    ('monolith', 'about/workshop.jpg', 1200, 900, 'ABOUT — WORKSHOP'),
    ('monolith', 'about/atelier-portugal.jpg', 1200, 900, 'ABOUT — PORTO'),

    # Philosophy
    ('monolith', 'philosophy/atelier.jpg', 1200, 900, 'PHILOSOPHY — ATELIER'),
]


def create_placeholder(collection: str, filename: str, width: int, height: int, label: str, output_dir: Path):
    """Create a single placeholder image."""
    colors = COLLECTION_COLORS[collection]

    img = Image.new('RGB', (width, height), colors['bg'])
    draw = ImageDraw.Draw(img)

    # Draw a subtle pattern/grid
    for i in range(0, width, 100):
        draw.line([(i, 0), (i, height)], fill=colors['accent'] + '20', width=1)
    for i in range(0, height, 100):
        draw.line([(0, i), (width, i)], fill=colors['accent'] + '20', width=1)

    # Draw collection indicator bar
    bar_height = 8
    draw.rectangle([0, height - bar_height, width, height], fill=colors['accent'])

    # Add text label
    try:
        # Try to use a system font
        font_size = min(width, height) // 20
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", font_size)
    except:
        font = ImageFont.load_default()

    # Center the text
    bbox = draw.textbbox((0, 0), label, font=font)
    text_w = bbox[2] - bbox[0]
    text_h = bbox[3] - bbox[1]
    x = (width - text_w) // 2
    y = (height - text_h) // 2

    # Draw text with subtle shadow
    draw.text((x+2, y+2), label, font=font, fill=colors['bg'])
    draw.text((x, y), label, font=font, fill=colors['text'])

    # Add "PLACEHOLDER" watermark
    watermark = "PLACEHOLDER"
    try:
        wm_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", max(12, font_size // 3))
    except:
        wm_font = ImageFont.load_default()

    wm_bbox = draw.textbbox((0, 0), watermark, font=wm_font)
    wm_w = wm_bbox[2] - wm_bbox[0]
    wm_h = wm_bbox[3] - wm_bbox[1]
    draw.text((width - wm_w - 20, height - wm_h - 20), watermark, font=wm_font, fill=colors['accent'] + '80')

    # Save
    output_path = output_dir / filename
    output_path.parent.mkdir(parents=True, exist_ok=True)
    img.save(output_path, 'WEBP', quality=85, method=6)

    size_kb = output_path.stat().st_size / 1024
    print(f"  Created: {filename} ({width}x{height}, {size_kb:.1f} KB)")
    return output_path


def main():
    output_dir = Path('/home/D/solun-project/public/images/campaign/solun')
    output_dir.mkdir(parents=True, exist_ok=True)

    print(f"Creating placeholders in {output_dir}...")
    print()

    for item in PLACEHOLDERS:
        # All items are 5-tuples: (collection, filename, width, height, label)
        collection, filename, w, h, label = item

        try:
            create_placeholder(collection, filename, w, h, label, output_dir)
        except Exception as e:
            print(f"  ERROR creating {filename}: {e}", file=sys.stderr)

    print()
    print("Done!")


if __name__ == '__main__':
    main()