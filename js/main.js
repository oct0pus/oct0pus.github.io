/* ==========================================================
   MAIN.JS: lets touch screens flip the cards with a tap
   ----------------------------------------------------------
   On a computer, the cards flip on hover using CSS only.
   Phones and tablets have no hover, so this script flips a
   card when it's tapped, and flips it back on a second tap.
   ========================================================== */

const cards = document.querySelectorAll(".card");
// Finds every flip card on the page (the elements with class="card").

cards.forEach((card) => {
  // Runs the code below once for each card.

  card.addEventListener("click", (event) => {
    // Listens for a click or tap on this card.

    if (event.target.closest("a")) return;
    // If the tap was on a link on the back (email or LinkedIn), do nothing here and let the link open.

    const flipped = card.classList.toggle("is-flipped");
    // Adds the class "is-flipped" if it's missing, or removes it if it's there. The CSS flips cards with this class.

    cards.forEach((other) => {
      // Looks at every card again...
      if (other !== card && flipped) other.classList.remove("is-flipped");
      // ...and flips any other open card back, so only one is open at a time.
    });
  });

  card.addEventListener("mouseleave", () => {
    // When the mouse leaves the card (on a computer)...
    card.classList.remove("is-flipped");
    // ...make sure it flips back, even if it was clicked.
  });
});


/* ----------------------------------------------------------
   THE PORTRAIT SHAKE: a hint that the pictures can be hovered
   - Once every picture has popped in, the portrait shakes.
   - Then it shakes again every 2 seconds...
   - ...until the visitor hovers over (or taps) any picture: then it stops for good.
   - It never shakes while the mouse is on a link, and stops for good once a link is clicked.
   ---------------------------------------------------------- */

const portrait = document.querySelector(".portrait");
// The first picture (your photo).

const FIRST_SHAKE = 2300;
// Milliseconds before the first shake: the last picture (coffee) starts at 2.0s and takes 0.3s to pop in.

const WAIT_BETWEEN = 2000;
// Milliseconds to wait between shakes (2 seconds).

let stopped = false;
// Becomes true once the visitor has hovered a picture or clicked a link. Then no more shaking.

let timer;
// Remembers the next scheduled shake, so it can be cancelled.

function stopShaking() {
  // Turns the shaking off for good.
  stopped = true;
  clearTimeout(timer);
  // Cancels the next planned shake.
  portrait.classList.remove("is-shaking");
  // Stops a shake that's happening right now.
}

function shake() {
  // Does one shake, then plans the next one.
  if (stopped) return;
  // Do nothing if the visitor has already found the pictures.
  if (!document.querySelector("a:hover")) {
    // Only shake if the mouse isn't resting on a link.
    portrait.classList.remove("is-shaking");
    // Removes the class first, so the animation can restart...
    void portrait.offsetWidth;
    // ...this line makes the browser notice the removal...
    portrait.classList.add("is-shaking");
    // ...and adding the class again plays the shake once more.
  }
  timer = setTimeout(shake, 900 + WAIT_BETWEEN);
  // Next shake after this one finishes (0.9s) plus the 2-second wait.
}

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
// True if the visitor has asked their device for less motion.

if (portrait && !reduceMotion) {
  // Only shake if the portrait exists and the visitor is fine with motion.
  timer = setTimeout(() => { portrait.classList.add("settled"); shake(); }, FIRST_SHAKE);
  // Once everything has popped in, marks the portrait as "settled" (so it never re-plays its appear animation), then starts shaking.
  cards.forEach((card) => {
    card.addEventListener("mouseenter", stopShaking);
    // Hovering over any picture stops the shaking.
    card.addEventListener("touchstart", stopShaking, { passive: true });
    // On phones, tapping a picture stops it.
  });
  document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", stopShaking);
    // Clicking any link stops it too.
  });
}



/* ----------------------------------------------------------
   PROJECTS OPEN ON THE SAME PAGE
   - On a computer, clicking a project opens it in the panel on the right.
     The pictures fade out; your name and the menu stay where they are.
   - The address becomes index.html#proactive-vest (etc.), so the browser's
     back button works and each project still has its own link to share.
   - Clicking your name closes the project and brings the pictures back.
   - On tablets and phones (under 1024px wide), projects open as their own page instead.
   ---------------------------------------------------------- */

const panel = document.querySelector(".project-panel");
// The panel on the right.
const frame = document.querySelector(".project-frame");
// The frame inside it, where the case study loads.
const projectLinks = document.querySelectorAll(".projects a, .pages a[href=\"play.html\"]");
// The three project links in the menu, plus Play (which opens in the same panel).

const PROJECTS = ["proactive-vest", "redesign", "portals", "play"];
// The page names used in the address (index.html#redesign, index.html#play). They match the file names.

function isWide() {
  return window.innerWidth >= 1024;
  // True on computers and tablets; false on phones.
}

function slugOf(href) {
  // Turns "redesign.html" (or "redesign.html#something") into "redesign", or "" if it isn't a project.
  // (The French copies end in "-fr", e.g. "redesign-fr.html", so that ending is removed too.)
  const name = (href || "").split("#")[0].split("?")[0].replace(/^.*\//, "").replace(/\.html$/, "").replace(/-fr$/, "");
  return PROJECTS.includes(name) ? name : "";
}

/* ----------------------------------------------------------
   ENGLISH / FRENCH
   - The EN / FR switch next to your name changes the language.
   - Every label with data-fr="…" in index.html swaps to that French text.
   - Projects open their French copies (proactive-vest-fr.html, redesign-fr.html, portals-fr.html).
   - The choice is remembered in this browser. With no choice yet, a visitor whose browser
     is set to French sees French first. Adding ?lang=fr (or ?lang=en) to the address forces a language.
   ---------------------------------------------------------- */
const HAS_FRENCH = ["proactive-vest", "redesign", "portals"];  // Projects that have a French copy (Play doesn't need one).
function readSaved() {
  try { return localStorage.getItem("lang"); } catch (e) { return null; }   // Some private windows block storage.
}
function save(value) {
  try { localStorage.setItem("lang", value); } catch (e) {}
}
const langInAddress = (location.search.match(/[?&]lang=(en|fr)/) || [])[1];
if (langInAddress) save(langInAddress);
let lang = langInAddress
  || readSaved()
  || ((navigator.language || "").toLowerCase().startsWith("fr") ? "fr" : "en");
function pageFor(slug) {
  // The file to open for a project in the current language, e.g. "redesign-fr.html".
  return slug + (lang === "fr" && HAS_FRENCH.includes(slug) ? "-fr" : "") + ".html";
}
function applyLanguage() {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-fr]").forEach((el) => {
    if (el.dataset.en === undefined) el.dataset.en = el.textContent;   // Remember the English the first time.
    el.textContent = lang === "fr" ? el.dataset.fr : el.dataset.en;
  });
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.setAttribute("aria-pressed", btn.dataset.lang === lang ? "true" : "false");
  });
  document.querySelectorAll(".projects a").forEach((link) => {
    const slug = slugOf(link.getAttribute("href"));
    if (slug) link.setAttribute("href", pageFor(slug));   // So phones open the right language too.
  });
}
document.querySelectorAll(".lang-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.dataset.lang === lang) return;
    lang = btn.dataset.lang;
    save(lang);
    applyLanguage();
    placePanel();                         // The titles changed length, so re-measure where the panel starts.
    showFromAddress();                    // If a project is open, reload it in the new language.
  });
});
applyLanguage();

function nameTop() {
  // Where the top of the letters in your name sits, measured from the top of the window.
  const h1 = document.querySelector(".site-title");
  const range = document.createRange();
  range.selectNodeContents(h1);
  return range.getBoundingClientRect().top + parseFloat(getComputedStyle(h1).fontSize) * 0.43;
}

function placePanel() {
  // The panel starts where the line under CV/Resume ends (18px + 41.5% of the window),
  // but never over the menu: if the menu text is wider, the panel (and the line) move right to clear it.
  const lineEnd = 18 + window.innerWidth * 0.415;
  let menuRight = 0;
  document.querySelectorAll(".menu a").forEach((a) => {
    a.childNodes.forEach((node) => {
      // Measures the words only (not the hover-preview pictures inside the links, which sit in the corner).
      if (node.nodeName === "IMG") return;
      const range = document.createRange();
      range.selectNodeContents(node);
      menuRight = Math.max(menuRight, range.getBoundingClientRect().right);
    });
  });
  document.body.style.setProperty("--split", Math.max(lineEnd, menuRight + 32) + "px");
}
window.addEventListener("resize", placePanel);
document.fonts && document.fonts.ready.then(placePanel);
// Re-measures when the window changes size, and once the fonts have loaded.
placePanel();

function showFromAddress() {
  // Opens or closes the panel to match the address (the part after #).
  const slug = location.hash.slice(1);
  if (!isWide() && PROJECTS.includes(slug)) {
    // On a tablet or phone, a link like index.html#redesign goes straight to the project's own page.
    location.replace(pageFor(slug));
    return;
  }
  if (isWide() && PROJECTS.includes(slug)) {
    if (frame.dataset.slug !== slug || frame.dataset.lang !== lang) {
      const url = pageFor(slug) + "?embed&top=" + nameTop().toFixed(1);
      // The project page in "embed" mode (without its own name and menu), told where your name starts so its first line can sit level with it.
      if (frame.dataset.slug) frame.contentWindow.location.replace(url);
      else frame.src = url;
      // Loads it. "replace" swaps the page without adding an extra step to the back button.
      frame.dataset.slug = slug;
      frame.dataset.lang = lang;
    }
    panel.hidden = false;
    void panel.offsetWidth;
    // Makes the browser draw the panel in its starting position first...
    document.body.classList.add("project-open");
    // ...so it glides in smoothly, and the pictures fade out.
    if (typeof stopShaking === "function") stopShaking();
    // No more portrait shake once someone has opened a project.
  } else {
    document.body.classList.remove("project-open");
    // Fades the pictures back in and the panel out.
    setTimeout(() => { if (!document.body.classList.contains("project-open")) panel.hidden = true; }, 450);
    // Fully hides the panel after its fade-out.
  }
  projectLinks.forEach((link) => {
    // Turns the open project's name green in the menu.
    if (isWide() && PROJECTS.includes(slug) && slugOf(link.getAttribute("href")) === slug) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function openProject(slug) {
  // Changes the address; the "hashchange" listener below then opens the project.
  if (location.hash.slice(1) !== slug) location.hash = slug;
  else showFromAddress();
}

projectLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    if (!isWide()) return;
    // On phones, let the link open the project as its own page.
    event.preventDefault();
    // On computers, stay on this page...
    openProject(slugOf(link.getAttribute("href")));
    // ...and open the project in the panel.
  });
});

document.querySelector(".home-link").addEventListener("click", (event) => {
  // Clicking your name closes the project.
  event.preventDefault();
  if (location.hash) history.pushState(null, "", location.pathname);
  // Removes the #project from the address, keeping a back-button step.
  showFromAddress();
});

window.addEventListener("message", (event) => {
  // The project page asks us to go somewhere (for example "Next project" or your name).
  const href = event.data && event.data.go;
  if (!href) return;
  const slug = slugOf(href);
  if (slug) openProject(slug);
  // Another project: open it in the panel.
  else if (/(^|\/)index\.html$/.test(href)) document.querySelector(".home-link").click();
  // The homepage: close the panel.
  else location.href = href;
  // Anything else (like Play): go there.
});

window.addEventListener("hashchange", showFromAddress);
// The back and forward buttons change the address, so update the panel.
window.addEventListener("popstate", showFromAddress);
showFromAddress();
// If the page was opened with a project in the address (index.html#redesign), open it straight away.
