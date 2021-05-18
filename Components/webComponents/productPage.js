import { ProductsApi } from "./../../API/ProductsApi.js";

export class ProductPage extends HTMLElement {
    constructor() {
        super();
    }

    async connectedCallback() {
        this.innerHTML = `
        <div id="productPage-product-container">
        <div>
            <div>
                <p>Product Id:  <span id="product-Id"></span></p>
            </div>
            <div id="product-name">
                
            </div>
            <div id="product-description">
                
            </div>
            <div id="product-image">
                
            </div>
            <div id="product-buy-section">
            <p>Price: </p><span id="product-price"></span>
            </div>
            <add-to-cart-button productId="${this.getAttribute(
                "productid"
            )}"></add-to-cart-button>
        </div>
    </div>

    <style>
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

        let product = await this.loadProduct(this.getAttribute("productid"));
        this.renderProduct(product);
    }

    async loadProduct(product) {
        let productApiCall = new ProductsApi();
        let response = await productApiCall.productById(product);
        return await response.json();
    }

    renderProduct(product) {
        document.querySelector("#product-Id").innerHTML = product.id;
        document.querySelector("#product-name").innerHTML = product.name;
        document.querySelector("#product-description").innerHTML =
            product.description;
        document.querySelector(
            "#product-image"
        ).innerHTML = `<img src="${product.imageUrl.replace(/200/, 600)}">`;
        document.querySelector("#product-price").innerHTML = product.price;
    }

    async productAddToCart(productId, productQuantity) {
        publishEvent("addToCart", { productId, productQuantity });
    }
}
