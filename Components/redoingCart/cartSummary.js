subscribeToEvent("cartStateUpdated", function(cartState)   {
    let totalItemsCartPrice = document.getElementById("cart-total-price");
    let totalItemsInCart = document.getElementById("cart-total-items");
    let cartTotal = document.getElementById("cart-total");
    let freightCost = document.getElementById("cart-shipping");

    totalItemsInCart.innerText = cartState.items.reduce((total, n) => total + n.quantity, 0);
    let totalItemsCartPriceSum = cartState.items.reduce((total, n) => total + n.pricePerItem * n.quantity, 0);

    totalItemsCartPrice.innerText = totalItemsCartPriceSum;

    let freightPrice = 0;
    for (let i= 0; i < cartState.freightOptions.length; i++) {
        if (cartState.freightOptions[i].name === cartState.chosenFreightOption) {
            freightCost.innerText = cartState.freightOptions[i].price
            freightPrice = cartState.freightOptions[i].price
        }
    }
    cartTotal.innerText = totalItemsCartPriceSum + freightPrice;
})
