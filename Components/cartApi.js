let userAuthToken = getState();
let token = userAuthToken.authToken;

async function addProductToCart(product)    {

    const productApi = "https://jamiestore.herokuapp.com/Cart/AddProduct";

    let chosenProduct =   {
        "productId": product,
        "quantity": 1,
    }

    const UserDetails = {
        method: 'POST',
        headers:    {
            AuthToken: token,
            'Content-Type': 'application/json',
            'accept': '*/*'
        },
        body: JSON.stringify(chosenProduct),
    }

    await fetch(productApi, UserDetails);
    checkCart()
}

async function checkCart() {
    const productApi = "https://jamiestore.herokuapp.com/Cart";

    const cartDetails = {
        method: 'GET',
        headers:    {
            AuthToken: token,
            "accept": "text/plain",
        },
    }
    let response = await fetch(productApi, cartDetails);
    let cartNumber = await response.json();
    totalCartSummary(cartNumber);
    return cartNumber
}

function countCartItems(cartItems)   {
    let numberOfCartItems = [];

    for (var i = 0; i < cartItems.length; i++)    {
        numberOfCartItems.push(cartItems[i].quantity);
    }

    let totalCartItems = numberOfCartItems.reduce((total, n) => total + n, 0);
    document.getElementById("small_cart").innerHTML = `<span>${totalCartItems}</span>`;
}

async function renderCartBigCart(objectCart) {
    let placing = document.getElementById("cart-items");
    for (var i = 0; i < objectCart.length; i++) {
        placing.innerHTML += `
        <div class="cart-item">
            <div class="cart-item-image">
                <div class="item-image">
                    <img src="${objectCart[i].imageUrl}">
                </div>
            </div>
            <div class="cart-item-name">${objectCart[i].productName}</div>
            <div class="cart-item-change-amount">
                <a onclick="increment(${objectCart[i].productId}, 1, ${objectCart[i].pricePerItem})" class="cart-item-add-button">+</a>
                <input id="product-amount-${objectCart[i].productId}" class="cart-amount-visual-input" type="tel" value="${objectCart[i].quantity}" onchange="userManualyChangeProductAmount(this, ${objectCart[i].productId}), cartProductPriceSeperateTotal(${objectCart[i].productId}, ${objectCart[i].pricePerItem} )">
                <a onclick="increment(${objectCart[i].productId}, -1, ${objectCart[i].pricePerItem})" class="cart-item-remove-button">-</a>
            </div>
            <div class="cart-item-total">
                <input id="product-total-${objectCart[i].productId}" class="total-amount-products-seperate" value="${objectCart[i].quantity * objectCart[i].pricePerItem}" readonly type="text"/>
            <a onclick="deleteCartItem(${objectCart[i].productId})" class="cart-delete-item">X</a>
            </div>
        </div>
        `;
    }
}

function totalCartSummary(cartItemsTotal)  {
    let totalItemsCartPrice = document.getElementById("cart-total-price");
    let totalItemsInCart = document.getElementById("cart-total-items");
    let cartTotal = document.getElementById("cart-total");

    let totalPriceProductsAndQuantity = [];
    let totalItemsInCartArray = [];
    let freightPriceArray = [];

        for (let i = 0; i < cartItemsTotal.items.length; i++)   {
        cartItemsTotal.items[i].pricePerItem * cartItemsTotal.items[i].quantity
        totalPriceProductsAndQuantity.push(cartItemsTotal.items[i].pricePerItem * cartItemsTotal.items[i].quantity);
        totalItemsInCartArray.push(cartItemsTotal.items[i].quantity);
    }
    let totalCartSum = totalPriceProductsAndQuantity.reduce((a, b) => a + b, 0);
    totalItemsCartPrice.innerText = JSON.stringify(totalCartSum);

    let totalItemsInCartSum = totalItemsInCartArray.reduce((a, b) => a + b, 0);
    totalItemsInCart.innerText = JSON.stringify(totalItemsInCartSum);

    freightPriceArray.push(cartItemsTotal.selectedFreightPrice)

    cartTotal.innerText = totalCartSum + freightPriceArray[0];


}

async function deleteCartItem(productId)   {

    const removeProductApi = `https://jamiestore.herokuapp.com/Cart/RemoveProduct?productId=${productId}`;

    const removeDetails = {
        method: 'DELETE',
        headers:    {
            AuthToken: token,
            "accept": "text/plain",
            'accept': '*/*',
        },
    }
    await fetch(removeProductApi, removeDetails);
    location.reload();
}

async function increment(productId, increment, productPrice)   {

    let productIncDecInput = document.getElementById("product-amount-" + productId)
    let parsedValue = parseInt(productIncDecInput.value)

    let product =   {
        "quantity": parsedValue + increment, 
        "productId": productId,
    }
    
    const productDetails = {
        method: 'PUT',
        headers:    {
            AuthToken: token,
            'Content-Type': 'application/json',
            'accept': '*/*'
        },
        body: JSON.stringify(product),
    }

    await fetch ("https://jamiestore.herokuapp.com/Cart/UpdateQuantity", productDetails );
    productIncDecInput.value = parsedValue + increment;
    cartProductPriceSeperateTotal(productId, productPrice);
    checkCart()

}

async function userManualyChangeProductAmount(inputValue, productId)   {
    let value = inputValue.value
    console.log(value);

    let product =   {
        "quantity": value,
        "productId": productId,
    }
    
    const productDetails = {
        method: 'PUT',
        headers:    {
            AuthToken: token,
            'Content-Type': 'application/json',
            'accept': '*/*'
        },
        body: JSON.stringify(product),
    }

    await fetch ("https://jamiestore.herokuapp.com/Cart/UpdateQuantity", productDetails );
    checkCart()
}

function cartProductPriceSeperateTotal(productId, productPrice)    {
    let totalPrice = document.getElementById("product-total-" + productId);
    let amount = document.getElementById("product-amount-" + productId).value;

    totalPrice.value = amount * productPrice;
    checkCart()
}

async function freightOptionCheck(freightOption)   {
    if (freightOption.selectedFreightOption !== null)    {
        document.getElementById(freightOption.selectedFreightOption).checked = true;
    }
}