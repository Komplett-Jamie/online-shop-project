let userAuthToken = getState();

let token = userAuthToken.authToken;
let objectCart;
async function addProductToCart()    {

    const urlParams = new URLSearchParams(location.search);
    let productId = urlParams.get("id");

    const productApi = "http://jamiestore.herokuapp.com/Cart/AddProduct";

    let chosenProduct =   {
        "productId": productId,
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

    let response = await fetch(productApi, UserDetails);
}

async function checkCartItems() {
    const productApi = "http://jamiestore.herokuapp.com/Cart";

    const cartDetails = {
        method: 'GET',
        headers:    {
            AuthToken: token,
            "accept": "text/plain",
        },
    }
    let response = await fetch(productApi, cartDetails);
    let cartNumber = await response.json();

countCartItems(cartNumber.items);
}

async function countCartItems(value)   {
    let numberOfCartItems = [];
    let objectCart = value;

    for (var i = 0; i < objectCart.length; i++)    {
        numberOfCartItems.push(objectCart[i].quantity);
    }
    let totalCartItems = numberOfCartItems.reduce((total, n) => total + n, 0);
    document.getElementById("small_cart").innerHTML = `<span>${totalCartItems}</span>`;
    renderCartBigCart(objectCart);
}


async function renderCartBigCart(objectCart, radioPrice)    {
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
                <a id="cart_item_add_button" class="cart-item-add-button">+</a>
                <input class="cart-amount-visual-input" type="tel" placeholder="${objectCart[i].quantity}">
                <a class="cart-item-remove-button">-</a>
            </div>
            <div class="cart-item-total">
                <span class="cart-item-total-for-product">${objectCart[i].pricePerItem} ,-</span>
            <a onclick="deleteCartItem(${objectCart[i].productId})" class="cart-delete-item">X</a>
            </div>
        </div>
        `;
    }

    let totalItemsCartPrice = document.getElementById("cart-total-price");
    let totalItemsInCart = document.getElementById("cart-total-items");
    let cartTax = document.getElementById("cart-total-tax");
    let cartTotal = document.getElementById("cart-total");

    let totalCartSumArray = [];
    let totalItemsInCartArray = [];
        for (var i = 0; i < objectCart.length; i++) {
            totalCartSumArray.push(objectCart[i].pricePerItem * objectCart[i].quantity)
            totalItemsInCartArray.push(objectCart[i].quantity)
        }
    let totalCartSum = totalCartSumArray.reduce((a, b) => a + b, 0);
    let totalItemsInCartSum = totalItemsInCartArray.reduce((a, b) => a + b, 0);

    totalItemsCartPrice.innerText = JSON.stringify(totalCartSum);
    totalItemsInCart.innerText = JSON.stringify(totalItemsInCartSum);
    cartTax.innerText = JSON.stringify((Math.round((totalCartSum * 0.15) * 100) / 100).toFixed(2));
    cartTotal.innerText = JSON.stringify(totalCartSum + (totalCartSum * 0.15)) + document.getElementById("cart-shipping").textContent;
}

async function deleteCartItem(productId)   {

    const removeProductApi = `http://jamiestore.herokuapp.com/Cart/RemoveProduct?productId=${productId}`;

    const removeDetails = {
        method: 'DELETE',
        headers:    {
            AuthToken: token,
            "accept": "text/plain",
            'accept': '*/*',
        },
    }
    let response = await fetch(removeProductApi, removeDetails);
    location.reload();
}