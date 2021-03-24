subscribeToEvent("userIsLoggedIn", async function fetchCart(state) {
    // let authToken = getState().authToken;
    const productApi = "https://jamiestore.herokuapp.com/Cart";

    const cartDetails = {
        method: 'GET',
        headers:    {
            AuthToken: state.authToken,
            "accept": "text/plain",
        },
    }
    let response = await fetch(productApi, cartDetails);
    let cart = await response.json();
    publishEvent("fetchCart", cart);
})