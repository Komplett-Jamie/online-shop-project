import { BaseApi } from "./BaseApi.js";

export class FreightOptionsApi extends BaseApi {
    constructor() {
        super();
    }

    async getFreightOptions() {
        return await this.get("Freight/FreightOptions");
    }
}
