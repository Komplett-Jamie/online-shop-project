subscribeToEvent("removeItem", async function deleteCartItem(productId)   {
    let authToken = getState().authToken;
    const removeProductApi = `https://jamiestore.herokuapp.com/Cart/RemoveProduct?productId=${productId}`;

    const removeDetails = {
        method: 'DELETE',
        headers:    {
            AuthToken: authToken,
            "accept": "text/plain",
            'accept': '*/*',
        },
    }
    await fetch(removeProductApi, removeDetails);
})