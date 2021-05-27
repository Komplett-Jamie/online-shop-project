import { CartApi } from "../../API/CartApi.js";

export class CartPage extends HTMLElement {
  constructor() {
    super();
    this.items = [];
  }

  async connectedCallback() {
    let cartApi = new CartApi();
    let cart = await cartApi.fetchCart();
    this.items = cart.items;
    
    this.innerHTML = `
        <big-cart></big-cart>
        <cart-forms></cart-forms>
    `;
    
    this.querySelector("big-cart").setAttribute("items", JSON.stringify(this.items))
  }
}
