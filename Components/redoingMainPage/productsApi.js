subscribeToEvent("pageLoad", async function fetchProduct() {

    const urlParams = new URLSearchParams(location.search);
    let productId = urlParams.get("id");

    let productApiCall = new ProductApi();
    let response = await productApiCall.productById(productId);
publishEvent("fetchedProduct", response)
})

