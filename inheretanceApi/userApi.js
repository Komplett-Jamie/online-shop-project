class UserApi extends ApiCall{
    constructor()   {
        super();
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