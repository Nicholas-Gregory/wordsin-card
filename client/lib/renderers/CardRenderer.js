import { Graphics } from "pixi.js";
import Renderer from "./Renderer.js";
import { 
    CARD_BACKGROUND_COLOR,
    CARD_BOX_COLOR,
    CARD_BOX_MARGIN, 
    CARD_HEIGHT, 
    CARD_TEXT_BOX_HEIGHT, 
    CARD_TITLE_BOX_HEGIHT, 
    CARD_WIDTH 
} from "./render-constants.js";

export default class CardRenderer extends Renderer {
    constructor(card) {
        super();
        this.card = card;

        this.rectangle = new Graphics()
        .rect(0, 0, CARD_WIDTH, CARD_HEIGHT)
        .fill(CARD_BACKGROUND_COLOR);

        this.titleBox = new Graphics()
        .rect(CARD_BOX_MARGIN, CARD_BOX_MARGIN, CARD_WIDTH - CARD_BOX_MARGIN * 2, CARD_TITLE_BOX_HEGIHT)
        .fill(CARD_BOX_COLOR);

        this.textBox = new Graphics()
        .rect(CARD_BOX_MARGIN, CARD_HEIGHT - CARD_TEXT_BOX_HEIGHT - CARD_BOX_MARGIN, CARD_WIDTH - CARD_BOX_MARGIN * 2, CARD_TEXT_BOX_HEIGHT)
        .fill(CARD_BOX_COLOR);

        this.container.addChild(this.rectangle);
        this.container.addChild(this.titleBox);
        this.container.addChild(this.textBox);
    }
}