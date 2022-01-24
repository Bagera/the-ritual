class RitualModal extends HTMLElement {
  constructor() {
    super();
  }
  static get observedAttributes() {
    return ["passage"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue != newValue) {
      this.update();
    }
  }

  openModal() {

  }

  closeModal() {
    this.querySelector(".ritual-modal_content").innerHTML = "";
    this.removeAttribute("passage");
    this.removeEventListener("click", this.handleBgClick.bind(this));
  }

  handleButtonClick(e) {
    this.closeModal();
  }

  handleBgClick(e) {
    const modal = e.target.closest(".ritual-modal_modal");
    if (!modal && this.getAttribute("passage")) {
      this.closeModal();
    }
  }


  connectedCallback() {
    this.innerHTML = `
    <div class="ritual-modal_modal">
      <div class="ritual-modal_content">
      </div>
      <div class="ritual-modal_controls">
      <button>Close</button>
      </div>
    </div>
    `
    this.querySelector(".ritual-modal_controls button").addEventListener("click", this.handleButtonClick.bind(this));
  }
  
  update() {
    if (this.getAttribute("passage")) {
      window.Utils.renderToSelector(".ritual-modal_content", this.getAttribute("passage"));
      this.addEventListener("click", this.handleBgClick.bind(this));
    }
    else {
      this.closeModal();
    }
  }

  disconnectedCallback() {
    this.querySelector(".ritual-modal_controls button").removeEventListener("click", this.handleButtonClick);
  }
}
customElements.define("ritual-modal", RitualModal);
