import lists from "./lists.js";

export const getListRegExp = listName => lists[listName]
.reduce((string, word, index, list) => (
    index === list.length ? (
        string + word
    ) : (
        `${string}|${word}`
    )
));

export const amount = `[0-9]+`;
export const actionIncidental = `to |for | `;
export const pluralization = `y |ies |s | `;
export const targetIncidental = `'s target | target | `;
export const timeModifier =`(for (?<timeModifier>the rest of the encounter|(?<timeModifierAmount>${amount}) more (?<timeModifierSpan>${getListRegExp('TIME')})(?<spanIncidental>${pluralization})?))`;

export const effectRegExp = `((?<outerTargeting>${getListRegExp('TARGETING')})(?<outerIncidental>${targetIncidental})(?<outerTarget>${getListRegExp('TARGET')})(?<outerPluralization>${pluralization})?)?(?<keywords>((${getListRegExp('KEYWORDS')})(?<verbIncidental>${pluralization})?)+)(?<amount>${amount})? ?(?<actionIncidental>${actionIncidental})?((?<targeting>${getListRegExp('TARGETING')})(?<targetIncidental>${targetIncidental}))?(?<target>${getListRegExp('TARGET')})(?<mainPluralization>${pluralization})?(${timeModifier})? ?(into )? ?(?<grimoireTargeting>${getListRegExp('TARGETING')})?(?<grimoireTargetingIncidental>${targetIncidental})?(grimoire)?`;