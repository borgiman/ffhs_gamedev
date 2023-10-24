import Phase from './phase.js';
import * as Enums from './enums.js';
import gameMapManager from './game-map-manager.js';
import Tower from './tower.js';
import GameMap from './game-map.js';
import Button from './button.js';
import CashDisplay from './cash-display.js';
import globalState from './global-state.js';

export default class PlanningPhase extends Phase {
    constructor(game) {
        super(game, Enums.phaseType.planning);
    }

    onMouseUp(context, mouseX, mouseY) {
        const handled = super.onMouseUp(context, mouseX, mouseY);
        if (handled) {
            return;
        }

        if (!gameMapManager.canPlacePlayerEntity(
            Tower.getWidth(),
            Tower.getHeight(),
            mouseX,
            mouseY
        )) {
            return;
        }

        if (globalState.cash >= Tower.getCost()) {
            globalState.cash -= Tower.getCost();
            const tower = new Tower(mouseX, mouseY);
            this.addGameObject(tower);
        }
    }

    getNextPhaseType() {
        return Enums.phaseType.playing;
    }

    transitionFrom(oldPhase) {
        super.transitionFrom(oldPhase);
        oldPhase.gameObjects
            .filter(x => x instanceof GameMap || x instanceof Tower)
            .forEach(x => {
                x.phase = this;
                super.addGameObject(x)
            });
    }

    reset() {
        super.reset();

        const readyButton = new Button('Ready', Enums.position.right / 2, Enums.position.top + 50, () => super.transitionToNextPhase());
        super.addGameObject(readyButton);

        const cashDisplay = new CashDisplay();
        super.addGameObject(cashDisplay);
    }
}
