template = `
<div class="face">
  <span class="handContainer h">
    <span class="hand"></span>
  </span>
  <span class="handContainer m">
    <span class="hand"></span>
  </span>
</div>
`;

class RitualClock extends HTMLElement {
  constructor() {
    super();
    this._time = this.getAttribute("time");
  }

  static get observedAttributes() {
    return ["time"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue != newValue) {
      this.update();
    }
  }

  update() {
    function timeToArr(timeStr) {
      const timeArr = timeStr.split(":");
      timeArr.forEach((digit) => {
        if (digit.substring(0, 1) === "0") {
          digit = digit.substring(1);
        }
      });
      return timeArr;
    }
    const timeStr = this.getAttribute("time")
    ? this.getAttribute("time")
    : "15:43";
    const time = timeToArr(timeStr);
    this.style.setProperty("--h", time[0]);
    this.style.setProperty("--m", time[1]);
  }

  connectedCallback() {
    this.innerHTML = template;
    this.update();
  }

  disconnectedCallback() {}
}

customElements.define("ritual-clock", RitualClock);
