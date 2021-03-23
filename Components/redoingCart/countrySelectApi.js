subscribeToEvent("pageLoad", async function CountryCallApi() {
    let url = "https://restcountries.eu/rest/v2/all";
    let apiFetch = await fetch(url)
    var response = await apiFetch.json();
    publishEvent("countryApiReturn", response)
})