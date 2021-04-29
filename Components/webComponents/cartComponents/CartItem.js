export class CartItem extends HTMLElement {
    static get observedAttributes() {
        return ["productquantity"];
    }

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <div class="cart-item">
        <div class="cart-item-image">
            <div class="item-image">
                <img src="${this.getAttribute("productImage")}">
            </div>
        </div>
        <div class="cart-item-name">${this.getAttribute("productName")}</div>
        <div class="cart-item-change-amount">
            <a class="cart-item-add-button">+</a>
            <input id="product-amount-${this.getAttribute(
                "productId"
            )}" class="cart-amount-visual-input" type="tel" value="${
            this.quantity
        }">
            <a class="cart-item-remove-button">-</a>
        </div>
        <div class="cart-item-total">
            <input id="product-total-${this.getAttribute(
                "productId"
            )}" class="total-amount-products-seperate" value="${
            this.totalPrice
        }" readonly type="text"/>
        <a class="cart-delete-item">X</a>
        </div>
    </div>
        `;
        this.querySelector(".cart-delete-item").addEventListener(
            "click",
            function () {
                console.log(this.productId);
                publishEvent("removeItem", this.productId);
            }.bind(this)
        );

        this.querySelector(".cart-item-add-button").addEventListener(
            "click",
            function () {
                publishEvent("quantityUpdated", {
                    productId: this.productId,
                    quantity: this.quantity + 1,
                });
            }.bind(this)
        );

        this.querySelector(".cart-item-remove-button").addEventListener(
            "click",
            function () {
                publishEvent("quantityUpdated", {
                    productId: this.productId,
                    quantity: this.quantity - 1,
                });
            }.bind(this)
        );
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (
            name === "productquantity" &&
            this.querySelector(`#product-amount-${this.productId}`) !== null
        ) {
            this.querySelector(
                `#product-amount-${this.productId}`
            ).value = newValue;
        }
    }

    get quantity() {
        return parseInt(this.getAttribute("productquantity"));
    }

    get price() {
        return parseFloat(this.getAttribute("productPrice"));
    }

    get totalPrice() {
        return this.quantity * this.price;
    }

    get productId() {
        return parseInt(this.getAttribute("productId"));
    }
}
