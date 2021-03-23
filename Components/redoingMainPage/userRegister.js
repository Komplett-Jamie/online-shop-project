subscribeToEvent("userRegister", async function({emailInput, nameInput, passwordInput, repeatPasswordInput})    {

const registerUserUrl =  "https://jamiestore.herokuapp.com/User/Register";

let formObject = {
    email: emailInput,
    name: nameInput,
    password: passwordInput,
    repeatPassword: repeatPasswordInput,
}

let convertFormDataToJson = JSON.stringify(formObject);

const registerUserDetails = {
    method: 'POST',
    headers:    {
        'accept': 'application/json',
        'Content-Type': 'application/json',
    },
    body: convertFormDataToJson,
};

let apiFetch = await fetch(registerUserUrl, registerUserDetails)    
let response = await apiFetch.json()

    if (apiFetch.status === 400)   {
        publishEvent("userRegisterEmailAlreadyInUse", response)
    }
    if (apiFetch.status === 200)    {
        publishEvent("userRegistered", response);
    }
})