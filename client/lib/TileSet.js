export default class GraphicsTileSet {
    constructor(tileSet) {
        this.tileSet = tileSet;
    }

    getNewTileFromId(id) {
        return this.tileSet[id].clone();
    }
}