import { BaseApi } from "./BaseApi.js";

export class FreightOptions extends BaseApi {
    constructor() {
        super();
    }

    async getFreightOptions() {
        return await this.get("Freight/FreightOptions");
    }
}
