import Emitter from "../events/Emitter";
import Listener from "../events/Listener";
import System from "./System";

export default class EventSystem extends System {
    constructor(needed, unwanted, entities, callback, events) {
        super(needed, unwanted, entities, callback);

        this.events = events;
        this.listeners = [];
        this.emitter = new Emitter(this.listeners);
        this.initEvents();
    }

    initEvents() {
        for (let event of this.events) {
            this.listeners.push(new Listener(event, this.process.bind(this)));
        }
    }

    registerEvent(event) {
        this.events.push(event);
        this.initEvents();
    }
}