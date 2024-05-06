import EffectText from "./EffectText.js";
import { stateEffect } from "./effect-text-regexps.js";

export default class StateEffectText extends EffectText {
    constructor(text) {
        super(text, stateEffect);
    }

    getInstruction() {
        return this.parse.groups.instruction.toLowerCase();
    }

    getAmount() {
        return Number(this.parse.groups.amount);
    }

    getWords() {
        return this.parse.groups.words.split(', ');
    }

    getTargetType() {
        return this.parse.groups.targetType;
    }

    getTargetClass() {
        return this.parse.groups.targetClass;
    }

    getTimeModifierSpan() {
        return this.parse.groups.timeModifierSpan;
    }

    getTimeModifierAmount() {
        return Number(this.parse.groups.timeModifierAmount);
    }

    isRestOfEncounter() {
        return this.parse.groups.timeModifier && !this.parse.groups.timeModifierAmount;
    }
}