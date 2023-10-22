import Phase from './phase.js';
import * as Enums from './enums.js';
import gameMapManager from './game-map-manager.js';
import Tower from './tower.js';
import GameMap from './game-map.js';
import Button from './button.js';

export default class PlanningPhase extends Phase {
    constructor(game) {
        super(game, Enums.phaseType.planning);
    }

    onMouseUp(context, mouseX, mouseY) {
        const handled = super.onMouseUp(context, mouseX, mouseY);
        if (!handled) {
            if (gameMapManager.canPlacePlayerEntity(
                Tower.getWidth(),
                Tower.getHeight(),
                mouseX,
                mouseY
            )) {
                const tower = new Tower(this, mouseX, mouseY);
                this.addGameObject(tower);
            }
        }
    }

    getNextPhaseType() {
        return Enums.phaseType.playing;
    }

    transitionFrom(oldPhase) {
        super.transitionFrom(oldPhase);
        oldPhase.gameObjects
            .filter(x => x instanceof GameMap || x instanceof Tower)
            .forEach(x => super.addGameObject(x));
    }

    reset() {
        super.reset();
        const readyButton = new Button('Ready', 400, 50, () => super.transitionToNextPhase());
        super.addGameObject(readyButton);
    }
}
