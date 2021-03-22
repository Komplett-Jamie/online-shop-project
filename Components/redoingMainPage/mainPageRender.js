subscribeToEvent("randomProducts", function(response)  {
    renderRandomProducts(response)
})

function renderRandomProducts(tenRandomProducts) {
    let renderContainer = document.getElementById("random-products");
    renderContainer.innerHTML ="";
    for (var i = 0; i < tenRandomProducts.length; i++) {
        let randomProduct = tenRandomProducts[i]
        renderContainer.innerHTML += `   
        <div class="random-product-cointainer">
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
                <button class="add-to-cart-button" id="addToCart" onclick="addProductToCart(${randomProduct.id}, 1)">Add to Cart</button>
            </div>
        </div>  
        `
    }
}

function addProductToCart(productId, productQuantity)   {
    publishEvent("addToCart", {productId, productQuantity})
}
