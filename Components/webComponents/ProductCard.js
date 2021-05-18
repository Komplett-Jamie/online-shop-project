export class ProductCard extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        let productLink = document.createElement("a");
        let productName = document.createElement("div");
        let addProductToCart = document.createElement("add-to-cart-button");
        let productImage = document.createElement("img");
        let productPrice = document.createElement("div");

        productLink.setAttribute(
            "href",
            `./../Pages/productPage.html?id=${this.product.id}`
        );
        productImage.setAttribute("class", "random-product-image");
        productImage.setAttribute("alt", this.product.description);
        productImage.setAttribute("src", this.product.imageUrl);
        productName.innerHTML = this.product.name;
        productPrice.innerHTML = this.product.price;

        addProductToCart.setAttribute("productid", this.product.id);
        productLink.appendChild(productImage);
        this.appendChild(productName);
        this.appendChild(productPrice);
        this.appendChild(productLink);
        this.appendChild(addProductToCart);
    }

    get product() {
        return JSON.parse(this.getAttribute("product"));
    }
}
