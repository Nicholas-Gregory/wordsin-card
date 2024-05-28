import System from "../../../lib/systems/System";

const renderSystemCallback = (entity, app) => {
    entity.renderer.x = entity.position.x;
    entity.renderer.y = entity.position.y;

    app.stage.addChild(entity.renderer);
};

export default class RenderSystem extends System {
    constructor(entities) {
        super(['position', 'renderer'], null, entities, renderSystemCallback);
    }
}