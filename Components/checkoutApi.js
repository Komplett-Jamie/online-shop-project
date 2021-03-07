let tokenCheckout = userAuthToken.authToken;

async function checkoutApiCall(event) {

    const checkoutUrl =  "http://jamiestore.herokuapp.com/Cart/Checkout";

    let cityInput = document.getElementById("addressLineTwo").value;
    let streetInput = document.getElementById("address").value;
    let creditcardNumberInput = document.getElementById("cardNumber").value;
    let expireMonthInput = document.getElementById("expirationDateMonth").value;
    let expireYearInput = document.getElementById("expirationDateYear").value;
    let creditcardCvcInput = document.getElementById("cardCVC").value;

    event.preventDefault();

    let formObject = {
        address:    {
            country: "Norway",
            city: cityInput,
            street: streetInput, 
        },
        creditCard: {
            creditCardNumber: creditcardNumberInput,
            expireMonth: expireMonthInput,
            expireYear: expireYearInput,
            ccv: creditcardCvcInput,
        },
        freightOption: "PickupInStore"
    }
    let convertFormDataToJson = JSON.stringify(formObject);

    const apiInfo = {
        method: 'POST',
        headers:    {
            AuthToken: token,
            'accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: convertFormDataToJson,
    };

    let apiFetch = await fetch(checkoutUrl, apiInfo)
    let response = await apiFetch.json()
}