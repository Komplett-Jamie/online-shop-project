let productState = [];

subscribeToEvent("searchProductsReturn", function(response) {
    productState = response;
})

subscribeToEvent("userSearchInput", (query) => {
    let searchArray = productState.filter(el => {
        if ((el.name.toLowerCase().indexOf(query) !== -1) || (el.description.toLowerCase().indexOf(query) !== -1))
            return true
        else 
            return false
    })
    publishEvent("searchedProducts", searchArray)
})