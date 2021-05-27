export class CartPage extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    this.innerHTML = `
        <big-cart></big-cart>
        <cart-forms></cart-forms>
    `;
  }
}
