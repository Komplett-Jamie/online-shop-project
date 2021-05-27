import { CartApi } from "./../../API/CartApi.js";

export class AddToCartButton extends HTMLElement {
    constructor() {
        super();
    }

    async connectedCallback() {
        this.innerHTML = `
        <button>Add To Cart</button>
        `;

        this.addEventListener("click", async function () {
            let addProductToCartApi = new CartApi();
            await addProductToCartApi.addToCart({
                productId: this.getAttribute("productid"),
                quantity: 1,
            });
            publishEvent("addToCart", {
                productId: parseInt(this.getAttribute("productid")),
                productQuantity: 1,
            });
        });
    }
}
