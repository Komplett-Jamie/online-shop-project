let tokenCheckout = userAuthToken.authToken;

async function checkoutApiCall(event) {

    const checkoutUrl =  "http://jamiestore.herokuapp.com/Cart/Checkout";

    // let emailInput = document.getElementById("email").value;
    // let nameInput = document.getElementById("name").value;
    // let passwordInput = document.getElementById("password").value;
    // let repeatPasswordInput = document.getElementById("confirm_password").value;

    event.preventDefault();

    let formObject = {
        address:    {
            country: "string",
            city: "string",
            street: "string", 
        },
        creditCard: {
            creditCardNumber: "4635254347658465",
            expireMonth: 3,
            expireYear: 2022,
            ccv: 123
        },
        freightOption: "string"
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