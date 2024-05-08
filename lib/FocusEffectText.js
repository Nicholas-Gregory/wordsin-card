import { focusEffect } from "./effect-text-regexps.js";
import EffectText from './EffectText.js';

export default class FocusEffectText extends EffectText {
    constructor(text) {
        super(text, focusEffect);
    }

    getTargetType() {
        return super.getTargetType().toLowerCase();
    }
}