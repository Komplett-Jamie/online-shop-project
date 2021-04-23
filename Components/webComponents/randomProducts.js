export class RandomProducts extends HTMLElement {

    async connectedCallback() {
        this.innerHTML = 
        `
        <section id="random-products-container">
            Some random products we sell...
            <div id="random-products"></div>
        </section>

        <style>

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

        `

        let randomProducts = await this.loadRandomProducts();
        this.renderRandomProducts(randomProducts);
    }

    async loadRandomProducts()  {
        let productsApi = new ProductsApi();
        let response = await productsApi.randomProducts(10);
        return await response.json()
    }

    renderRandomProducts(randomProducts)  {
        let renderContainer = this.querySelector("#random-products");
        
        renderContainer.innerHTML ="";
        for (var i = 0; i < randomProducts.length; i++) {
            let randomProduct = randomProducts[i]
            let testDiv = document.createElement("div");
            testDiv.className = "random-product-cointainer";
            testDiv.innerHTML = `
                <a href="./../Pages/productPage.html?id=${randomProduct.id}">
                    <img class="random-product-image" alt="${randomProduct.description}" src="${randomProduct.imageUrl}">
                </a>
                <div class="product">
                    <div class="product-name">
                        <p>${randomProduct.name}</p>
                    </div>
                </div>
                <div class="random-product-price-button-container">
                    <p>Nå: <b>${randomProduct.price},-</b></p>
                    <button class="add-to-cart-button" id="addToCart-${randomProduct.id}">Add to Cart</button>
                </div>
            `
            testDiv.addEventListener("click", function(){
                this.addProductToCart(randomProduct.id, 1);
            }.bind(this))
            renderContainer.appendChild(testDiv);
        }
    }
    addProductToCart(productId, productQuantity)   {
        publishEvent("addToCart", { productId, productQuantity })
    }
}