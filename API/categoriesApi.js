class CategoryCall extends ApiCall  {
    constructor()   {
        super();
    }
    async getCategories()   {
        return await this.get("Categories")
    }
}