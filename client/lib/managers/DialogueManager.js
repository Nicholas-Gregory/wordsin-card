import EventSystem from "../../../lib/systems/EventSystem.js";

const needed = [
    'index',
    'renderer',
    'wordWrapTextRenderers',
    'shadowBoxRenderer',
    'events',
    'nextButton'
];

const showShadowBox = entity => entity.renderer.addChild(entity.shadowBoxRenderer);

const hideShadowBox = entity => entity.renderer.removeChild(entity.shadowBoxRenderer);

const getCurrentText = entity => entity.wordWrapTextRenderers[entity.index];

const showCurrentText = entity => entity.renderer.addChild(getCurrentText(entity));

const hideCurrentText = entity => entity.renderer.removeChild(getCurrentText(entity));

const advanceLinear = entity => entity.index++;

const advanceChoice = (entity, choice) => entity.index = entity.events[entity.index][choice];

const showNextButton = entity => entity.renderer.addChild(entity.nextButton);

const hideNextButton = entity => entity.renderer.removeChild(entity.nextButton);

const dialogueManagerCallback = (entity, choice) => {
    hideCurrentText(entity);
    hideNextButton(entity);

    if (entity.events[entity.index].end) {
        hideShadowBox(entity);
        return;
    }

    showShadowBox(entity);

    if (choice) {
        advanceChoice(entity, choice);
    } else if (choice === null) {
        advanceLinear(entity);
    }

    if (entity.events[entity.index].choices) {
        // show choice buttons
    } else {
        showNextButton(entity);
    }

    showCurrentText(entity);
};


export default class DialogueManager extends EventSystem {
    constructor(entities) {
        super(needed, null, entities, dialogueManagerCallback, ['nextbuttonclick', 'choiceclick']);
    }
}