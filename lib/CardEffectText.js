import EffectText from './EffectText.js';
import { cardEffect } from './effect-text-regexps.js';

export default class CardEffectText extends EffectText {
    constructor(text) {
        // console.log(cardEffect);
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
        return this.parse.groups.cardModifier;
    }

    getTopOrBottom() {
        const text = this.parse.groups.topOrBottom;

        return text === 'top' ? text : text.split(' ')[1];
    }

    getGrimoireTargeting() {
        const text = this.parse.groups.grimoireTargeting;

        return text === 'target' ? text : 'own';
    }
}