export class ConfirmButton extends HTMLElement  {
    constructor()   {
        super()
    }

    connectedCallback() {
        this.innerHTML = 
        `
        <button class="confirm-purchase-button">Confirm Purchase</button>
        `
    }
}