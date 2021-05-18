import { BaseApi } from "./BaseApi.js";

export class ProductsApi extends BaseApi {
    constructor() {
        super();
    }
    async getAllProducts() {
        return await this.get("Products/");
    }
    async productById(productId) {
        return await this.get(`Products/${productId}`);
    }
    async productsByCategoryWithId(categoryId) {
        return await this.get(`Products/ByCategory/${categoryId}`);
    }
    async randomProducts(amountOfRandomProducts) {
        return await this.get(`Products/Random/${amountOfRandomProducts}`);
    }
}
