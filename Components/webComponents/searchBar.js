export class SearchBar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallBack() {
        this.innerHTML = `
        <div id="searchBar">
            <input id="search_input" type="text" placeholder="Search for products...">
        </div>

        <style>
        #search_input {
            height:35px;
            border: 1px solid blue;
            padding:10px;
            flex: 0 1 600px;
            width:100%;
        }
        </style>
        `;
        this.querySelector("#search_input").addEventListener(
            "onkeyup",
            mainPageSearchInputUser(event)
        );
    }

    mainPageSearchInputUser(event) {
        let inputContainer = this.querySelector("#search_input").value;

        if (key === "Enter") {
            // publishEvent("userSearchInput", inputContainer)
            location = "./../Pages/searchPage.html";
        }
    }
}

subscribeToEvent("searchedProducts", (searchArray) => {
    rendersearchedItems(searchArray);
});

function rendersearchedItems(searchArray) {
    let renderContainer = document.getElementById("random-products");
    renderContainer.innerHTML = "";
    for (var i = 0; i < searchArray.length; i++) {
        let searchedItem = searchArray[i];
        renderContainer.innerHTML += `   
        <div class="random-product-cointainer">
            <a href="./../Pages/productPage.html?id=${searchedItem.id}">
                <img class="random-product-image" alt="${searchedItem.description}" src="${searchedItem.imageUrl}">
            </a>
            <div class="product">
                <div class="product-name">
                    <p>${searchedItem.name}</p>
                </div>
            </div>
            <div class="random-product-price-button-container">
                <p>Nå: <b>${searchedItem.price},-</b></p>
                <button class="add-to-cart-button" id="addToCart" onclick="addProductToCart(${searchedItem.id}, 1)">Add to Cart</button>
            </div>
        </div>  
        `;
    }
}

function addProductToCart(productId, productQuantity) {
    publishEvent("addToCart", { productId, productQuantity });
}

subscribeToEvent("pageLoad", async function getAllProductsForSearch() {
    let productApiCall = new ProductsApi();
    let response = await productApiCall.getAllProducts();
    publishEvent("searchProductsReturn", await response.json());
});
