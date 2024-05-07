import { stateInstruction, targetType, timeModifierSpan } from "./effect-text-regexps.js";
import { getTargetClassIncidental } from "./incidental-tables.js";
import TextParsingError from './errors/TextParsingError.js';

const getSpanIncidental = amount => amount > 1 ? 's' : '';

export default class EffectText {
    constructor(text, regexp) {
        this.text = text;
        this.regexp = regexp;

        this.parseText()
    }

    parseText() {
        this.parse = this.text.match(new RegExp(this.regexp, 'd'));

        if (this.parse === null) {
            throw new TextParsingError();
        }

        return this;
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

    getIndices(property) {
        return this.parse.indices.groups[property];
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

    replaceText(property, newText) {
        const [start, end] = this.getIndices(property);

        this.text = `${this.text.substring(0, start)}${newText}${this.text.substring(end)}`;

        this.parseText()

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
}