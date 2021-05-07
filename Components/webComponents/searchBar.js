export class SearchBar extends HTMLElement {
    constructor() {
        super();
    }

    async connectedCallback() {
        this.innerHTML = `
        <div id="searchBar">
            <input id="search_input" type="text" placeholder="Search for products...">
        </div>
        <div id="random-products"></div>

        <style>
        #search_input {
            height:35px;
            border: 1px solid blue;
            padding:10px;
            flex: 0 1 600px;
            width:100%;
        }

        * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        scroll-behavior: smooth;
        }

        #random-products-container {
            padding:0px 200px 0px 200px;
            font-family: 'Open Sans', sans-serif;
            margin: 25px 0px 25px 0px;
        }   
        
        .random-product-cointainer  {
            padding:10px;
            display: flex;
            flex-direction: column;
            height:100%;
            background-color:white;
            border:1px solid #e0e0e0;
        
        }
        #random-products  {
            padding:25px;
            display: grid;
            align-items: center;
            grid-template-columns: repeat(5, 1fr);
            background-color:white;
            gap: 10px;
        }
        
        #random-products a{
            text-decoration: none;
            display: flex;
        }
        
        .product  {
            flex: 1 1 auto;
            width:100%;
            padding:10px;
            cursor: pointer;
        }
        
        .product-name   {
            font-size: 12px;
            font-weight: 600;
        }
        
        .random-product-image{
            max-width: 100%;
            margin: 0 auto;
        }
        
        .product p  {
            padding:2px;
        }
        
        .add-to-cart-button {
            margin-top:10px;
            width:100%;
            height:30px;
            border: 1px solid #ffb3b3;
            background-color: #dadeff;
            padding:5px;
            cursor: pointer;
        }
        
        .add-to-cart-button:hover {
            background-color: white;
        }
        </style>
        `;

        let searchableProductList = await this.loadProductsIntoArray();

        this.querySelector("#search_input").addEventListener(
            "keyup",
            function (event) {
                if (event.keyCode === 13) {
                    event.preventDefault();
                    this.filterThroughItems(
                        event.target.value,
                        searchableProductList
                    );
                }
            }.bind(this)
        );
    }

    async loadProductsIntoArray() {
        let productApiCall = new ProductsApi();
        let response = await productApiCall.getAllProducts();
        return await response.json();
    }

    filterThroughItems(query, list) {
        let arrayList = [];
        list.filter((el) => {
            let x = el.name.toString().toLowerCase().indexOf(query);
            if (
                el.name.toString().toLowerCase().indexOf(query) !== -1 ||
                el.description.toString().toLowerCase().indexOf(query) !== -1
            ) {
                arrayList.push(el);
            }
        });
        this.renderResults(arrayList);
    }

    renderResults(searchArray) {
        let renderContainer = this.querySelector("#random-products");
        renderContainer.innerHTML = "";
        console.log(searchArray);
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
}
