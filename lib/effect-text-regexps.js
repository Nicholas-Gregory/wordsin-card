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
export const modifierInstruction = 'Change|Set|Increase|Decrease|Multiply|Divide|Remove';
export const modifierArgument = 'Deal|Heal|Increase|Decrease|Set|Apply|Multiply|Divide|Discard|Reveal|Draw|Put|Shuffle|Copy';
export const modifierEffect = `(?<instruction>${modifierInstruction}) ("(?<argument>${modifierArgument}) ?(?<words>${words})?"|instruction|target type) (to|by|from) ((?<amount>${amount})|"(?<changedInstruction>(${stateInstruction})|(${modifierInstruction}))"|"((?<changedTargetType>${targetType})('s)?( target)?)")?( for )?(?<targetType>${targetType})(?<targetIncidental>${targetIncidental})? effect(s)?(${timeModifier})?`;

// Card
export const cardTargetingType = `(Independent|Card's) target|All|You`;
export const cardTargetClass = `character(s)?|enem(y|ies)|all(y|ies)`
export const cardInstruction = `discard|reveal|draw|put|shuffle`;
export const cardModifier = `chosen |target |random `;
export const topOrBottom = `top|the bottom`;
export const grimoireTargeting = `target|their|your`;
export const cardEffect = `(?<cardTargetingType>${cardTargetingType})( (?<targetClass>${cardTargetClass}))? (?<instruction>${cardInstruction})(?<instructionIncidental>s)? (?<amount>${amount}) (?<cardModifier>${cardModifier})?card(?<cardIncidental>s)? ?((on (?<topOrBottom>${topOrBottom}))|(into))? ?((of )?(?<grimoireTargeting>${grimoireTargeting}))? ?(grimoire)?`;

// Effect
const removeCaptureTags = text => text.replaceAll(/\?\<[a-zA-Z]+\>/g, '');

export const effectInstruction = `Change|Add|Remove|Copy`;
export const effectTargetClass = `card's text|effect`;
export const effects = `(("(${removeCaptureTags(stateEffect)})"|"(${removeCaptureTags(modifierEffect)})"|"(${removeCaptureTags(cardEffect)})")(, )?)+`;
export const effectEffect = `(?<instruction>${effectInstruction})( (to|from))? (?<targetType>${targetType})(?<targetIncidental>${targetIncidental}) (?<targetClass>${effectTargetClass}) (to )?(((?<amount>${amount}) time(?<copyIncidental>s)?)|(?<effects>${effects})|((?<effectTargetType>${targetType})(?<effectTargetIncidental>${targetIncidental}) effect))(${timeModifier})?`;