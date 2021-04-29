export class BigCart extends HTMLElement {
    constructor() {
        super();
        this.items = [];
    }

    connectedCallback() {
        this.innerHTML = `
            <div id="cart-items"></div>
        `;
        subscribeToEvent(
            "cartStateUpdated",
            function (state) {
                this.renderCartBigCart(state.items);
            }.bind(this)
        );
    }

    renderCartBigCart(cartItems) {
        cartItems.forEach((cartItem) => {
            // console.log(this.items, cartItem)
            let itemIsInList = this.checkIfItemExistsInList(
                this.items,
                cartItem
            );
            if (!itemIsInList) {
                let item = document.createElement("cart-item");
                item.setAttribute("productPrice", cartItem.pricePerItem);
                item.setAttribute("productquantity", cartItem.quantity);
                item.setAttribute("productId", cartItem.productId);
                item.setAttribute("productImage", cartItem.imageUrl);
                item.setAttribute("productName", cartItem.productName);
                this.items.push({
                    productId: cartItem.productId,
                    component: item,
                });
                this.appendChild(item);
            } else {
                for (let i = 0; i < this.items.length; i++) {
                    if (this.items[i].productId === cartItem.productId) {
                        this.items[i].component.setAttribute(
                            "productquantity",
                            cartItem.quantity
                        );
                    }
                }
            }
        });
        for (let i = 0; i < this.items.length; i++) {
            let isInCartItems = false;
            for (let j = 0; j < cartItems.length; j++) {
                if (this.items[i].productId === cartItems[j].productId) {
                    isInCartItems = true;
                    break;
                }
            }
            if (!isInCartItems) {
                let item = this.items.splice(i, 1)[0];
                console.log(item);
                this.removeChild(item.component);
            }
        }
    }

    checkIfItemExistsInList(items, cartItem) {
        for (let i = 0; i < items.length; i++) {
            if (items[i].productId === cartItem.productId) {
                return true;
            }
        }
        return false;
    }
}
