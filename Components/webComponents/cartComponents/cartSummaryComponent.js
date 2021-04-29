export class CartSummary extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <div id="cart-summary">
            <span>Cart Summary</span>
            <table>
                <tr>
                    <td class="cart-summary-description">Cart total: </td>
                    <td><span class="cart-summary-call" id="cart-total-price"></span> ,-</td>
                </tr>
                <tr>
                    <td class="cart-summary-description">Total items: </td>
                    <td><span class="cart-summary-call" id="cart-total-items"></span></span></td>
                </tr>
                <tr>
                    <td  class="cart-summary-description">Shipping: </td>
                    <td><span class="cart-summary-call" id="cart-shipping"></span>,-</span></td>
                </tr>
                <tr>
                    <td class="cart-summary-description">Total Price: </td>
                    <td><span class="cart-summary-call" id="cart-total" ></span>,-</span></td>
                </tr>
            </table>
            </div>
            `;

        subscribeToEvent(
            "cartStateUpdated",
            function (cartState) {
                let totalItemsCartPrice = this.querySelector(
                    "#cart-total-price"
                );
                let totalItemsInCart = this.querySelector("#cart-total-items");
                let cartTotal = this.querySelector("#cart-total");
                let freightCost = this.querySelector("#cart-shipping");

                totalItemsInCart.innerText = cartState.items.reduce(
                    (total, n) => total + n.quantity,
                    0
                );
                let totalItemsCartPriceSum = cartState.items.reduce(
                    (total, n) => total + n.pricePerItem * n.quantity,
                    0
                );

                totalItemsCartPrice.innerText = totalItemsCartPriceSum;

                let freightPrice = 0;
                for (let i = 0; i < cartState.freightOptions.length; i++) {
                    if (
                        cartState.freightOptions[i].name ===
                        cartState.chosenFreightOption
                    ) {
                        freightCost.innerText =
                            cartState.freightOptions[i].price;
                        freightPrice = cartState.freightOptions[i].price;
                    }
                }
                cartTotal.innerText = totalItemsCartPriceSum + freightPrice;
            }.bind(this)
        );
    }
}
