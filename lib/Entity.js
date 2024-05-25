export default class Entity {
    constructor(state, callbacks) {
        this.state = state || {};
        this.callbacks = callbacks || {};
    }

    setState(property, value) {
        this.state[property] = value;
        
        if (this.callbacks[property]) {
            this.callbacks[property](this.state);
        }
    }

    getState(property) {
        return this.state[property];
    }
}