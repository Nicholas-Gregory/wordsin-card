import EffectText from "./EffectText.js";
import { modifierEffect, modifierInstruction, targetType } from "./effect-text-regexps.js";
import TextGenerationError from "./errors/TextGenerationError.js";
import { capitalize, getTargetIncidental } from "./helpers.js";

export default class ModifierEffectText extends EffectText {
    constructor(text) {
        super(text, modifierEffect);
    }

    getArgument() {
        return this.parse.groups.argument.toLowerCase();
    }

    getChangedInstruction() {
        return this.parse.groups.changedInstruction.toLowerCase();
    }

    setInstruction(instruction) {
        if (new RegExp(modifierInstruction).test(capitalize(instruction))) {
            this.replaceText('instruction', capitalize(instruction));
        } else {
            throw new TextGenerationError(`'${instruction}' is not a valid modifier instruction`)
        }

        return this;
    }

    setTargetType(targetTypeValue) {
        if (new RegExp(targetType).test(targetTypeValue)) {
            this
            .replaceText('targetType', targetTypeValue)
            .replaceText('targetIncidental', getTargetIncidental(targetTypeValue));
        } else {
            throw new TextGenerationError(`'${targetTypeValue}' is not a valid target type`);
        }

        return this;
    }
}