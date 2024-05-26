import System from "./System.js";

const advanceLinear = dialogue => dialogue.index++;

const advanceChoice = (dialogue, choice) => dialogue.index = dialogue.events[dialogue.index][choice];

const dialogueSystemCallback = (dialogue, choice) => {
    if (choice) {
        advanceChoice(dialogue, choice);
    } else {
        advanceLinear(dialogue);
    }
}

export default class DialogueSystem extends System {
    constructor(entities) {
        super(['index', 'events'], null, entities, dialogueSystemCallback);
    }
}