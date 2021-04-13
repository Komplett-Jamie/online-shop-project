subscribeToEvent("pageLoad", async function frontPageRandomProducts()  {
    let productsApi = new ProductsApi();
    let response = await productsApi.randomProducts(10)
    publishEvent("randomProducts", await response.json());
})