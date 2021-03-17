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

function showUserNameUserIcon() {
    let state = getState();
    let usernameDiv = document.getElementById("user_name_toggle");
    
    if (state.isLoggedIn === true)  {
        usernameDiv.innerHTML = state.user.name;
        
    }   else usernameDiv.innerHTML = "User";
    
}

function checkIfUserLoggedIn()  {
    let errorhandling = document.getElementById("cart_no_login_error");
    let state = getState();
    if (state.isLoggedIn === true)  {
        return true;
}   else
        errorhandling.innerText = " please log in";
        return false;
}