# Karta · assets

Everything the site ships is derived from the marketing package of November 2026, less what Karta may not or will not show: other people's aircraft, and anything that gives away how SkyAnchor navigates. Masters stay in the founders' archive; the web copies below can be regenerated with the two scripts in `scripts/`.

## Footage (`public/media/`)

| File | Source | Treatment | Used in |
|---|---|---|---|
| `tenere-mission.mp4` | `tenere_quad2.mp4` | first 38 s at 1.25×, desktop bar cropped, 2.1 MB | TENERE |

It has a `-poster.jpg`.


```
FFMPEG=/path/to/ffmpeg scripts/encode-media.sh "<package>"            # everything
FFMPEG=/path/to/ffmpeg scripts/encode-media.sh "<package>" tenere-mission   # one clip
```

Not used, and why:

- `PXL_20261104_111929730.mp4` (the take-off at Pokhran): the aircraft belongs to a vendor, and its footage is not Karta's to use. The hero holds the brand plate until Karta supplies a film; `HERO_FILM` in `components/sections/Hero.tsx` is the slot for it.
- `skyanchor-intro-film.mp4`, `skyanchor-pulicat-35km-flight-test.mp4`, `skyanchor-spoofer-flight-test.mp4`, `skyanchor-expo-film*.mp4`, `skyanchor-9km-flight-test.mp4`, `skyanchor_spoofer_test.mp4`: they show how SkyAnchor sees the ground, which the founders treat as proprietary.
- `tenere long.mp4`, `tenere_quad.mp4`: longer or duplicate takes of the TENERE recording.

## Imagery (`public/imagery/`)

| File | What | Used in |
|---|---|---|
| `skyanchor-module.png` | The module, cut out with its contact shadow (a frame of `skyanchor-expo-film-4k.mp4`) | SkyAnchor |
| `field/site-dusk-violet.jpg` | Test site at dusk, violet sky | Hero |
| `field/site-golden-hour-quad.jpg` | Golden hour, quadcopter in the air | Company tile |
| `field/site-dusk-aircraft-wide.jpg` | Karta's fixed-wing aircraft on its stand at dusk | Full-width band |
| `field/site-sunset.jpg` | Sunset over the site | Behind the closing invitation |

The field pictures are WhatsApp copies from `/home/sarath/Pictures/field_pictures` (1280 to 1600 px wide); originals would be sharper. Pictures that are not used, including the two with team members in them, are deliberately not in `public/`.

## Brand (`public/brand/`, `app/icon.svg`, `app/apple-icon.png`, `app/favicon.ico`)

Only the app icons ship with the site, written by `scripts/build-brand-assets.mjs` from the outlines in `components/brand/`. The full set of marks and lockups, with the brand guide, is in the kit at `/home/sarath/Videos/website/branding`.

## Wanted next

1. A film of Karta's own aircraft for the hero: steady, 16:9, ten seconds or so, with room for the headline in the lower left.
2. A 3D source or turntable render of the module, for a scrubbable product shot.
3. Per-route social cards.
4. A decision on publishing the offline replays themselves; today they are offered on request.

## Sourcing rules

- Every figure comes from a field report and sits beside what it was measured against.
- Map imagery appears only inside TENERE's own screen recording.
- Loops are H.264, faststart, no audio, under 5 MB.
- No footage of anyone else's aircraft, and nothing that shows how SkyAnchor navigates.

## Environment

```
NEXT_PUBLIC_SITE_URL=https://www.kartainnovations.com   # absolute URLs in metadata, sitemap and robots
RESEND_API_KEY=re_...                                   # engage form delivery
ENGAGE_TO_EMAIL=info@kartainnovations.com
```

See `env.example`. Without the Resend variables the engage route answers 503 and points the visitor to email.
