import EffectText from './EffectText.js';
import { cardEffect, cardInstruction, cardModifier } from './effect-text-regexps.js';
import TextGenerationError from './errors/TextGenerationError.js';

const getCardInstructionIncidental = card => card.getCardTargetingType() === 'you' ? '' : 's';

const getCardIncidental = amount => amount > 1 ? 's' : '';

export default class CardEffectText extends EffectText {
    constructor(text) {
        super(text, cardEffect);
    }

    getCardTargetingType() {
        const text = this.parse.groups.cardTargetingType;

        if (text.includes('target')) {
            return text
            .split(' ')[0]
            .replace("'s", '')
            .toLowerCase();
        } else {
            return text.toLowerCase();
        }
    }

    getCardModifier() {
        return this.parse.groups.cardModifier.trim();
    }

    getTopOrBottom() {
        const text = this.parse.groups.topOrBottom;

        return text === 'top' ? text : text.split(' ')[1];
    }

    getGrimoireTargeting() {
        const text = this.parse.groups.grimoireTargeting;

        return text === 'target' ? text : 'own';
    }

    setCardModifier(modifier) {
        const text = `${modifier} `;

        if (new RegExp(cardModifier).test(text) || modifier === '') {
            this.replaceText('cardModifier', text)
        } else {
            throw new TextGenerationError(`'${modifier}' is not a valid card modifier`)
        }

        return this;
    }

    setInstruction(instruction) {
        if (new RegExp(cardInstruction).test(instruction)) {
            if (this.getCardModifier() && instruction === 'draw') {
                this.setCardModifier('');
            }

            this
            .replaceText('instruction', instruction)
            .replaceText('instructionIncidental', getCardInstructionIncidental(this))
        } else {
            throw new TextGenerationError(`'${instruction}' is not a valid card instruction`);
        }

        return this;
    }

    setAmount(amount) {
        if (typeof amount === 'number') {
            const start = this.text.indexOf('card') + 4;
            const end = start + 1;

            this
            .replaceText('amount', String(amount))
            .replaceText('cardIncidental', getCardIncidental(amount), [start, end])
        } else {
            throw new TextGenerationError(`'${amount}' is not a number`)
        }

        return this;
    }
}