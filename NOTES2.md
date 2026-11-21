# Varsha Gartaula: site notes

## Files
| File | What it does |
|---|---|
| `index.html` | The homepage: name, tagline, four flip cards, project list, Play, CV/Resume |
| `proactive-vest.html` | The ProActive case study, built straight from your canvas design "ProActive project page (edit me)" (styles are inside the file). Menu left, case study right. Click a chapter title to open or close it. |
| `redesign.html` | The FreshKDS case study ("When is Redesign Necessary?"), built from the canvas design "When is Redesign Necessary? project page (edit me)", same layout as the ProActive page |
| `portals.html` | The Mapping Courses to Careers case study, built from its canvas design |
| `images/portals/` | Images on the Mapping Courses to Careers page |
| `images/redesign/` | Every image on the FreshKDS page, cropped from your KDS project PDF |
| `backup-before-canvas-proactive/` | The older version of the ProActive page, in case you want it back |
| `css/style.css` | Homepage colours, fonts, picture positions, the flip effect and the hover preview |
| `js/main.js` | Lets phones flip a card with a tap (computers use hover, no script needed) |
| `fonts/` | EB Garamond font files, used by both pages (licence in `EBGaramond-OFL.txt`) |
| `images/` | Homepage pictures, plus `proactive-peek.gif` (the hover preview) |
| `images/proactive/` | Every image on the ProActive page |
| `backup-before-flip-cards/` | Your previous homepage files, in case you want anything back |

## Homepage: flip cards
- When the page loads, the pictures appear one by one, 0.4 seconds apart (tagline, portrait, book, climbing, coffee).
  To change the order or speed, edit the `animation-delay` lines in section 5 of `style.css`. The click sequence and the arrow are gone.
  (`images/arrow.png` and `images/arrow-again.png` are no longer used, so you can delete them.)
- Once all the pictures have popped in, the portrait shakes, then shakes again every 2 seconds, to hint that the pictures can be hovered.
  It stops for good as soon as someone hovers over (or taps) any picture, or clicks a link. It never shakes while the mouse is on a link.
  To change the timing, edit `FIRST_SHAKE` and `WAIT_BETWEEN` near the bottom of `js/main.js`.
- Hover over the portrait, book, climbing or coffee picture: it pops up a little and flips.
  Move the mouse away and it flips back. On a phone, tap to flip and tap again to flip back.
- Keyboard users can Tab to a card to flip it.
- What's on the back:
  - Portrait: “Email” (varshagartaula@gmail.com) and “LinkedIn” (linkedin.com/in/varshagartaula), each a link
  - Book (“Currently reading”): Ways of Seeing, John Berger
  - Climbing: 6a–6b
  - Coffee: “J’habite à Paris depuis 2 ans · 7 ans d’expérience dans le café de spécialité” (I’ve lived in Paris for the past two years; seven years in specialty coffee)

## Homepage: hover preview
Hovering "Proactive Vest" shows a 240px square slideshow (`images/proactive-peek.gif`) on the right side of the screen.
To add one to another project: give its link `class="has-peek"` and put
`<img class="peek" src="images/your-gif.gif" alt="">` inside the link, as on the Proactive Vest line.

Hovering "When is Redesign Necessary?" shows the same kind of slideshow of the FreshKDS screens (`images/redesign-peek.gif`).
Hovering "University portals/other?" shows a slideshow of the student portal screens (`images/portals-peek.gif`).
Hovering "CV/Resume" shows a page-shaped preview of your London CV (`images/resume-preview.png`, class `peek peek-tall`) in the same corner.
Clicking it opens `Varsha-Gartaula-CV.pdf` in a new tab. When you update your CV, replace both files (same names).

## Projects open on the same page
On a computer, clicking a project in the menu opens it on the right side of the homepage: the pictures fade out,
your name and menu stay put, and the case study slides in. The address changes to `index.html#proactive-vest`,
`index.html#redesign` or `index.html#portals`, so the back button works and you can share a link to one project.
Clicking your name closes the project. On phones, projects open as their own page instead.
**Play** (`play.html`, your museum) opens in the same right-hand panel. Replace `play.html` with a new version any time; nothing else needs changing.
- The panel and this behaviour are in section 6b of `css/style.css` and at the bottom of `js/main.js`.
- Each project file (`proactive-vest.html`, `redesign.html`, `portals.html`) is still a full page. Inside the panel it hides
  its own name and menu (they have class `chrome`). If someone opens one directly on a computer, it sends them to the homepage with that project open.
- All three are built from their "(edit me)" designs on the canvas. Say "sync the site" after editing a design.

## Design tokens (top of `style.css`)
- Background `#394200` · menu text `#ffffff` · name `#e6e4d6` · hover `#a5b84e` · line `#8c9170` · card backs `#f4f2e6`
- Fonts: EB Garamond (name, menu, titles) and Helvetica (all text on the card backs, body text). No other fonts.

## How to...
- **Change the text on a card's back:** edit the `<div class="face back">` inside that card in `index.html`.
- **Move or resize a picture:** edit its `left`, `top`, `width` in section 5 of `style.css`.
- **Change how much a card pops:** change `scale(1.12)` in section 5.
- **Change the flip speed:** change `0.6s` in `.card-inner`.
- **Start a ProActive chapter closed:** in `proactive-vest.html`, delete the word `open` from that chapter's `<details open>`.

## Still to make
- (nothing yet) (the menu already links to them)
