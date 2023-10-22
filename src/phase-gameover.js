import Phase from './phase.js';
import * as Enums from './enums.js';
import Button from './button.js';

export default class GameOverPhase extends Phase {
    constructor(game) {
        super(game, Enums.phaseType.gameOver);
    }

    reset() {
        super.reset();
        const reloadButton = new Button('Try again', 400, 300, () => location.reload());
        super.addGameObject(reloadButton);
    }
}