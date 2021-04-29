let freightSelection;

subscribeToEvent("cartStateUpdated", function(cartState)    {
    freightSelection = cartState.chosenFreightOption;
})