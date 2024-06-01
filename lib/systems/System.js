const matchesQuery = (query, object) => {
    for (let key of Object.keys(query)) {
        const value = query[key];

        if (typeof value === 'object') {
            return matchesQuery(value, object);
        }

        if (value !== object[key]) return false;
    }

    return true;
}

export default class System {
    constructor(needed, unwanted, entities, callback) {
        this.needed = needed || [];
        this.unwanted = unwanted || [];
        this.entities = entities || [];
        this.callback = callback || (() => {});
    }

    getEntityById(id) {
        return this.entities.find(e => e.id === id);
    }

    queryEntity(query) {
        return this.entities.find(e => matchesQuery(query, e))
    }

    process(...args) {
        for (let entity of this.entities) {
            let match = true;

            for (let needed of this.needed) {
                if (entity[needed] === undefined) {
                    match = false;
                    break;
                }
            }

            for (let unwanted of this.unwanted) {
                if (entity[unwanted]) {
                    match = false;
                    break;
                }
            }

            if (match) {
                // TODO: if online, server audits entity state changes
                this.callback(entity, ...args);
            }
        }
    }
}