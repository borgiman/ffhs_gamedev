import bridge from './bridge.js';
import globalState from './global-state.js';
import BootstrapPhase from './phase-bootstrap.js';
import PlanningPhase from './phase-planning.js';
import PlayingPhase from './phase-playing.js';
import * as Enums from './enums.js';

class Game {
    constructor() {
        this.canvasElement = bridge.getCanvasElement();
        this.context = bridge.getContext();
        this.phases = [
            new BootstrapPhase(this),
            new PlanningPhase(this),
            new PlayingPhase(this)
        ];
        this.currentActivePhase = this.phases.find(x => x.phaseType === Enums.phaseType.bootstrap);
        this.transitionToNextPhase();

        // soon to be deleted
        window.addEventListener('keydown', x => {
            if (x.code === 'Enter') {
                this.transitionToNextPhase();
            }
        })
    }

    onMouseUp(mouseX, mouseY) {
        this.currentActivePhase.onMouseUp(this.context, mouseX, mouseY);
    }

    onMouseMove(mouseX, mouseY) {
        globalState.setMousePosition(mouseX, mouseY);
    }

    update(delta) {
        this.currentActivePhase.update(this.context, delta);
    }

    draw(interpolationPercentage) {
        this.context.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
        this.currentActivePhase.draw(this.context, interpolationPercentage);
    }

    transitionToNextPhase() {
        const nextPhaseType = this.currentActivePhase.getNextPhaseType();
        const nextPhase = this.phases.find(x => x.phaseType === nextPhaseType);
        nextPhase.transitionFrom(this.currentActivePhase);
        this.currentActivePhase = nextPhase;
    }
}

const game = new Game();
export default game;
