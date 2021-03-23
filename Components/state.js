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

subscribeToEvent("userState", function updateAuthToken(response)  {
    let state = getState();
    console.log(response)
    state.authToken = response.authToken;
    state.isLoggedIn = true;
    saveState(state);
})

function saveState(state)    {
    sessionStorage.setItem("state", JSON.stringify(state));
}

subscribeToEvent("userState", function updateUser(response)   {
    let state = getState();
    state.user = response.user;
    saveState(state);
})

function checkIfUserLoggedIn()  {
    let errorhandling = document.getElementById("cart_no_login_error");
    let state = getState();
    if (state.isLoggedIn === true)  {
        return true;
}   else
        errorhandling.innerText = " please log in";
        return false;
}