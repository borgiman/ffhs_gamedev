import Phase from './phase.js';
import * as Enums from './enums.js';
import GameMap from './game-map.js';
import Tower from './tower.js';
import Enemy from './enemy.js';
import gameMapManager from './game-map-manager.js';
import globalState from './global-state.js';

export default class PlayingPhase extends Phase {
    constructor(game) {
        super(game, Enums.phaseType.playing);
    }

    update(context, delta) {
        super.update(context, delta);

        const enemies = this.getGameObjectsOfType(Enemy);
        const allEnemiesKilled = enemies.length === 0;
        if (allEnemiesKilled) {
            globalState.level++;
            this.game.transitionToNextPhase();
        }

        const enemiesSurvived = enemies.find(x => x.reachedFinishLine === true) !== undefined;
        if (enemiesSurvived) {
            this.game.transitionToNextPhase();
        }
    }

    getNextPhaseType() {
        const enemies = this.getGameObjectsOfType(Enemy);
        const enemiesSurvived = enemies.find(x => x.reachedFinishLine === true) !== undefined;
        return enemiesSurvived
            ? Enums.phaseType.gameOver
            : Enums.phaseType.planning;
    }

    transitionFrom(oldPhase) {
        super.transitionFrom(oldPhase);
        const gameMaps = oldPhase.getGameObjectsOfType(GameMap);
        const towers = oldPhase.getGameObjectsOfType(Tower);
        gameMaps.forEach(x => super.addGameObject(x));
        towers.forEach(x => super.addGameObject(x));
    }

    reset() {
        super.reset();

        const enemyStartPosition = gameMapManager.getDirtTilePositions()[0];
        for (let i = 0; i < globalState.level; i++) {
            const xOffset = Math.random() * 200 * i;
            const enemy = new Enemy(enemyStartPosition.x - xOffset, enemyStartPosition.y);
            super.addGameObject(enemy);
        }
    }
}
