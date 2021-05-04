let smallCartState = {
    items: [],
};

subscribeToEvent("addToCart", function ({ productId, productQuantity }) {
    smallCartState.items.push({ productId, productQuantity });
    publishEvent("smallCartStateUpdated", smallCartState);
});

subscribeToEvent("fetchCart", function (cart) {
    for (let i = 0; i < cart.items.length; i++) {
        smallCartState.items.push({
            productId: cart.items[i].productId,
            productQuantity: cart.items[i].quantity,
        });
    }
    publishEvent("smallCartStateUpdated", smallCartState);
});

subscribeToEvent("quantityUpdated", function ({ productId, quantity }) {
    for (let i = 0; i < smallCartState.items.length; i++) {
        if (smallCartState.items[i].productId === productId) {
            smallCartState.items[i].productQuantity = quantity;
        }
    }
    publishEvent("smallCartStateUpdated", smallCartState);
});

subscribeToEvent("removeItem", function (productId) {
    smallCartState.items = smallCartState.items.filter(
        (item) => item.productId !== productId
    );
    publishEvent("smallCartStateUpdated", smallCartState);
});
