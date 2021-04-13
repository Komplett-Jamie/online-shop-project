subscribeToEvent("userIsLoggedIn", async function fetchCart() {
    let cartApi = new CartApi()
    let callBack = await cartApi.fetchCart()
    publishEvent("fetchCart", await callBack.json());
})