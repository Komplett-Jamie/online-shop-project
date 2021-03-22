subscribeToEvent("quantityUpdated", async function updateQuantityCall({productId, quantity}) {
    let authToken = getState().authToken;
    let product =   {
        "quantity": quantity, 
        "productId": productId,
    }
    
    const productDetails = {
        method: 'PUT',
        headers:    {
            AuthToken: authToken,
            'Content-Type': 'application/json',
            'accept': '*/*'
        },
        body: JSON.stringify(product),
    }
    await fetch ("https://jamiestore.herokuapp.com/Cart/UpdateQuantity", productDetails );
})
