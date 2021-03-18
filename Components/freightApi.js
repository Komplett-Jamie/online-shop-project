let apiCallFreight;
async function freightOptions() {
    const freightApi = "https://jamiestore.herokuapp.com/Freight/FreightOptions";

    const freightDetails = {
        method: 'GET',
        headers:    {
            AuthToken: token,
            "accept": "text/plain",
        },
    }
    let apiFetch = await fetch(freightApi, freightDetails);
    let response = await apiFetch.json();
    renderFreightOptions(response)
    apiCallFreight = response;
}


function renderFreightOptions(response) {
    let placing = document.getElementById("cart-freight-options");
    for(var i = 0; i < response.length; i++)    {

        let freightName;

        if (response[i].name === 'PickupInStore')   {
            freightName = "Pick Up in Store"
        } else if (response[i].name === 'Porterbuddy')  {
            freightName = "Porterbuddy"
        } else if (response[i].name === 'PickupPoint')  {
            freightName = "Pickup Point Oslo / Sandefjord"
        } else if (response[i].name === 'Letter')    {
            freightName = "Letter"
        }
        placing.innerHTML +=
        `
            <li>
            <input onclick="sendValueFromRadioToCartSummary(${response[i].price}), chosenFreightOption('${response[i].name}')" name="radio-input" class="radio-input" type="radio" id="${response[i].name}" value="${response[i].name}-radio-value">
            <label class="radio-label" for="${response[i].name}"><span>${freightName}:</span> ${response[i].price},-</label>
            </li>
        `
    }
}

function sendValueFromRadioToCartSummary(radioPrice) {
    let cartShipping = document.getElementById("cart-shipping");
    cartShipping.innerText = radioPrice;
}

async function chosenFreightOption(freightOption)  {
    let url = `https://jamiestore.herokuapp.com/Cart/FreightOption?freightOption=${freightOption}`;

    const freightDetails = {
        method: 'PUT',
        headers:    {
            AuthToken: token,
            "accept": "text/plain",
        },
    }
    await fetch (url, freightDetails);
    checkCart()
}
