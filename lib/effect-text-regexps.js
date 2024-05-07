// Multi
export const amount = '[0-9]+';
export const targetType = "independent|card|all";
export const targetIncidental = "'s target| target";
export const timeModifierSpan = 'turn|exchange';
export const timeModifier = `( for (?<timeModifier>the rest of the encounter|(?<timeModifierAmount>${amount}) more (?<timeModifierSpan>${timeModifierSpan})(?<spanIncidental>s)?))`;
export const word = 'burn|wet|cold';
export const words = `((${word})(, )?)+`;

// State
export const stateInstruction = 'Deal|Heal|Increase|Decrease|Set|Apply|Destroy|Kill';
export const targetClass = 'character(s)?|enem(y|ies)|all(y|ies)|object(s)?|spell(s)?|effect(s)?|offensive effect(s)?|defensive effect(s)?|utility effect(s)?';
export const stat = 'wellness|awareness|agility|swiftness|speed|power';
export const stateEffect = `(?<instruction>${stateInstruction}) ?((?<amount>${amount})|(?<words>${words}))? ?(?<incidental>to|for)? ?((?<stat>${stat}) for)? ?(?<targetType>${targetType})(?<targetIncidental>${targetIncidental})? (?<targetClass>${targetClass})(${timeModifier})?`;

// Modifier
export const modifierInstruction = 'Set|Increase|Decrease|Multiply|Divide|Remove';
export const modifierArgument = 'Deal|Heal|Increase|Decrease|Set|Apply|Multiply|Divide';
export const modifierEffect = `(?<instruction>${modifierInstruction}) "(?<argument>${modifierArgument}) ?(?<words>${words})?" (to|by|from) (?<amount>${amount})?( for )?(?<targetType>${targetType})(?<targetIncidental>${targetIncidental}) (word )?effect`;