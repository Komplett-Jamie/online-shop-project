subscribeToEvent("userLogin", async function({emailInput, passwordInput}) {

    let formObject = {
        email: emailInput,
        password: passwordInput,
    }

    let convertFormDataToJson = JSON.stringify(formObject);

    let userLoginApiCall = new UserApi();
    let callBack = await userLoginApiCall.userLogin(convertFormDataToJson)

    if (callBack.status === 401)    {
        publishEvent("userLoginUnauthorized", await callBack.json())
    }
    if (callBack.status === 200)    {
        publishEvent("userRegisteredAuthtoken", await callBack.json())
    }
})