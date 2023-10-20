import State from './state.js';
import Bridge from './bridge.js';

const canvasElement = Bridge.getCanvasElement();
const fpsElement = Bridge.getFpsElement();
const context = Bridge.getContext();

Bridge.registerEventListeners();
MainLoop.setUpdate(update).setDraw(draw).setEnd(end).start();

function update(delta) {
    State.getEntities().forEach(x => x.update(delta));
}

function draw(interpolationPercentage) {
    context.clearRect(0, 0, canvasElement.width, canvasElement.height);
    State.getEntities().sort(x => x.zLayer).forEach(x => x.draw(interpolationPercentage));
}

function end(fps, panic) {
    fpsElement.textContent = Math.round(fps) + ' FPS';

    if (panic) {
        const discardedTime = Math.round(MainLoop.resetFrameDelta());
        console.warn(`'Main loop panicked, probably because the browser tab was put in the background. Discarding ${discardedTime} ms`);
    }
}
