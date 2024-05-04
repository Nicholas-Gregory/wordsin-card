import { describe, it } from "node:test";

import Timeline from "../lib/Timeline.js";
import * as assert from "node:assert";
import Effect from "../lib/Effect.js";

describe('Effect tests', () => {
    it('reports amount correctly', () => {
        const damageEffect = new Effect('Deal 5 to an independent target');
        const statIncreaseEffect = new Effect('Increase wellness 3 for an independent target');
        const statDecreaseEffect = new Effect('Decrease wellness 1 for an independent target');
        const setStatEffect = new Effect('Set wellness 10 for an independent target');
        const drawEffect = new Effect('Draw 2 for an independent target');
        const healEffect = new Effect('Heal 5 for an independent target');
        const increaseDamageEffect = new Effect('Increase damage 1 for an independent target');
        const decreaseDamageEffect = new Effect('Decrease damage 1 for an independent target');
        const increaseHealEffect = new Effect('Increase heal 1 for an independent target');
        const decreaseHealEffect = new Effect('Decrease heal 1 for an independent target');
        const setDamageEffect = new Effect('Set damage to 0 for an independent target');
        const setHealEffect = new Effect('Set heal to 10 for an independent target');
        
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
        const oneWordEffect = new Effect('Apply burn to an independent target');
        const twoWordsEffect = new Effect('Apply wet, cold to an independent target');

        assert.deepStrictEqual(oneWordEffect.getWords(), ['burn']);
        assert.deepStrictEqual(twoWordsEffect.getWords(), ['wet', 'cold']);
    });

    it('reports stats correctly', () => {
        const increaseStatEffect = new Effect('Increase wellness by 1 for an independent target');
        const decreaseStatEffect = new Effect('Decrease agility by 2 for an independent target');
        const setStatAmount = new Effect('Set swiftness to 5 for an independent target');

        assert.strictEqual(increaseStatEffect.getStat(), 'wellness');
        assert.strictEqual(decreaseStatEffect.getStat(), 'agility');
        assert.strictEqual(setStatAmount.getStat(), 'swiftness');
    });

    it('reports effects correctly', () => {
        const oneEffectInsertEffect = new Effect('Insert "Deal 3" in an independent target');
        const twoEffectsInsertEffect = new Effect('Insert "Deal 2", "Heal 1" in an independent target');
        const oneEffectChangeEffect = new Effect('Change text to "Apply burn" on an independent target');
        const twoEffectsChangeEffect = new Effect('Change text to "Apply wet", "Apply cold" on an independent target');

        assert.deepStrictEqual(oneEffectInsertEffect.getEffects(), ['Deal 3']);
        assert.deepStrictEqual(twoEffectsInsertEffect.getEffects(), ['Deal 2', 'Heal 1']);
        assert.deepStrictEqual(oneEffectChangeEffect.getEffects(), ['Apply burn']);
        assert.deepStrictEqual(twoEffectsChangeEffect.getEffects(), ['Apply wet', 'Apply cold']);
    });

    it('reports target type correctly', () => {
        const independentTarget = new Effect('Deal 2 to independent target');
        const cardsTarget = new Effect("Deal 2 to card's target");

        assert.strictEqual(independentTarget.targetType, 'independent target');
        assert.strictEqual(cardsTarget.targetType, "card's target");
    })
});