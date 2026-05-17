# Debug Session: Logo Component Update

**Status:** Resolved

## Symptoms
User requested: "give a different font to the tresart and add logo to it take reference of flikart website txt in black and grey like dialog box for it"

## Investigation
- Currently, `Logo.jsx` renders an animated SVG stroke of the word "TRESART" in `Playfair Display`.
- The user wants:
  1. A different font.
  2. To include the logo image (`/image.png`).
  3. A layout referencing Flipkart's logo style (icon on left, text on right).
  4. Text colored in black and grey.
  5. A "dialog box" look, possibly meaning a rounded container or pill-shaped background holding the logo and text.

## Resolution
- Rewrote `Logo.jsx` to use a `bg-[#5E4B8B]` (Dark Lavender) rounded-lg shadow-sm border wrapper.
- Changed the main text to white (`text-white`) to ensure high contrast against the dark lavender background.
- Included the icon `image.png` on the left.
- Removed the secondary text entirely as requested, keeping just the clean "TresArt" brand name.
- Processed `image.png` directly using Jimp to change the orange/pink brush tip to dark lavender `#5E4B8B`.
- Completely overhauled `EntranceScreen.jsx` to replicate the provided lavender theme banner:
  - Added a light lavender background (`bg-[#eedfff]`) with soft radial gradient "watercolor" splashes.
  - Re-created the exact typography layout from the reference image, including "tresart" (black/lavender), "Feel the artistry" subtitle.
  - Removed the left decorative text ("Handmade with love, MADE TO INSPIRE") as requested to keep the hero section cleaner.
  - Increased the splash screen duration from 2.5s to 4.5s so the user can read the new animated text.

