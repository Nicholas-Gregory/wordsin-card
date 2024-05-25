export default class System {
    constructor(needed, unwanted, entities, callback) {
        this.needed = needed || [];
        this.unwanted = unwanted || [];
        this.entities = entities || [];
        this.callback = callback || (() => {});
    }

    process() {
        for (let entity of this.entities) {
            const match = true;
            for (let needed of this.needed) {
                if (!entity[needed]) {
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
        }

        if (match) {
            this.callback(entity);
        }
    }
}