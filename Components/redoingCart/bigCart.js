subscribeToEvent("cartStateUpdated", function(state)    {
    renderCartBigCart(state.items)
})

subscribeToEvent("countryApiReturn", function(response) {
    renderCountryList(response)
})

function renderCartBigCart(cartItems) {
    let renderContainer = document.getElementById("cart-items");
    renderContainer.innerHTML = "";
    for (var i = 0; i < cartItems.length; i++) {
        let cartItem = cartItems[i]
        renderContainer.innerHTML += `
        <div class="cart-item">
            <div class="cart-item-image">
                <div class="item-image">
                    <img src="${cartItem.imageUrl}">
                </div>
            </div>
            <div class="cart-item-name">${cartItem.productName}</div>
            <div class="cart-item-change-amount">
                <a onclick="updateQuantity(${cartItem.productId}, ${cartItem.quantity + 1})" class="cart-item-add-button">+</a>
                <input id="product-amount-${cartItem.productId}" class="cart-amount-visual-input" type="tel" value="${cartItem.quantity}" onchange="updateQuantity(${cartItem.productId}, parseInt(event.target.value))">
                <a onclick="updateQuantity(${cartItem.productId}, ${cartItem.quantity - 1})" class="cart-item-remove-button">-</a>
            </div>
            <div class="cart-item-total">
                <input id="product-total-${cartItem.productId}" class="total-amount-products-seperate" value="${cartItem.quantity * cartItem.pricePerItem}" readonly type="text"/>
            <a onclick="removeItemFromCart(${cartItem.productId})" class="cart-delete-item">X</a>
            </div>
        </div>
        `
    }
}

function updateQuantity(productId, productQuantity)   {
    publishEvent("quantityUpdated", {productId, quantity: productQuantity})
}

function removeItemFromCart(productId)   {
    publishEvent("removeItem", productId);
}

function renderCountryList(response)    {
    let htmlContainer = document.getElementById("country-options");
    for (var i = 0; i < response.length; i++ )  {
        htmlContainer.innerHTML += 
        `
        <option value="${response[i].name}">${response[i].name}</option>
        `
    }
}