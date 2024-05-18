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
            // item.y = (height + this.margin) * i;
            item.y = this.items.reduce((currentHeight, currentItem, index) => {
                if (index < i) {
                    return currentHeight + currentItem.getSize().height + this.margin;
                } else { return currentHeight }
            }, 0)

            this.addChild(item);
        }

        return this;
    }
}