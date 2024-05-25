let nextId = 0;

export default class Entity {
    constructor(components) {
        const properties = components || {};

        Object.assign(this, properties);

        this.id = nextId;

        nextId++;
    }
}