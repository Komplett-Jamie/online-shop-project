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

function countCartItems(value)   {
    let numberOfCartItems = [];
    let object = value;

    for (var i = 0; i < object.length; i++)    {
        numberOfCartItems.push(object[i].quantity);
    }
    let totalCartItems = numberOfCartItems.reduce((total, n) => total + n, 0);
    document.getElementById("small_cart").innerHTML = `<span>${totalCartItems}</span>`;
    return renderCartBigCart(object);
}

function renderCartBigCart(object)    {
    console.log(object);
  

//MAKE THIS TO SHOW PRODUCTS AS LIST ON CART PAGE.
    for (var i = 0; i < object.length; i++) {
        document.getElementById("cartList").innerHTML += object[i].productId;
    }

}





