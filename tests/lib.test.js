import { describe, it } from "node:test";
import assert from 'node:assert';
import { effectRegExp } from "../lib/regexps.js";
import EffectText from "../lib/EffectText.js";
import Effect from "../lib/Effect.js";

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
        assert.match(`change deal to heal for independent target effect`, regexp);
        assert.match(`multiply add deal 3 for all allied effects for 1 more turn`, regexp);
    });
});

describe(`Class: EffectText;`, () => {
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
        assert.strictEqual(new EffectText(`change burn to heal for independent target effect`).getChangedValue(), 'heal');
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

    it(`sets target`, () => {
        const singularEffect = new EffectText(`deal 2 to independent target character`);
        const allEffect = new EffectText(`kill all allies`);

        assert.strictEqual(
            singularEffect
            .setTarget('enem')
            .getTarget(), 'enem'
        );
        assert.strictEqual(singularEffect.text, `deal 2 to independent target enemy`);

        assert.strictEqual(
            singularEffect
            .setTarget('all')
            .getTarget(), 'all'
        );
        // console.log(singularEffect.parse)
        assert.strictEqual(singularEffect.text, `deal 2 to independent target ally`);

        assert.strictEqual(
            singularEffect
            .setTarget('character')
            .getTarget(), 'character'
        );
        assert.strictEqual(singularEffect.text, `deal 2 to independent target character`);

        assert.strictEqual(
            allEffect
            .setTarget('enem')
            .getTarget(), 'enem'
        );
        assert.strictEqual(allEffect.text, `kill all enemies`);

        assert.strictEqual(
            allEffect
            .setTarget('character')
            .getTarget(), 'character'
        );
        assert.strictEqual(allEffect.text, `kill all characters`);

        assert.strictEqual(
            allEffect
            .setTarget('all')
            .getTarget(), 'all'
        );
        assert.strictEqual(allEffect.text, `kill all allies`);
    });

    it(`sets time modifier amount`, () => {
        assert.strictEqual(
            new EffectText(`apply burn to all enemies for 2 more turns`)
            .setTimeModifierAmount(4)
            .getTimeModifierAmount(), 4
        );
    });

    it(`sets time modifier span`, () => {
        const pluralEffect = new EffectText(`apply burn to all enemies for 2 more exchanges`);
        const singularEffect = new EffectText(`apply burn to all enemies for 1 more turn`);

        assert.strictEqual(
            pluralEffect
            .setTimeModifierSpan('turn')
            .getTimeModifierSpan(), 'turn'
        );
        assert.strictEqual(pluralEffect.text, `apply burn to all enemies for 2 more turns`);

        assert.strictEqual(
            pluralEffect
            .setTimeModifierSpan('exchange')
            .getTimeModifierSpan(), 'exchange'
        );
        assert.strictEqual(pluralEffect.text, `apply burn to all enemies for 2 more exchanges`);

        assert.strictEqual(
            singularEffect
            .setTimeModifierSpan('exchange')
            .getTimeModifierSpan(), 'exchange'
        );
        assert.strictEqual(singularEffect.text, `apply burn to all enemies for 1 more exchange`);

        assert.strictEqual(
            singularEffect
            .setTimeModifierSpan('turn')
            .getTimeModifierSpan(), 'turn'
        );
        assert.strictEqual(singularEffect.text, `apply burn to all enemies for 1 more turn`);
    });
});

describe(`Class; Effect;`, () => {
    it(`sets target effect amount`, () => {
        const targetEffect = new Effect(new EffectText(`deal 2 to independent target enemy`))
        const castEffect = new Effect(new EffectText(`set deal 3 for independent target effect`), targetEffect);

        castEffect.setEffectAmount();

        assert.strictEqual(targetEffect.text.getAmount(), 3);
    });

    it(`adds to target effect amount`, () => {
        const targetEffect = new Effect(new EffectText(`deal 2 to independent target enemy`));
        const castEffect = new Effect(new EffectText(`add deal 2 for independent target effect`), targetEffect);

        castEffect.addEffectAmount();

        assert.strictEqual(targetEffect.text.getAmount(), 4);
    });

    it(`subtracts from target effect amount`, () => {
        const targetEffect = new Effect(new EffectText(`deal 4 to all allies`));
        const castEffect = new Effect(new EffectText(`subtract 2 for independent target effect`), targetEffect);

        castEffect.subtractEffectAmount();

        assert.strictEqual(targetEffect.text.getAmount(), 2);
    });

    it(`divides target effect amount`, () => {
        const targetEffect = new Effect(new EffectText(`deal 1 to all allies`));
        const castEffect = new Effect(new EffectText(`divide deal 2 for independent target effect`), targetEffect);

        castEffect.divideAmountText();

        assert.strictEqual(targetEffect.text.getAmount(), 0);
    });

    it(`matches keywords`, () => {
        const targetEffect = new Effect(new EffectText(`add deal 3 for independent target effect`));
        const effect = new Effect(new EffectText(`multiply add deal 2 for independent target effect`), targetEffect);

        assert(effect.matchKeywords());

        const falseEffect = new Effect(new EffectText(`multiply add heal 2 for independent target effect`), targetEffect);
        
        assert(!falseEffect.matchKeywords())
    });
});