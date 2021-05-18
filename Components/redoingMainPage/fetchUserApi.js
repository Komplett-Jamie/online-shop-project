subscribeToEvent("userLoginAuthorized", fetchUserApi);
subscribeToEvent("userRegistered", fetchUserApi);

async function fetchUserApi() {
    let userLoginApiCall = new UserApi();
    let callBack = await userLoginApiCall.currentUser();
    let response = await callBack.json();
    publishEvent("userLoggedInApiReturn", { response });
}
