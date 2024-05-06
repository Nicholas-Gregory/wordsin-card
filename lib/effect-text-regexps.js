// All
export const amount = '[0-9]+';
export const targetType = "independent|card|all";
export const timeModifierSpan = 'turns|exchanges';
export const timeModifier = `( for (?<timeModifier>the rest of the encounter|(?<timeModifierAmount>${amount}) more (?<timeModifierSpan>${timeModifierSpan})))`;

// State
export const stateInstruction = 'Deal|Heal|Increase|Decrease|Apply|Destroy|Kill';
export const targetClass = 'character(s)?|enem(y|ies)|all(y|ies)|object(s)?|spell(s)?|effect(s)?|offensive effect(s)?|defensive effect(s)?|utility effect(s)?';
export const word = 'burn|wet|cold';
export const words = `((${word})(, )?)+`;
export const stat = 'wellness|awareness|agility|swiftness|speed|power';
export const stateEffect = `(?<instruction>${stateInstruction}) ?((?<amount>${amount})|(?<words>${words}))? ?(?<incidental>to|for)? ?((?<stat>${stat}) for)? ?(?<targetType>${targetType})(?<targetIncidental>'s target| target)? (?<targetClass>${targetClass})(${timeModifier})?`