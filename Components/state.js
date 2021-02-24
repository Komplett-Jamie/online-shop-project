function getState() {
    let initialState = {
        authToken: null,
        user: null,
        isLoggedIn: false,
    }
    let getState = sessionStorage.getItem("state");
    if (getState === null)  {
        return initialState;
    }else{
        return JSON.parse(getState)
        };
}

function updateAuthToken(authToken)  {
    let state = getState();
    state.authToken = authToken;
    state.isLoggedIn = true;
    saveState(state);
}

function saveState(state)    {
    sessionStorage.setItem("state", JSON.stringify(state));
}

function updateUser(user)   {
    let state = getState();
    state.user = user;
    saveState(state);
}