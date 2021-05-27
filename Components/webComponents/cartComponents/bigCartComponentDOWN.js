import { CartApi } from "../../../API/CartApi.js";

export class BigCart extends HTMLElement {
    constructor() {
        super();
        this.cartItem = [];
        this.renderedItems = [];
        this.stateItems = [];
    }

    async connectedCallback() {
        this.innerHTML = `
            <div id="cart-items"></div>
        `;

        let cartApi = new CartApi();
        let cart = await cartApi.fetchCart();
        this.cartItem = cart.items;
        console.log(this.cartItem);
        this.renderCartBigCart();

        subscribeToEvent(
            "quantityUpdated",
            async function ({ productId, quantity }) {
                for (let i = 0; i < this.stateItems.length; i++) {
                    if (this.stateItems[i].productId === productId) {
                        this.stateItems[i].quantity = quantity;
                    }
                }
                await cartApi.updateQuantity({
                    productId: productId,
                    quantity: quantity,
                });
                this.renderCartBigCart();
            }.bind(this)
        );

        subscribeToEvent(
            "removeItem",
            async function (productId) {
                this.stateItems = this.stateItems.filter(
                    (item) => item.productId !== productId
                );
                await cartApi.removeProduct(productId);
                this.renderCartBigCart();
            }.bind(this)
        );

        publishEvent("cartSummaryInfo", this.stateItems);
    }

    renderCartBigCart() {
        this.cartItem.forEach((cartItem) => {
            let itemIsInList = this.checkIfItemExistsInList(
                this.renderedItems,
                cartItem
            );
            if (!itemIsInList) {
                let item = document.createElement("cart-item");
                item.setAttribute("productPrice", cartItem.pricePerItem);
                item.setAttribute("productquantity", cartItem.quantity);
                item.setAttribute("productId", cartItem.productId);
                item.setAttribute("productImage", cartItem.imageUrl);
                item.setAttribute("productName", cartItem.productName);
                this.renderedItems.push({
                    productId: cartItem.productId,
                    component: item,
                });
                this.appendChild(item);
            } else {
                for (let i = 0; i < this.cartItem.length; i++) {
                    if (this.cartItem[i].productId === cartItem.productId) {
                        this.cartItem[i].component.setAttribute(
                            "productquantity",
                            cartItem.quantity
                        );
                    }
                }
            }
        });
        for (let i = 0; i < this.cartItem.length; i++) {
            let isInCartItems = false;
            for (let j = 0; j < this.cartItem.length; j++) {
                if (
                    this.renderedItems[i].productId ===
                    this.stateItems[j].productId
                ) {
                    isInCartItems = true;
                    break;
                }
            }
            if (!isInCartItems) {
                let item = this.renderedItems.splice(i, 1)[0];
                this.removeChild(item.component);
            }
        }
    }

    checkIfItemExistsInList(items, cartItem) {
        for (let i = 0; i < items.length; i++) {
            if (items[i].productId === cartItem.productId) {
                return true;
            }
        }
        return false;
    }
}
