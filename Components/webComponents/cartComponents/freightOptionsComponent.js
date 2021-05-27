import { FreightOptionsApi } from "../../../API/freightOptionsApi.js";

export class FreightOptions extends HTMLElement {
    constructor() {
        super();
        
        this.selectedFreightOption = null;
        this.freightOptions = [];
        
        this.freightNames = {
            PickupInStore: "Pick Up in Store",
            Porterbuddy: "Porterbuddy",
            PickupPoint: "Pickup Point Oslo / Sandefjord",
            Letter: "Letter",
        }
    }

    async connectedCallback() {
        this.innerHTML = `
        <div id="cart-freight-options">
            <span>Freight Options</span>
            <br>          
        </div>
        `;

        const freightOptions = new FreightOptionsApi();
        this.freightOptions = await freightOptions.getFreightOptions();

        this.render();
    }

    static get observedAttributes() {
        return [ "selectedfreightoption" ];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "selectedfreightoption") {
            this.selectedFreightOption = newValue;
            this.render();
        }
    }

    render() {
        let renderContainer = this.querySelector("#cart-freight-options");
        renderContainer.innerHTML = "";
        for (let i = 0; i < this.freightOptions.length; i++) {
            const freightOption = this.freightOptions[i];
            const freightName = this.freightNames[freightOption.name];
            const freightInput = document.createElement("input");
            freightInput.setAttribute("name", "radio-input");
            freightInput.setAttribute("class", "radio-input");
            freightInput.setAttribute("type", "radio");
            freightInput.setAttribute("id", freightOption.name);
            freightInput.setAttribute("value", freightOption.name);
            freightInput.checked = freightOption.name === this.selectedFreightOption;

            const listItem = document.createElement("li");
            const freightLabel = document.createElement("label");
            freightLabel.setAttribute("class", "radio-label");
            freightLabel.setAttribute("for", freightOption.name);
            
            freightLabel.innerHTML = `${freightName}: ${freightOption.price},-`;
            renderContainer.appendChild(listItem);
            listItem.appendChild(freightInput);
            listItem.appendChild(freightLabel);

            freightInput.addEventListener("click", async function () {
                this.dispatchEvent(
                  new CustomEvent("onFreightOptionSelected", {
                      detail: freightOption,
                      bubbles: true
                  })
                );
            });
        }
    }
}
