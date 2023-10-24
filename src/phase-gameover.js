import Phase from './phase.js';
import * as Enums from './enums.js';
import Button from './button.js';

export default class GameOverPhase extends Phase {
    constructor(game) {
        super(game, Enums.phaseType.gameOver);
    }

    reset() {
        super.reset();
        const reloadButton = new Button('Try again', Enums.position.right / 2, Enums.position.bottom / 2, () => location.reload());
        super.addGameObject(reloadButton);
    }
}
