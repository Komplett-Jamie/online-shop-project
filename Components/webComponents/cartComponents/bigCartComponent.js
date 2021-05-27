export class BigCart extends HTMLElement {
    constructor() {
        super();
        this.renderedItems = [];
    }

    async connectedCallback() {
        this.innerHTML = `
            <div id="cart-items"></div>
        `;
    }

    static get observedAttributes() {
        return ["items"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "items") {
            this.render(JSON.parse(newValue))
        }
    }
    
    render(allItemsInState) {
        const newItems = allItemsInState.filter(itemInState => this.isNewItem(itemInState));
        const updatedItems = allItemsInState.filter(itemInState => this.isUpdatedItem(itemInState));
        const deletedItems = this.renderedItems.filter(renderedItem => this.hasBeenDeletedFrom(renderedItem, allItemsInState));
        
        this.renderNewItems(newItems);
        this.updateItems(updatedItems);
        this.removeFromDOM(deletedItems);
    }
    
    isNewItem(itemInState) {
        return !this.renderedItems.some(renderedItem => renderedItem.productId === itemInState.productId)
    }
    
    isUpdatedItem(itemInState) {
        return this.renderedItems.some(renderedItem => renderedItem.productId === itemInState.productId)
    }
    
    hasBeenDeletedFrom(renderedItem, allItemsInState) {
        return !allItemsInState.some(itemInState => itemInState.productId === renderedItem.productId)
    }

    renderNewItems(newItems) {
        newItems.forEach(newItem => {
            let cartItemComponent = document.createElement("cart-item");
            cartItemComponent.setAttribute("productPrice", newItem.pricePerItem);
            cartItemComponent.setAttribute("productquantity", newItem.quantity);
            cartItemComponent.setAttribute("productId", newItem.productId);
            cartItemComponent.setAttribute("productImage", newItem.imageUrl);
            cartItemComponent.setAttribute("productName", newItem.productName);
            this.renderedItems.push({
                productId: newItem.productId,
                component: cartItemComponent,
            });
            this.appendChild(cartItemComponent);
        });
    }

    updateItems(updatedItems) {
        updatedItems.forEach(updatedItem => {
            const renderedItem = this.renderedItems.find(item => item.productId === updatedItem.productId);
            renderedItem.component.setAttribute(
              "productquantity",
              updatedItem.quantity
            )
        });
    }

    removeFromDOM(deletedItems) {
        deletedItems.forEach(deletedItem => {
            this.removeChild(deletedItem.component)
            this.renderedItems = this.renderedItems.filter(renderedItem => renderedItem.productId !== deletedItem.productId);
        });
    }
}
