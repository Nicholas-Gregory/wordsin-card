import { describe, it } from "node:test";

import Timeline from "../lib/Timeline.js";
import * as assert from "node:assert";
import Effect from "../lib/Effect.js";

describe('Effect tests', () => {
    it('reports amount correctly', () => {
        const damageEffect = new Effect('Deal 5');
        const statIncreaseEffect = new Effect('Increase wellness 3');
        const statDecreaseEffect = new Effect('Decrease wellness 1');
        const setStatEffect = new Effect('Set wellness 10');
        const drawEffect = new Effect('Draw 2');
        const healEffect = new Effect('Heal 5');
        const increaseDamageEffect = new Effect('Increase damage 1');
        const decreaseDamageEffect = new Effect('Decrease damage 1');
        const increaseHealEffect = new Effect('Increase heal 1');
        const decreaseHealEffect = new Effect('Decrease heal 1');
        const setDamageEffect = new Effect('Set damage to 0');
        const setHealEffect = new Effect('Set heal to 10');
        
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
        const oneWordEffect = new Effect('Apply burn');
        const twoWordsEffect = new Effect('Apply wet, cold');

        assert.deepStrictEqual(oneWordEffect.getWords(), ['burn']);
        assert.deepStrictEqual(twoWordsEffect.getWords(), ['wet', 'cold']);
    });

    it('reports stats correctly', () => {
        const increaseStatEffect = new Effect('Increase wellness 1');
        const decreaseStatEffect = new Effect('Decrease agility 2');
        const setStatAmount = new Effect('Set swiftness 5');

        assert.strictEqual(increaseStatEffect.getStat(), 'wellness');
        assert.strictEqual(decreaseStatEffect.getStat(), 'agility');
        assert.strictEqual(setStatAmount.getStat(), 'swiftness');
    });

    it('reports effects correctly', () => {
        const oneEffectInsertEffect = new Effect('Insert "Deal 3"');
        const twoEffectsInsertEffect = new Effect('Insert "Deal 2", "Heal 1"');
        const oneEffectChangeEffect = new Effect('Change to "Apply burn"');
        const twoEffectsChangeEffect = new Effect('Change to "Apply wet", "Apply cold"');

        assert.deepStrictEqual(oneEffectInsertEffect.getEffects(), ['Deal 3']);
        assert.deepStrictEqual(twoEffectsInsertEffect.getEffects(), ['Deal 2', 'Heal 1']);
        assert.deepStrictEqual(oneEffectChangeEffect.getEffects(), ['Apply burn']);
        assert.deepStrictEqual(twoEffectsChangeEffect.getEffects(), ['Apply wet', 'Apply cold']);
    })
});