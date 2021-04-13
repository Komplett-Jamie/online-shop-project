class FreightOptions extends ApiCall    {
    constructor()   {
        super();
    }

    async getFreightOptions() {
        return await this.get("Freight/FreightOptions")
    }
}