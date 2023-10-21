import globalState from './global-state.js';
import * as Enums from './enums.js';

export default class Enemy {
    constructor(phase, x, y) {
        this.phase = phase;
        this.x = x;
        this.y = y;
        this.zLayer = Enums.zLayer.entity;
    }

    update(context, delta) {
        const mousePosition = globalState.getMousePosition();
        this.x =  mousePosition.x;
        this.y = mousePosition.y;
    }
}
