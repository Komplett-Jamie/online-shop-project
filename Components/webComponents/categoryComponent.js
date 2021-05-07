export class CategoryPage extends HTMLElement {
    constructor() {
        super();
    }

    async connectedCallback() {
        this.innerHTML = `
        <section id="random-products-container">
        <div id="random-products"></div>
        <div id="output"></div>
        </section>
        `;

        const urlParams = new URLSearchParams(location.search).get(
            "categoryId"
        );
        let categories = await this.loadCategories(urlParams);
        this.renderProducts(categories);
    }

    async loadCategories(categoryId) {
        let productApiCall = new ProductsApi();
        let response = await productApiCall.productsByCategoryWithId(
            categoryId
        );
        return await response.json();
    }

    renderProducts(response) {
        let baseCount = 0;
        let amountOfProductsPerPage = 19;
        let placing = document.querySelector("#random-products");

        for (
            var i = baseCount;
            i <= amountOfProductsPerPage + baseCount - 1;
            i++
        ) {
            let productElement = document.createElement("div");
            let product = response[i];
            productElement.className = "random-product-cointainer";
            productElement.innerHTML = `
                <a href="./../Pages/productPage.html?id=${product.id}">
                    <img class="random-product-image" alt="${product.description}" src="${product.imageUrl}">
                </a>
                <div class="product">
                    <div class="product-name">
                        <p>${product.name}</p>
                    </div>
                </div>
                <div class="random-product-price-button-container">
                    <p>Nå: <b>${product.price},-</b></p>
                    <button class="add-to-cart-button">Add to Cart</button>
                </div>
                `;
            productElement.addEventListener(
                "click",
                function () {
                    this.addProductToCart(product.id, 1);
                }.bind(this)
            );
            placing.appendChild(productElement);
        }
        baseCount = baseCount + amountOfProductsPerPage;
    }
    addProductToCart(productId, productQuantity) {
        publishEvent("addToCart", { productId, productQuantity });
    }
}
