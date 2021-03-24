subscribeToEvent("userLoginAuthorized", fetchUserApi)
subscribeToEvent("userRegistered", fetchUserApi)

async function fetchUserApi(userLoggedIn)    {

    const userApi = "https://jamiestore.herokuapp.com/User/Current";

    const UserDetails = {
        method: 'GET',
        headers:    {
            AuthToken: userLoggedIn.authToken,
        },
    }

let apiFetch = await fetch(userApi, UserDetails)
let response = await apiFetch.json();
publishEvent("userLoggedInApiReturn", {response, userLoggedIn});
}