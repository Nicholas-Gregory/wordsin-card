export default class StateEntity {
    constructor(state) {
        this.state = state || {};
    }

    getState(property) {
        return this.state[property];
    }

    setState(property, value) {
        this.state[property] = value;
    }
}