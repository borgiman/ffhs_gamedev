import bridge from './bridge.js';
import globalState from './global-state.js';
import * as Phases from './phases.js';
import { phaseType } from './enums.js';

class Game {
    constructor() {
        this.canvasElement = bridge.getCanvasElement();
        this.context = bridge.getContext();
        this.phases = [
            new Phases.PlanningPhase(this),
            new Phases.PlayingPhase(this)
        ];
        this.currentActivePhase = this.phases.find(x => x.phaseType === phaseType.planning);

        // soon to be deleted
        window.addEventListener('keydown', x => {
            if (x.code === 'Enter') {
                this.currentActivePhase = this.phases.find(xx => xx !== this.currentActivePhase);
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
        this.currentActivePhase = nextPhase;
    }
}

const game = new Game();
export default game;
