import { describe, it } from "node:test";
import assert from 'node:assert';
import StateEffectText from "../lib/StateEffectText.js";
import ModifierEffectText from "../lib/ModifierEffectText.js";

describe('Class: StateEffectText;', () => {
    // #region Getters
    it('reports instruction', () => {
        assert.strictEqual(new StateEffectText('Deal 2 to independent target character').getInstruction(), 'deal');
        assert.strictEqual(new StateEffectText("Heal 4 for card's target ally").getInstruction(), 'heal');
        assert.strictEqual(new StateEffectText('Increase 2 for awareness for independent target character').getInstruction(), 'increase');
        assert.strictEqual(new StateEffectText("Decrease 2 for awareness for card's target character").getInstruction(), 'decrease');
        assert.strictEqual(new StateEffectText('Apply burn to independent target object').getInstruction(), 'apply');
        assert.strictEqual(new StateEffectText("Apply wet, burn to card's target character").getInstruction(), 'apply');

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

    it('reports stat', () => {
        assert.strictEqual(new StateEffectText('Increase 3 for awareness for independent target character').getStat(), 'awareness');
    })

    it('reports target type', () => {
        assert.strictEqual(new StateEffectText('Deal 2 to independent target enemy').getTargetType(), 'independent');
        assert.strictEqual(new StateEffectText("Deal 2 to card's target enemy").getTargetType(), 'card');
        assert.strictEqual(new StateEffectText('Destroy all objects').getTargetType(), 'all');
    });

    it('reports target class', () => {
        assert.strictEqual(new StateEffectText('Deal 2 to all enemies').getTargetClass(), 'enemy');
        assert.strictEqual(new StateEffectText('Heal 3 for independent target ally').getTargetClass(), 'ally');
    });

    it('reports time modifier span', () => {
        assert.strictEqual(new StateEffectText('Increase 3 for wellness for all allies for 3 more turns').getTimeModifierSpan(), 'turn');
        assert.strictEqual(new StateEffectText('Decrease 3 for awareness for all enemies for 2 more exchanges').getTimeModifierSpan(), 'exchange');
    });

    it('reports time modifier amount', () => {
        assert.strictEqual(new StateEffectText('Increase 5 for power for all characters for 2 more turns').getTimeModifierAmount(), 2);
    });

    it('reports if it is for the rest of the encounter', () => {
        assert.strictEqual(new StateEffectText('Apply burn to all enemies for the rest of the encounter').isRestOfEncounter(), true);
    });

    // #endregion

    // #region Setters

    it('sets instruction', () => {
        assert.strictEqual(
            new StateEffectText('Deal 4 to independent target ally')
            .setInstruction('heal')
            .text, 'Heal 4 for independent target ally'
        );

        assert.strictEqual(
            new StateEffectText('Heal 4 for independent target enemy')
            .setInstruction('deal')
            .text, 'Deal 4 to independent target enemy'
        );
    });

    it('sets amount', () => {
        assert.strictEqual(
            new StateEffectText('Deal 2 to independent target enemy')
            .setAmount(3)
            .getAmount(), 3
        );
    });

    it('sets words', () => {
        const effect = new StateEffectText('Apply burn to independent target object');

        assert.deepStrictEqual(
            effect
            .setWords(['wet'])
            .getWords(), ['wet']
        );
        assert.strictEqual(effect.text, 'Apply wet to independent target object')

        assert.deepStrictEqual(
            effect
            .setWords(['wet', 'cold'])
            .getWords(), ['wet', 'cold']
        );
        assert.strictEqual(effect.text, 'Apply wet, cold to independent target object');
    });

    it('sets stat', () => {
        assert.strictEqual(
            new StateEffectText('Increase 2 for wellness for independent target character')
            .setStat('awareness')
            .getStat(), 'awareness'
        );
    });

    it('sets target type', () => {
        const effect = new StateEffectText('Deal 2 to independent target enemy');

        assert.strictEqual(
            effect
            .setTargetType('card')
            .getTargetType(), 'card'
        );
        assert.strictEqual(effect.text, "Deal 2 to card's target enemy");

        assert.strictEqual(
            effect
            .setTargetType('all')
            .getTargetType(), 'all'
        );
        assert.strictEqual(effect.text, 'Deal 2 to all enemies');
    });

    it('sets target class', () => {
        const effect = new StateEffectText('Heal 4 for all enemies');

        assert.strictEqual(
            effect
            .setTargetClass('ally')
            .getTargetClass(), 'ally'
        );
        assert.strictEqual(effect.text, 'Heal 4 for all allies');
    });

    it('sets time modifier amount', () => {
        const effect = new StateEffectText('Set 10 for power for all characters for 2 more turns');

        assert.strictEqual(
            effect
            .setTimeModifierAmount(1)
            .getTimeModifierAmount(), 1
        );
        assert.strictEqual(effect.text, 'Set 10 for power for all characters for 1 more turn');
    });

    it('sets time modifier span', () => {
        const effect = new StateEffectText('Set 10 for power for all characters for 2 more turns');

        assert.strictEqual(
            effect
            .setTimeModifierSpan('exchange')
            .getTimeModifierSpan(), 'exchange'
        );
        assert.strictEqual(effect.text, 'Set 10 for power for all characters for 2 more exchanges');
    });

    // #endregion
});

describe('Class: ModifierEffectText', () => {

    // #region Getters

    it('reports instruction', () => {
        assert.strictEqual(new ModifierEffectText('Set "Deal" to 3 for independent target effect').getInstruction(), 'set');
        assert.strictEqual(new ModifierEffectText(`Increase "Deal" by 1 for independent target effect`).getInstruction(), 'increase');
        assert.strictEqual(new ModifierEffectText(`Decrease "Deal" by 1 for independent target effect`).getInstruction(), 'decrease');
        assert.strictEqual(new ModifierEffectText(`Multiply "Deal" by 2 for independent target effect`).getInstruction(), 'multiply');
        assert.strictEqual(new ModifierEffectText(`Divide "Deal" by 2 for independent target effect`).getInstruction(), 'divide');
        assert.strictEqual(new ModifierEffectText(`Remove "Apply burn" from independent target effect`).getInstruction(), 'remove');
        assert.strictEqual(new ModifierEffectText(`Remove "Apply wet, cold" from independent target effect`).getInstruction(), 'remove');
    });

    it('reports amount', () => {
        assert.strictEqual(new ModifierEffectText(`Set "Deal" to 1 for independent target effect`).getAmount(), 1);
    });

    it('reports words', () => {
        assert.deepStrictEqual(new ModifierEffectText(`Remove "Apply burn" from independent target effect`).getWords(), ['burn']);
        assert.deepStrictEqual(new ModifierEffectText(`Remove "Apply wet, cold" from independent target effect`).getWords(), ['wet', 'cold'])
    });

    it('reports argument', () => {
        assert.strictEqual(new ModifierEffectText(`Increase "Deal" by 1 for independent target effect`).getArgument(), 'deal');
        assert.strictEqual(new ModifierEffectText(`Increase "Heal" by 1 for independent target effect`).getArgument(), 'heal');
        assert.strictEqual(new ModifierEffectText(`Multiply "Increase" by 2 for independent target effect`).getArgument(), 'increase');
        assert.strictEqual(new ModifierEffectText(`Divide "Deal" by 2 for independent target effect`).getArgument(), 'deal');
        assert.strictEqual(new ModifierEffectText(`Remove "Apply burn" from independent target effect`).getArgument(), 'apply');
    });

    it(`reports target type`, () => {
        assert.strictEqual(new ModifierEffectText(`Increase "Deal" by 1 for independent target effect`).getTargetType(), 'independent');
        assert.strictEqual(new ModifierEffectText(`Increase "Deal" by 1 for card's target effect`).getTargetType(), 'card');
    });

    it(`reports changed instruction`, () => {
        assert.strictEqual(new ModifierEffectText(`Change "Deal" to "Heal" for independent target effect for 1 more exchange`).getChangedInstruction(), 'heal');
        assert.strictEqual(new ModifierEffectText(`Change instruction to "Multiply" for independent target effect`).getChangedInstruction(), 'multiply');
    });

    it('reports if it is for the rest of the encounter', () => {
        assert.strictEqual(new ModifierEffectText('Increase "Deal" by 5 for all effects for the rest of the encounter').isRestOfEncounter(), true);
        assert.strictEqual(new ModifierEffectText(`Increase "Deal" by 5 for all effects for 2 more turns`).isRestOfEncounter(), false);
    });

    it(`reports time modifier amount`, () => {
        assert.strictEqual(new ModifierEffectText(`Increase "Heal" by 2 for all effects for 1 more turn`).getTimeModifierAmount(), 1);
    });

    it(`reports time modifier span`, () => {
        assert.strictEqual(new ModifierEffectText(`Multiply "Heal" by 2 for all effects for 2 more turns`).getTimeModifierSpan(), 'turn');
        assert.strictEqual(new ModifierEffectText(`Multiply "Heal" by 2 for all effects for 1 more turn`).getTimeModifierSpan(), 'turn');
        assert.strictEqual(new ModifierEffectText(`Multiply "Heal" by 2 for all effects for 2 more exchanges`).getTimeModifierSpan(), 'exchange');
        assert.strictEqual(new ModifierEffectText(`Multiply "Heal" by 2 for all effects for 1 more exchange`).getTimeModifierSpan(), 'exchange');
    });

    // #endregion

    // #region Setters

    it(`sets instruction`, () => {
        const effect = new ModifierEffectText(`Decrease "Heal" by 3 for independent target effect`)

        assert.strictEqual(
            effect
            .setInstruction('increase')
            .getInstruction(), 'increase'
        );
        assert.strictEqual(effect.text, `Increase "Heal" by 3 for independent target effect`);
    });

    it(`sets amount`, () => {
        assert.strictEqual(
            new ModifierEffectText(`Multiply "Heal" by 1 for independent target effect`)
            .setAmount(2)
            .getAmount(), 2
        );
    });

    it('sets target type', () => {
        const effect = new ModifierEffectText(`Change "Increase" to "Divide" for card's target effect`);

        assert.strictEqual(
            effect
            .setTargetType('independent')
            .getTargetType(), 'independent'
        );
        assert.strictEqual(effect.text, `Change "Increase" to "Divide" for independent target effect`);
    });

    it(`sets time modifier amount`, () => {
        assert.strictEqual(
            new ModifierEffectText(`Increase "Heal" by 2 for all effects for 1 more turns`)
            .setTimeModifierAmount(2)
            .getTimeModifierAmount(), 2
        );
    });

    it(`sets time modifier span`, () => {
        const effect = new ModifierEffectText(`Decrease "Deal" by 2 for independent target effect for 2 more exchanges`);

        assert.strictEqual(
            effect
            .setTimeModifierSpan('turn')
            .getTimeModifierSpan(), 'turn'
        );
        assert.strictEqual(effect.text, `Decrease "Deal" by 2 for independent target effect for 2 more turns`);
    })

    // #endregion
})