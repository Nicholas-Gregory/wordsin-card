import EffectText from './EffectText.js';
import { cardEffect } from './effect-text-regexps.js';

export default class CardEffectText extends EffectText {
    constructor(text) {
        // console.log(cardEffect);
        super(text, cardEffect);
    }

    getCardTargetingType() {
        return this.parse.groups.cardTargetingType.toLowerCase();
    }
}