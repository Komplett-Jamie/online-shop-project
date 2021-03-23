subscribeToEvent("userLogin", async function({emailInput, passwordInput}) {

    const loginUserApi = "https://jamiestore.herokuapp.com/User/Login";

    let formObject = {
        email: emailInput,
        password: passwordInput,
    }

    let convertFormDataToJson = JSON.stringify(formObject);

    const loginUserDetails = {
        method: 'POST',
        headers:    {
            'accept': 'text/plain',
            'Content-Type': 'application/json',
        },
        body: convertFormDataToJson,
    };

    let apiFetch = await fetch(loginUserApi, loginUserDetails);
    let response = await apiFetch.json()
    console.log(response);
    if (apiFetch.status === 401)    {
        publishEvent("userLoginUnauthorized", response)
    }
    if (apiFetch.status === 200)    {
        publishEvent("userLoginAuthorized", response)
    }
})