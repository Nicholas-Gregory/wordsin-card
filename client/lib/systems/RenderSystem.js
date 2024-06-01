import System from "../../../lib/systems/System";
import { convertMapCoordinates } from "../utils";

const renderSystemCallback = (entity, app, mapSystem) => {
    if (entity.mapPosition && entity.mapId && !entity.moving) {
        const map = mapSystem.getEntityById(entity.mapId);
        const renderPosition = convertMapCoordinates(map, entity.mapPosition);
        const entitySize = entity.renderer.getSize();

        entity.renderer.pivot.y = entitySize.height;
        entity.renderer.pivot.x = entitySize.width / 2;
        entity.position = renderPosition;
    }

    if (entity.isPlayerCharacter) {
        entity.position = { x: app.screen.width / 2, y: app.screen.height / 2 };
    }

    entity.renderer.x = entity.position.x;
    entity.renderer.y = entity.position.y;

    app.stage.addChild(entity.renderer);
};

export default class RenderSystem extends System {
    constructor(entities) {
        super(['renderer'], null, entities, renderSystemCallback);
    }
}