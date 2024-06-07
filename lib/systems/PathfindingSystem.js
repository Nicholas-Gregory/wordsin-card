import System from "./System";

const needed = [
    'mapPosition',
    'mapId'
];

const getH = (start, end) => (end.x - start.x)**2 + (end.y - start.y)**2;

const getG = (start, end, map) => start.g + getWeight(map, end);

const getWeight = (map, position) => map.tiles[position.y * map.width + position.x].weight;

const getNeighbors = (position, map) => {
    const result = [];

    if (position.y > 0) {
        const newY = position.y - 1;

        result.push({
            x: position.x,
            y: newY,
            weight: getWeight(map, { x: position.x, y: newY })
        });
    }

    if (position.x < map.width) {
        const newX = position.x + 1;

        result.push({
            x: newX,
            y: position.y,
            weight: getWeight(map, { x: newX, y: position.y })
        });
    }

    if (position.y < map.tiles.length / map.width - 1) {
        const newY = position.y + 1;

        result.push({
            x: position.x,
            y: newY,
            weight: getWeight(map, { x: position.x, y: newY })
        });
    }

    if (position.x > 0) {
        const newX = position.x - 1;

        result.push({
            x: newX,
            y: position.y,
            weight: getWeight(map, { x: newX, y: position.y })
        });
    }

    return result;
};

const getPath = (node, start, previousArray) => node.x === start.x && node.y === start.y ? previousArray : getPath(node.parent, start, [{ x: node.parent.x, y: node.parent.y }].concat(previousArray || []));

const pathfindingSystemCallback = (entity, mapSystem) => {
    const map = mapSystem.getEntityById(entity.mapId);
    const destination = entity.destination;
    const mapPosition = entity.mapPosition;
    const openList = [{ 
        x: mapPosition.x,
        y: mapPosition.y,
        weight: getWeight(map, mapPosition)
    }];
    const closedList = [];

    if (!destination) return;

    while(openList.length > 0) {
        const lowest = openList.shift();
        closedList.push(lowest);

        if (lowest.x === destination.x && lowest.y === destination.y) {
            entity.astarPath = getPath(lowest, mapPosition, [lowest]).toSpliced(0, 1);
            entity.destination = null;
            break;
        }

        for (let neighbor of getNeighbors(lowest, map)) {
            const newG = getG(lowest, neighbor, map);

            if (openList.includes(neighbor) && newG < neighbor.g) {
                openList
                .splice(openList.findIndex(node => (
                    node === neighbor
                )), 1);
            }

            const checkIfAdded = node => node.x === neighbor.x && node.y === neighbor.y;

            if (!openList.some(checkIfAdded) && !closedList.some(checkIfAdded)) {
                neighbor.g = newG;
                neighbor.h = getH(neighbor, destination);
                neighbor.f = neighbor.g + neighbor.h;
                neighbor.parent = lowest;
                openList.push(neighbor);
                openList.sort((a, b) => a.f - b.f);
            }
        }
    }
};

export default class PathfindingSystem extends System {
    constructor(entities) {
        super(needed, ['freeze'], entities, pathfindingSystemCallback);
    }
}