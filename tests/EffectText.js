import { effectRegExp } from "../lib/regexps.js";

export default class EffectText {
    constructor(text) {
        this.text = text;

        this.parseText();
    }

    parseText() {
        this.parse = this.text.match(new RegExp(effectRegExp, 'd'));

        if (this.parse === null) throw new TextParsingError();

        return this;
    }

    getKeywords() {
        return this.parse.groups.keywords
        .trim()
        .split(' ');
    }

    getAction() {
        return this.getKeywords()[0];
    }

    getAmount() {
        return Number(this.parse.groups.amount);
    }

    getOuterTargeting() {
        return this.parse.groups.outerTargeting;
    }

    getOuterTarget() {
        return this.parse.groups.outerTarget;
    }

    getTargeting() {
        return this.parse.groups.targeting;
    }

    getTarget() {
        return this.parse.groups.target;
    }

    getGrimoireTargeting() {
        return this.parse.groups.grimoireTargeting;
    }

    getTimeModifierAmount() {
        return Number(this.parse.groups.timeModifierAmount);
    }

    getTimeModifierSpan() {
        return this.parse.groups.timeModifierSpan;
    }

    isRestOfEncounter() {
        return this.parse.groups.timeModifier === 'the rest of the encounter';
    }
}