export function render(parentRenderer) {
    parentRenderer.addChild(this);

    if (!parentRenderer.parentRenderer) return;

    parentRenderer.render();
}