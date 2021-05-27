export class CartSummary extends HTMLElement {
  constructor() {
    super();
    
    this.cart = {
      items: [],
      selectedFreightPrice: 0,
    }
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return [ "cart" ];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "cart") {
      this.cart = JSON.parse(newValue);
      this.render()
    }
  }

  render() {
    this.innerHTML = `
        <div id="cart-summary">
            <span>Cart Summary</span>
            <table>
                <tr>
                    <td class="cart-summary-description">Cart total: </td>
                    <td>${this.cartTotal} ,-</td>
                </tr>
                <tr>
                    <td class="cart-summary-description">Total items: </td>
                    <td>${this.totalItems}</td>
                </tr>
                <tr>
                    <td  class="cart-summary-description">Shipping: </td>
                    <td>${this.shippingPrice},-</td>
                </tr>
                <tr>
                    <td class="cart-summary-description">Total Price: </td>
                    <td>${this.totalPrice},-</td>
                </tr>
            </table>
        </div>
    `;
  }
  
  get cartTotal() {
    return this.cart.items.reduce((sum, item) => sum + item.pricePerItem * item.quantity, 0);
  }
  
  get totalItems() {
    return this.cart.items.reduce((sum, item) => sum + item.quantity, 0);
  }
  
  get shippingPrice() {
    return this.cart.selectedFreightPrice ?? 0;
  }
  
  get totalPrice() {
    return this.cartTotal + this.shippingPrice;
  }
}
