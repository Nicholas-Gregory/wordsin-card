import { Container } from "pixi.js";

export default class VerticalListRenderer extends Container {
    constructor(margin, items) {
        super();

        this.margin = margin;
        this.items = items;

        this.makeItems();
    }

    makeItems() {
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];

            item.x = 0;
            item.y = (item.getLocalBounds().height + this.margin) * i;

            this.addChild(item);
        }

        return this;
    }
}