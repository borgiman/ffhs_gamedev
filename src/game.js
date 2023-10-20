import Bridge from './bridge.js';
import Tower from './tower.js';
import State from './state.js';

export default class Game {
    static registerMouseUp(mouseEvent) {
        const canvasElement = Bridge.getCanvasElement();
        const canvasRect = canvasElement.getBoundingClientRect();
        const mouseX = mouseEvent.clientX - canvasRect.left;
        const mouseY = mouseEvent.clientY - canvasRect.top;
        const tower = new Tower(mouseX, mouseY);
        State.addEntity(tower);
    }

    static registerMouseMove(mouseEvent) {
        const canvasElement = Bridge.getCanvasElement();
        const canvasRect = canvasElement.getBoundingClientRect();
        const mouseX = mouseEvent.clientX - canvasRect.left;
        const mouseY = mouseEvent.clientY - canvasRect.top;
        State.setMousePosition(mouseX, mouseY);
    }
}
