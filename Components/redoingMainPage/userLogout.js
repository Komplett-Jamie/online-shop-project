subscribeToEvent("logUserOutApiCall", async function()  {
    let userLoginApiCall = new UserApi();
    let callBack = await userLoginApiCall.userLogout()

    if (callBack.status === 200)    {
        window.alert("You have succesfully been logged out")
    }
})