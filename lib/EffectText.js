import TextGenerationError from './errors/TextGenerationError.js';

// #region Regex string patterns

const amount = '[0-9]+';
const word = '(burn|wet|cold)';
const stat = '(wellness|awareness|agility|swiftness|speed|power)';

const targetType = "(independent target|card's target)";
const targetClass = '(character|enemy|ally|object|spell|effect|offensive effect|defensive effect|utility effect|card)';
const sweeperTarget = 'characters|enemies|allies|objects|spells|effects|offensive effects|defensive effects|utility effects|cards';

const timeModifier = `[a-z ]+|(?<timeModifierAmount>${amount}) more (?<timeModifierType>(turns|exchanges))`;

const instruction = '(Deal|Apply|Increase|Decrease|Set|Draw|Heal|Increase damage|Decrease damage|Increase heal|Decrease heal|Set damage|Set heal|Counter|Destroy|Kill)';
const sweeperAction = '[A-Za-z]+';
const effect = `(?<sweeperAction>${sweeperAction}) all (?<sweeperTarget>${sweeperTarget})|(?<instruction>${instruction}) ((?<amount>${amount}) |(?<words>(${word}(, )?)+) |(?<stat>${stat}) )?(?<statAmount>${amount} )?(?<incidental>|to |for )?(?<targetType>${targetType}) (?<targetClass>${targetClass})( for (?<timeModifier>${timeModifier}))?|`;

const secondOrderEffect = `(?<secondOrderType>Insert|Change text to) (?<secondOrderEffects>("((${effect.replaceAll(/\?<[a-zA-Z]+>/g, '')}))+"(, )?)+) (into|for) (?<secondOrderTargetType>${targetType}) card`

// #endregion

// #region Incedental wordings

const targetingIncidentals = {
    deal: 'to',
    apply: 'to',
    increase: 'for',
    decrease: 'for',
    set: 'for',
    heal: 'for',
    'increase damage': 'for',
    'decrease damage': 'for',
    'increase heal': 'for',
    'decrease heal': 'for',
    'set damage': 'for',
    'set heal': 'for'
}

// #endregion

// #region Helpers

const capitalize = text => `${text.substring(0, 1).toUpperCase()}${text.substring(1)}`

// #endregion

export default class EffectText {
    constructor(text) {
        this.text = text;

        this.parseText()
    }

    parseText() {
        this.parse = this.text.match(new RegExp(secondOrderEffect, 'd'));
        
        if (!this.parse) {
            this.parse = this.text.match(new RegExp(effect, 'd'));
        }
    }

    isSweeper() {
        return this.parse.groups.sweeperAction ? true : false;
    }

    isSecondOrderEffect() {
        return this.parse.groups.secondOrderType ? true : false;
    }

    // #region Getters

    getSweeperAction() {
        if (this.isSweeper()) {
            return this.parse.groups.sweeperAction.toLowerCase();
        }

        return undefined;
    }

    getSweeperTarget() {
        if (this.isSweeper()) {
            return this.parse.groups.sweeperTarget;
        }

        return undefined;
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

    getStat() {
        return this.parse.groups.stat;
    }

    getStatAmount() {
        return Number(this.parse.groups.statAmount);
    }

    getTargetType() {
        return this.parse.groups.targetType
        .match(/^independent|card/)[0];
    }

    getTargetClass() {
        return this.parse.groups.targetClass;
    }

    getTimeModifier() {
        return this.parse.groups.timeModifier;
    }

    getTimeModifierAmount() {
        return Number(this.parse.groups.timeModifierAmount);
    }

    getTimeModifierType() {
        return this.parse.groups.timeModifierType;
    }

    getSecondOrderType() {
        if (this.isSecondOrderEffect()) {
            return this.parse.groups.secondOrderType
            .match(/^Insert/) ? (
                'insert'
            ) : (
                'change'
            );
        }

        return undefined;
    }

    getSecondOrderEffects() {
        if (this.isSecondOrderEffect()) {            
            return this.parse.groups.secondOrderEffects
            .replaceAll('"', '')
            .split(', ');
        }

        return undefined;
    }

    getSecondOrderTargetType() {
        if (this.isSecondOrderEffect()) {
            return this.parse.groups.secondOrderTargetType
            .match(/^independent/) ? (
                'independent'
            ) : (
                'card'
            );
        }

        return undefined;
    }

    // #endregion

    getIndices(property) {
        return this.parse.indices.groups[property];
    }

    // #region Setters

    setSweeperAction(actionValue) {
        if (!/destroy|kill|counter/.test(actionValue)) {
            throw new TextGenerationError(`${actionValue} is not a valid sweeper action`)
        }

        if (this.isSweeper()) {
            const [start, end] = this.getIndices('sweeperAction');

            this.text = `${actionValue} ${this.text.substring(end + 1)}`;

            this.parseText();
        }
    }

    setSweeperTarget(targetValue) {
        if (!new RegExp(sweeperTarget).test(targetValue)) {
            throw new TextGenerationError(`${targetValue} is not a valid sweeper target`);
        }

        if (this.isSweeper()) {
            const [start] = this.getIndices('sweeperTarget');

            this.text = `${this.text.substring(0, start)}${targetValue}`;

            this.parseText();
        }
    }

    setInstruction(instructionValue) {
        if (!new RegExp(instruction).test(capitalize(instructionValue))) {
            throw new TextGenerationError(`${instructionValue} is not a valid instruction`);
        }

        if (!this.isSweeper() && !this.isSecondOrderEffect()) {
            const [start, end] = this.getIndices('instruction');
            const [incidentalStart, incidentalEnd] = this.getIndices('incidental');
            const incidental = targetingIncidentals[instructionValue];

            this.text = `${capitalize(instructionValue)} ${this.text.substring(end + 1, incidentalStart)}${incidental} ${this.text.substring(incidentalEnd)}`;

            this.parseText();
        }
    }

    // #endregion
}