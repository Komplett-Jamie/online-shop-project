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
    `
    this.querySelector("#loginForm").addEventListener("submit", this.handleLogin);
    }

    handleLogin(event)  {
        event.preventDefault();
        let emailInput = this.querySelector("#email").value;
        let passwordInput = this.querySelector("#password").value;
        publishEvent("userLogin", { emailInput, passwordInput })
    }
}