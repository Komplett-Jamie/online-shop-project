const eventBus = new EventTarget();

function publishEvent(eventName, payload = {}) {
    console.log("Event:", eventName, payload);
    eventBus.dispatchEvent(new CustomEvent(eventName, { detail: payload }))
}

function subscribeToEvent(eventName, eventHandler) {
    eventBus.addEventListener(eventName, event => eventHandler(event.detail));
}