export class Footer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
    <div class="footer-container">
        <div class="footer-wrapper">
            <div class="footer-social-contact">
                FACEBOOK - INSTAGRAM - LINKEDIN
            </div>
            <div class="footer-site-info">
            All rights reserved © 2021 komplett.no
            </div>
            <a href="https://codepen.io/jamie-kielland">Jamie Kielland</a>
        </div>
    </div>

    <style>
    .footer-container {
        background:#fafafa;
        border-top:1px solid blue;
        display: flex;
        bottom: 0;
        width: 100%;
        height: 75px;
        justify-content: center;
        padding:20px 0px 20px 0px;
        z-index: 1;
        letter-spacing: 2px;
    }
    
    .footer-social-contact  {
        letter-spacing: 5px;
    }
    
    .footer-wrapper {
        text-align: center;
    }
    
    .footer-wrapper a   {
        text-transform: uppercase;
        letter-spacing: 10px;
        text-decoration: none;
    }
    </style>
    `;
    }
}
