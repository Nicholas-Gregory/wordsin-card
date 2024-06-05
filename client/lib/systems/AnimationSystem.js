import EventSystem from "../../../lib/systems/EventSystem";

export default class AnimationSystem extends EventSystem {
    constructor(needed, unwanted, entities, callback, events) {
        super(needed, unwanted, entities, callback, events);
    }
}