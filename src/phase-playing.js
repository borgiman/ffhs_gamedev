import Phase from './phase.js';
import * as Enums from './enums.js';
import GameMap from './game-map.js';
import Tower from './tower.js';
import Enemy from './enemy.js';
import gameMapManager from './game-map-manager.js';

export default class PlayingPhase extends Phase {
    constructor(game) {
        super(game, Enums.phaseType.playing);
    }

    update(context, delta) {
        super.update(context, delta);

        const enemiesSurvived = this.getGameObjects().find(x => x instanceof Enemy && x.reachedFinishLine === true) !== undefined;
        if (enemiesSurvived) {
            this.game.transitionToNextPhase();
        }
    }

    getNextPhaseType() {
        const enemiesSurvived = this.getGameObjects().find(x => x instanceof Enemy && x.reachedFinishLine === true) !== undefined;
        return enemiesSurvived
            ? Enums.phaseType.gameOver
            : Enums.phaseType.planning;
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
        const enemyStartPosition = gameMapManager.getDirtTilePositions()[0];
        const enemy = new Enemy(this, enemyStartPosition.x, enemyStartPosition.y);
        super.addGameObject(enemy);
    }
}
