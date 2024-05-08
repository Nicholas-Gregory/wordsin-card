import { lists } from "./lists.js";

export const getListRegExp = listName => lists[listName]
.reduce((string, word, index, list) => (
    index === list.length ? (
        string + word
    ) : (
        `${string}|${word}`
    )
));

export const amount = `[0-9]+`;
export const actionIncidental = `to|for| `;
export const pluralization = `y|ies|s| `;
export const possessiveTargetingIncidental = `'s| `;
export const wordTargetIncidental = `target| `;
export const timeModifier =`( for (?<timeModifier>the rest of the encounter|(?<timeModifierAmount>${amount}) more (?<timeModifierSpan>${getListRegExp('TIME')})(?<spanIncidental>${pluralization})?))`;

export const effectRegExp = `((?<outerTargeting>${getListRegExp('TARGETING')}) ?(?<outerPossessiveTargetingIncidental>${possessiveTargetingIncidental})? ?(?<outerWordTargetIncidental>${wordTargetIncidental})? ?(?<outerTarget>${getListRegExp('TARGET')})(?<outerPluralization>${pluralization}))? ?(?<keywords>((${getListRegExp('KEYWORDS')}) ?)+)(?<verbIncidental>${pluralization})? ?(?<amount>${amount})? ?(?<actionIncidental>${actionIncidental})? ?((?<targeting>${getListRegExp('TARGETING')}) ?(?<mainPossessiveTargetingIncidental>${possessiveTargetingIncidental})? ?(?<mainWordTargetIncidental>${wordTargetIncidental})?)? ?(?<target>${getListRegExp('TARGET')})(?<mainPluralization>${pluralization})?(${timeModifier})? ?(into )? ?(?<grimoireTargeting>${getListRegExp('TARGETING')})?(?<grimoirePossessiveTargetingIncidental>${possessiveTargetingIncidental})? ?(?<grimoireWordTargetIncidental>${wordTargetIncidental})? ?(grimoire)?`;