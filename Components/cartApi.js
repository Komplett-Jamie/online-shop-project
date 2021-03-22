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