subscribeToEvent("removeItem", async function deleteCartItem(productId)   {
    let cartApi = new CartApi()
    await cartApi.removeProduct(productId);
})