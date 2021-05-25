import { FreightOptionsApi } from "./../../../API/FreightOptionsApi.js";
import { CartApi } from "./../../../API/CartApi.js";

export class FreightOptions extends HTMLElement {
    constructor() {
        super();

        this.freightChoice = {
            freight: cartState.chosenFreightOption,
        };
    }

    async connectedCallback() {
        this.innerHTML = `
        <div id="cart-freight-options">
            <span>Freight Options</span>
            <br>          
        </div>
        `;

        let cartFreightApi = new CartApi();
        let cartFreightResponse = await cartFreightApi.fetchCart();
        console.log(cartFreightResponse.selectedFreightOption);

        let freightOptions = new FreightOptionsApi();
        let response = await freightOptions.getFreightOptions();
        let freightOptionsReturn = await response.json();

        this.renderFreightOptions(freightOptionsReturn, cartFreightResponse);
    }

    renderFreightOptions(freightOptions, cartFreightResponse) {
        let renderContainer = this.querySelector("#cart-freight-options");
        renderContainer.innerHTML = "";
        for (var i = 0; i < freightOptions.length; i++) {
            let freightOption = freightOptions[i];
            let freightName;
            let freightInput = document.createElement("input");
            freightInput.setAttribute("name", "radio-input");
            freightInput.setAttribute("class", "radio-input");
            freightInput.setAttribute("type", "radio");
            freightInput.setAttribute("id", freightOption.name);
            freightInput.setAttribute("value", freightOption.name);
            freightInput.checked =
                freightOption.name ===
                cartFreightResponse.selectedFreightOption;

            let listItem = document.createElement("li");
            let freightLabel = document.createElement("label");
            freightLabel.setAttribute("class", "radio-label");
            freightLabel.setAttribute("for", freightOption.name);

            if (freightOption.name === "PickupInStore") {
                freightName = "Pick Up in Store";
            } else if (freightOption.name === "Porterbuddy") {
                freightName = "Porterbuddy";
            } else if (freightOption.name === "PickupPoint") {
                freightName = "Pickup Point Oslo / Sandefjord";
            } else if (freightOption.name === "Letter") {
                freightName = "Letter";
            }

            freightLabel.innerHTML = `${freightName}: ${freightOption.price},-`;
            renderContainer.appendChild(listItem);
            listItem.appendChild(freightInput);
            listItem.appendChild(freightLabel);

            freightInput.addEventListener("click", async function () {
                let cartApi = new CartApi();
                await cartApi.freightOptionSelection(freightName);
                // publishEvent("freightOptionSelected", freightOption.name);
                // console.log(freightName);
            });
        }
    }
}
