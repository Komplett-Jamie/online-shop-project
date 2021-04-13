subscribeToEvent("pageLoad", async function categoryApi() {


    let CategoryApi = new CategoryCall()
    let response = await CategoryApi.getCategories()

    publishEvent("categoryCall", await response.json());
})