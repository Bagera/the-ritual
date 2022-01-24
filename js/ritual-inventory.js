class RitualInventory extends HTMLElement {
  constructor() {
    super();
  }

  handleClick(e) {
    const target = e.target.closest("li");
    if (target) {
      const item = target.dataset["item"];
      if (this.getAttribute(item)) {
        const modal = document.querySelector("ritual-modal");
        modal.setAttribute("passage", item);
      }
    }
  }

  connectedCallback() {
    this.addEventListener("click", this.handleClick.bind(this));
    this.innerHTML = `
    <ul>
      <li data-item="dagger">
        <button><img src="/img/dagger.png"/></button>
      </li>
      <li data-item="chalice">
        <button><img src="/img/chalice.png"/></button>
      </li>
      <li data-item="coin">
        <button><img src="/img/coin.png"/></button>
      </li>
      <li data-item="wand">
        <button><img src="/img/wand.png"/></button>
      </li>
      <li data-item="journal">
        <button><img src="/img/journal.png"/></button>
      </li>
      <li data-item="key">
        <button><img src="/img/key.png"/></button>
      </li>
      <li data-item="ritual">
        <button><img src="/img/ritual.png"/></button>
      </li>
    </ul>`
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.handleClick);
  }
}
customElements.define("ritual-inventory", RitualInventory);
