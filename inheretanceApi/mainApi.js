class ApiCall {
    constructor()   {
        this.baseUrl = "https://jamiestore.herokuapp.com/";
        this.state = getState();
    }
    async get(path) {
        const options = {
            headers:    {
                AuthToken: this.state.authToken,
            },
        }
        let apiFetch = await fetch(this.baseUrl + path, options)
        return apiFetch;
    }
    async post(path, bodyDetails)    {
        const options = {
            method: 'POST',
            headers:    {
                AuthToken: this.state.authToken,
                'Content-Type': 'application/json',
                'accept': '*/*'
            },
            body: bodyDetails,
        }
        let apiFetch = await fetch(this.baseUrl + path, options);
        return apiFetch;
        
    }
    async put(path, bodyDetails) {
        const options = {
            method: 'PUT',
            headers:    {
                AuthToken: this.state.authToken,
                'Content-Type': 'application/json',
                'accept': '*/*'
            },
            body: bodyDetails,
        }
        let apiFetch = await fetch(this.baseUrl + path, options)
        return apiFetch;
    }
    async delete(path)  {
        const options = {
            method: 'DELETE',
            headers:    {
                AuthToken: this.state.authToken,
                "accept": "text/plain",
                'accept': '*/*',
            },
        }
        let apiFetch = await fetch(this.baseUrl + path, options)
        return apiFetch;
    }
}