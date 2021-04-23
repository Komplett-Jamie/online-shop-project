export class ProductPage extends HTMLElement    {
    constructor()   {
        super()
    }

    connectedCallback() {
        this.innerHTML = 
        `
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
            <button class="add-to-cart-button" id="addToCart">Add to Cart</button><span id="product_error_msg"></span>
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
        `

        this.querySelector("#addToCart").addEventListener("click", this.productAddToCart)
    }

    productAddToCart() {
        const productIdUrl = new URLSearchParams(location.search).get("id");
        publishEvent("addToCart", { productId: JSON.parse(productIdUrl), productQuantity: 1 })
    }
}