class CartApi extends BaseApi {
    constructor() {
        super();
    }
    async fetchCart() {
        let response = await this.get("Cart/");
        return await response.json();
    }
    async confirmPurchases(details) {
        return await this.post("Cart/Checkout", details);
    }
    async addToCart(details) {
        return await this.post("Cart/AddProduct", details);
    }
    async updateQuantity(product) {
        return await this.put("Cart/UpdateQuantity", product);
    }
    async removeProduct(productId) {
        return await this.delete(`Cart/RemoveProduct?productId=${productId}`);
    }
    async freightOptionSelection(freightName) {
        return await this.put(
            `Cart/FreightOption?freightOption=${freightName}`
        );
    }
}
