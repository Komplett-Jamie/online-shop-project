function getState() {
    let initialState = {
        authToken: null,
        user: null,
        isLoggedIn: false,
    };
    let getState = sessionStorage.getItem("state");
    if (getState === null) {
        return initialState;
    } else {
        return JSON.parse(getState);
    }
}

subscribeToEvent("userLoggedInApiReturn", function ({ response }) {
    let state = getState();
    state.user = response;
    sessionStorage.setItem("state", JSON.stringify(state));
});

subscribeToEvent("userRegisteredAuthtoken", function (userDetails) {
    let state = getState();
    state.authToken = userDetails.authToken;
    state.isLoggedIn = true;
    sessionStorage.setItem("state", JSON.stringify(state));
    publishEvent("userRegistered");
});

subscribeToEvent("pageLoad", function () {
    let state = getState();
    publishEvent("onLoadState", state);
    if (state.isLoggedIn === true) {
        publishEvent("userIsLoggedIn", state);
    } else return false;
});

subscribeToEvent("userClickLogout", function handleLogout() {
    let state = getState();
    publishEvent("logUserOutApiCall", state);
    state.authToken = null;
    state.isLoggedIn = false;
    state.user = null;
    sessionStorage.clear("state");
    publishEvent("userIsLoggedOut", state);
});
