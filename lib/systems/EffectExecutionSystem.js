const getCasterHealthScaling = (health, amount) => amount + health;

const getCasterGritScaling = (grit, amount) => grit + amount;

const getCasterSpeedScaling = (speed, amount) => speed + amount;

const getCasterStrengthScaling = (strength, amount) => strength + amount;

const getCasterCraftScaling = (craft, amount) => craft + amount;

const getCasterMindScaling = (mind, amount) => mind + amount;

const executeModifier = (target, effect, mind) => {
    const { action, keyword, amount } = effect;

    if (['heal', 'defend', 'strike', 'slice', 'stab', 'set', 'add', 'subtract', 'multiply', 'divide'].includes(keyword)) {
        if (action === 'set') {
            target.amount = amount;
        } else if (action === 'add') {
            target.amount += getCasterMindScaling(mind, amount);
        } else if (action === 'subtract') {
            target.amount -= getCasterMindScaling(mind, amount);
        } else if (action === 'multiply') {
            target.amount *= getCasterMindScaling(mind, amount);
        } else if (action === 'divide') {
            target.amount = Math.floor(target.amount / getCasterMindScaling(mind, amount));
        }
    }
};

const effectExecutionSystemCallback = (effect, casterSystem, targetSystem) => {
    const target = targetSystem.getEntityById(effect.targetId);
    const caster = casterSystem.getEntityById(effect.casterId);
    const { action, amount, status } = effect;

    if (action === 'heal') {
        target.hp += getCasterHealthScaling(caster.health, amount);
    } else if (action === 'defend') {
        target.shield += getCasterGritScaling(caster.grit, amount);
    } else if (action === 'dodge') {
        target.dodge += amount * getCasterSpeedScaling(caster.speed, amount);
    } else if (action === 'strike' || action === 'slice' || action === 'stab') {
        target.hp -= (amount * getCasterStrengthScaling(caster.strength, amount)) / getTargetResistance(target, action);
    } else if (action === 'apply') {
        target.status[status] = getCasterCraftScaling(caster.craft, amount);
    } else if (action === 'set' || action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
        executeModifier(target, effect, caster.mind);
    }
}

export default class EffectExecutionSystem extends System {
    constructor(entities) {
        super(['targetId', 'casterId'], null, entities, effectExecutionSystemCallback);
    }
}