async function addProductToCart()    {

    const productApi = "http://jamiestore.herokuapp.com/Cart/AddProduct";
    
    let userAuthToken = getState();

    let token = userAuthToken.authToken;

    let chosenProduct =   {
        "productId": 100,
        "quantity": 3
    }

    const UserDetails = {
        method: 'POST',
        headers:    {
            AuthToken: token,
            'Content-Type': 'application/json',
            'accept': '*/*'
        },
        body: JSON.stringify(chosenProduct),
    }

    let response = await fetch(productApi, UserDetails);
    console.log(response);
}
