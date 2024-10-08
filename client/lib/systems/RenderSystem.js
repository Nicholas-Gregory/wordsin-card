import System from "../../../lib/systems/System";
import { convertMapCoordinates } from "../utils";

const renderSystemCallback = (entity, app, mapSystem) => {
    if (entity.mapPosition && entity.mapId && !entity.moving && !entity.isPlayerCharacter) {
        const map = mapSystem.getEntityById(entity.mapId);
        const renderPosition = convertMapCoordinates(map, entity.mapPosition);
        const entitySize = entity.renderer.getSize();

        entity.renderer.pivot.y = entitySize.height;
        entity.renderer.pivot.x = entitySize.width / 2;
        entity.position = renderPosition;

        map.renderer.addChild(entity.renderer);

        entity.renderer.x = entity.position.x;
        entity.renderer.y = entity.position.y;

        return;
    }

    if (entity.isPlayerCharacter) {
        const entitySize = entity.renderer.getSize();

        entity.position = { x: app.screen.width / 2, y: app.screen.height / 2 };
        entity.renderer.pivot.y = entitySize.height;
        entity.renderer.pivot.x = entitySize.width / 2;

        app.stage.addChild(entity.renderer);
    }

    entity.renderer.x = entity.position.x;
    entity.renderer.y = entity.position.y;

    if (!entity.mapPosition && !entity.weight) app.stage.addChild(entity.renderer);
};

export default class RenderSystem extends System {
    constructor(entities) {
        super(['renderer'], null, entities, renderSystemCallback);
    }
}