import { describe, it } from "node:test";
import assert from 'node:assert';
import { effectRegExp } from "../lib/regexps.js";
import EffectText from "../lib/EffectText.js";

describe('regular expressions', () => {
    it('matches various test strings', () => {
        const regexp = new RegExp(effectRegExp, 'd');
        assert.match(`deal 2 to you`, regexp);
        assert.match(`heal 2 for you`, regexp);
        assert.match(`subtract heal 2 for independent target effect`, regexp);
        assert.match(`apply burn to card's target object`, regexp);
        assert.match(`you discard 3 cards`, regexp);
        assert.match(`independent target enemy discards 3 random cards`, regexp);
        assert.match(`kill all characters`, regexp);
        assert.match(`card's target enemy shuffles 1 chosen card into their grimoire`, regexp);
        assert.match(`apply burn to all enemies for 1 more turn`, regexp);
        assert.match(`multiply deal 2 for all allies for 3 more exchanges`, regexp);
    });
});

describe(`Class: EffectText`, () => {
    it('reports properties from various test strings', () => {
        assert.strictEqual(new EffectText('deal 2 to independent target enemy').getAction(), 'deal');
        assert.deepStrictEqual(new EffectText('multiply heal 3 for all effects for 2 more exchanges').getKeywords(), ['multiply', 'heal']);
        assert.strictEqual(new EffectText('add deal 1 for all effects for the rest of the encounter').getAction(), 'add');
        assert.strictEqual(new EffectText('you draw 3 cards').getAmount(), 3);
        assert.strictEqual(new EffectText(`card's target enemy discards 1 card`).getOuterTargeting(), 'card');
        assert.strictEqual(new EffectText(`independent target ally draws 1 card`).getOuterTarget(), 'all');
        assert.strictEqual(new EffectText(`all enemies discard 2 chosen cards`).getOuterTarget(), 'enem');
        assert.strictEqual(new EffectText(`deal 2 to independent target enemy`).getTargeting(), 'independent');
        assert.strictEqual(new EffectText(`deal 2 to card's target enemy`).getTargeting(), 'card');
        assert.strictEqual(new EffectText(`deal 2 to independent target enemy`).getTarget(), 'enem');
        assert.strictEqual(new EffectText(`deal 2 to all enemies`).getTarget(), 'enem');
        assert.strictEqual(new EffectText(`random enemy shuffles 1 random card into independent target grimoire`).getGrimoireTargeting(), 'independent');
        assert.strictEqual(new EffectText(`random enemy shuffles 1 random card into card's target grimoire`).getGrimoireTargeting(), 'card');
        assert.strictEqual(new EffectText(`random enemy shuffles 1 random card into their grimoire`).getGrimoireTargeting(), 'their');
        assert.strictEqual(new EffectText(`apply burn to all enemies for 2 more turns`).getTimeModifierAmount(), 2);
        assert.strictEqual(new EffectText(`apply burn to all enemies for 2 more turns`).getTimeModifierSpan(), 'turn');
    });

    it(`sets outer targeting`, () => {
        const effect = new EffectText(`all enemies discard 1 card`)

        assert.strictEqual(
            effect
            .setOuterTargeting('independent')
            .getOuterTargeting(), 'independent'
        );
        assert.strictEqual(effect.text, `independent target enemy discards 1 card`);

        assert.strictEqual(
            effect
            .setOuterTargeting(`all`)
            .getOuterTargeting(), `all`
        );
        assert.strictEqual(effect.text, `all enemies discard 1 card`);

        const otherEffect = new EffectText(`independent target character draws 1 card`)
        .setOuterTargeting('all')
        assert.strictEqual(
            otherEffect
            .setOuterTargeting('all')
            .getOuterTargeting(), 'all'
        );
        assert.strictEqual(otherEffect.text, 'all characters draw 1 card');


    });

    it(`sets outer target`, () => {
        const effect = new EffectText(`all characters draw 1 card`);

        assert.strictEqual(
            effect
            .setOuterTarget('all')
            .getOuterTarget(), 'all'
        );
        assert.strictEqual(effect.text, `all allies draw 1 card`);

        assert.strictEqual(
            effect
            .setOuterTarget('enem')
            .getOuterTarget(), 'enem'
        );
        assert.strictEqual(effect.text, `all enemies draw 1 card`);

        assert.strictEqual(
            effect
            .setOuterTarget('character')
            .getOuterTarget(), 'character'
        );
        assert.strictEqual(effect.text, `all characters draw 1 card`);
    });

    it(`sets keywords`, () => {
        const statusEffect = new EffectText(`apply burn to independent target character`);
        const modifierEffect = new EffectText(`add deal 2 for independent target effect`);

        assert.deepStrictEqual(
            statusEffect
            .setKeywords(['wet', 'cold'])
            .getKeywords(), ['wet', 'cold']
        );
        assert.deepStrictEqual(
            statusEffect
            .setKeywords(['burn'])
            .getKeywords(), ['burn']
        );

        assert.deepStrictEqual(
            modifierEffect
            .setKeywords(['multiply', 'add', 'deal'])
            .getKeywords(), ['multiply', 'add', 'deal']
        );
        assert.deepStrictEqual(
            modifierEffect
            .setKeywords(['multiply', 'deal'])
            .getKeywords(), ['multiply', 'deal']
        );
    });

    it(`sets action`, () => {
        const outerEffect = new EffectText(`independent target ally discards 1 card`);
        const actionEffect = new EffectText(`deal 2 to independent target ally`);

        assert.strictEqual(
            outerEffect
            .setAction('draw')
            .getAction(), 'draw'
        );
        assert.strictEqual(outerEffect.text, `independent target ally draws 1 card`);

        assert.strictEqual(
            actionEffect
            .setAction('heal')
            .getAction(), 'heal'
        );
        assert.strictEqual(actionEffect.text, `heal 2 for independent target ally`);
    });

    it(`sets amount`, () => {
        assert.strictEqual(
            new EffectText(`deal 2 to independent target enemy`)
            .setAmount(3)
            .getAmount(), 3
        );
    });

    it(`sets targeting`, () => {
        const effect = new EffectText(`deal 2 to independent target enemy`);

        assert.strictEqual(
            effect
            .setTargeting('card')
            .getTargeting(), 'card'
        );
        assert.strictEqual(effect.text, `deal 2 to card's target enemy`);

        assert.strictEqual(
            effect
            .setTargeting('independent')
            .getTargeting(), 'independent'
        );
        assert.strictEqual(effect.text, `deal 2 to independent target enemy`);
        // console.log(effect.setTargeting('all').parse)
        assert.strictEqual(
            effect
            .setTargeting('all')
            .getTargeting(), 'all'
        );
        assert.strictEqual(effect.text, `deal 2 to all enemies`);
    });
});