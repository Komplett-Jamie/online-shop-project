let tokenCheckout = userAuthToken.authToken;
async function checkoutApiCall(event) {

    const checkoutUrl =  "https://jamiestore.herokuapp.com/Cart/Checkout";

    let cityInput = document.getElementById("addressLineTwo").value;
    let streetInput = document.getElementById("address").value;
    let creditcardNumberInput = document.getElementById("cardNumber").value;
    let expireMonthInput = document.getElementById("expirationDateMonth").value;
    let expireYearInput = document.getElementById("expirationDateYear").value;
    let creditcardCvcInput = document.getElementById("cardCVC").value;
    let countryInput = document.getElementById("country-options").value;

    event.preventDefault();

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
