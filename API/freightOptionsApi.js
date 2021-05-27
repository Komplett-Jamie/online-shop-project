import { BaseApi } from "./BaseApi.js";

export class FreightOptionsApi extends BaseApi {
    constructor() {
        super();
    }

    async getFreightOptions() {
        const response = await this.get("Freight/FreightOptions");
        return await response.json();
    }
}
