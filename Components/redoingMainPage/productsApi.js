subscribeToEvent("pageLoad", async function frontPageRandomProducts()  {
    const CategoriesUrl = "https://jamiestore.herokuapp.com/Products/Random/10";

    const curlDetails = {
        method: 'GET',
    };

    let apiFetch = await fetch(CategoriesUrl, curlDetails);
    let response = await apiFetch.json();
    publishEvent("randomProducts", response);
})

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
// return renderProduct(response);
})