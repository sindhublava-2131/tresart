# Debug: Logo Background Transparency Issue

## Symptoms
- Expected: Transparent cutout logo.
- Actual: Logo with a squared black background.

## Findings
- `frontend/src/components/LogoAnimation.jsx` references `/logo.jpg`, but this file does not exist in `frontend/public/`.
- `frontend/public/image.png` exists and is likely the "cutout image" the user mentioned.
- `LogoAnimation.jsx` applies several styles to the `<img>` tag:
  ```javascript
  style={{ 
    filter: 'invert(1) hue-rotate(180deg) brightness(1.2)',
    mixBlendMode: 'screen',
    clipPath: 'inset(0% 0% 25% 0%)'
  }}
  ```
- `mixBlendMode: 'screen'` and `filter: 'invert(1)'` are often used as a workaround to make a black-on-white logo appear as white-on-transparent when rendered on a dark background.
- If the new logo is already a transparent PNG, these filters/blend modes are likely interfering and causing the "squared black background" or other visual issues.

## Hypothesis
The issue is twofold:
1. The `LogoAnimation.jsx` component is still pointing to a non-existent `/logo.jpg` instead of the new `/image.png`.
2. The legacy CSS filters and `mixBlendMode` (which were likely hacks for a JPEG) are causing the black background/rendering issues for the new transparent PNG.

## Plan
1. Update `LogoAnimation.jsx` to use `/image.png`.
2. Remove the `filter`, `mixBlendMode`, and `clipPath` styles that are no longer needed for a proper transparent PNG.
3. Verify the fix.
