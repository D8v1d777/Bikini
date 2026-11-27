#!/usr/bin/env python3
"""
SOLUN Editorial Contact Sheet Slicer

Slices multi-image contact sheets into individual production-ready assets.
Each slice is inspected, validated, optimized to WebP, and named descriptively.

Usage:
    python slice-editorial-sheet.py <input_image> --grid <rows> <cols> --output-dir <dir> --prefix <name>

Example:
    python slice-editorial-sheet.py monolith-contact.jpg --grid 2 3 --output-dir public/images/campaign/solun --prefix monolith-campaign

Requirements:
    pip install Pillow
"""

import argparse
import sys
from pathlib import Path
from PIL import Image, ImageOps
import hashlib
import json
from datetime import datetime


class ContactSheetSlicer:
    def __init__(self, input_path: Path, grid_rows: int, grid_cols: int, output_dir: Path, prefix: str):
        self.input_path = Path(input_path)
        self.grid_rows = grid_rows
        self.grid_cols = grid_cols
        self.output_dir = Path(output_dir)
        self.prefix = prefix
        self.output_dir.mkdir(parents=True, exist_ok=True)

        # Validation criteria
        self.min_dimension = 512  # Minimum slice dimension
        self.max_aspect_ratio = 3.0  # Max width/height or height/width
        self.quality = 85  # WebP quality
        self.max_file_size_mb = 2.0  # Max 2MB per slice

    def load_and_validate(self) -> Image.Image:
        """Load image and validate it's a proper contact sheet."""
        try:
            img = Image.open(self.input_path)
            img.load()  # Force load to catch corrupt files
        except Exception as e:
            raise ValueError(f"Failed to load image: {e}")

        # Convert to RGB if needed (WebP doesn't support all modes)
        if img.mode not in ('RGB', 'RGBA'):
            img = img.convert('RGB')

        w, h = img.size
        if w < self.grid_cols * self.min_dimension or h < self.grid_rows * self.min_dimension:
            raise ValueError(
                f"Image too small for {self.grid_rows}x{self.grid_cols} grid. "
                f"Minimum: {self.grid_cols * self.min_dimension}x{self.grid_rows * self.min_dimension}, got {w}x{h}"
            )

        return img

    def calculate_slice_bounds(self, img: Image.Image) -> list[tuple[int, int, int, int]]:
        """Calculate pixel bounds for each grid cell."""
        w, h = img.size
        slice_w = w // self.grid_cols
        slice_h = h // self.grid_rows

        bounds = []
        for row in range(self.grid_rows):
            for col in range(self.grid_cols):
                left = col * slice_w
                upper = row * slice_h
                right = left + slice_w
                lower = upper + slice_h
                bounds.append((left, upper, right, lower))

        return bounds

    def validate_slice(self, slice_img: Image.Image, row: int, col: int) -> tuple[bool, list[str]]:
        """Validate a slice meets quality criteria. Returns (passed, issues)."""
        issues = []
        w, h = slice_img.size

        # Check minimum dimensions
        if w < self.min_dimension or h < self.min_dimension:
            issues.append(f"Slice {row},{col}: dimensions {w}x{h} below minimum {self.min_dimension}")

        # Check aspect ratio
        aspect = max(w, h) / min(w, h)
        if aspect > self.max_aspect_ratio:
            issues.append(f"Slice {row},{col}: aspect ratio {aspect:.2f} exceeds max {self.max_aspect_ratio}")

        # Check for solid color (likely blank/grid line)
        # Sample corners and center
        samples = [
            slice_img.getpixel((0, 0)),
            slice_img.getpixel((w-1, 0)),
            slice_img.getpixel((0, h-1)),
            slice_img.getpixel((w-1, h-1)),
            slice_img.getpixel((w//2, h//2)),
        ]
        # If all samples are nearly identical, likely blank
        if len(set(samples)) == 1:
            issues.append(f"Slice {row},{col}: appears to be solid color (blank/grid line)")

        # Check for grid line artifacts (thin lines at edges)
        # Sample vertical center line
        center_col = slice_img.crop((w//2, 0, w//2+1, h))
        center_pixels = list(center_col.getdata())
        if len(set(center_pixels)) < 3:  # Very few unique colors = likely grid line
            issues.append(f"Slice {row},{col}: possible vertical grid line artifact")

        # Sample horizontal center line
        center_row = slice_img.crop((0, h//2, w, h//2+1))
        center_pixels = list(center_row.getdata())
        if len(set(center_pixels)) < 3:
            issues.append(f"Slice {row},{col}: possible horizontal grid line artifact")

        return len(issues) == 0, issues

    def optimize_and_save(self, slice_img: Image.Image, output_path: Path) -> dict:
        """Optimize slice to WebP and return metadata."""
        # Ensure RGB for WebP
        if slice_img.mode == 'RGBA':
            # Composite on white background
            bg = Image.new('RGB', slice_img.size, (255, 255, 255))
            bg.paste(slice_img, mask=slice_img.split()[3])
            slice_img = bg
        elif slice_img.mode != 'RGB':
            slice_img = slice_img.convert('RGB')

        # Save as WebP
        slice_img.save(output_path, 'WEBP', quality=self.quality, method=6)

        # Get file size
        file_size = output_path.stat().st_size
        file_size_mb = file_size / (1024 * 1024)

        # Check file size
        if file_size_mb > self.max_file_size_mb:
            # Try lower quality
            for q in [75, 65, 55]:
                slice_img.save(output_path, 'WEBP', quality=q, method=6)
                file_size = output_path.stat().st_size
                file_size_mb = file_size / (1024 * 1024)
                if file_size_mb <= self.max_file_size_mb:
                    break

        return {
            'filename': output_path.name,
            'path': str(output_path),
            'width': slice_img.width,
            'height': slice_img.height,
            'format': 'WebP',
            'file_size_bytes': file_size,
            'file_size_mb': round(file_size_mb, 2),
            'aspect_ratio': round(slice_img.width / slice_img.height, 3),
        }

    def slice(self) -> dict:
        """Main slicing workflow."""
        print(f"Loading {self.input_path}...")
        img = self.load_and_validate()
        print(f"Image size: {img.size}, Grid: {self.grid_rows}x{self.grid_cols}")

        bounds = self.calculate_slice_bounds(img)
        print(f"Slice dimensions: {img.width // self.grid_cols}x{img.height // self.grid_rows}")

        results = {
            'source': str(self.input_path),
            'source_dimensions': img.size,
            'grid': f"{self.grid_rows}x{self.grid_cols}",
            'timestamp': datetime.utcnow().isoformat() + 'Z',
            'slices': [],
            'rejected': [],
            'accepted': 0,
            'rejected_count': 0,
        }

        for idx, (left, upper, right, lower) in enumerate(bounds):
            row = idx // self.grid_cols
            col = idx % self.grid_cols

            slice_img = img.crop((left, upper, right, lower))

            # Validate
            passed, issues = self.validate_slice(slice_img, row, col)

            slice_num = idx + 1
            output_name = f"{self.prefix}-{slice_num:02d}.webp"
            output_path = self.output_dir / output_name

            if passed:
                print(f"  ✓ Slice {slice_num} ({row},{col}): PASSED")
                meta = self.optimize_and_save(slice_img, output_path)
                meta['grid_position'] = {'row': row, 'col': col, 'index': slice_num}
                results['slices'].append(meta)
                results['accepted'] += 1
            else:
                print(f"  ✗ Slice {slice_num} ({row},{col}): REJECTED")
                for issue in issues:
                    print(f"      - {issue}")
                results['rejected'].append({
                    'grid_position': {'row': row, 'col': col, 'index': slice_num},
                    'issues': issues,
                })
                results['rejected_count'] += 1

        # Save manifest
        manifest_path = self.output_dir / f"{self.prefix}-manifest.json"
        with open(manifest_path, 'w') as f:
            json.dump(results, f, indent=2)

        print(f"\nComplete: {results['accepted']} accepted, {results['rejected_count']} rejected")
        print(f"Manifest: {manifest_path}")

        return results


def main():
    parser = argparse.ArgumentParser(
        description='Slice editorial contact sheets into individual production assets',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python slice-editorial-sheet.py contact.jpg --grid 2 3 -o public/images/campaign/solun -p monolith-campaign
  python slice-editorial-sheet.py contact.png --grid 1 4 -o public/images/campaign/solun -p lumen-detail
        """
    )
    parser.add_argument('input', help='Input contact sheet image path')
    parser.add_argument('--grid', nargs=2, type=int, required=True, metavar=('ROWS', 'COLS'),
                        help='Grid dimensions (rows columns)')
    parser.add_argument('-o', '--output-dir', required=True, help='Output directory for slices')
    parser.add_argument('-p', '--prefix', required=True, help='Filename prefix for slices')
    parser.add_argument('--quality', type=int, default=85, help='WebP quality (1-100)')
    parser.add_argument('--min-dim', type=int, default=512, help='Minimum slice dimension')
    parser.add_argument('--max-aspect', type=float, default=3.0, help='Maximum aspect ratio')
    parser.add_argument('--max-size', type=float, default=2.0, help='Max file size in MB')

    args = parser.parse_args()

    try:
        slicer = ContactSheetSlicer(
            input_path=args.input,
            grid_rows=args.grid[0],
            grid_cols=args.grid[1],
            output_dir=args.output_dir,
            prefix=args.prefix,
        )
        slicer.quality = args.quality
        slicer.min_dimension = args.min_dim
        slicer.max_aspect_ratio = args.max_aspect
        slicer.max_file_size_mb = args.max_size

        results = slicer.slice()

        if results['accepted'] == 0:
            print("ERROR: No slices accepted!", file=sys.stderr)
            sys.exit(1)

    except Exception as e:
        print(f"ERROR: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == '__main__':
    main()