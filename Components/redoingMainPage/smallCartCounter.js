subscribeToEvent("smallCartStateUpdated", function(smallCartState) {
    let totalCartItems = smallCartState.items.reduce((total, n) => total + n.productQuantity, 0);
    document.getElementById("small_cart").innerText = totalCartItems || 0;
});