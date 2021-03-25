subscribeToEvent("pageLoad", async function getAllProductsForSearch()    {

    const apiDetails = {
        method: 'GET',
        headers:    {
            'accept': 'text/plain'
        }
    }
    let apiFetch = await fetch("https://jamiestore.herokuapp.com/Products", apiDetails);
    let response = await apiFetch.json();
    publishEvent("searchProductsReturn", response)
})