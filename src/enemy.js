import State from './state.js';
import Enums from './enums.js';

export default class Enemy {
    constructor(x, y) {
        this.zLayer = Enums.zLayer.entity;
        this.x = x;
        this.y = y;
    }

    update(delta) {
        const mousePosition = State.getMousePosition();
        this.x =  mousePosition.x;
        this.y = mousePosition.y;
    }

    draw(interpolationPercentage) {
    }
}
