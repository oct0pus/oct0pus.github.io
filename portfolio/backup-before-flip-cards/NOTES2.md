# Varsha Gartaula: site notes

## Files
| File | What it does |
|---|---|
| `index.html` | The homepage: name, arrow, 5 hidden pictures, project list, Play, CV/Resume |
| `css/style.css` | All colours, fonts, spacing and picture positions |
| `js/main.js` | Reveals the next picture each time you click your name |
| `images/` | `arrow.png` ("click here!"), `arrow-again.png` ("click again!"), `tagline.png`, `portrait.png`, `book.png`, `climbing.png`, `coffee.png` |

## How the click sequence works
Click your name and the pictures appear one at a time, in this order:
1. Hand-lettered "Creative, ambitious data-driven" (`tagline.png`)
2. Portrait (`portrait.png`)
3. Ways of Seeing book cover (`book.png`)
4. Climbing wall (`climbing.png`)
5. Latte (`coffee.png`)

After the fifth, the next click hides them all and starts again.
The order is the order of the `<img class="pop">` lines in `index.html`.

## Design tokens (top of `style.css`)
- Background `#394200` · menu text `#ffffff` · name `#e6e4d6` · hover `#a5b84e` · line `#8c9170`
- Font: EB Garamond, 38px at 1440px wide, scales with the window (28 to 44px)

## Layout (measured from the design at 1440 x 812)
- Name top left, menu bottom left, thin line under CV/Resume (41.5% of the width).
- Pictures are positioned in `vw` units (1vw = 1% of the window width), so the collage scales as one piece.

## How to...
- **Change the order:** move the `<img class="pop ...">` lines up or down in `index.html`.
- **Move or resize a picture:** edit its `left`, `top`, `width` in section 4 of `style.css`.
- **Change the arrow wording:** replace `images/arrow-again.png` with a transparent PNG of the same size.
- **Replace a picture:** save a new file with the same name in `images/`.
- **Add a sixth picture:** add an `<img class="pop sixth" ...>` line, then a `.sixth { left; top; width }` rule in the CSS. The JS picks it up automatically.
- **Stop the reset after the last picture:** delete the `else` block in `main.js`.
- **Change the pop-up speed:** change `0.3s` in `.pop` (`style.css`).

## Notes
- All six images were cut out of your screenshots, so they may look soft on high-resolution screens. Export each one from Figma at 2x as a transparent PNG (photos can be the original files) and replace the files with the same names.
- Menu links point to pages that don't exist yet: `proactive-vest.html`, `redesign.html`, `portals.html`, `play.html`, `cv.html`.

## To do
- Project pages / case studies
- Play and CV/Resume pages
