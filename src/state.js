const entities = [];
const mousePosition = {
    x: -1,
    y: -1
};

export default class State {
    static getEntities() {
        return entities;
    }

    static addEntity(entity) {
        entities.push(entity);
    }

    static removeEntity(entity) {
        entities.splice(entities.indexOf(entity), 1);
    }

    static setMousePosition(x, y) {
        mousePosition.x = x;
        mousePosition.y = y;
    }

    static getMousePosition() {
        return mousePosition;
    }
};
