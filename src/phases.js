import { phaseType } from './enums.js';
import Tower from './tower.js';
import Button from './button.js';

class Phase {
    constructor(phaseType) {
        this.gameObjects = [];
        this.phaseType = phaseType;
    }

    update(context, delta) {
        this.gameObjects
            .filter(x => x.update)
            .forEach(x => x.update(context, delta));
    }

    draw(context, interpolationPercentage) {
        this.gameObjects
            .filter(x => x.draw)
            .sort((x1, x2) => x1.zLayer - x2.zLayer)
            .forEach(x => x.draw(context, interpolationPercentage));
    }

    addGameObject(gameObject) {
        this.gameObjects.push(gameObject);
    }

    removeGameObject(gameObject) {
        this.gameObjects.splice(this.gameObjects.indexOf(gameObject), 1);
    }

    onMouseUp(mouseX, mouseY) {
    }
}

export class PlanningPhase extends Phase {
    constructor() {
        super(phaseType.planning);
        const readyButton = new Button('Ready', 400, 300);
        super.addGameObject(readyButton);
    }

    onMouseUp(mouseX, mouseY) {
        super.onMouseUp(mouseX, mouseY);
        const tower = new Tower(this, mouseX, mouseY);
        this.addGameObject(tower);
    }
}

export class PlayingPhase extends Phase {
    constructor() {
        super(phaseType.playing);
    }
}
