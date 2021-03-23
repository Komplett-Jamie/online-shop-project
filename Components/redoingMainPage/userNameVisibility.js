subscribeToEvent("pageLoad", function() {
    let state = getState();
    console.log(state);
    let usernameDiv = document.getElementById("user_name_toggle");
    if (state.isLoggedIn === true)  {
        usernameDiv.innerHTML = state.user;
    }   
    else usernameDiv.innerHTML = "User";
})