import EffectText from "./EffectText.js";
import { modifierEffect } from "./effect-text-regexps.js";

export default class ModifierEffectText extends EffectText {
    constructor(text) {
        super(text, modifierEffect);
    }

    getArgument() {
        return this.parse.groups.argument.toLowerCase();
    }
}