export default class Listener {
    constructor(eventType, callback) {
        this.eventType = eventType;
        this.callback = callback;
    }

    update(...args) {
        this.callback(...args);
    }
}