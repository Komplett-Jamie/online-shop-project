export class UserLogin extends HTMLElement  {
    constructor()   {
        super();
    }

    connectedCallback() {
        this.innerHTML = 
    `
    <div class="login-page">
        <div class="form-container">
            <form id="loginForm" class="login-form">
                <label for="email">Email</label>
                <input 
                required 
                id="email" 
                type="email" 
                name="email">
            <label for="password">Password</label>
                <input 
                required 
                min="8" 
                id="password" 
                type="password" 
                name="password">
                <button type="submit">Login</button>
                <div class="error-handling" id="error_handling"></div>
                <p>Need to register an account? <a href="./userRegister.html">Register here</a></p>
            </form>
        </div>
    </div>
    
    <style>
    .register-page {
        width: 360px;
        padding: 8% 0 0;
        margin: auto;
    }
    
    .login-page {
        width: 360px;
        padding: 8% 0 0;
        margin: auto;
    }
    
    .form-container {
        position: relative;
        z-index: 1;
        background: #FFFFFF;
        max-width: 360px;
        margin: 0 auto 100px;
        padding: 35px;
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
    }
    
    .form-container label  {
        font-size: 20px;
    }
    
    .form-container input {
        outline: 0;
        background: white;
        width: 100%;
        border: 1px solid #bdbdbd;
        margin: 5px 0 20px;
        padding: 10px;
        box-sizing: border-box;
        font-size: 16px;
    }
    
    .error-handling {
        margin: 15px 0px 5px 0px;
    }
    </style>
    `
    this.querySelector("#loginForm").addEventListener("submit", this.handleLogin);
    
    subscribeToEvent("userLogin", async function({emailInput, passwordInput}) {

        let formObject = {
            email: emailInput,
            password: passwordInput,
        }
    
        let convertFormDataToJson = JSON.stringify(formObject);
    
        let userLoginApiCall = new UserApi();
        let callBack = await userLoginApiCall.userLogin(convertFormDataToJson)

        if (callBack.status === 401)    {
            publishEvent("userLoginUnauthorized", await callBack.json())
        }
        if (callBack.status === 200)    {
            publishEvent("userRegisteredAuthtoken", await callBack.json())
            publishEvent("userLoginAuthorized")
        }
    })

    subscribeToEvent("userLoginUnauthorized", function()   {
        this.querySelector("#error_handling").innerText = "Please check your password or register for a free account!";
    }.bind(this))
    
    subscribeToEvent("userLoginAuthorized", function()  {
        this.querySelector("#error_handling").innerText = "Thank you for loging in, you will be redirected soon!";
        setTimeout(function(){window.location.assign("./mainPage.html")}, 3000);
    }.bind(this))
    }

    handleLogin(event)  {
        event.preventDefault();
        let emailInput = this.querySelector("#email").value;
        let passwordInput = this.querySelector("#password").value;
        publishEvent("userLogin", { emailInput, passwordInput })
    }
}