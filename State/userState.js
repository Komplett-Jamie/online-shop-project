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
    console.log(response);
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

subscribeToEvent("userLogin", function (response) {
    let state = getState();
    state.user = response.name;
    sessionStorage.setItem("state", JSON.stringify(state));
});

subscribeToEvent("userRegistered", function (response) {
    let state = getState();
    state.user = response.name;
    sessionStorage.setItem("state", JSON.stringify(state));
});
