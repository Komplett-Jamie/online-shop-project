import { CartApi } from "../../API/CartApi.js";

export class CartPage extends HTMLElement {
  constructor() {
    super();
    this.items = [];
    this.cartApi = new CartApi();
  }

  async connectedCallback() {
    let cart = await this.cartApi.fetchCart();
    this.items = cart.items;
    
    this.innerHTML = `
        <big-cart></big-cart>
        <cart-forms></cart-forms>
    `;

    let bigCartComponent = this.querySelector("big-cart");
    bigCartComponent.addEventListener("onItemRemoved", event => this.handleItemRemoved(event.detail));
    bigCartComponent.addEventListener("onQuantityUpdated", event => this.handleQuantityUpdated(event.detail));
    
    this.update();
  }
  
  update() {
    this.querySelector("big-cart").setAttribute("items", JSON.stringify(this.items))
  }

  async handleItemRemoved(productId) {
    await this.cartApi.removeProduct(productId);
    publishEvent("removeItem", productId)
    
    this.items = this.items.filter(item => item.productId !== productId);
    this.update();
  }

  async handleQuantityUpdated(quantityUpdate) {
    await this.cartApi.updateQuantity(quantityUpdate);
    publishEvent("quantityUpdated", quantityUpdate);

    const updatedItem = this.items.find(item => item.productId === quantityUpdate.productId);
    updatedItem.quantity = quantityUpdate.quantity;
    
    this.update();
  }
}
