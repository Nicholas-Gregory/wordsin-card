const getTargetModifiers = (target, amount) => {

};

const getCasterModifiers = (caster, amount) => {

};

const applyModifiers = (caster, target, effect, component) => getCasterModifiers(caster, getTargetModifiers(target, effect[component]));

const effectApplicationSystemCallback = (effect, casterSystem, targetSystem) => {
    const component = effect.component;
    const caster = casterSystem.getEntityById(effect.casterId);
    const target = targetSystem.getEntityById(effect.targetId);
    const amount = applyModifiers(caster, target, effect, component);

    if (!effect.modifier) {
        // We are setting a component
        target[component] = amount;
    } else {
        // We are modifying a component
        const modifierName = effect.modifier;
        
        if (modifierName === 'add') {
            target[component] += amount;
        } else if (modifierName === 'subtract') {
            target[component] -= amount;
        } else if (modifierName === 'multiply') {
            target[component] *= amount;
        } else if (modifierName === 'divide') {
            target[component] /= amount;
        }
    } 
};

export default class EffectApplicationSystem extends System {
    constructor(entities) {
        super(['targetId', 'casterId'], null, entities, effectApplicationSystemCallback);
    }
}