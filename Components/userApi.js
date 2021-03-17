async function fetchUser(authToken)    {

    const userApi = "https://jamiestore.herokuapp.com/User/Current";

    let userAuthToken = authToken;

    const UserDetails = {
        method: 'GET',
        headers:    {
            AuthToken: userAuthToken,
        },
    }

let apiFetch = await fetch(userApi, UserDetails)
let response = await apiFetch.json();

return response;
}