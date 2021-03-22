subscribeToEvent("pageLoad", async function fetchCart() {
    let authToken = getState().authToken;
    const productApi = "https://jamiestore.herokuapp.com/Cart";

    const cartDetails = {
        method: 'GET',
        headers:    {
            AuthToken: authToken,
            "accept": "text/plain",
        },
    }
    let response = await fetch(productApi, cartDetails);
    let cart = await response.json();
    publishEvent("fetchCart", cart);
})