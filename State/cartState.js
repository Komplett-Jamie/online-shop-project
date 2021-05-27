let cartState = {
    items: [],
    freightOptions: [],
    chosenFreightOption: "",
};

subscribeToEvent("pageLoad", function () {
    publishEvent("cartItems", cartState);
});

subscribeToEvent("fetchCart", function (cart) {
    cartState.items = cart.items;
    cartState.chosenFreightOption = cart.selectedFreightOption;
    publishEvent("cartStateUpdated", cartState);
});

subscribeToEvent("quantityUpdated", function ({ productId, quantity }) {
    for (let i = 0; i < cartState.items.length; i++) {
        if (cartState.items[i].productId === productId) {
            cartState.items[i].quantity = quantity;
        }
    }
    publishEvent("cartStateUpdated", cartState);
});

subscribeToEvent("removeItem", function (productId) {
    cartState.items = cartState.items.filter(
      (item) => item.productId !== productId
    );
    publishEvent("cartStateUpdated", cartState);
});

subscribeToEvent("freightOptions", function (response) {
    cartState.freightOptions = response;
    publishEvent("cartStateUpdated", cartState);
});

subscribeToEvent("freightOptionSelected", function (freightName) {
    cartState.chosenFreightOption = freightName;
    publishEvent("cartStateUpdated", cartState);
});

subscribeToEvent("addToCart", function ({ productId, productQuantity }) {
    cartState.items.push({ productId, quantity: productQuantity });
});
