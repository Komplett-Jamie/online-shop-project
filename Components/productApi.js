async function fetchProduct() {

    const urlParams = new URLSearchParams(location.search);
    let productId = urlParams.get("id");

    const userApi = `http://jamiestore.herokuapp.com/Products/${productId}`;

    const UserDetails = {
        method: 'GET',
    }

let apiFetch = await fetch(userApi, UserDetails)
let response = await apiFetch.json();

return renderProduct(response);
}

function errorHandling()    {
    let errorhandling = document.getElementById("product_error_msg");
    let state = getState();
    if (state.isLoggedIn === true)  {
        addProductToCart();
    }   else
        errorhandling.innerText = " Please sign in or register to add products to cart";
}