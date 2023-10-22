import { phaseType } from './enums.js';
import Tower from './tower.js';
import Button from './button.js';

class Phase {
    constructor(game, phaseType) {
        this.game = game;
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

    onMouseUp(context, mouseX, mouseY) {
        const handled = this.gameObjects
            .filter(x => x.onMouseUp)
            .sort((x1, x2) => x2.zLayer - x1.zLayer)
            .find(x => x.onMouseUp(context, mouseX, mouseY) === true)
            != undefined;
        return handled;
    }

    addGameObject(gameObject) {
        this.gameObjects.push(gameObject);
    }

    removeGameObject(gameObject) {
        this.gameObjects.splice(this.gameObjects.indexOf(gameObject), 1);
    }

    getNextPhaseType() {
    }

    transitionToNextPhase() {
        this.game.transitionToNextPhase();
    }
}

export class PlanningPhase extends Phase {
    constructor(game) {
        super(game, phaseType.planning);
        const readyButton = new Button('Ready', 400, 50, () => super.transitionToNextPhase());
        super.addGameObject(readyButton);
    }

    onMouseUp(context, mouseX, mouseY) {
        const handled = super.onMouseUp(context, mouseX, mouseY);
        if (!handled) {
            const tower = new Tower(this, mouseX, mouseY);
            this.addGameObject(tower);
        }
    }

    getNextPhaseType() {
        return phaseType.playing;
    }
}

export class PlayingPhase extends Phase {
    constructor(game) {
        super(game, phaseType.playing);
    }

    getNextPhaseType() {
        return phaseType.planning;
    }
}
