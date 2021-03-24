subscribeToEvent("logUserOutApiCall", async function(state)  {
    const logoutDetails = {
        method: 'POST',
        headers:    {
            'accept': '*/*',
            'Content-Type': 'application/json',
            authToken: state.authToken
        },
    };

    let apiFetch = await fetch("http://jamiestore.herokuapp.com/User/Logout", logoutDetails);
    let response = await apiFetch
    if (response.status === 200)    {

    }
})