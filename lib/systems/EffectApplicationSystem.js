import System from "./System";

const applyModifier = (modifier, amount, target, component) => {
    if (modifier === 'add') {
        target[component] = { ...target[component], amount };
    } else if (modifier === 'subtract') {
        target[component] = { ...target[component], amount };
    } else if (modifier === 'multiply') {
        target[component] = { ...target[component], amount };
    } else if (modifier === 'divide') {
        target[component] = { ...target[component], amount };
    } else {
        target[component] = { ...target[component], amount };
    }
};

const effectApplicationSystemCallback = (effect, targetSystem) => {
    const component = effect.component;
    const target = targetSystem.getEntityById(effect.targetId);
    const amount = effect[component].amount;
    const modifier = effect.modifier?.action;
    console.log(effect)

    if (['add', 'subtract', 'multiply', 'divide'].includes(component)) {
        applyModifier(modifier, amount, target, 'modifier');
    } else {
        applyModifier(modifier, amount, target, component);
    }
};

export default class EffectApplicationSystem extends System {
    constructor(entities) {
        super(['targetId'], null, entities, effectApplicationSystemCallback);
    }
}