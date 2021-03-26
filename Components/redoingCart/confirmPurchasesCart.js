let freightSelection;

subscribeToEvent("cartStateUpdated", function(cartState)    {
    freightSelection = cartState.chosenFreightOption;
})

subscribeToEvent("confirmPurchases", async function({cityInput, streetInput, creditcardNumberInput, creditcardCvcInput, expireMonthInput, expireYearInput, countryInput})   {
    
    

    let authToken = getState().authToken;
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
            AuthToken: authToken,
            'accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: convertFormDataToJson,
    };

    await fetch(checkoutUrl, apiInfo)
    .then (response => response.json())
    .then (data => publishEvent("responseFromCheckout", data))
})