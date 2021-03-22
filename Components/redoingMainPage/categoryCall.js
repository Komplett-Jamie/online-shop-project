subscribeToEvent("pageLoad", async function categoryApi() {
    const CategoriesUrl = "https://jamiestore.herokuapp.com/Categories";

    const curlDetails = {
        method: 'GET',
        headers: {
            'accept': 'text/plain'
        }
    }

    let apiFetch = await fetch(CategoriesUrl, curlDetails);
    var response = await apiFetch.json();
    publishEvent("categoryCall", response);
})