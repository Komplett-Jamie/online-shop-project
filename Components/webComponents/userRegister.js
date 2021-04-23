export class Userregister extends HTMLElement   {
    constructor()   {
        super()
    }
    
    connectedCallback() {
        this.innerHTML = 
        `
    <div class="register-page">
        <div class="form-container">
            <form id="registerNewUserForm" class="register-form">
                <label for="name">Name</label>
                    <input 
                    required 
                    id="name" 
                    type="text" 
                    name="name">
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
                <label for="repeatPassword">Confirm Password</label>
                    <input 
                    required 
                    min="8" 
                    id="confirm_password" 
                    type="password" 
                    name="confirm_password">
                <button type="submit">Create Account</button>
                <div class="error-handling" id="error_handling"></div>
                <p>Already registered? <a href="./userLogin.html">Sign in</a></p>
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
        this.querySelector("#registerNewUserForm").addEventListener("submit", this.handleRegister)

        subscribeToEvent("userRegister", async function({emailInput, nameInput, passwordInput, repeatPasswordInput})    {

            let formObject = {
                email: emailInput,
                name: nameInput,
                password: passwordInput,
                repeatPassword: repeatPasswordInput,
            }
            
            let convertFormDataToJson = JSON.stringify(formObject);
            
            let userRegisterApiCall = new UserApi();
            let callBack = await userRegisterApiCall.userRegister(convertFormDataToJson);
            console.log(callBack.status)
                if (callBack.status === 400)   {
                    publishEvent("userRegisterEmailAlreadyInUse", await callBack.json())
                }
                if (callBack.status === 200)    {
                    publishEvent("userRegisteredAuthtoken", await callBack.json())
                    publishEvent("userRegistered");
                }
            })

        subscribeToEvent("userRegisterEmailAlreadyInUse", function()    {
            this.querySelector("#error_handling").innerText = "This Email adress is already registered."
        }.bind(this))
        
        subscribeToEvent("userRegistered", function()   {
            this.querySelector("#error_handling").innerText = "Thank you for registering, you will be redirected soon!";
            setTimeout(function(){window.location.assign("./mainPage.html")}, 2000);
        }.bind(this))
    }

    handleRegister(event)  {
        event.preventDefault();
        let emailInput = this.querySelector("#email").value;
        let nameInput = this.querySelector("#name").value;
        let passwordInput = this.querySelector("#password").value;
        let repeatPasswordInput = this.querySelector("#confirm_password").value;
        publishEvent("userRegister", { emailInput, nameInput, passwordInput, repeatPasswordInput })
    }

}