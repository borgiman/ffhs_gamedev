import bridge from './bridge.js';
import globalState from './global-state.js';
import * as Phases from './phases.js';
import { phaseType } from './enums.js';

class Game {
    constructor() {
        this.canvasElement = bridge.getCanvasElement();
        this.context = bridge.getContext();
        this.phases = [
            new Phases.PlanningPhase(),
            new Phases.PlayingPhase()
        ];
        this.currentActivePhase = this.phases.find(x => x.phaseType === phaseType.planning);
    }

    registerMouseUp(mouseX, mouseY) {
        this.currentActivePhase.registerMouseUp(mouseX, mouseY);
    }

    registerMouseMove(mouseX, mouseY) {
        globalState.setMousePosition(mouseX, mouseY);
    }

    update(delta) {
        this.currentActivePhase.update(this.context, delta);
    }

    draw(interpolationPercentage) {
        this.context.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
        this.currentActivePhase.draw(this.context, interpolationPercentage);
    }
}

const game = new Game();
export default game;
