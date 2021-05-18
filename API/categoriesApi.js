import { BaseApi } from "./BaseApi.js";

export class CategoryCall extends BaseApi {
    constructor() {
        super();
    }
    async getCategories() {
        return await this.get("Categories");
    }
}
