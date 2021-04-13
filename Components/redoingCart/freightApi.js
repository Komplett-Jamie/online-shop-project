subscribeToEvent("pageLoad", async function freightOptions() {
    let freightOptions = new FreightOptions();
    let response = await freightOptions.getFreightOptions()
    publishEvent("freightOptions", await response.json());
})

subscribeToEvent("freightOptionSelected", async function chosenFreightOption(freightName)  {
    let cartApi = new CartApi()
    await cartApi.freightOptionSelection(freightName);
})