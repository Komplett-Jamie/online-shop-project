subscribeToEvent("cartStateUpdated", function(state)    {
    renderFreightOptions(state.freightOptions, state.chosenFreightOption )
})

function renderFreightOptions(freightOptions, selectedFreightOption) {
    let renderContainer = document.getElementById("cart-freight-options");
    renderContainer.innerHTML = "";
    for(var i = 0; i < freightOptions.length; i++)    {
        let freightOption = freightOptions[i]
        let freightName;

        if (freightOption.name === 'PickupInStore')   {
            freightName = "Pick Up in Store"
        } else if (freightOption.name === 'Porterbuddy')  {
            freightName = "Porterbuddy"
        } else if (freightOption.name === 'PickupPoint')  {
            freightName = "Pickup Point Oslo / Sandefjord"
        } else if (freightOption.name === 'Letter')    {
            freightName = "Letter"
        }
        renderContainer.innerHTML +=
        `
            <li>
            <input ${freightOption.name === selectedFreightOption ? "checked" : ""} onclick="freightOptionChoice('${freightOption.name}')" name="radio-input" class="radio-input" type="radio" id="${freightOption.name}" value="${freightOption.name}-radio-value">
            <label class="radio-label" for="${freightOption.name}"><span>${freightName}:</span> ${freightOption.price},-</label>
            </li>
        `
    }
}

function freightOptionChoice(freightName)  {
    publishEvent("freightOptionSelected", freightName)
};

