import EventSystem from "../../../lib/systems/EventSystem";

const needed = [
    'animations'
];

function animationSystemCallback(entity, event, app) {
    if (entity.animations[event]) {
        for (let animationName of entity.animations[event].remove) {
            app.ticker.remove(entity[animationName]);
        }

        for (let animationName of entity.animations[event].add) {
            app.ticker.add(entity[animationName]);
        }
    }
};

export default class AnimationSystem extends EventSystem {
    constructor(entities) {
        const events = [];

        for (let entity of entities) {
            for (let event of Object.keys(entity.animations)) {
                if (!events.includes(event)) events.push(event);
            }
        }

        super(needed, null, entities, animationSystemCallback, events);
    }
}