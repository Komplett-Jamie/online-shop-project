subscribeToEvent("pageLoad", async function getAllProductsForSearch()    {

    let productApiCall = new ProductApi();
    let response = await productApiCall.getAllProducts();
    publishEvent("searchProductsReturn", response)
})