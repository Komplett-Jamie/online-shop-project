subscribeToEvent("addToCart", async function addProductToCart({productId, productQuantity})    {

    let product =   JSON.stringify({
        "productId": productId,
        "quantity": productQuantity,
    })

    let cartApi = new CartApi()
    await cartApi.addToCart(product)
})