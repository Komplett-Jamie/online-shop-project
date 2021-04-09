subscribeToEvent("pageLoad", async function frontPageRandomProducts()  {

    let productsApi = new ProductApi();
    let response = await productsApi.randomProducts(10)

    publishEvent("randomProducts", response);
})