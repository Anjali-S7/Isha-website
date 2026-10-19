"""Download verified Unsplash photographs and create responsive hero assets."""

from concurrent.futures import ThreadPoolExecutor
from io import BytesIO
from pathlib import Path
from urllib.request import urlopen

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
PHOTOS = {
    "hero-smart-lighting": "photo-1752262167753-37a0ec83f614",
    "hero-smart-security": "photo-1558002038-1055907df827",
    "hero-exterior": "photo-1613977257592-4871e5fcd7c4",
}


def prepare_photo(item):
    name, photo_id = item
    existing = ROOT / "public" / "images" / f"{name}-3840.webp"
    if existing.exists():
        with Image.open(existing) as saved:
            if saved.width == 3840 and saved.height >= 2160:
                return f"{name}: existing verified 4K asset {saved.size}"
    # fit=max prevents increasing the size of a source smaller than requested.
    url = f"https://images.unsplash.com/{photo_id}?fm=jpg&q=95&w=3840&fit=max"
    with urlopen(url, timeout=60) as response:
        image = ImageOps.exif_transpose(Image.open(BytesIO(response.read()))).convert("RGB")
    if image.width < 3840 or image.height < 2160:
        raise ValueError(f"{name} is below 4K resolution: {image.size}")

    destination = ROOT / "public" / "images"
    for width in (768, 1536, 2560, 3840):
        height = round(image.height * width / image.width)
        output = destination / f"{name}-{width}.webp"
        image.resize((width, height), Image.Resampling.LANCZOS).save(
            output, "WEBP", quality=86, method=6
        )
    return f"{name}: {image.width} x {image.height}; responsive WebP files saved"


if __name__ == "__main__":
    with ThreadPoolExecutor(max_workers=4) as executor:
        for result in executor.map(prepare_photo, PHOTOS.items()):
            print(result, flush=True)
