class UserApi   {
    constructor()   {
        this.baseUrl = "https://jamiestore.herokuapp.com/User/"
        this.state = getState();
    }

    async get(path)   {
        const curlDetails = {
            headers:    {
                AuthToken: this.state.authToken,
            },
        }
        let apiFetch = await fetch(this.baseUrl + path, curlDetails)
        return apiFetch;
    }

    async post(path, curlBody)    {
        const curlDetails = {
            method: 'POST',
            headers:    {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                authToken: this.state.authToken
            },
            body: curlBody,
        };
        let apiFetch = await fetch(this.baseUrl + path, curlDetails)
        return apiFetch;
    }

    async userRegister(curlBody)  {
        return await this.post("Register", curlBody)
    }

    async userLogin(curlBody) {
        return await this.post("Login", curlBody)
    }

    async userLogout()    {
        return await this.post("Logout", null)
    }

    async currentUser()   {
        return await this.get("Current")
    }
}