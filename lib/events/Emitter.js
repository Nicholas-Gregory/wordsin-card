export default class Emitter {
    constructor(listeners) {
        this.listeners = listeners || [];
    }

    subscribe(listener) {
        this.listeners.push(listener);
    }

    unsubscribe(listener) {
        this.listeners.filter(l => l !== listener);
    }

    emit(eventType, ...args) {
        for (let listener of this.listeners.filter(l => l.eventType === eventType)) {
            listener.update(...args);
        }
    }
}