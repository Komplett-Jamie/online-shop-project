subscribeToEvent("pageLoad", async function fetchProduct() {

    const urlParams = new URLSearchParams(location.search);
    let productId = urlParams.get("id");

    const userApi = `https://jamiestore.herokuapp.com/Products/${productId}`;

    const UserDetails = {
        method: 'GET',
    }

let apiFetch = await fetch(userApi, UserDetails)
let response = await apiFetch.json();
publishEvent("fetchedProduct", response)
})