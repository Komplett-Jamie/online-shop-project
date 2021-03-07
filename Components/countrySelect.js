async function CountryCallApi() {
    let url = "https://restcountries.eu/rest/v2/all";

    let placing = document.getElementById("country-options");

    let apiFetch = await fetch(url)
    var arr = await apiFetch.json();

    for (var i = 0; i < arr.length; i++ )  {
        placing.innerHTML += 
        `
        <option value="${arr[i].name}">${arr[i].name}</option>
        `
    }

}
CountryCallApi()