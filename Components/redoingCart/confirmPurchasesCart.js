let freightSelection;

subscribeToEvent("cartStateUpdated", function(cartState)    {
    freightSelection = cartState.chosenFreightOption;
})

subscribeToEvent("confirmPurchases", function(cityInput, streetInput, creditcardNumberInput, creditcardCvcInput, expireMonthInput, expireYearInput, countryInput)   {
    


    let formObject = {
        address:    {
            country: countryInput,
            city: cityInput,
            street: streetInput, 
        },
        creditCard: {
            creditCardNumber: creditcardNumberInput,
            expireMonth: expireMonthInput,
            expireYear: expireYearInput,
            ccv: creditcardCvcInput,
        },
        freightOption: freightSelection,
    }
    let convertFormDataToJson = JSON.stringify(formObject);

    const checkoutUrl =  "https://jamiestore.herokuapp.com/Cart/Checkout";

    const apiInfo = {
        method: 'POST',
        headers:    {
            AuthToken: token,
            'accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: convertFormDataToJson,
    };

    await fetch(checkoutUrl, apiInfo)
    .then (response => response.json())
    .then (data => {
        if (data.errors.hasOwnProperty("CreditCard.ExpireYear"))   {
            creditcardDateWarning.innerText += data.errors["CreditCard.ExpireYear"][0];
        }
        if (data.errors.hasOwnProperty("CreditCard.CCV"))   {
            creditcardCvcWarning.innerText += data.errors["CreditCard.CCV"][0];
        }
        if (data.errors.hasOwnProperty("CreditCard.CreditCardNumber"))   {
            creditcardNumberWarning.innerText += data.errors["CreditCard.CreditCardNumber"][0];
        }
    })
})



async function checkoutApiCall(event) {

    let creditcardNumberWarning = document.getElementById("cardNumberErrorMessage");
    let creditcardDateWarning = document.getElementById("cardDateErrorMessage");
    let creditcardCvcWarning = document.getElementById("cardCvcErrorMessage");
    
    await fetch(checkoutUrl, apiInfo)
    .then (response => response.json())
    .then (data => {
        if (data.errors.hasOwnProperty("CreditCard.ExpireYear"))   {
            creditcardDateWarning.innerText += data.errors["CreditCard.ExpireYear"][0];
        }
        if (data.errors.hasOwnProperty("CreditCard.CCV"))   {
            creditcardCvcWarning.innerText += data.errors["CreditCard.CCV"][0];
        }
        if (data.errors.hasOwnProperty("CreditCard.CreditCardNumber"))   {
            creditcardNumberWarning.innerText += data.errors["CreditCard.CreditCardNumber"][0];
        }
    })

}
