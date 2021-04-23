export class CartForms extends HTMLElement  {
    constructor()   {
        super()
        this.testCartState = {
            address:    {
                country: null,
                city: null,
                street: null, 
            },
            creditCard: {
                creditCardNumber: null,
                expireMonth: null,
                expireYear: null,
                ccv: null,
            },
            freightOption: null,
        }
    }

    connectedCallback() {
        this.innerHTML =
        `
        <billing-address></billing-address>
        <creditcard-details></creditcard-details>
        <freight-options></freight-options>
        `

        this.querySelector("billing-address").addEventListener("onUpdate", function(event)   {
            this.testCartState.address.city = event.detail.addressLineTwo;
            this.testCartState.address.country = event.detail.country;
            this.testCartState.address.street = event.detail.street;
        }.bind(this))

        this.querySelector("creditcard-details").addEventListener("onUpdate", function(event)    {
            this.testCartState.creditCard.creditCardNumber = event.detail.cardNumber;
            this.testCartState.creditCard.expireMonth = event.detail.expirationDateMonth;
            this.testCartState.creditCard.expireYear = event.detail.expirationDateYear;
            this.testCartState.creditCard.ccv = event.detail.cardCVC;
            console.log(this.testCartState)
        }.bind(this))
        
        subscribeToEvent("cartStateUpdated", function thisFreight(cartState) {
            this.testCartState.freightOption = cartState.chosenFreightOption;
        }.bind(this));
    }
}