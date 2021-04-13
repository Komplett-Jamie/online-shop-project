class CartApi   {
    constructor()   {
        this.baseUrl = "https://jamiestore.herokuapp.com/Cart/";
        this.state = getState();
    }

    async get() {
        const cartDetails = {
            headers:    {
                AuthToken: this.state.authToken,
            },
        }
        let apiFetch = await fetch(this.baseUrl, cartDetails)
        return apiFetch;
    }
    async post(path, details)    {
        const UserDetails = {
            method: 'POST',
            headers:    {
                AuthToken: this.state.authToken,
                'Content-Type': 'application/json',
                'accept': '*/*'
            },
            body: details,
        }
        let apiFetch = await fetch(this.baseUrl + path, UserDetails);
        return apiFetch;
        
    }
    async put(path, product) {
        const productDetails = {
            method: 'PUT',
            headers:    {
                AuthToken: this.state.authToken,
                'Content-Type': 'application/json',
                'accept': '*/*'
            },
            body: product,
        }
        let apiFetch = await fetch(this.baseUrl + path, productDetails)
        return apiFetch;
    }
    async delete(path)  {
        const removeDetails = {
            method: 'DELETE',
            headers:    {
                AuthToken: this.state.authToken,
                "accept": "text/plain",
                'accept': '*/*',
            },
        }
        let apiFetch = await fetch(this.baseUrl + path, removeDetails)
        return apiFetch;
    }

    async fetchCart()   {
        return await this.get();
    }

    async addToCart(details)   {
        return await this.post("AddProduct", details);
    }

    async updateQuantity(product)  {
        return await this.put("UpdateQuantity", product);
    }

    async removeProduct(productId)   {
        return await this.delete(`RemoveProduct?productId=${productId}`)
    }

    async freightOptionSelection(freightName)  {
        return await this.put(`FreightOption?freightOption=${freightName}`)
    }

    async confirmPurchases(details)    {
        return await this.post("Checkout", details)
    }
}