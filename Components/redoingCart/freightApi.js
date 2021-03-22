subscribeToEvent("pageLoad", async function freightOptions() {
    let authToken = getState().authToken;
    const freightApi = "https://jamiestore.herokuapp.com/Freight/FreightOptions";

    const freightDetails = {
        method: 'GET',
        headers:    {
            AuthToken: authToken,
            "accept": "text/plain",
        },
    }
    let apiFetch = await fetch(freightApi, freightDetails);
    let response = await apiFetch.json();
    publishEvent("freightOptions", response);
})

subscribeToEvent("freightOptionSelected", async function chosenFreightOption(freightName)  {
    let authToken = getState().authToken;
    let url = `https://jamiestore.herokuapp.com/Cart/FreightOption?freightOption=${freightName}`;

    const freightDetails = {
        method: 'PUT',
        headers:    {
            AuthToken: authToken,
            "accept": "text/plain",
        },
    }
    await fetch (url, freightDetails);
})


