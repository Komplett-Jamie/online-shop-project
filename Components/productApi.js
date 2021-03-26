function errorHandling()    {
    let errorhandling = document.getElementById("product_error_msg");
    let state = getState();
    if (state.isLoggedIn === true)  {
        addProductToCart();
    }   else
        errorhandling.innerText = " Please sign in or register to add products to cart";
}