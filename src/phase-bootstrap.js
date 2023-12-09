import Phase from './phase.js';
import * as Enums from './enums.js';
import Button from "./button.js";
import globalState from "./global-state.js";
import gameMapManager from "./game-map-manager.js";

export default class BootstrapPhase extends Phase {
    constructor(game) {
        super(game, Enums.phaseType.bootstrap);
    }

    getNextPhaseType() {
        return Enums.phaseType.planning;
    }

    reset() {
        super.reset();

        const towerDefenseButton = new Button('TowerDefense', Enums.position.right / 2, Enums.position.bottom /3, () => {
            globalState.level=1
            globalState.cash=20;
            globalState.mode=Enums.mode.towerdefense;

            gameMapManager.setRandomBezierPoints();
            gameMapManager.setDirtTilePositions();

            super.transitionToNextPhase()
        });
        super.addGameObject(towerDefenseButton);

        const pathfinderButton = new Button('Pathfinder', Enums.position.right / 2, Enums.position.bottom /3*2, () => {
            globalState.level=1
            globalState.cash=50;

            globalState.mode=Enums.mode.pathfinder;

            super.transitionToNextPhase();
        });
        super.addGameObject(pathfinderButton);

    }
}
