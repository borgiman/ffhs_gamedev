import Game from './game.js';

const canvasElement = document.querySelector('canvas');
const fpsElement = document.getElementById('fps');
const context = canvasElement.getContext('2d');

export default class Bridge {
    static registerEventListeners() {
        canvasElement.addEventListener('mouseup', Game.registerMouseUp);
        canvasElement.addEventListener('mousemove', Game.registerMouseMove);
    }

    static getCanvasElement() {
        return canvasElement;
    }

    static getFpsElement() {
        return fpsElement;
    }

    static getContext() {
        return context;
    }
}
