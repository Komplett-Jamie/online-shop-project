subscribeToEvent("addToCart", async function addProductToCart({productId, productQuantity})    {
    let authToken = getState().authToken;

    const productApi = "https://jamiestore.herokuapp.com/Cart/AddProduct";

    let product =   {
        "productId": productId,
        "quantity": productQuantity,
    }

    const UserDetails = {
        method: 'POST',
        headers:    {
            AuthToken: authToken,
            'Content-Type': 'application/json',
            'accept': '*/*'
        },
        body: JSON.stringify(product),
    }
    await fetch(productApi, UserDetails);
})