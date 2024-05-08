import { effectRegExp, getListRegExp, pluralization } from "./regexps.js";
import TextGenerationError from './errors/TextGenerationError.js';
import { getTargetPluralization, getTargetSingular, getVerbSingular } from "./helpers.js";

export default class EffectText {
    constructor(text) {
        this.text = text;

        this.parseText();
    }

    parseText() {
        this.parse = this.text.match(new RegExp(effectRegExp, 'd'));

        if (this.parse === null) throw new TextParsingError();

        return this;
    }

    getIndices(property) {
        return this.parse.indices.groups[property];
    }

    replaceText(property, newText) {
        const [start, end] = this.getIndices(property);

        this.text = `${this.text.substring(0, start)}${newText}${this.text.substring(end)}`;

        this.parseText();

        return this;
    }

    // #region Getters

    getKeywords() {
        return this.parse.groups.keywords
        .trim()
        .split(' ');
    }

    getAction() {
        return this.getKeywords()[0];
    }

    getAmount() {
        return Number(this.parse.groups.amount);
    }

    getOuterTargeting() {
        return this.parse.groups.outerTargeting;
    }

    getOuterTarget() {
        return this.parse.groups.outerTarget;
    }

    getTargeting() {
        return this.parse.groups.targeting;
    }

    getTarget() {
        return this.parse.groups.target;
    }

    getGrimoireTargeting() {
        return this.parse.groups.grimoireTargeting;
    }

    getTimeModifierAmount() {
        return Number(this.parse.groups.timeModifierAmount);
    }

    getTimeModifierSpan() {
        return this.parse.groups.timeModifierSpan;
    }

    isRestOfEncounter() {
        return this.parse.groups.timeModifier === 'the rest of the encounter';
    }

    // #endregion

    // #region Setters

    fixOuterIncidental() {
        let outer;

        switch(this.getOuterTargeting()) {
            case `card`:
                outer = `'s target `;
                break;
            case `independent`:
                outer = ` target `;
                break;
            default:
                outer = ` `;
        }

        return this.replaceText('outerIncidental', outer)
    }

    fixOuterPluralization() {
        let pluralizationText;
        let outerTarget = this.getOuterTarget()

        switch(this.getOuterTargeting()) {
            case `all`:
                pluralizationText = getTargetPluralization(outerTarget)
            default:
                pluralizationText = getTargetSingular(outerTarget);
        }

        return this.replaceText('outerPluralization', pluralizationText);
    }

    fixVerbIncidental() {
        let verbIncidental;

        switch(this.getOuterTargeting()) {
            case 'all':
                verbIncidental = ``;
                break;
            default:
                verbIncidental = getVerbSingular(this.getAction())
        }

        return this.replaceText('verbIncidental', `${verbIncidental} `);
    }

    setOuterTargeting(targeting) {
        if (getListRegExp('TARGETING').includes(targeting)) {
            return this
            .replaceText('outerTargeting', targeting)
            .fixOuterIncidental()
            .fixOuterPluralization()
            .fixVerbIncidental();
        } else {
            throw new TextGenerationError(`'${targeting}' is not a valid outer targeting keyword`);
        }
    }

    // #endregion
}