# Hero photographs

The hero keeps the original brochure living room as its opening image. The remaining three slides use real photographs downloaded from Unsplash. These illustrate automated lighting, connected home security, and whole-home living; they do not depict completed ISHA projects.

| Slide | Photographer | Source | Local filename prefix |
| --- | --- | --- | --- |
| Original living room | Supplied brochure | Original site asset, retained unchanged | `living-room` |
| Smart lighting | User_Pascal | [Smart-lighting hub and remote](https://unsplash.com/photos/smart-home-hub-and-remote-on-a-wooden-table-JxgSbyAqUlk) | `hero-smart-lighting` |
| Home security | Sebastian Scholz (Nuki) | [Smartphone-controlled smart lock](https://unsplash.com/photos/gold-apple-iphone-smartphone-held-at-the-door-IJkSskfEqrM) | `hero-smart-security` |
| House exterior | John Fornander | [Modern house with pool](https://unsplash.com/photos/modern-white-villa-with-swimming-pool-tVzyDSV84w8) | `hero-exterior` |

The three added photographs are offered under the [Unsplash License](https://unsplash.com/license).

The original living room retains its existing 768- and 1536-pixel files and matching responsive preload. Its source resolution is documented in the README; it has not been upscaled further. Added assets live in `public/images/` as WebP files at 768, 1536, 2560, and 3840 pixels wide. The browser selects a suitable size through `srcset`. Downloads use `fit=max` and reject images smaller than 3840 x 2160, so the added 4K versions are not upscaled.

The decorative background rotates every six seconds without navigation dots, arrows, progress bars, or play/pause icons. Rotation pauses for keyboard focus and respects reduced-motion preferences.

Images are requested eagerly, with high priority reserved for the opening photo. Only successfully loaded images enter the rotation. Failed images are skipped and the original photo remains behind the other slides to prevent an empty background.

To refresh the files, run `python scripts/prepare-hero-photos.py` with Pillow installed. This performs network downloads; normal site builds use the committed local images and require no external image service.
