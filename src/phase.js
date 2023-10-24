import GameObject from './game-object.js';

export default class Phase extends GameObject {
    constructor(game, phaseType) {
        super(0, 0);

        this.game = game;
        this.phaseType = phaseType;
        this.reset();
    }

    update(context, delta) {
        super.update(context, delta);

        this.gameObjects.forEach(x => x.update(context, delta));
    }

    draw(context, interpolationPercentage) {
        super.draw(context, interpolationPercentage);

        this.gameObjects
            .sort((x1, x2) => x1.zLayer - x2.zLayer)
            .forEach(x => x.draw(context, interpolationPercentage));
    }

    onMouseUp(context, mouseX, mouseY) {
        super.onMouseUp(context, mouseX, mouseY);

        const handled = this.gameObjects
            .sort((x1, x2) => x2.zLayer - x1.zLayer)
            .find(x => x.onMouseUp(context, mouseX, mouseY) === true)
            !== undefined;
        return handled;
    }

    getGameObjectsOfType(type) {
        return this.gameObjects.filter(x => x instanceof type);
    }

    addGameObject(gameObject) {
        gameObject.phase = this;
        this.gameObjects.push(gameObject);
    }

    removeGameObject(gameObject) {
        this.gameObjects.splice(this.gameObjects.indexOf(gameObject), 1);
    }

    getNextPhaseType() {
    }

    transitionToNextPhase() {
        this.game.transitionToNextPhase();
    }

    transitionFrom(oldPhase) {
        this.reset();
    }

    reset() {
        this.gameObjects = [];
    }
}
