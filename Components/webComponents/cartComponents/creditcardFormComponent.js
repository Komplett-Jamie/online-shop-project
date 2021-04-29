export class CreditcardForm extends HTMLElement {
    constructor()   {
        super();

        this.creditcardDetails = {
            cardNumber: null,
            expirationDateMonth: null,
            expirationDateYear: null,
            cardCVC: null,
        }
    }

    connectedCallback() {
        this.innerHTML = 
        `
        <div class="card-details">
            Credit Card Details
            <div class="credit-card-details-container">
                <div id="creditCardForm" class="creditcard-form">
                    <label for="cardNumber">Credit Card Number</label>
                        <input 
                        data-log
                        id="cardNumber" 
                        type="tel" 
                        inputmode="numeric" 
                        autocomplete="cc-number" 
                        maxlength="19" 
                        placeholder="xxxx-xxxx-xxxx-xxxx">
                        <br>
                        <span id="cardNumberErrorMessage"></span>
                        <br>
                        <label>Expiration Date</label>
                    <select name='expirationDateMonth' id='expirationDateMonth' data-log>
                        <option value=''>Month</option>
                        <option value='01'>January</option>
                        <option value='02'>February</option>
                        <option value='03'>March</option>
                        <option value='04'>April</option>
                        <option value='05'>May</option>
                        <option value='06'>June</option>
                        <option value='07'>July</option>
                        <option value='08'>August</option>
                        <option value='09'>September</option>
                        <option value='10'>October</option>
                        <option value='11'>November</option>
                        <option value='12'>December</option>
                    </select> 
                    <label for="expirationDateYear">Year</label>
                    <select name='expirationDateYear' id='expirationDateYear' data-log>
                        <option value=''>Year</option>
                        <option value='2020'>2020</option>
                        <option value='2021'>2021</option>
                        <option value='2022'>2022</option>
                        <option value='2023'>2023</option>
                        <option value='2024'>2024</option>
                    </select> 
                    <br>
                    <span id="cardDateErrorMessage"></span>
                    <br>
                    <label for="cardCVC">CVC</label>
                        <input 
                        data-log
                        required
                        placeholder="xxx"
                        id="cardCVC" 
                        type="number"
                        name="cardCVC"
                        maxlength = "3"
                        oninput="this.value=this.value.slice(0,this.maxLength)">
                        <br>
                        <span id="cardCvcErrorMessage"></span>
                        <br>
                </div>
            </div>
        </div>
        `

    let logMe = this.querySelectorAll('[data-log]');

    for (let item of logMe) {
        item.addEventListener('focusout', function(event) {
            this.creditcardDetails[event.target.id] = event.target.value;
                console.log(this.creditcardDetails)
                this.dispatchEvent(new CustomEvent("onUpdate", { detail: this.creditcardDetails, bubbles: false }));
        }.bind(this), false);
    }}
}
