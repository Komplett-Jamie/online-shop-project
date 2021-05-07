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
    }

    renderFreightOptions(freightOptions, selectedFreightOption) {
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
            freightInput.checked = freightOption.name === selectedFreightOption;

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

            freightInput.addEventListener("click", function () {
                publishEvent("freightOptionSelected", freightOption.name);
                console.log(freightName);
            });
        }
    }
}
