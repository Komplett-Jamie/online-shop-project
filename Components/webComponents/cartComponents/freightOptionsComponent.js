export class FreightOptions extends HTMLElement {
    constructor() {
        super();

        this.freightChoice = {
            freight: cartState.chosenFreightOption,
        };
    }

    connectedCallback() {
        this.innerHTML = `
        <div id="cart-freight-options">
            <span>Freight Options</span>
            <br>          
        </div>
        `;
    }
}
