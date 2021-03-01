let userAuthToken = getState();

let token = userAuthToken.authToken;


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

function renderCartBigCart(objectCart)    {
console.log(objectCart);
let placing = document.getElementById("cart-items");

    for (var i = 0; i < objectCart.length; i++) {
        console.log(objectCart[i].productName)
        placing.innerHTML += `
        <div class="cart-item">
            <div class="cart-item-image">
                <div class="item-image">
                    <img src="https://komplett.no/img/p/200/1155451.jpg">
                </div>
            </div>
            <div class="cart-item-name">${objectCart[i].productName}</div>
            <div class="cart-item-change-amount">
                <a class="cart-item-add-reduce">+</a>
                <input type="tel" placeholder="${objectCart[i].quantity}">
                <a class="cart-item-add-reduce">-</a>
            </div>
            <div class="cart-item-total">
                <span class="cart-item-total-for-product">${objectCart[i].price}</span>
            <a class="cart-delete-item">X</a>
            </div>
        </div>
        `;
    }

}




//------------------------------------

function renderRandomProducts(randomProductObject) {
    let object = randomProductObject;
    let placing = document.getElementById("random-products");

    for (var i = 0; i < object.length; i++) {
        placing.innerHTML += 
        `<a href="./../pages/productPage.html?id=${object[i].id}">
            <div class="product">
                <div class="product-name">
                    <p>${object[i].name}</p>
                </div>
                <br>
                <img alt="${object[i].description}" src="${object[i].imageUrl}">
                <p>Nå: <b>${object[i].price},-</b></p>
                </a>
                <button class="add-to-cart-button" id="addToCart" onclick="addProductToCart()">Add to Cart</button>
            </div>
        `
    }
}




