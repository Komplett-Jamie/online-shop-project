class UserApi extends ApiCall{
    constructor()   {
        super();
    }
    async userRegister(curlBody)  {
        return await this.post("User/Register", curlBody)
    }
    async userLogin(curlBody) {
        return await this.post("User/Login", curlBody)
    }
    async userLogout()    {
        return await this.post("User/Logout", null)
    }
    async currentUser()   {
        return await this.get("User/Current")
    }
}