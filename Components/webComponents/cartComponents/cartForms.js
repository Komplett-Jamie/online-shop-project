export class CartForms extends HTMLElement {
    constructor() {
        super();
        this.testCartState = {
            address: {
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
        };
    }

    connectedCallback() {
        this.innerHTML = `
        <form>
        <billing-address></billing-address>
        <creditcard-details></creditcard-details>
        <freight-options></freight-options>
        <cart-button></cart-button>
        </form>
        `;

        this.querySelector("billing-address").addEventListener(
            "onUpdate",
            function (event) {
                this.testCartState.address.city = event.detail.addressLineTwo;
                this.testCartState.address.country = event.detail.country;
                this.testCartState.address.street = event.detail.street;
            }.bind(this)
        );

        this.querySelector("creditcard-details").addEventListener(
            "onUpdate",
            function (event) {
                this.testCartState.creditCard.creditCardNumber =
                    event.detail.cardNumber;
                this.testCartState.creditCard.expireMonth =
                    event.detail.expirationDateMonth;
                this.testCartState.creditCard.expireYear =
                    event.detail.expirationDateYear;
                this.testCartState.creditCard.ccv = event.detail.cardCVC;
            }.bind(this)
        );

        subscribeToEvent(
            "cartStateUpdated",
            function thisFreight(cartState) {
                this.testCartState.freightOption =
                    cartState.chosenFreightOption;
            }.bind(this)
        );

        this.querySelector("form").addEventListener(
            "onsubmit",
            async function () {
                let cartApi = new CartApi();
                let response = await cartApi.confirmPurchases(
                    JSON.stringify(this.testCartState)
                );
                publishEvent("responseFromCheckout", await response.json());
            }.bind(this)
        );
    }
}
subscribeToEvent("responseFromCheckout", function (data) {
    let creditcardNumberWarning = this.querySelector("#cardNumberErrorMessage");
    let creditcardDateWarning = this.querySelector("#cardDateErrorMessage");
    let creditcardCvcWarning = this.querySelector("#cardCvcErrorMessage");

    if (data.errors.hasOwnProperty("CreditCard.ExpireYear")) {
        creditcardDateWarning.innerText +=
            data.errors["CreditCard.ExpireYear"][0];
    }
    if (data.errors.hasOwnProperty("CreditCard.CCV")) {
        creditcardCvcWarning.innerText += data.errors["CreditCard.CCV"][0];
    }
    if (data.errors.hasOwnProperty("CreditCard.CreditCardNumber")) {
        creditcardNumberWarning.innerText +=
            data.errors["CreditCard.CreditCardNumber"][0];
    }
});
