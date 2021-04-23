// subscribeToEvent("userRegister", async function({emailInput, nameInput, passwordInput, repeatPasswordInput})    {

// let formObject = {
//     email: emailInput,
//     name: nameInput,
//     password: passwordInput,
//     repeatPassword: repeatPasswordInput,
// }

// let convertFormDataToJson = JSON.stringify(formObject);

// let userRegisterApiCall = new UserApi();
// let callBack = await userRegisterApiCall.userRegister(convertFormDataToJson);

//     if (callBack.status === 400)   {
//         publishEvent("userRegisterEmailAlreadyInUse", await callBack.json())
//     }
//     if (callBack.status === 200)    {
//         publishEvent("userRegisteredAuthtoken", await callBack.json())
//     }
// })