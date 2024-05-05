// Regex string patterns

const amount = '[0-9]+';
const word = '(burn|wet|cold)';
const stat = '(wellness|awareness|agility|swiftness|speed|power)';

const targetType = "(independent target|card's target)";
const targetClass = '(character|enemy|ally|object|spell|effect|offensive effect|defensive effect|utility effect|card)';
const sweeperTarget = '[a-z ]+';

const timeModifier = `[a-z ]+|(?<timeModifierAmount>${amount}) more (?<timeModifierType>(turns|exchanges))`;

const instruction = '(Deal|Apply|Increase|Decrease|Set|Draw|Heal|Increase damage|Decrease damage|Increase heal|Decrease heal|Set damage to|Set heal to|Counter|Destroy|Kill)';
const sweeperAction = '[A-Za-z]+';
const effect = `(?<sweeperAction>${sweeperAction}) all (?<sweeperTarget>${sweeperTarget})|(?<instruction>${instruction}) ((?<amount>${amount}) |(?<words>(${word}(, )?)+) |(?<stat>${stat}) )?(to )?(?<statAmount>${amount} )?(by |to |for )?(?<targetType>${targetType}) (?<targetClass>${targetClass})( for (?<timeModifier>${timeModifier}))?`;

const secondOrderEffect = `(?<secondOrderType>Insert|Change text to) (?<secondOrderEffects>("((${effect.replaceAll(/\?<[a-zA-Z]+>/g, '')}))+"(, )?)+) (into|for) (?<secondOrderTargetType>${targetType}) card`

console.log(secondOrderEffect)

export default class EffectText {
    constructor(text) {
        this.parse = text.match(new RegExp(secondOrderEffect));
        
        
        if (!this.parse) {
            this.parse = text.match(new RegExp(effect));
        }
    }

    isSweeper() {
        return this.parse.groups.sweeperAction ? true : false;
    }

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
    }secondOrderTargetClass

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

    isSecondOrderEffect() {
        return this.parse.groups.secondOrderType ? true : false;
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
        console.log

        return undefined;
    }

    getSecondOrderEffects() {
        if (this.isSecondOrderEffect()) {
            console.log(this.parse.groups.secondOrderEffects);
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
}