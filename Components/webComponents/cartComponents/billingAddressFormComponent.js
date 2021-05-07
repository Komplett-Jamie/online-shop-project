export class BillingAddress extends HTMLElement {
    constructor() {
        super();
        this.billingState = {
            fullName: null,
            email: null,
            street: null,
            addressLineTwo: null,
            postcode: null,
            phoneNumber: null,
            country: null,
            orderNotes: undefined,
        };
    }

    async connectedCallback() {
        this.innerHTML = `
        <div class="billing-details">
            Billing Address
            <div class="billing-details-container">
                <div id="billingAddressForm" class="billing-address-form">
                    <label for="name">Fullname</label>
                        <input 
                        data-log
                        required
                        id="fullName" 
                        type="text" 
                        name="name">
                    <label for="email">Email</label>
                        <input 
                        data-log
                        required
                        id="email" 
                        type="email" 
                        name="email">
                    <label for="address">Street</label>
                        <input 
                        data-log
                        required
                        id="street" 
                        type="text" 
                        name="address">
                    <label for="addressLineTwo">Address line 2 (City/Town)</label>
                        <input 
                        data-log
                        required
                        id="addressLineTwo" 
                        type="text" 
                        name="addressLineTwo">
                    <label for="postcode">Postcode</label>
                        <input 
                        data-log
                        required
                        max="4" 
                        id="postcode" 
                        type="text" 
                        name="postcode">
                    <label for="phoneNumber">Phone Number</label>
                        <input 
                        data-log
                        required
                        id="phoneNumber" 
                        type="tel" 
                        name="phoneNumber">
                        <label for="country">Country</label>
                    <select id="country" name="country" required data-log>
                        <option  value="" disabled selected>Country of residence</option>
                    </select>
                    <br>
                    <label for="orderNotes">Order info / delivery messages</label>
                        <textarea
                        data-log
                        name="orderNotes"
                        id="orderNotes"
                        ></textarea>
                </div>
            </div>
        </div>
        `;

        let countryList = await this.loadCountryList();
        this.renderCountryList(countryList);

        let logMe = this.querySelectorAll("[data-log]");

        for (let item of logMe) {
            item.addEventListener(
                "focusout",
                function (event) {
                    this.billingState[event.target.id] = event.target.value;
                    this.dispatchEvent(
                        new CustomEvent("onUpdate", {
                            detail: this.billingState,
                            bubbles: false,
                        })
                    );
                }.bind(this),
                false
            );
        }
    }

    async loadCountryList() {
        let url = "https://restcountries.eu/rest/v2/all";
        let apiFetch = await fetch(url);
        let response = await apiFetch.json();
        return await response;
    }

    renderCountryList(response) {
        let htmlContainer = this.querySelector("#country");
        for (var i = 0; i < response.length; i++) {
            htmlContainer.innerHTML += `
            <option value="${response[i].name}">${response[i].name}</option>
            `;
        }
    }
}
