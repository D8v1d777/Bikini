#!/usr/bin/env python3
"""Split a regular editorial contact sheet into individual WebP assets.

Requires Pillow: python -m pip install Pillow
Example:
  python scripts/slice-editorial-sheet.py source.png \
    --rows 3 --cols 4 --names monolith-01,lumen-01,strata-01,detail-01 \
    --out-dir public/images/campaign/solun --inset 0.012

Use only for a uniformly spaced grid. Inspect every exported crop manually;
this script cannot identify faces, anatomy defects, logos, or uneven gutters.
"""
from __future__ import annotations

import argparse
import re
from pathlib import Path

from PIL import Image, ImageOps


def slug(value: str) -> str:
    value = re.sub(r"[^a-zA-Z0-9_-]+", "-", value.strip()).strip("-").lower()
    if not value:
        raise argparse.ArgumentTypeError("Names must contain letters or numbers.")
    return value


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source", type=Path)
    parser.add_argument("--rows", type=int, required=True)
    parser.add_argument("--cols", type=int, required=True)
    parser.add_argument("--names", required=True, help="Comma-separated output basenames, row-major.")
    parser.add_argument("--out-dir", type=Path, required=True)
    parser.add_argument("--inset", type=float, default=0.0,
                        help="Crop this fraction from each cell edge to remove gutters (0–0.08).")
    parser.add_argument("--quality", type=int, default=86)
    parser.add_argument("--max-edge", type=int, default=1800)
    args = parser.parse_args()

    if args.rows < 1 or args.cols < 1:
        parser.error("--rows and --cols must be positive.")
    if not 0 <= args.inset <= 0.08:
        parser.error("--inset must be between 0 and 0.08.")
    if not 60 <= args.quality <= 95:
        parser.error("--quality must be between 60 and 95.")
    names = [slug(item) for item in args.names.split(",") if item.strip()]
    expected = args.rows * args.cols
    if len(names) != expected:
        parser.error(f"Expected exactly {expected} names for {args.rows}x{args.cols}; got {len(names)}.")
    if len(set(names)) != len(names):
        parser.error("Output names must be unique.")
    if not args.source.is_file():
        parser.error(f"Source image not found: {args.source}")

    with Image.open(args.source) as opened:
        source = ImageOps.exif_transpose(opened).convert("RGB")
    width, height = source.size
    cell_w, cell_h = width / args.cols, height / args.rows
    if min(cell_w, cell_h) < 256:
        parser.error(f"Each source cell is only {cell_w:.0f}x{cell_h:.0f}; use a higher-resolution source.")

    args.out_dir.mkdir(parents=True, exist_ok=True)
    outputs = []
    for index, name in enumerate(names):
        row, col = divmod(index, args.cols)
        left = round(col * cell_w)
        top = round(row * cell_h)
        right = round((col + 1) * cell_w)
        bottom = round((row + 1) * cell_h)
        inset_x = round((right - left) * args.inset)
        inset_y = round((bottom - top) * args.inset)
        crop = source.crop((left + inset_x, top + inset_y, right - inset_x, bottom - inset_y))
        if max(crop.size) > args.max_edge:
            scale = args.max_edge / max(crop.size)
            crop = crop.resize((round(crop.width * scale), round(crop.height * scale)), Image.Resampling.LANCZOS)
        destination = args.out_dir / f"{name}.webp"
        crop.save(destination, "WEBP", quality=args.quality, method=6)
        outputs.append((destination, crop.size, destination.stat().st_size))

    print(f"Exported {len(outputs)} individual files from {args.source} ({width}x{height}).")
    for path, dimensions, size in outputs:
        print(f"{path}: {dimensions[0]}x{dimensions[1]}, {size:,} bytes")
    print("MANUAL REVIEW REQUIRED: inspect every crop before using or committing it.")


if __name__ == "__main__":
    main()
