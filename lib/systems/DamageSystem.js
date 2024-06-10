import System from "./System";

const damageSystemCallback = entity => {
    entity.health.amount -= entity.deal.amount;
    entity.deal = undefined;
}

export default class DamageSystem extends System {
    constructor(entities) {
        super(['deal'], null, entities, damageSystemCallback);
    }
}