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

        subscribeToEvent(
            "cartStateUpdated",
            function (state) {
                this.renderFreightOptions(
                    state.freightOptions,
                    state.chosenFreightOption
                );
            }.bind(this)
        );

        this.querySelector("#cart-freight-options").addEventListener(
            "click",
            function () {
                publishEvent("freightOptionSelected", this.freightName);
                console.log(freightName);
            }.bind(this)
        );
    }

    renderFreightOptions(freightOptions, selectedFreightOption) {
        let renderContainer = this.querySelector("#cart-freight-options");
        renderContainer.innerHTML = "";
        for (var i = 0; i < freightOptions.length; i++) {
            let freightOption = freightOptions[i];
            let freightName;

            if (freightOption.name === "PickupInStore") {
                freightName = "Pick Up in Store";
            } else if (freightOption.name === "Porterbuddy") {
                freightName = "Porterbuddy";
            } else if (freightOption.name === "PickupPoint") {
                freightName = "Pickup Point Oslo / Sandefjord";
            } else if (freightOption.name === "Letter") {
                freightName = "Letter";
            }
            renderContainer.innerHTML += `
                <li>
                <input ${
                    freightOption.name === selectedFreightOption
                        ? "checked"
                        : ""
                } name="radio-input" class="radio-input" type="radio" id="${
                freightOption.name
            }" value="${freightOption.name}-radio-value" data-log>
                <label class="radio-label" for="${
                    freightOption.name
                }"><span>${freightName}:</span> ${freightOption.price},-</label>
                </li>
            `;
        }
    }
}
