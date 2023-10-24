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

        const enemies = this.getGameObjectsOfType(Enemy);
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
        const enemy = new Enemy(enemyStartPosition.x, enemyStartPosition.y);
        super.addGameObject(enemy);
    }
}
