/**
 * Adds a SVG encircling to the link
 *
 * @param {Element} link
 */
function makeStrokeLink(link) {
  const svg = `<svg class="stroke-link-stroke" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 8" preserveAspectRatio="none">
    <path class="st0" d="M0.8,1.1c48.1,0.9,61.9-0.4,61.9,0c0,0.9-61.7,6.3-61.7,5.6S62.5,4.5,62.5,4s-60-1.2-60,0 c0,0.9,34.2,2.5,60,3.2" pathLength="100" />
    </svg>`;
  link.classList.add("stroke-link");
  link.innerHTML = link.innerHTML + svg;
}

function randomSplat() {
  const number = Math.floor(Math.random() * 3);
  return splat[number];
}
window.randomSplat = randomSplat;

function updateClock() {
  // const time = window.story.state.time.h + ":" + window.story.state.time.m;
  // const clockEl = document.querySelector("ritual-clock");
  // clockEl.setAttribute("time", time);
}

function isLater(newTime, oldTime) {
  // const newStr = `${newTime.h}${newTime.m}`;
  // const oldStr = `${oldTime.h}${oldTime.m}`;
  // const newNum = Number(newStr);
  // const oldNum = Number(oldStr);
  // return newNum > oldNum;
}

function timeToArr(timeStr) {
  // const timeArr = timeStr.split(":");
  // timeArr.forEach((digit) => {
  //   if (digit.substring(0, 1) === "0") {
  //     digit = digit.substring(1);
  //   }
  // });
  // return timeArr;
}

function setTime(timeStr, forceUpdate) {
  // const timeArr = timeToArr(timeStr);
  // const timeObj = { h: timeArr[0], m: timeArr[1] };
  // if (isLater(timeObj, window.story.state.time) || forceUpdate) {
  //   window.story.state.time = timeObj;
  //   updateClock();
  // }
}

function stepTime(amount) {
  // let { h, m } = window.story.state.time;
  // h++;
  // m = Math.floor(Math.random() * 59);
  // if (h > 23) {
  //   console.log("Mignight has struck and the Wanderer takes over");
  // }
  // setTime({ h, m });
}

function showEl(selector) {
  const el = document.querySelector(selector);
  el.removeAttribute("hidden");
  el.setAttribute("animation", "start");
  setTimeout(() => {
    el.removeAttribute("animation");
  }, 30);
}

function hideEl(selector) {
  const el = document.querySelector(selector);
  el.setAttribute("hidden", true);
}

function setupClock() {
  // const time = window.story.state.time.h + ":" + window.story.state.time.m;
  // const el = document.createElement("ritual-clock");
  // el.setAttribute("time", time);
  // el.setAttribute("Hidden", true);
  // document.body.prepend(el);
}

function setupInventory() {
  const el = document.createElement("ritual-inventory");
  el.setAttribute("hidden", true);
  document.body.append(el);
}
function updateInventory() {
  const invPas = {
    dagger: "Hidden Compartment",
    chalice: "The Crypt",
    coin: "Eliot Smith 1",
    wand: "The passage that never was",
    journal: "Hidden Compartment",
    key: "Bedside Cabinet",
    ritual: "Basement 3",
  };
  const el = document.querySelector("ritual-inventory");
  for (const item in invPas) {
    if (Object.hasOwnProperty.call(invPas, item)) {
      if (window.Utils.hasVisited(invPas[item])) {
        el.setAttribute(item, true);
      }
    }
  }
}

// [[Hanbury Street]]{data-x: 33, data-y: 12}
// [[Dutfield's Yard]]{data-x: 65, data-y: 83}
// [[Buck's Row]]{data-x: 84, data-y: 18}
// [[Mitre Square]]{data-x: 16, data-y: 83}
// [[George Yard]]{data-x: 44, data-y: 61}
// [[Osborn Street]]{data-x: 49, data-y: 56}

function updateMapLinks() {
  const passageLinks = {
    "St Mary": {
      not: "Map",
    },
    "The Mystic's House": {
      visited: "Start",
      not: "The Mystic's House",
    },
    "Buck's Row": {
      visited: "The Mystic's House",
      not: "Buck's Row",
    },
    "Dorset Street": {
      visited: "The Mystic's House",
      not: "Dorset Street",
    },
    "Raven Row": {
      visited: "The Mystic's House",
      not: "Raven Row",
    },
    "Black Eagle Street": {
      visited: "Raven Row",
      not: "Black Eagle Street",
    },
    "Finch Street": {
      visited: "Black Eagle Street",
      not: "Finch Street",
    },
    "Christ Church": {
      visited: "Finch Street",
      not: "Christ Church",
    },
    "Hanbury Street": {
      visited: "Christ Church",
      not: "Hanbury Street",
    },
    "Goulston Street": {
      visited: "Paintings Stage 2",
      not: ["Goulston Street", "Eliot Smith 1"],
    },
    "Eliot Smith & Sons Pawnshop": {
      visited: "Paintings Stage 2",
      not: "Eliot Smith 1",
    },
    "Wilson's Pawnshop": {
      visited: "Paintings Stage 2",
      not: ["Wilson's 1", "Eliot Smith 1"],
    },
    "George’s Curiosities": {
      visited: "Paintings Stage 2",
      not: ["George's 1", "Eliot Smith 1"],
    },
    "Dutfield's Yard": {
      visited: "Painter-6",
      not: "Dutfield's Yard",
    },
    "Mitre Square": {
      visited: "Dutfield's Yard",
      not: "Mitre Square",
    },
    "George Yard": {
      not: "George Yard",
    },
  };
  const currentPassage = document
    .querySelector("ritual-map")
    .getAttribute("current");

  const links = document.querySelectorAll("ritual-map a");
  const currentPos = document.querySelector("ritual-map .ritual-map-position");
  links.forEach((link) => {
    const passage = link.dataset["passage"];
    let show = true;
    if (passageLinks[passage]) {
      if (passageLinks[passage].visited) {
        show = false;
        if (
          typeof passageLinks[passage].visited === "string" &&
          window.Utils.hasVisited(passageLinks[passage].visited)
        ) {
          show = true;
        } else if (window.Utils.hasVisited(...passageLinks[passage].visited)) {
          show = true;
        }
      }
      if (passageLinks[passage].not) {
        if (
          typeof passageLinks[passage].not === "string" &&
          window.Utils.hasVisited(passageLinks[passage].not)
        ) {
          show = false;
        } else if (window.Utils.hasVisited(...passageLinks[passage].not)) {
          show = false;
        }
      }
    }
    if (!show) {
      link.setAttribute("hidden", true);
    } else {
      link.removeAttribute("hidden");
    }
    if (passage === currentPassage && currentPos) {
      currentPos.style.setProperty("left", `${link.dataset["x"]}%`);
      currentPos.style.setProperty("top", `${link.dataset["y"]}%`);
    }
  });
}

function showUI() {
  if (
    !window.Utils.hasVisited("Title Screen") ||
    window.Utils.hasVisited("Hidden Compartment")
  ) {
    showEl("ritual-inventory");
    updateInventory();
  }
  // if (
  //   !window.Utils.hasVisited("Title Screen") ||
  //   window.Utils.hasVisited("Back from Mystic")
  // ) {
  //   showEl("ritual-clock");
  // }
}

function setupModal() {
  const el = document.createElement("ritual-modal");
  document.body.append(el);
}

window.addEventListener("ritual-map:move", (ev) => {
  const { location } = ev.detail;
  // stepTime("next-hour");
  window.story.state.currentLoc = location;
});
window.addEventListener("ritual-map:updated", (ev) => {
  updateMapLinks();
});
window.addEventListener("vanilja:story:started", (ev) => {
  const { story } = ev.detail;
});
window.addEventListener("vanilja:story:shown", (ev) => {
  const { passage } = ev.detail;
  const links = document.querySelectorAll("tw-passage a");
  showUI();
  if (
    passage.name.toLowerCase() != "map" &&
    passage.name.toLowerCase() != "title screen"
  ) {
    links.forEach((link) => {
      makeStrokeLink(link);
    });
  }
  if (passage.name.toLowerCase() === "map") {
    updateMapLinks();
  }
});
function init() {
  // setupClock();
  setupInventory();
  setupModal();
  showUI();
  if (window.story.passage === "Map") {
    updateMapLinks();
    
  }
}

init();
