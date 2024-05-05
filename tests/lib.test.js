import { describe, it } from "node:test";
import assert from 'node:assert';
import EffectText from "../lib/EffectText.js";

describe('Class: EffectText;', () => {
    // #region Reports
    it('reports sweeper properties', () => {
        const destroyObjects = new EffectText('Destroy all objects');
        assert.strictEqual(destroyObjects.getSweeperAction(), 'destroy');
        assert.strictEqual(destroyObjects.getSweeperTarget(), 'objects');

        const killAllies = new EffectText('Kill all allies');
        assert.strictEqual(killAllies.getSweeperAction(), 'kill');
        assert.strictEqual(killAllies.getSweeperTarget(), 'allies');

        const killEnemies = new EffectText('Kill all enemies');
        assert.strictEqual(killEnemies.getSweeperAction(), 'kill');
        assert.strictEqual(killEnemies.getSweeperTarget(), 'enemies');

        const killCharacters = new EffectText('Kill all characters');
        assert.strictEqual(killCharacters.getSweeperAction(), 'kill');
        assert.strictEqual(killCharacters.getSweeperTarget(), 'characters');

        const counterSpells = new EffectText('Counter all spells');
        assert.strictEqual(counterSpells.getSweeperAction(), 'counter');
        assert.strictEqual(counterSpells.getSweeperTarget(), 'spells');

        const counterEffects = new EffectText('Counter all effects');
        assert.strictEqual(counterEffects.getSweeperAction(), 'counter');
        assert.strictEqual(counterEffects.getSweeperTarget(), 'effects');

        const counterOffensiveEffects = new EffectText('Counter all offensive effects');
        assert.strictEqual(counterOffensiveEffects.getSweeperAction(), 'counter');
        assert.strictEqual(counterOffensiveEffects.getSweeperTarget(), 'offensive effects');

        const counterDefensiveEffects = new EffectText('Counter all defensive effects');
        assert.strictEqual(counterDefensiveEffects.getSweeperAction(), 'counter');
        assert.strictEqual(counterDefensiveEffects.getSweeperTarget(), 'defensive effects');

        const counterUtilityEffects = new EffectText('Counter all utility effects');
        assert.strictEqual(counterUtilityEffects.getSweeperAction(), 'counter');
        assert.strictEqual(counterUtilityEffects.getSweeperTarget(), 'utility effects');
    });

    it('reports amounts', () => {
        assert.strictEqual(new EffectText('Deal 5 to independent target character').getAmount(), 5);
        assert.strictEqual(new EffectText('Heal 3 for independent target character').getAmount(), 3);
        assert.strictEqual(new EffectText('Increase damage 2 for independent target offensive effect').getAmount(), 2);
        assert.strictEqual(new EffectText('Decrease damage 1 for independent target offensive effect').getAmount(), 1);
        assert.strictEqual(new EffectText('Increase heal 5 for independent target defensive effect').getAmount(), 5);
        assert.strictEqual(new EffectText('Decrease heal 6 for independent target defensive effect').getAmount(), 6);
        assert.strictEqual(new EffectText('Set damage 1 for independent target offensive effect').getAmount(), 1);
        assert.strictEqual(new EffectText('Set heal 10 for independent target defensive effect').getAmount(), 10);
    });

    it('reports instructions', () => {
        assert.strictEqual(new EffectText('Deal 5 to independent target character').getInstruction(), 'deal');
        assert.strictEqual(new EffectText('Heal 3 for independent target character').getInstruction(), 'heal');
        assert.strictEqual(new EffectText('Increase damage 2 for independent target offensive effect').getInstruction(), 'increase damage');
        assert.strictEqual(new EffectText('Decrease damage 1 for independent target offensive effect').getInstruction(), 'decrease damage');
        assert.strictEqual(new EffectText('Increase heal 5 for independent target defensive effect').getInstruction(), 'increase heal');
        assert.strictEqual(new EffectText('Decrease heal 6 for independent target defensive effect').getInstruction(), 'decrease heal');
        assert.strictEqual(new EffectText('Set damage 1 for independent target offensive effect').getInstruction(), 'set damage');
        assert.strictEqual(new EffectText('Set heal 10 for independent target defensive effect').getInstruction(), 'set heal');
        assert.strictEqual(new EffectText('Increase wellness 3 for independent target character for 2 turns').getInstruction(), 'increase');
        assert.strictEqual(new EffectText('Decrease wellness 3 for independent target character for 2 turns').getInstruction(), 'decrease');
        assert.strictEqual(new EffectText('Set wellness 10 for independent target character for 2 turns').getInstruction(), 'set');
    });

    it('reports words', () => {
        assert.deepStrictEqual(new EffectText('Apply burn to independent target object').getWords(), ['burn']);
        assert.deepStrictEqual(new EffectText('Apply cold, wet to independent target object').getWords(), ['cold', 'wet']); 
    });

    it('reports stat properties', () => {
        const increaseStat = new EffectText('Increase wellness 3 for independent target character for 2 turns');
        assert.strictEqual(increaseStat.getStat(), 'wellness');
        assert.strictEqual(increaseStat.getStatAmount(), 3);

        const decreaseStat = new EffectText('Decrease wellness 3 for independent target character for 2 turns');
        assert.strictEqual(decreaseStat.getStat(), 'wellness');
        assert.strictEqual(decreaseStat.getStatAmount(), 3);

        const setStat = new EffectText('Set wellness 10 for independent target character for 2 turns');
        assert.strictEqual(setStat.getStat(), 'wellness');
        assert.strictEqual(setStat.getStatAmount(), 10);
    });

    it('reports target properties', () => {
        // Independent
        const independentCharacter = new EffectText('Deal 2 to independent target character');
        assert.strictEqual(independentCharacter.getTargetClass(), 'character');
        assert.strictEqual(independentCharacter.getTargetType(), 'independent');

        const independentEnemy = new EffectText('Deal 2 to independent target enemy');
        assert.strictEqual(independentEnemy.getTargetClass(), 'enemy');
        assert.strictEqual(independentEnemy.getTargetType(), 'independent');

        const independentAlly = new EffectText('Heal 2 for independent target ally');
        assert.strictEqual(independentAlly.getTargetClass(), 'ally');
        assert.strictEqual(independentAlly.getTargetType(), 'independent');

        const independentObject = new EffectText('Apply burn to independent target object');
        assert.strictEqual(independentObject.getTargetClass(), 'object');
        assert.strictEqual(independentObject.getTargetType(), 'independent');

        const independentSpell = new EffectText('Counter independent target spell');
        assert.strictEqual(independentSpell.getTargetClass(), 'spell');
        assert.strictEqual(independentSpell.getTargetType(), 'independent');

        const independentEffect = new EffectText('Set damage 1 for independent target effect');
        assert.strictEqual(independentEffect.getTargetClass(), 'effect');
        assert.strictEqual(independentEffect.getTargetType(), 'independent');

        const independentOffensiveEffect = new EffectText('Set damage 1 for independent target offensive effect');
        assert.strictEqual(independentOffensiveEffect.getTargetClass(), 'offensive effect');
        assert.strictEqual(independentOffensiveEffect.getTargetType(), 'independent');

        const independentDefensiveEffect = new EffectText('Set damage 1 for independent target defensive effect');
        assert.strictEqual(independentDefensiveEffect.getTargetClass(), 'defensive effect');
        assert.strictEqual(independentDefensiveEffect.getTargetType(), 'independent');

        const independentUtilityEffect = new EffectText('Set damage 1 for independent target utility effect');
        assert.strictEqual(independentUtilityEffect.getTargetClass(), 'utility effect');
        assert.strictEqual(independentUtilityEffect.getTargetType(), 'independent');

        // Card
        const cardCharacter = new EffectText("Deal 2 to card's target character");
        assert.strictEqual(cardCharacter.getTargetClass(), "character");
        assert.strictEqual(cardCharacter.getTargetType(), "card");

        const cardEnemy = new EffectText("Deal 2 to card's target enemy");
        assert.strictEqual(cardEnemy.getTargetClass(), "enemy");
        assert.strictEqual(cardEnemy.getTargetType(), "card");

        const cardAlly = new EffectText("Heal 2 for card's target ally");
        assert.strictEqual(cardAlly.getTargetClass(), "ally");
        assert.strictEqual(cardAlly.getTargetType(), "card");

        const cardObject = new EffectText("Apply burn to card's target object");
        assert.strictEqual(cardObject.getTargetClass(), "object");
        assert.strictEqual(cardObject.getTargetType(), "card");

        const cardSpell = new EffectText("Counter card's target spell");
        assert.strictEqual(cardSpell.getTargetClass(), "spell");
        assert.strictEqual(cardSpell.getTargetType(), "card");

        const cardEffect = new EffectText("Set damage 1 for card's target effect");
        assert.strictEqual(cardEffect.getTargetClass(), "effect");
        assert.strictEqual(cardEffect.getTargetType(), "card");

        const cardOffensiveEffect = new EffectText("Set damage 1 for card's target offensive effect");
        assert.strictEqual(cardOffensiveEffect.getTargetClass(), "offensive effect");
        assert.strictEqual(cardOffensiveEffect.getTargetType(), "card");

        const cardDefensiveEffect = new EffectText("Set damage 1 for card's target defensive effect");
        assert.strictEqual(cardDefensiveEffect.getTargetClass(), "defensive effect");
        assert.strictEqual(cardDefensiveEffect.getTargetType(), "card");

        const cardUtilityEffect = new EffectText("Set damage 1 for card's target utility effect");
        assert.strictEqual(cardUtilityEffect.getTargetClass(), "utility effect");
        assert.strictEqual(cardUtilityEffect.getTargetType(), "card");
    });

    it('reports time modifier properties', () => {
        const exchangeTimeModifier = new EffectText('Increase wellness 3 for independent target character for 3 more exchanges');
        assert.strictEqual(exchangeTimeModifier.getTimeModifierAmount(), 3);
        assert.strictEqual(exchangeTimeModifier.getTimeModifierType(), 'exchanges');

        const turnTimeModifier = new EffectText('Increase wellness 3 for independent target character for 3 more turns');
        assert.strictEqual(turnTimeModifier.getTimeModifierAmount(), 3);
        assert.strictEqual(turnTimeModifier.getTimeModifierType(), 'turns');
    });

    it('reports second order effect properties', () => {
        const insertOneIndependentSecondOrder = new EffectText('Insert "Counter independent target spell" into independent target card');
        assert.strictEqual(insertOneIndependentSecondOrder.getSecondOrderType(), 'insert');
        assert.deepStrictEqual(insertOneIndependentSecondOrder.getSecondOrderEffects(), ['Counter independent target spell']);
        assert.strictEqual(insertOneIndependentSecondOrder.getSecondOrderTargetType(), 'independent');

        const insertOneCardSecondOrder = new EffectText(`Insert "Counter independent target spell" into card's target card`);
        assert.strictEqual(insertOneCardSecondOrder.getSecondOrderType(), 'insert');
        assert.deepStrictEqual(insertOneCardSecondOrder.getSecondOrderEffects(), ['Counter independent target spell']);
        assert.strictEqual(insertOneCardSecondOrder.getSecondOrderTargetType(), 'card');

        const insertManyIndependentSecondOrder = new EffectText('Insert "Counter independent target spell", "Destroy all objects" into independent target card');
        assert.strictEqual(insertManyIndependentSecondOrder.getSecondOrderType(), 'insert');
        assert.deepStrictEqual(insertManyIndependentSecondOrder.getSecondOrderEffects(), ['Counter independent target spell', "Destroy all objects"]);
        assert.strictEqual(insertManyIndependentSecondOrder.getSecondOrderTargetType(), 'independent');

        const insertManycardSecondOrder = new EffectText(`Insert "Counter card's target spell", "Destroy all objects" into card's target card`);
        assert.strictEqual(insertManycardSecondOrder.getSecondOrderType(), 'insert');
        assert.deepStrictEqual(insertManycardSecondOrder.getSecondOrderEffects(), ["Counter card's target spell", "Destroy all objects"]);
        assert.strictEqual(insertManycardSecondOrder.getSecondOrderTargetType(), 'card');
    });
    // #endregion

    // #region Setters

    it('sets sweeper properties', () => {
        const sweeperEffect = new EffectText('Kill all allies');
        sweeperEffect.setSweeperAction('destroy');
        assert.strictEqual(sweeperEffect.getSweeperAction(), 'destroy');

        sweeperEffect.setSweeperTarget('objects');
        assert.strictEqual(sweeperEffect.getSweeperTarget(), 'objects');
    });

    it('sets instruction', () => {
        const effect = new EffectText('Deal 2 to independent target ally');
        effect.setInstruction('heal');
        assert.strictEqual(effect.text, 'Heal 2 for independent target ally');
    });

    it('sets amount', () => {
        assert.strictEqual(
            new EffectText('Deal 2 to independent target enemy')
            .setAmount(3)
            .getAmount(), 3
        );
    });

    it('sets words', () => {
        assert.deepStrictEqual(
            new EffectText('Apply burn to independent target object')
            .setWords(['wet', 'cold'])
            .getWords(), ['wet', 'cold']
        );
    });

    it('sets stat', () => {
        assert.strictEqual(
            new EffectText('Increase wellness 3 for independent target character')
            .setStat('awareness')
            .getStat(), 'awareness'
        );
    });

    it('sets stat amount', () => {
        assert.strictEqual(
            new EffectText('Increase wellness 3 for independent target character')
            .setStatAmount(9)
            .getStatAmount(), 9
        )
    });

    it('sets target type', () => {
        assert.strictEqual(
            new EffectText('Deal 2 to independent target character')
            .setTargetType('card')
            .getTargetType(), 'card'
        );
    });

    it('sets target class', () => {
        assert.strictEqual(
            new EffectText('Deal 2 to independent target ally')
            .setTargetClass('enemy')
            .getTargetClass(), 'enemy'
        );
    });

    it('sets time modifier amount', () => {
        assert.strictEqual(
            new EffectText('Set wellness 10 for independent target character for 1 more turns')
            .setTimeModifierAmount(3)
            .getTimeModifierAmount(), 3
        );
    })

    // #endregion
});