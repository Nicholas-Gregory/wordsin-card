import EffectText from './EffectText.js';
import { effectEffect } from './effect-text-regexps.js';

export default class EffectEffectText extends EffectText {
    constructor(text) {
        super(text, effectEffect);
    }


}