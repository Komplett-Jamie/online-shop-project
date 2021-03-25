subscribeToEvent("pageLoad", async function()  {

    const urlParams = new URLSearchParams(location.search);
    let categoryId = urlParams.get("categoryId");

    const CategoriesUrl = `https://jamiestore.herokuapp.com/Products/ByCategory/${categoryId}`;

    const curlDetails = {
        method: 'GET',
        headers: {
            'accept': 'text/plain'
        }
    }

    let apiFetch = await fetch(CategoriesUrl, curlDetails);
    let response = await apiFetch.json();
    publishEvent("categoryCallPageApiReturn", response);
})


