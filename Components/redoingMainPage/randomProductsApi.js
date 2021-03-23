subscribeToEvent("pageLoad", async function frontPageRandomProducts()  {
    const CategoriesUrl = "https://jamiestore.herokuapp.com/Products/Random/10";

    const curlDetails = {
        method: 'GET',
    };

    let apiFetch = await fetch(CategoriesUrl, curlDetails);
    let response = await apiFetch.json();
    publishEvent("randomProducts", response);
})