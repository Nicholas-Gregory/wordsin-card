import { describe, it } from "node:test";
import assert from 'node:assert';
import { effectRegExp } from "../lib/regexps.js";

describe('regular expressions', () => {
    it('matches various tests', () => {
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
    })
});