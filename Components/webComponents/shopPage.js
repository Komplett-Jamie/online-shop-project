export class ShopPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
    <div class="main-page-container">
        <custom-header></custom-header>
            <slot></slot>
        <custom-footer></custom-footer>
    </div>
    `;
    }
}
