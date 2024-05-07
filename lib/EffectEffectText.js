import EffectText from './EffectText.js';
import { effectEffect } from './effect-text-regexps.js';
import TextGenerationError from './errors/TextGenerationError.js';

const getCopyIncidental = amount => amount > 1 ? 's' : '';

export default class EffectEffectText extends EffectText {
    constructor(text) {
        super(text, effectEffect);
    }

    getEffects() {
        // console.log(this.regexp);
        return this.parse.groups.effects
        .replaceAll('"', '')
        .split(', ')
    }

    setAmount(amount) {
        if (typeof amount === 'number') {
            const start = this.text.indexOf('time') + 4;
            const end = start + 1;

            this
            .replaceText('amount', amount)
            .replaceText('copyIncidental', getCopyIncidental(amount), [start, end]);
        } else {
            throw new TextGenerationError(`'${amount}' is not a number`);
        }

        return this;
    }
}