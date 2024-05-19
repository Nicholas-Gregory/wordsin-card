export default class AnimationManager {
    constructor(app, renderer, events) {
        this.app = app;
        this.renderer = renderer;
        this.events = events;
        this.callbacks = {};

        this
        .initCallbacks()
        .initEvents()
    }

    initCallbacks() {
        for (let eventName of Object.keys(this.events)) {
            for (let actionName of Object.keys(this.events[eventName])) {
                const actionValue = this.events[eventName][actionName];
                
                if (Array.isArray(actionValue)) {
                    for (let methodName of actionValue) {
                        this.callbacks[methodName] = time => this.renderer[methodName](time);
                    }
                } else {
                    this.callbacks[actionValue] = time => this.renderer[actionValue](time);
                }
            }
        }

        return this;
    }

    initEvents() {
        for (let eventName of Object.keys(this.events)) {
            this.renderer.on(eventName, event => {
                const addValue = this.events[eventName].add || [];
                const removeValue = this.events[eventName].remove || [];
                const addArray = Array.isArray(addValue) ? addValue : [addValue];
                const removeArray = Array.isArray(removeValue) ? removeValue : [removeValue];

                addArray.forEach(methodName => {
                    this.app.ticker.remove(this.callbacks[methodName]);
                    this.app.ticker.add(this.callbacks[methodName]);
                });

                removeArray.forEach(methodName => {
                    this.app.ticker.remove(this.callbacks[methodName]);
                });
            })
        }

        return this;
    }
}