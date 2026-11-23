/* ==========================================================
   MAIN.JS: reveals one picture each time you click your name
   ----------------------------------------------------------
   1. Find the name button and the list of pictures (.pop).
   2. Keep a counter of how many are showing.
   3. On each click, show the next one.
   4. After the last one, the next click hides them all
      and starts again from the beginning.
   5. The arrow says "click here!" until the first click,
      then switches to "click again!".
   ========================================================== */

const nameButton = document.getElementById("name");
const pictures = document.querySelectorAll(".pop");   // in the same order as index.html

const arrow = document.getElementById("arrow");
const ARROW_HERE  = "images/arrow.png";         // "click here!"
const ARROW_AGAIN = "images/arrow-again.png";   // "click again!"

// Load the second arrow image now so it swaps instantly on the first click
new Image().src = ARROW_AGAIN;

let shown = 0;   // how many pictures are showing right now

nameButton.addEventListener("click", () => {
  if (shown < pictures.length) {
    // Reveal the next picture
    pictures[shown].classList.add("is-visible");
    shown++;
    arrow.src = ARROW_AGAIN;
    arrow.alt = "click again!";
  } else {
    // All 5 are showing: clear them and start over.
    // (Delete this else-block if you want them to stay on screen.)
    pictures.forEach(p => p.classList.remove("is-visible"));
    shown = 0;
    arrow.src = ARROW_HERE;      // back to "click here!"
    arrow.alt = "click here!";
  }
});
