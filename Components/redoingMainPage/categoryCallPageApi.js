subscribeToEvent("pageLoad", async function()  {
    const urlParams = new URLSearchParams(location.search);
    let categoryId = urlParams.get("categoryId");
    let productApiCall = new ProductsApi();
    let response = await productApiCall.productsByCategoryWithId(categoryId);
    publishEvent("categoryCallPageApiReturn", await response.json());
})