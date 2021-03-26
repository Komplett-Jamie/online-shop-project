subscribeToEvent("searchedProducts", (searchArray) => {
    rendersearchedItems(searchArray);
})

function rendersearchedItems(searchArray) {
    let renderContainer = document.getElementById("random-products");
    renderContainer.innerHTML ="";
    for (var i = 0; i < searchArray.length; i++) {
        let searchedItem = searchArray[i]
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
        `
    }
}

function addProductToCart(productId, productQuantity)   {
    publishEvent("addToCart", {productId, productQuantity})
}
