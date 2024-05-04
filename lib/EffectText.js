// Regex string patterns

const amount = '[0-9]+';
const word = '(burn|wet|cold)';
const stat = '(wellness|awareness|agility|swiftness|speed|power)';

const targetType = "[a-z ']+";
const targetClass = '(character|enemy|ally|object|spell|effect|offensive effect|defensive effect|utility effect|card)';
const sweeperTarget = '[a-z ]+';

const timeModifier = `[a-z ]+|(?<timeModifierAmount>${amount}) more (?<timeModifierType>(turns|exchanges))`;

const instruction = '(Deal|Apply|Increase|Decrease|Set|Draw|Heal|Increase damage|Decrease damage|Increase heal|Decrease heal|Set damage to|Set heal to|)';
const sweeperAction = '[A-Za-z]+';
const effect = `(?<sweeperAction>${sweeperAction}) all (?<sweeperTarget>${sweeperTarget})|(?<instruction>${instruction}) ((?<amount>${amount})|(?<words>(${word}(, )?)+)|(?<stat>${stat})) (?<statAmount>${amount} )?(by|to|for) (?<targetType>${targetType}) (?<targetClass>${targetClass})( for (?<timeModifier>${timeModifier}))?`;

export default class EffectText {
    constructor(text) {
        this.parse = text.match(new RegExp(effect)).groups;

        if (this.parse.words) {
            this.parse.wordArray = this.parse.words.split(', ');
        }
    }
}

console.log(new EffectText("Apply wet, cold to independent target object for 3 more turns"))