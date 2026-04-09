#!/usr/bin/env python3
"""
Image optimisation script for ČPZP landing page build.
Run automatically via: npm run build

What it does:
  - Compresses JPEGs to quality 82 (visually lossless, ~85% smaller)
  - Compresses PNGs with max quality
  - Converts all JPEGs/PNGs to WebP (quality 80) as additional format
  - Writes everything into dist/img/ after Vite build

Usage:
  python3 optimize-images.py           # optimise dist/img in-place
  python3 optimize-images.py --source img --dest dist/img   # explicit paths
"""

import sys
import os
import shutil
import argparse
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("ERROR: Pillow not found. Run: pip install Pillow --break-system-packages")
    sys.exit(1)

# ── Configuration ────────────────────────────────────────────────────────────
JPEG_QUALITY   = 82          # 75-85 is the sweet spot; 82 keeps detail
PNG_COMPRESS   = 9           # 0-9, higher = smaller but slower
WEBP_QUALITY   = 80          # WebP output quality
GENERATE_WEBP  = True        # also produce .webp variants
MAX_WIDTH      = 1920        # downsample anything wider than this (hero images)
SKIP_PATTERNS  = ['.DS_Store', 'Thumbs.db']

# ─────────────────────────────────────────────────────────────────────────────

def human(size: int) -> str:
    for unit in ('B', 'KB', 'MB', 'GB'):
        if size < 1024:
            return f"{size:.1f} {unit}"
        size /= 1024
    return f"{size:.1f} TB"


def optimise_image(src: Path, dest: Path) -> dict:
    dest.parent.mkdir(parents=True, exist_ok=True)
    orig_size = src.stat().st_size
    ext = src.suffix.lower()

    # Non-raster formats — just copy, no Pillow processing
    if ext in ('.svg', '.gif', '.ico', '.webp'):
        shutil.copy2(src, dest)
        return {'src': src.name, 'orig': orig_size, 'opt': orig_size, 'saved': 0}

    with Image.open(src) as img:
        # Convert RGBA → RGB for JPEG output
        if img.mode in ('RGBA', 'P') and src.suffix.lower() in ('.jpg', '.jpeg'):
            img = img.convert('RGB')

        # Downsample very large images
        if img.width > MAX_WIDTH:
            ratio = MAX_WIDTH / img.width
            new_h = int(img.height * ratio)
            img = img.resize((MAX_WIDTH, new_h), Image.LANCZOS)

        save_kwargs = {}
        if ext in ('.jpg', '.jpeg'):
            save_kwargs = dict(quality=JPEG_QUALITY, optimize=True, progressive=True)
        elif ext == '.png':
            save_kwargs = dict(optimize=True, compress_level=PNG_COMPRESS)
        elif ext == '.webp':
            save_kwargs = dict(quality=WEBP_QUALITY, method=6)
        else:
            shutil.copy2(src, dest)
            return {'src': src.name, 'orig': orig_size, 'opt': orig_size, 'saved': 0}

        img.save(dest, **save_kwargs)

        # Generate WebP variant alongside
        if GENERATE_WEBP and ext in ('.jpg', '.jpeg', '.png'):
            webp_dest = dest.with_suffix('.webp')
            rgb = img.convert('RGB') if img.mode == 'RGBA' else img
            rgb.save(webp_dest, 'WEBP', quality=WEBP_QUALITY, method=6)

    opt_size  = dest.stat().st_size
    saved     = orig_size - opt_size
    return {'src': src.name, 'orig': orig_size, 'opt': opt_size, 'saved': saved}


def main():
    parser = argparse.ArgumentParser(description='Optimise images after Vite build')
    parser.add_argument('--source', default='img',      help='Source image dir (default: img)')
    parser.add_argument('--dest',   default='dist/img', help='Dest image dir   (default: dist/img)')
    args = parser.parse_args()

    src_dir  = Path(args.source)
    dest_dir = Path(args.dest)

    if not src_dir.exists():
        print(f"Source dir '{src_dir}' not found – skipping image optimisation.")
        sys.exit(0)

    exts   = {'.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif'}
    images = [p for p in src_dir.rglob('*')
              if p.is_file()
              and p.suffix.lower() in exts
              and p.name not in SKIP_PATTERNS]

    if not images:
        print("No images found – nothing to optimise.")
        sys.exit(0)

    print(f"\n🖼  Optimising {len(images)} image(s): {src_dir} → {dest_dir}\n")
    total_orig = total_opt = 0

    for img_path in sorted(images):
        rel      = img_path.relative_to(src_dir)
        out_path = dest_dir / rel
        result   = optimise_image(img_path, out_path)

        total_orig += result['orig']
        total_opt  += result['opt']
        pct         = (result['saved'] / result['orig'] * 100) if result['orig'] else 0
        flag        = '✓' if result['saved'] > 0 else '–'
        print(f"  {flag}  {result['src']:<55}  "
              f"{human(result['orig']):>8} → {human(result['opt']):>8}  "
              f"({pct:+.0f}%)")

    total_saved = total_orig - total_opt
    pct_total   = (total_saved / total_orig * 100) if total_orig else 0
    print(f"\n  {'─'*80}")
    print(f"  Total:  {human(total_orig)} → {human(total_opt)}  "
          f"(saved {human(total_saved)}, {pct_total:.1f}%)\n")


if __name__ == '__main__':
    main()
