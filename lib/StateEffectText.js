import EffectText from "./EffectText.js";
import TextGenerationError from './errors/TextGenerationError.js';
import { stateEffect, stateInstruction, word, stat, targetType, targetClass, timeModifierSpan } from "./effect-text-regexps.js";
import { getTargetClassIncidental, singular, targetClassIncidentalTable } from "./incidental-tables.js";
import { capitalize, getIncidental, getTargetIncidental } from "./helpers.js";

export default class StateEffectText extends EffectText {
    constructor(text) {
        super(text, stateEffect);
    }

    // #region Getters

    getStat() {
        return this.parse.groups.stat;
    }
    
    getTargetClass() {
        const text = this.parse.groups.targetClass;

        return singular[text] || Object
        .entries(targetClassIncidentalTable.all)
        .find(entry => entry[1] === text)[0];
    }

    // #endregion

    // #region Setters

    setInstruction(instruction) {
        if (new RegExp(stateInstruction).test(capitalize(instruction))) {
            this
            .replaceText('instruction', capitalize(instruction))
            .replaceText('incidental', getIncidental(instruction));
        } else {
            throw new TextGenerationError(`'${instruction}' is not a valid state instruction`);
        }

        return this;
    }

    setWords(wordsArray) {
        if (Array.isArray(wordsArray) && wordsArray.every(w => new RegExp(word).test(w))) {
            this.replaceText('words', wordsArray.join(', '))
        } else {
            throw new TextGenerationError(`'${wordsArray.find(w => !new RegExp(word).test(w))}' is not a valid word`);
        }

        return this;
    }

    setStat(statValue) {
        if (new RegExp(stat).test(statValue)) {
            this.replaceText('stat', statValue)
        } else {
            throw new TextGenerationError(`'${statValue}' is not a valid stat`);
        }

        return this;
    }

    setTargetType(targetTypeValue) {
        if (new RegExp(targetType).test(targetTypeValue)) {
            this
            .replaceText('targetType', targetTypeValue)
            .replaceText('targetIncidental', getTargetIncidental(targetTypeValue))
            .replaceText('targetClass', getTargetClassIncidental(targetTypeValue, this.getTargetClass()))
        } else {
            throw new TextGenerationError(`'${targetTypeValue}' is not a valid target type`);
        }

        return this;
    }

    setTargetClass(targetClassValue) {
        if (new RegExp(targetClass).test(targetClassValue)) {
            this
            .replaceText('targetClass', targetClassValue)
            .replaceText('targetClass', getTargetClassIncidental(this.getTargetType(), targetClassValue))
        } else {
            throw new TextGenerationError(`'${targetClassValue}' is not a valid target class`);
        }

        return this;
    }

    // #endregion
}