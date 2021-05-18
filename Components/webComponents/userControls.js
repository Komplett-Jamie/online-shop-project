export class UserControls extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
    <div id="user_controls">
        <div id="icon-container">
            <div id="user_icon">
                        <svg width="20" height="20" viewBox="0 0 16 16"><path fill="#333" d="M13.477 16h-10.954c-0.14 0-0.274-0.059-0.369-0.163s-0.142-0.242-0.129-0.382c0.11-1.22 0.585-2.363 1.373-3.305 0.697-0.832 1.59-1.452 2.602-1.809l0-0.475c-0.562-0.385-1.037-0.926-1.385-1.582-0.402-0.758-0.615-1.634-0.615-2.535 0-1.251 0.405-2.431 1.139-3.323 0.758-0.92 1.774-1.427 2.861-1.427s2.103 0.507 2.861 1.427c0.735 0.892 1.139 2.072 1.139 3.323 0 0.901-0.213 1.777-0.615 2.535-0.348 0.655-0.823 1.197-1.385 1.582l0 0.475c1.012 0.357 1.905 0.977 2.602 1.809 0.788 0.942 1.263 2.084 1.373 3.305 0.013 0.14-0.034 0.279-0.129 0.382s-0.229 0.163-0.369 0.163zM3.1 15h9.8c-0.164-0.81-0.527-1.565-1.064-2.208-0.649-0.776-1.504-1.33-2.471-1.604-0.215-0.061-0.364-0.257-0.364-0.481l-0-1.116c0-0.179 0.095-0.344 0.25-0.433 1.063-0.613 1.75-1.951 1.75-3.408 0-2.068-1.346-3.75-3-3.75s-3 1.682-3 3.75c0 1.457 0.687 2.795 1.75 3.408 0.155 0.089 0.25 0.254 0.25 0.433l-0 1.116c0 0.224-0.149 0.42-0.364 0.481-0.967 0.274-1.822 0.828-2.471 1.604-0.538 0.642-0.9 1.397-1.064 2.208z"></path></svg>
                        <div class="dropdown-content">
                            <a id="toggle-login-on-off" href="./../Pages/userLogin.html">Login</a>
                            <a href="./../Pages/userRegister.html">Register</a>
                            <a id="logout">Logout</a>
                        </div>
                    </div>
                    <span id="user_name_toggle" class="user_name">Log In</span>
                </div>
                <div id="icon-container">
                <small-cart></small-cart>
            <span id="cart_no_login_error"></span>
        </div>
    </div>

    <style>

    #user_controls {
        margin:10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    #icon-container {
        padding-left:15px;
        line-height:20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
    }

    #icon-container a {
        text-decoration: none;
        text-align: center;
        position: relative;
    }
                
    .dropdown-content {
        display: none;
        flex-wrap: wrap;
        background-color: grey;
        min-width: 100px;
        z-index: 1;
        overflow: auto;
    }

    .dropdown-content a {
        color: rgb(255, 255, 255);
        padding: 5px;
        text-decoration: none;
        display: inline-block;
        font-size: 15px;
        font-weight: bold;
    }

    #user_icon {
        display:flex;
        justify-content: center;
        align-items:center;
        background: lightgray;
        border-radius: 50%;
        width: 45px;
        height: 45px;
        border: 1px solid blue;
    }

    #small_cart {
        display:flex;
        justify-content: center;
        align-items:center;
        background: lightgray;
        border-radius: 50%;
        width: 45px;
        height: 45px;
        border: 1px solid blue;
    }
    </style>
    `;
        this.querySelector("#logout").addEventListener(
            "click",
            this.logoutUser
        );
        this.querySelector("#user_icon").addEventListener(
            "click",
            this.dropdownMenu
        );

        subscribeToEvent(
            "onLoadState",
            function (state) {
                let usernameDiv = this.querySelector("#user_name_toggle");
                if (state.isLoggedIn === true) {
                    usernameDiv.innerHTML = state.user;
                }
            }.bind(this)
        );

        subscribeToEvent(
            "userIsLoggedOut",
            function (state) {
                console.log(state);
                let usernameDiv = this.querySelector("#user_name_toggle");
                if (state.isLoggedIn === false) {
                    usernameDiv.innerHTML = "Log in";
                }
            }.bind(this)
        );
    }

    logoutUser() {
        publishEvent("userClickLogout");
    }

    dropdownMenu() {
        let menuContent = this.querySelector(".dropdown-content");

        if (menuContent.style.display === "") {
            menuContent.style.display = "flex";
        } else {
            menuContent.style.display = "";
        }
    }
}
