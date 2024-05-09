import { effectRegExp, getListRegExp, targetIncidental } from "./regexps.js";
import TextGenerationError from './errors/TextGenerationError.js';
import TextParsingError from './errors/TextParsingError.js';
import { getTargetPluralization, getTargetSingular, getVerbSingular } from "./helpers.js";
import lists from "./lists.js";

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
        if (this.parse.groups[property]) {
            const [start, end] = this.getIndices(property);

            this.text = `${this.text.substring(0, start)}${newText}${this.text.substring(end)}`;

            this.parseText();
        }

        return this;
    }

    // #region Getters

    getKeywords() {
        const keywords = this.parse.groups.keywords
        .trim()
        .split(' ');

        return keywords.map(keyword => (
            !lists.KEYWORDS.includes(keyword) ? (
                keyword.match(getListRegExp('KEYWORDS'))[0]
            ) : (
                keyword
            )
        ));
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

    // #region Fixers

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

        return this.replaceText('outerIncidental', `${outer}`)
    }

    fixOuterPluralization() {
        let pluralizationText;
        let outerTarget = this.getOuterTarget()

        switch(this.getOuterTargeting()) {
            case `all`:
                pluralizationText = getTargetPluralization(outerTarget);
                break;
            default:
                pluralizationText = getTargetSingular(outerTarget);
        }

        return this.replaceText('outerPluralization', pluralizationText);
    }

    fixVerbIncidental() {
        let verbIncidental;
        const outerTargeting = this.getOuterTargeting();

        if (outerTargeting === 'all' || outerTargeting === `` || outerTargeting === undefined) {
            verbIncidental = ``;
        } else {
            verbIncidental = getVerbSingular(this.getAction());
        }

        return this.replaceText('verbIncidental', `${verbIncidental} `);
    }

    fixActionIncidental() {
        const action = this.getAction();

        if ([
            'deal',
            'apply',
            'change'
        ].includes(action)) {
            return this.replaceText('actionIncidental', 'to ')
        }

        if ([
            'heal',
            'change',
            'set',
            'add',
            'subtract',
            'multiply',
            'divide'
        ].includes(action)) {
            return this.replaceText('actionIncidental', 'for ')
        }

        if ([
            'destroy',
            'kill'
        ].includes(action)) {
            return this.replaceText('actionIncidental', ' ');
        }

        return this;
    }

    fixTargetIncidental() {
        const targeting = this.getTargeting();

        if (targeting === 'independent') {
            return this.replaceText('targetIncidental', ' target ')
        } else if (targeting === 'card') {
            return this.replaceText('targetIncidental', `'s target `)
        } else {
            return this.replaceText('targetIncidental', ` `);
        }
    }

    noTimeOrGrimoire() {
        return !this.getTimeModifierAmount() && !this.getGrimoireTargeting();
    }

    fixTargetPluralization() {
        const targeting = this.getTargeting();
        const target = this.getTarget();
        const isEnd = this.noTimeOrGrimoire();
        let text;

        if (targeting === 'all') {
            text = getTargetPluralization(target);
        } else {
            text = getTargetSingular(target);
        }

        if (isEnd) {
            text = text.trim();

            if (!this.parse.groups.mainPluralization) {
                this.text = `${this.text}${text}`;

                return this;
            }
        }

        return this.replaceText('mainPluralization', text);
    }

    // #endregion

    // #region Setters

    setOuterTargeting(targeting) {
        if (getListRegExp('TARGETING').includes(targeting)) {
            return this
            .replaceText('outerTargeting', targeting)
            .fixOuterIncidental()
            .fixOuterPluralization()
            .fixVerbIncidental();
        } else {
            throw new TextGenerationError(`'${targeting}' is not a valid targeting keyword`);
        }
    }

    setOuterTarget(target) {
        if (getListRegExp('TARGET').includes(target)) {
            return this
            .replaceText('outerTarget', target)
            .fixOuterPluralization()
        } else {
            throw new TextGenerationError(`'${target}' is not a valid target`);
        }
    }

    setKeywords(keywords) {
        if (keywords.every(keyword => (
            lists.KEYWORDS.includes(keyword)
        ))) {
            return this.replaceText('keywords', keywords.join(` `));
        } else {
            throw new TextGenerationError(`'${keywords.find(keyword => !lists.KEYWORDS.includes(keyword))}' is not a valid keyword`);
        }
    }

    setAction(action) {
        if (lists.KEYWORDS.includes(action)) {
            return this.getKeywords().length > 1 ? (
                this
                .setKeywords([action, ...this.getKeywords()])
                .fixVerbIncidental()
                .fixActionIncidental()
            ) : (
                this
                .replaceText('keywords', `${action} `)
                .fixVerbIncidental()
                .fixActionIncidental()
            );
        } else {
            throw new TextGenerationError(`'${action}' is not a valid action`);
        }
    }

    setAmount(amount) {
        if (typeof amount === 'number') {
            return this.replaceText('amount', String(amount));
        } else {
            throw new TextGenerationError(`'${amount}' is not a number`);
        }
    }

    setTargeting(targeting) {
        if (lists.TARGETING.includes(targeting)) {
            return this
            .replaceText('targeting', targeting)
            .fixTargetIncidental()
            .fixTargetPluralization();
        } else {
            throw new TextGenerationError(`'${targeting}' is not a valid targeting keyword`);
        }
    }

    setTarget(target) {
        if (lists.TARGET.includes(target)) {
             return this
            .replaceText('target', target)
            .fixTargetPluralization()
        } else {
            throw new TextGenerationError(`'${target}' is not a valid target`)
        }
    }

    // #endregion
}