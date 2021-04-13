let freightSelection;

subscribeToEvent("cartStateUpdated", function(cartState)    {
    freightSelection = cartState.chosenFreightOption;
})

subscribeToEvent("confirmPurchases", async function({cityInput, streetInput, creditcardNumberInput, creditcardCvcInput, expireMonthInput, expireYearInput, countryInput})   {

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

    let cartApi = new CartApi()
    let response = await cartApi.confirmPurchases(JSON.stringify(formObject))
    publishEvent("responseFromCheckout", await response.json());
})