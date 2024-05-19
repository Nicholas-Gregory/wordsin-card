import { Container, Graphics } from "pixi.js";
import ShadowBoxRenderer from "./ShadowBoxRenderer";

export default class ScrollableBoxRenderer extends Container {
    constructor(width, height, color, content) {
        super({ eventMode: 'static' });

        this.givenWidth = width;
        this.givenHeight = height;
        this.givenColor = color;
        this.content = content;

        this
        .makeBox()
        .makeContent()
        .makeMask()
        .makeScrollBar()
        .registerMouseEvents()
        .registerWheelEvent();
    }

    makeBox() {
        this.box = new ShadowBoxRenderer(this.givenWidth, this.givenHeight, this.givenColor);

        this.addChild(this.box);

        return this;
    }

    makeContent() {
        this.contentContainer = new Container();

        for (let item of this.content) {
            this.contentContainer.addChild(item);
        }

        this.addChild(this.contentContainer);

        return this;
    }

    makeMask() {
        this.maskGraphics = new Graphics()
        .rect(1, 1, this.givenWidth - 2, this.givenHeight - 2)
        .fill(0xffffff);

        this.addChild(this.maskGraphics);

        this.contentContainer.mask = this.maskGraphics;

        return this;
    }

    makeScrollBar() {
        this.contentContainer.mask = null;
        const maskBounds = this.maskGraphics.getLocalBounds();
        const contentBounds = this.contentContainer.getLocalBounds();

        this.scrollBar = new Graphics({ eventMode: 'static' })
        .rect(this.box.givenWidth - 5, 1, 4, (maskBounds.height * maskBounds.height) / contentBounds.height)
        .fill(0x333333);

        this.addChild(this.scrollBar);

        this.contentContainer.mask = this.maskGraphics;

        return this;
    }

    registerMouseEvents() {
        this.scrollBar
        .on('mousedown', event => this.dragging = true)
        .on('mouseup', event => this.dragging = false)
        .on('mouseleave', event => this.dragging = false)
        .on('mousemove', ({ global }) => {
            if (this.dragging) {
                this.contentContainer.mask = null;
                const maskBounds = this.maskGraphics.getLocalBounds();
                const scrollBarBounds = this.scrollBar.getLocalBounds();
                const contentBounds = this.contentContainer.getLocalBounds();

                const calculatedY = this.toLocal(global).y - scrollBarBounds.height / 2;

                if (calculatedY <= maskBounds.top) {
                    this.scrollBar.y = maskBounds.top;
                } else if (calculatedY + scrollBarBounds.height >= maskBounds.bottom) {
                    this.scrollBar.y = maskBounds.bottom - scrollBarBounds.height;
                } else {
                    this.scrollBar.y = calculatedY;
                }

                this.contentContainer.y = -(((this.scrollBar.y - 1) * contentBounds.height) / maskBounds.height);

                this.contentContainer.mask = this.maskGraphics;
            }
        });

        return this;
    }

    registerWheelEvent() {
        this.on('wheel', ({ deltaY }) => {
            this.contentContainer.mask = null;
            const contentBounds = this.contentContainer.getLocalBounds();
            const maskBounds = this.maskGraphics.getLocalBounds();

            const calculatedY = this.contentContainer.y - deltaY * 0.1;

            if (calculatedY > maskBounds.top) {
                this.contentContainer.y = maskBounds.top - 1;
            } else if (calculatedY + contentBounds.height < maskBounds.bottom && deltaY > 0) {
                this.contentContainer.y = -(contentBounds.height - maskBounds.bottom)
            } else {
                this.contentContainer.y = calculatedY;
            }

            this.scrollBar.y = (maskBounds.height * -this.contentContainer.y) / contentBounds.height;

            this.contentContainer.mask = this.maskGraphics;
        })

        return this;
    }
}