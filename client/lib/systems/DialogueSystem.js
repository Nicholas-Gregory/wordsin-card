import EventSystem from "../../../lib/systems/EventSystem.js";
import WordWrapTextRenderer from "../renderers/WordWrapTextRenderer.js";

const needed = [
    'index',
    'renderer',
    'wordWrapTextRenderers',
    'shadowBoxRenderer',
    'events',
    'nextButton'
];
let elapsed = 0;

const initDialogueText = entity => entity.text = new WordWrapTextRenderer('', 100, 0xFFFFFF, 6)
.initText()
.init();

const showShadowBox = entity => entity.renderer.addChild(entity.shadowBoxRenderer);

const hideShadowBox = entity => entity.renderer.removeChild(entity.shadowBoxRenderer);

const getCurrentText = entity => entity.events[entity.index].text;

const initWordsArray = entity => entity.words = getCurrentText(entity).split(' ');

const advanceLinear = entity => entity.index++;

const advanceChoice = (entity, choice) => entity.index = entity.events[entity.index][choice];

const showNextButton = entity => entity.renderer.addChild(entity.nextButton);

const hideNextButton = entity => entity.renderer.removeChild(entity.nextButton);

const type = (entity, time) => {
    elapsed += time.elapsedMS;
    const mod = Math.floor(elapsed) % 100;
    
    if (entity.wordIndex < entity.words.length && (mod <= 5 || mod >= 95)) {
        entity.text.renderers.pixiText.text = `${entity.text.renderers.pixiText.text} ${entity.words[entity.wordIndex]}`;
        entity.wordIndex++;
    }
}

const dialogueManagerCallback = (entity, choice, app) => {
    hideNextButton(entity);
    
    if (entity.events[entity.index].end) {
        hideShadowBox(entity);
        return;
    }

    showShadowBox(entity);

    if (!entity.text) {
        initDialogueText(entity);
    }

    entity.renderer.addChild(entity.text);

    if (choice) {
        advanceChoice(entity, choice);
    } else if (choice === null) {
        advanceLinear(entity);
    }

    initWordsArray(entity);
    entity.wordIndex = 0;
    entity.text.renderers.pixiText.text = '';

    if (entity.events[entity.index].choices) {
        // show choice buttons
    } else {
        showNextButton(entity);
    }

    app.ticker.remove(entity.animationCallback);
    entity.animationCallback = time => type(entity, time);
    app.ticker.add(entity.animationCallback);
};


export default class DialogueSystem extends EventSystem {
    constructor(entities) {
        super(needed, null, entities, dialogueManagerCallback, ['nextbuttonclick', 'choiceclick']);
    }
}