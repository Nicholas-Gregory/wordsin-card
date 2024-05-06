import TextGenerationError from './errors/TextGenerationError.js';

// #region Regex string patterns

const amount = '[0-9]+';
const word = '(burn|wet|cold)';
const stat = '(wellness|awareness|agility|swiftness|speed|power)';

const targetType = "(independent target|card's target|all|random target)";
const targetClass = '(character|enemy|ally|object|spell|effect|offensive effect|defensive effect|utility effect|card)';
const sweeperTarget = 'characters|enemies|allies|objects|spells|effects|offensive effects|defensive effects|utility effects|cards';

const outerTarget = 'character|enemy|ally|You';

const timeModifier = `[a-z ]+|(?<timeModifierAmount>${amount}) more (?<timeModifierType>(turns|exchanges))`;

const instruction = 'Deal|Apply|Increase|Decrease|Set|Draw|Heal|Counter|Destroy|Kill|draw(s)?|discard(s)?|reveal(s)?';
const instructionModifier = `heal|damage`;

const effect = `((Target )?(?<outerTarget>${outerTarget}) )?(?<instruction>${instruction}) (?<instructionModifier>${instructionModifier})? ?((?<amount>${amount}) ?|(?<words>(${word}(, )?)+) |(?<stat>${stat}) )?(?<statAmount>${amount} )? ?(?<incidental>|to |for )? ?(all)?((?<targetType>${targetType}) ((?<targetClass>${targetClass})))? ?(?<sweeperTarget>${sweeperTarget})?( ?for (?<timeModifier>${timeModifier}))?`;
const secondOrderEffect = `(?<secondOrderType>Insert|Change text to) (?<secondOrderEffects>("((${effect.replaceAll(/\?<[a-zA-Z]+>/g, '')}))+"(, )?)+) (into|for) (?<secondOrderTargetType>${targetType}) card( ?for (?<timeModifier>${timeModifier}))?`

// #endregion

// #region Incedental wordings

const targetingIncidentals = {
    deal: 'to',
    apply: 'to',
    increase: 'for',
    decrease: 'for',
    set: 'for',
    heal: 'for',
    increase: 'for',
    decrease: 'for',
    set: 'for'
}

// #endregion

// #region Helpers

const capitalize = text => `${text.substring(0, 1).toUpperCase()}${text.substring(1)}`;

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
        return this.parse.groups.sweeperTarget ? true : false;
    }

    isSecondOrderEffect() {
        return this.parse.groups.secondOrderType ? true : false;
    }

    // #region Getters

    getOuterTarget() {
        // console.log(this.parse.groups)
        return this.parse.groups.outerTarget;
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

    getInstructionModifier() {
        return this.parse.groups.instructionModifier;
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
            throw new TextGenerationError(`'${actionValue}' is not a valid sweeper action`)
        }

        if (this.isSweeper()) {
            const [start, end] = this.getIndices('sweeperAction');

            this.text = `${actionValue} ${this.text.substring(end + 1)}`;

            this.parseText();
        }

        return this;
    }

    setSweeperTarget(targetValue) {
        if (!new RegExp(sweeperTarget).test(targetValue)) {
            throw new TextGenerationError(`'${targetValue}' is not a valid sweeper target`);
        }

        if (this.isSweeper()) {
            const [start] = this.getIndices('sweeperTarget');

            this.text = `${this.text.substring(0, start)}${targetValue}`;

            this.parseText();
        }

        return this;
    }

    setInstruction(instructionValue) {
        if (!new RegExp(instruction).test(capitalize(instructionValue))) {
            throw new TextGenerationError(`'${instructionValue}' is not a valid instruction`);
        }

        if (this.getInstruction()) {
            const [start, end] = this.getIndices('instruction');
            const [incidentalStart, incidentalEnd] = this.getIndices('incidental');
            const incidental = targetingIncidentals[instructionValue];

            this.text = `${capitalize(instructionValue)} ${this.text.substring(end + 1, incidentalStart)}${incidental} ${this.text.substring(incidentalEnd)}`;

            this.parseText();
        }

        return this;
    }

    setInstructionModifier(modifierValue) {
        if(!new RegExp(instructionModifier).test(modifierValue)) {
            throw new TextGenerationError(`'${modifierValue}' is not a valid instruction modifier`);
        }

        if (this.getInstructionModifier()) {
            const [start, end] = this.getIndices('instructionModifier');

            this.text = `${this.text.substring(0, start)}${modifierValue}${this.text.substring(end)}`;

            this.parseText();
        }

        return this;
    }

    setAmount(amountValue) {
        if (typeof amountValue !== 'number') {
            throw new TextGenerationError(`'${amountValue}' is not a number`);
        }

        if (this.getAmount()) {
            const [start, end] = this.getIndices('amount');

            this.text = `${this.text.substring(0, start)}${String(amountValue)} ${this.text.substring(end + 1)}`;

            this.parseText();
        }

        return this;
    }

    setWords(wordArray) {
        if (!wordArray.every(w => new RegExp(word).test(w))) {
            throw new TextGenerationError(`'${wordArray.find(w => !new RegExp(word).test(w))}' is not a valid word`);
        }
        
        if (this.getWords()) {
            const [start, end] = this.getIndices('words');
            const string = wordArray.join(', ');

            this.text = `${this.text.substring(0, start)}${string} ${this.text.substring(end + 1)}`;

            this.parseText();
        }

        return this;
    }

    setStat(statValue) {
        if (!new RegExp(stat).test(statValue)) {
            throw new TextGenerationError(`'${statValue}' is not a valid stat`);
        }

        if (this.getStat()) {
            const [start, end] = this.getIndices('stat');

            this.text = `${this.text.substring(0, start)}${statValue} ${this.text.substring(end + 1)}`;

            this.parseText();
        }

        return this;
    }

    setStatAmount(amountValue) {
        if (typeof amountValue !== 'number') {
            throw new TextGenerationError(`'${amountValue}' is not a number`);
        }

        if (this.getStatAmount()) {
            const [start, end] = this.getIndices('statAmount');

            this.text = `${this.text.substring(0, start)}${String(amountValue)} ${this.text.substring(end)}`;
            
            this.parseText();
        }

        return this;
    }

    setTargetType(typeValue) {
        if (!/card|independent/.test(typeValue)) {
            throw new TextGenerationError(`'${typeValue}' is not a valid target type`)
        }

        if (this.getTargetType()) {
            const [start, end] = this.getIndices('targetType');
            const string = /card/.test(typeValue) ? "card's target" : 'independent target';

            this.text = `${this.text.substring(0, start)}${string} ${this.text.substring(end + 1)}`;
            
            this.parseText();
        }

        return this;
    }

    setTargetClass(classValue) {
        if (!new RegExp(targetClass).test(classValue)) {
            throw new TextGenerationError(`'${classValue}' is not a valid target class`);
        }

        if (this.getTargetClass()) {
            const [start, end] = this.getIndices('targetClass');

            this.text = `${this.text.substring(0, start)}${classValue} ${this.text.substring(end + 1)}`;

            this.parseText()
        }

        return this;
    }

    setTimeModifierAmount(amountValue) {
        if (!typeof amountValue === 'number') {
            throw new TextGenerationError(`'${amountValue}' is not a number`)
        }

        if (this.getTimeModifierAmount()) {
            const [start, end] = this.getIndices('timeModifierAmount');

            this.text = `${this.text.substring(0, start)}${String(amountValue)} ${this.text.substring(end + 1)}`;

            this.parseText()
        }

        return this;
    }

    setTimeModifierType(typeValue) {
        if (!/turns|exchanges/.test(typeValue)) {
            throw new TextGenerationError(`'${typeValue} is not a valid time modifier type`);
        }

        if (this.getTimeModifierType()) {
            const [start, end] = this.getIndices('timeModifierType');

            this.text = `${this.text.substring(0, start)}${typeValue} ${this.text.substring(end + 1)}`;

            this.parseText();
        }

        return this;
    }

    // #endregion
}