export class Header extends HTMLElement    {
    constructor()   {
        super();
    }

    connectedCallback() {

        this.innerHTML = 
    `
    <div id="header-container">
        <div id="header-wrapper">
            <div id="logo">
                <a href="./mainPage.html">
                    <img src="https://logos.textgiraffe.com/logos/logo-name/Jamie-designstyle-kiddo-m.png" alt="logo-b2c-svg" href="#">
                </a>
            </div>
            <search-bar></search-bar>
            <user-controls></user-controls>
        </div>
    </div>
<dropdown-menu></dropdown-menu>

    <style>
    * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
}

#header-wrapper   {
    max-width:1200px;
    width:100%;
    display:flex;
    justify-content: space-between;
    align-items: center;
}

#header-container   {
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    border-bottom: 1px solid blue;
    background:#fafafa;
}
    </style>
    `
    }
}
