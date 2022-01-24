class RitualMap extends HTMLElement {
  constructor() {
    super();
    this._current = this.getAttribute("current");
  }
  // static get observedAttributes() {
  //   return ["current"];
  // }

  handleClick(e) {
    const passage = e.target.dataset["passage"];
    const passTimeEvent = new CustomEvent("ritual-map:move", {
      detail: {
        location: passage,
      },
    });
    if (passage && passage != this._current) {
      window.dispatchEvent(passTimeEvent);
    }
  }

  update() {
    const links = this.querySelectorAll("a");
    links.forEach((link) => {
      const { passage, x, y } = link.dataset;

      if (passage === this._current) {
        link.setAttribute("current", true);
      } else {
        link.removeAttribute("current");
      }
      if (x) {
        link.style.setProperty("left", `${x}%`);
      }
      if (y) {
        link.style.setProperty("top", `${y}%`);
      }
    });
    const customEvent = new CustomEvent("ritual-map:updated", {
      detail: {
        location: passage,
      },
    });
    window.dispatchEvent(customEvent);
  }

  connectedCallback() {
    this.addEventListener("click", this.handleClick);
    this.update();
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.handleClick);
  }
}
customElements.define("ritual-map", RitualMap);
