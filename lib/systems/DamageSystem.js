import System from "./System";

const damageSystemCallback = entity => {
    entity.hp -= entity.deal;
    entity.deal = null;
}

export default class DamageSystem extends System {
    constructor(entities) {
        super(['deal'], null, entities, damageSystemCallback);
    }
}