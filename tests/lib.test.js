import { describe, it } from "node:test";
import assert from 'node:assert';
import StateEffectText from "../lib/StateEffectText.js";

describe('Class: StateEffectText;', () => {
    it('reports instruction', () => {
        assert.strictEqual(new StateEffectText('Deal 2 to independent target character').getInstruction(), 'deal');
        assert.strictEqual(new StateEffectText("Heal 4 for card's target ally").getInstruction(), 'heal');
        assert.strictEqual(new StateEffectText('Increase 2 for awareness for independent target character').getInstruction(), 'increase');
        assert.strictEqual(new StateEffectText("Decrease 2 for awareness for card's target character").getInstruction(), 'decrease');
        assert.strictEqual(new StateEffectText('Apply burn to independent target object').getInstruction(), 'apply');
        assert.strictEqual(new StateEffectText("Apply wet, cold to card's target character").getInstruction(), 'apply');
        assert.strictEqual(new StateEffectText('Destroy independent target object').getInstruction(), 'destroy');
        assert.strictEqual(new StateEffectText('Kill independent target character').getInstruction(), 'kill');
    });

    it('reports amount', () => {
        assert.strictEqual(new StateEffectText('Deal 4 to independent target character').getAmount(), 4);
        assert.strictEqual(new StateEffectText('Heal 4 for independent target character').getAmount(), 4);
        assert.strictEqual(new StateEffectText('Increase 2 for awareness for independent target character').getAmount(), 2);
        assert.strictEqual(new StateEffectText('Decrease 2 for awareness for independent target enemy').getAmount(), 2);
        assert.strictEqual(new StateEffectText('Apply burn to independent target object').getAmount(), NaN);
    });

    it('reports words', () => {
        assert.deepStrictEqual(new StateEffectText('Apply burn to independent target object').getWords(), ['burn']);
        assert.deepStrictEqual(new StateEffectText('Apply wet, cold to independent target character').getWords(), ['wet', 'cold']);
    });

    it('reports target type', () => {
        assert.strictEqual(new StateEffectText('Deal 2 to independent target enemy').getTargetType(), 'independent');
        assert.strictEqual(new StateEffectText("Deal 2 to card's target enemy").getTargetType(), 'card');
        assert.strictEqual(new StateEffectText('Destroy all objects').getTargetType(), 'all');
    });

    it('reports target class', () => {
        assert.strictEqual(new StateEffectText('Deal 2 to all enemies').getTargetClass(), 'enemies');
        assert.strictEqual(new StateEffectText('Heal 3 for independent target ally').getTargetClass(), 'ally');
    });

    it('reports time modifier span', () => {
        assert.strictEqual(new StateEffectText('Increase 3 for wellness for all allies for 3 more turns').getTimeModifierSpan(), 'turns');
        assert.strictEqual(new StateEffectText('Decrease 3 for awareness for all enemies for 2 more exchanges').getTimeModifierSpan(), 'exchanges');
    });

    it('reports time modifier amount', () => {
        assert.strictEqual(new StateEffectText('Increase 5 for power for all characters for 2 more turns').getTimeModifierAmount(), 2);
    });

    it('reports if it is for the rest of the encounter', () => {
        assert.strictEqual(new StateEffectText('Apply burn to all enemies for the rest of the encounter').isRestOfEncounter(), true);
    })
});