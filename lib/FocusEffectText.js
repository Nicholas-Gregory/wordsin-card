import { focusEffect, focusInstruction } from "./effect-text-regexps.js";
import EffectText from './EffectText.js';
import TextGenerationError from "./errors/TextGenerationError.js";

export default class FocusEffectText extends EffectText {
    constructor(text) {
        super(text, focusEffect);
    }

    getIncidental() {
        return this.getTargetType() === 'you' ? '' : 's';
    }

    getTargetType() {
        return super.getTargetType().toLowerCase();
    }

    setInstruction(instruction) {
        if (new RegExp(focusInstruction).test(instruction)) {
            this
            .replaceText('instruction', instruction)
            .replaceText('incidental', this.getIncidental());
        } else {
            throw new TextGenerationError(`'${instruction}' is not a valid focus instruction`);
        }

        return this;
    }
}