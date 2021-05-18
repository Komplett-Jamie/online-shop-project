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
            let product = response[i];
            let productCard = document.createElement("product-card");
            productCard.setAttribute("product", JSON.stringify(product));
            placing.appendChild(productCard);
        }
        baseCount = baseCount + amountOfProductsPerPage;
    }
}
