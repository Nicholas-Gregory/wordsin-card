import EffectText from "./EffectText.js";
import TextGenerationError from './errors/TextGenerationError.js';
import { stateEffect, stateInstruction, word, stat, targetType, targetClass, timeModifierSpan } from "./effect-text-regexps.js";

// #region Helpers

const capitalize = text => `${text.substring(0, 1).toUpperCase()}${text.substring(1)}`;

const getIncidental = text => text === 'deal' || text === 'apply' ? 'to' : 'for';

const getTargetIncidental = text => text === 'all' ? '' : (text === 'card' ? "'s target" : ' target');

const singular = {
    character: 'character',
    enemy: 'enemy',
    ally: 'ally',
    object: 'object',
    spell: 'spell',
    effect: 'effect'
}

const targetClassIncidentalTable = {
    all: {
        character: 'characters',
        enemy: 'enemies',
        ally: 'allies',
        object: 'objects',
        spell: 'spells',
        effect: 'effects'
    },
    independent: singular,
    card: singular
}

const getTargetClassIncidental = (targetType, targetClass) => targetClassIncidentalTable[targetType][targetClass];

const getSpanIncidental = amount => amount > 1 ? 's' : '';

// #endregion

export default class StateEffectText extends EffectText {
    constructor(text) {
        super(text, stateEffect);
    }

    // #region Getters

    getStat() {
        return this.parse.groups.stat;
    }

    getIndices(property) {
        return this.parse.indices.groups[property];
    }
    
    getTargetClass() {
        const text = this.parse.groups.targetClass;

        return singular[text] || Object
        .entries(targetClassIncidentalTable.all)
        .find(entry => entry[1] === text)[0];
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

    // #endregion

    getIndices(property) {
        return this.parse.indices.groups[property];
    }

    // #region Setters

    replaceText(property, newText) {
        const [start, end] = this.getIndices(property);

        this.text = `${this.text.substring(0, start)}${newText}${this.text.substring(end)}`;

        this.parseText()

        return this;
    }

    setInstruction(instruction) {
        if (new RegExp(stateInstruction).test(capitalize(instruction))) {
            this
            .replaceText('instruction', capitalize(instruction))
            .replaceText('incidental', getIncidental(instruction));
        } else {
            throw new TextGenerationError(`'${instruction}' is not a valid instruction`);
        }

        return this;
    }

    setAmount(amount) {
        if (typeof amount === 'number') {
            this.replaceText('amount', String(amount))
        } else {
            throw new TextGenerationError(`'${amount}' is not a number`);
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

    setTimeModifierAmount(amount) {
        if (typeof amount === 'number') {
            if (this.getTimeModifierAmount()) {
                this
                .replaceText('timeModifierAmount', String(amount))
                .replaceText('spanIncidental', getSpanIncidental(amount));
            }
        } else {
            throw new TextGenerationError(`'${amount}' is not a number`);
        }

        return this;
    }

    setTimeModifierSpan(span) {
        if (new RegExp(timeModifierSpan).test(span)) {
            if (this.getTimeModifierSpan()) {
                this
                .replaceText('timeModifierSpan', span)
                .replaceText('spanIncidental', getSpanIncidental(this.getTimeModifierAmount()));
            }
        } else {
            throw new TextGenerationError(`'${span} is not a valid time modifier span`);
        }

        return this;
    }

    // #endregion
}