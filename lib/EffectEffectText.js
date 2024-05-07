import EffectText from './EffectText.js';
import { effectEffect } from './effect-text-regexps.js';

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
}