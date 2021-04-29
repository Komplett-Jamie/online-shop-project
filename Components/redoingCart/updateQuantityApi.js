subscribeToEvent("quantityUpdated", async function updateQuantityCall({productId, quantity}) {
    let product =   {
        "quantity": quantity, 
        "productId": productId,
    }
    let cartApi = new CartApi()
    await cartApi.updateQuantity(JSON.stringify(product))
})