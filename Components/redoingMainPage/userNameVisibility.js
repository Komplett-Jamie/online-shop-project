subscribeToEvent("userIsLoggedIn", function(state) {
    let usernameDiv = document.getElementById("user_name_toggle");
    if (state.isLoggedIn === true)  {
        usernameDiv.innerHTML = state.user.name;
    }   
    else if (state.isLoggedIn === false)    {
        usernameDiv.innerHTML = "Log in";
    }

})