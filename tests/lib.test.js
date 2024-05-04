import { describe, it } from "node:test";

import Timeline from "../lib/Timeline.js";
import * as assert from "node:assert";
import Effect from "../lib/Effect.js";

describe('Effect tests', () => {
    it('reports amount correctly', () => {
        const damageEffect = new Effect('Deal 5 to an independent target character');
        const statIncreaseEffect = new Effect('Increase wellness 3 for an independent target character');
        const statDecreaseEffect = new Effect('Decrease wellness 1 for an independent target character');
        const setStatEffect = new Effect('Set wellness 10 for an independent target character');
        const drawEffect = new Effect('Draw 2 for an independent target character');
        const healEffect = new Effect('Heal 5 for an independent target character');
        const increaseDamageEffect = new Effect('Increase damage 1 for an independent target character');
        const decreaseDamageEffect = new Effect('Decrease damage 1 for an independent target character');
        const increaseHealEffect = new Effect('Increase heal 1 for an independent target character');
        const decreaseHealEffect = new Effect('Decrease heal 1 for an independent target character');
        const setDamageEffect = new Effect('Set damage 0 for an independent target character');
        const setHealEffect = new Effect('Set heal 10 for an independent target character');
        
        assert.strictEqual(damageEffect.getAmount(), 5);
        assert.strictEqual(statIncreaseEffect.getAmount(), 3);
        assert.strictEqual(statDecreaseEffect.getAmount(), -1);
        assert.strictEqual(setStatEffect.getAmount(), 10);
        assert.strictEqual(drawEffect.getAmount(), 2);
        assert.strictEqual(healEffect.getAmount(), 5);
        assert.strictEqual(increaseDamageEffect.getAmount(), 1);
        assert.strictEqual(decreaseDamageEffect.getAmount(), -1);
        assert.strictEqual(increaseHealEffect.getAmount(), 1);
        assert.strictEqual(decreaseHealEffect.getAmount(), -1);
        assert.strictEqual(setDamageEffect.getAmount(), 0);
        assert.strictEqual(setHealEffect.getAmount(), 10);
    });

    it('reports words correctly', () => {
        const oneWordEffect = new Effect('Apply burn to an independent target character');
        const twoWordsEffect = new Effect('Apply wet, cold to an independent target character');

        assert.deepStrictEqual(oneWordEffect.getWords(), ['burn']);
        assert.deepStrictEqual(twoWordsEffect.getWords(), ['wet', 'cold']);
    });

    it('reports stats correctly', () => {
        const increaseStatEffect = new Effect('Increase wellness 1 for an independent target character');
        const decreaseStatEffect = new Effect('Decrease agility 2 for an independent target character');
        const setStatAmount = new Effect('Set swiftness 5 for an independent target character');

        assert.strictEqual(increaseStatEffect.getStat(), 'wellness');
        assert.strictEqual(decreaseStatEffect.getStat(), 'agility');
        assert.strictEqual(setStatAmount.getStat(), 'swiftness');
    });

    it('reports effects correctly', () => {
        const oneEffectInsertEffect = new Effect('Insert "Deal 3" in an independent target character');
        const twoEffectsInsertEffect = new Effect('Insert "Deal 2", "Heal 1" in an independent target character');
        const oneEffectChangeEffect = new Effect('Change text to "Apply burn" on an independent target character');
        const twoEffectsChangeEffect = new Effect('Change text to "Apply wet", "Apply cold" on an independent target character');

        assert.deepStrictEqual(oneEffectInsertEffect.getEffects(), ['Deal 3']);
        assert.deepStrictEqual(twoEffectsInsertEffect.getEffects(), ['Deal 2', 'Heal 1']);
        assert.deepStrictEqual(oneEffectChangeEffect.getEffects(), ['Apply burn']);
        assert.deepStrictEqual(twoEffectsChangeEffect.getEffects(), ['Apply wet', 'Apply cold']);
    });

    it('reports target type correctly', () => {
        const independentTarget = new Effect('Deal 2 to independent target character');
        const cardsTarget = new Effect("Deal 2 to card's target character");

        assert.strictEqual(independentTarget.targetType, 'independent target');
        assert.strictEqual(cardsTarget.targetType, "card's target");
    });

    it('reports target class correctly', () => {
        assert.strictEqual(new Effect('Deal 2 to independent target character').targetClass, 'character');
        assert.strictEqual(new Effect('Deal 2 to independent target enemy').targetClass, 'enemy');
        assert.strictEqual(new Effect('Deal 2 to independent target ally').targetClass, 'ally');
        assert.strictEqual(new Effect('Deal 2 to independent target object').targetClass, 'object');
        assert.strictEqual(new Effect('Insert "Apply burn" in independent target spell').targetClass, 'spell');
        assert.strictEqual(new Effect('Insert "Apply burn" in independent target offensive effect').targetClass, 'offensive effect');
        assert.strictEqual(new Effect('Insert "Apply burn" in independent target defensive effect').targetClass, 'defensive effect');
        assert.strictEqual(new Effect('Insert "Apply burn" in independent target utility effect').targetClass, 'utility effect');
        assert.strictEqual(new Effect('Insert "Apply burn" in independent target card').targetClass, 'card');
    });

    it('reports sweeper targets', () => {
        assert.strictEqual(new Effect('Kill all characters').sweeperTarget, 'characters');
        assert.strictEqual(new Effect('Kill all enemies').sweeperTarget, 'enemies');
        assert.strictEqual(new Effect('Kill all allies').sweeperTarget, 'allies');
        assert.strictEqual(new Effect('Destroy all objects').sweeperTarget, 'objects');
        assert.strictEqual(new Effect('Counter all spells').sweeperTarget, 'spells');
        assert.strictEqual(new Effect('Counter all offensive effects').sweeperTarget, 'offensive effects');
        assert.strictEqual(new Effect('Counter all defensive effects').sweeperTarget, 'defensive effects');
        assert.strictEqual(new Effect('Counter all utility effects').sweeperTarget, 'utility effects');
    })
});