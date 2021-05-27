import { CartApi } from "./../../API/CartApi.js";

export class SmallCart extends HTMLElement {
    constructor() {
        super();
        this.items = [];
    }

    async connectedCallback() {
        let cartApi = new CartApi();
        let cart = await cartApi.fetchCart();
        this.items = cart.items;
        this.renderHtml();

        subscribeToEvent(
            "addToCart",
            function ({ productId, productQuantity }) {
                this.items.push({ productId, quantity: productQuantity });
                this.renderHtml();
            }.bind(this)
        );

        subscribeToEvent(
            "quantityUpdated",
            function ({ productId, quantity }) {
                for (let i = 0; i < this.items.length; i++) {
                    if (this.items[i].productId === productId) {
                        this.items[i].quantity = quantity;
                    }
                }
                this.renderHtml();
            }.bind(this)
        );

        subscribeToEvent(
            "removeItem",
            function (productId) {
                this.items = this.items.filter(
                    (item) => item.productId !== productId
                );
                this.renderHtml();
            }.bind(this)
        );
    }

    renderHtml() {
        let totalCartItems = this.items.reduce(
            (total, n) => total + n.quantity,
            0
        );
        this.innerHTML = `
        <a href="./../Pages/cart.html" id="small-cart-link">
            <div id="small_cart">
                ${totalCartItems || 0}
                <svg width="20" height="20" viewBox="0 0 16 16"><path fill="#333" d="M6 14.5c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5c0-0.828 0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5z"></path><path fill="#333" d="M16 14.5c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5c0-0.828 0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5z"></path><path fill="#333" d="M16 8v-6h-12c0-0.552-0.448-1-1-1h-3v1h2l0.751 6.438c-0.458 0.367-0.751 0.93-0.751 1.562 0 1.105 0.895 2 2 2h12v-1h-12c-0.552 0-1-0.448-1-1 0-0.003 0-0.007 0-0.010l13-1.99z"></path></svg>
            </div>
            <span>Cart</span>
        </a>

        <style>
        #small_cart {
            display:flex;
            justify-content: center;
            align-items:center;
            background: lightgray;
            border-radius: 50%;
            width: 45px;
            height: 45px;
            border: 1px solid blue;
        }
        </style>
        `;
    }
}
