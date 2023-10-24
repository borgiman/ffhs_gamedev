import Phase from './phase.js';
import * as Enums from './enums.js';
import GameMap from './game-map.js';

export default class BootstrapPhase extends Phase {
    constructor(game) {
        super(game, Enums.phaseType.bootstrap);
    }

    getNextPhaseType() {
        return Enums.phaseType.planning;
    }

    reset() {
        super.reset();
        const gameMap = new GameMap();
        super.addGameObject(gameMap);
    }
}
