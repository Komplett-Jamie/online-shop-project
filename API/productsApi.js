class ProductApi {
    constructor ()  {
        this.baseUrl = "https://jamiestore.herokuapp.com/Products/";
    }

    async get(path) {
        let apiFetch = await fetch(this.baseUrl + path);
        return await apiFetch.json();
    }

    async getAllProducts()    {
        return await this.get("");
    }

    async productById(productId)  {
        return await this.get(productId);
    }

    async productsByCategoryWithId(categoryId)  {
        return await this.get(`ByCategory/${categoryId}`);
    }

    async randomProducts(amountOfRandomProducts)    {
        return await this.get(`Random/${amountOfRandomProducts}`);
    }
}