const effectApplicationSystemCallback = (effect, targetSystem) => {
    const component = effect.component;
    const target = targetSystem.getEntityById(effect.targetId);
    const amount = effect.amount;

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