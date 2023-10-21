import { phaseType } from './enums.js';
import Tower from './tower.js';

class Phase {
    constructor(phaseType) {
        this.gameObjects = [];
        this.phaseType = phaseType;
    }

    addGameObject(gameObject) {
        this.gameObjects.push(gameObject);
    }

    removeGameObject(gameObject) {
        this.gameObjects.splice(this.gameObjects.indexOf(gameObject), 1);
    }

    registerMouseUp(mouseX, mouseY) {
    }

    update(context, delta) {
        this.gameObjects.forEach(x => x.update(context, delta));
    }

    draw(context, interpolationPercentage) {
        this.gameObjects.sort(x => x.zLayer).forEach(x => x.draw(context, interpolationPercentage));
    }
}

export class PlanningPhase extends Phase {
    constructor() {
        super(phaseType.planning);
    }

    registerMouseUp(mouseX, mouseY) {
        const tower = new Tower(this, mouseX, mouseY);
        this.addGameObject(tower);
    }
}

export class PlayingPhase extends Phase {
    constructor() {
        super(phaseType.playing);
    }
}
