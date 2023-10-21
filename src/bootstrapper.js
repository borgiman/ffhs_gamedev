import bridge from './bridge.js';
import game from './game.js';

bridge.registerEventListeners();
MainLoop.setUpdate(update).setDraw(draw).setEnd(end).start();

function update(delta) {
    game.update(delta);
}

function draw(interpolationPercentage) {
    game.draw(interpolationPercentage);
}

function end(fps, panic) {
    const fpsElement = bridge.getFpsElement();
    fpsElement.textContent = Math.round(fps) + ' FPS';

    if (panic) {
        const discardedTime = Math.round(MainLoop.resetFrameDelta());
        console.warn(`'Main loop panicked, probably because the browser tab was put in the background. Discarding ${discardedTime} ms`);
    }
}
