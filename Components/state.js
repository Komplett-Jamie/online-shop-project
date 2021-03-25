function getState() {
    let initialState = {
        authToken: null,
        user: null,
        isLoggedIn: false,
    }
    let getState = sessionStorage.getItem("state");
    if (getState === null)  {
        return initialState;
    } else {return JSON.parse(getState)};
}

subscribeToEvent("userLoggedInApiReturn", function({response, userLoggedIn})  {
    let state = getState()
    state.authToken = userLoggedIn.authToken;
    state.isLoggedIn = true;
    state.user = response;
    sessionStorage.setItem("state", JSON.stringify(state));
})

subscribeToEvent("pageLoad", function()   {
    let state = getState();
    if (state.isLoggedIn === true)  {
        publishEvent("userIsLoggedIn", state)
}   else return false;
})

subscribeToEvent("userClickLogout", function handleLogout() {
    let state = getState();
    publishEvent("logUserOutApiCall", state);
    state.authToken = null;
    state.isLoggedIn = false;
    state.user = null;
    sessionStorage.clear("state");
})